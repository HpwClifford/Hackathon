class AppInstance {
    constructor () {
        this.check();
        this.checkCount = 0;
        this.user = {'buyPrice': undefined, 'sellPrice': undefined};
        this.alertedUser = false;
        
        // start continuosly cehcking BTC price
        setInterval(this.check.bind(this), 3000);
    }

    // methods...
    check () {
        this.checkCount += 1;

        fetch("https://api.coinbase.com/v2/prices/spot?currency=USD")
        .then((data) => data.json())
        .then((data) => {
            let price = data.data.amount;
            this.update(price);

            // Check if price is currently higher than sell price 
            // (below -> or lower than buy price)
            if (price >= this.user.sellPrice && !this.alertedUser) {
                alert("SELL NOW!");
                this.alertedUser = true;
            } else if (price <= this.user.buyPrice && !this.alertedUser) {
                alert("BUY NOW!");
                this.alertedUser = true;
            }

            if (this.user.sellPrice > price && price > this.user.buyPrice) {
                this.alertedUser = false;
            }
        });
    }

    update (price) {
        // create new html element to store price
        // append to body
        const priceInfo = document.getElementById("current-price");
        priceInfo.innerHTML = `Current BTC Price: $${price}`;
        
    }

    inputError () {
        console.log('error!!!');
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.visibility = "visible";
        setTimeout(() => errorMessage.style.visibility = "hidden", 3000);
    }

    areYouSureError () {
        const errorMessage = document.getElementById("are-you-sure");
        errorMessage.style.visibility = "visible";
        setTimeout(() => errorMessage.style.visibility = "hidden", 3000);
    }
}

// program initialization
document.addEventListener("DOMContentLoaded", function() {
    // Handler when the DOM is fully loaded
    const instance = new AppInstance();

    const btn = document.getElementById("submit");

    btn.addEventListener("click", () => {
        // storing buy / sell values
        const buyValue = document.getElementById("buyPrice").value;
        const sellValue = document.getElementById("sellPrice").value;

        // if inputs valid
        if (!isNaN(buyValue) 
            && !isNaN(sellValue) 
            && Number(buyValue) >= 0 
            && Number(sellValue) >= 0) {

            if (Number(buyValue) > Number(sellValue)) {
                instance.areYouSureError();
                return;
            }

            
            // input into user obj
            instance.user.buyPrice = buyValue;
            instance.user.sellPrice = sellValue;

        // if inputs invalid
        } else {
            instance.inputError();
        }

        // clear inputs
        document.getElementById("buyPrice").value = null;
        document.getElementById("sellPrice").value = null;
    });

});





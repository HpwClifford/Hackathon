class BitCoinAppInstance {
    constructor () {
        this.check();
        this.checkCount = 0;

        // start continuosly cehcking BTC price
        setInterval(this.check.bind(this), 3000);

    }

    // methods...
    check () {
        this.checkCount += 1;

        fetch("https://api.coinbase.com/v2/prices/spot?currency=USD")
        .then((data) => data.json())
        .then((data) => {
            console.log(this.checkCount, data.data.amount);
        });
    }

    userInput () {

    }
}

// $(document).ready(() => {
    // call constructor
    
// });

new BitCoinAppInstance();
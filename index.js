const  axios = require("axios");

const URL = "https://api.coinmarketcap.com/v1/ticker";

axios.get(URL)
     .then(response => {
       let data = response.data.map(coin => {
         coin.rank = +coin.rank;
         coin["price_usd"] = +coin["price_usd"];
         coin["price_btc"] = +coin["price_btc"];
         coin["24h_volume_usd"] = +coin["24h_volume_usd"];
         coin["market_cap_usd"] = +coin["market_cap_usd"];
         coin["available_supply"] = +coin["available_supply"];
         coin["total_supply"] = +coin["total_supply"];
         coin["percent_change_1h"] = +coin["percent_change_1h"];
         coin["percent_change_24h"] = +coin["percent_change_24h"];
         coin["percent_change_7d"] = +coin["percent_change_7d"];
         coin["last_updated"] = new Date(+coin["last_updated"]*1000);
         return coin;
       })
       .filter(coin => coin.percent_change_1h > 5)
       .sort((a,b) => b.percent_change_1h - a.percent_change_1h)
       .slice(0,5);

        console.log(data);
     })
     .catch(error => console.log(error));

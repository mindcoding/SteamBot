var SteamApi = require('steam-api');

var market = require('steam-market-pricing');

var items = new SteamApi.Items('steam-api-key', optionalSteamId);

var id = '76561198125081821'

var inv;

items.GetPlayerItems(730, id).done(function(result){

  console.log(result);
  inv = result;

});
var names = inv;

market.getItemsPrice(730, names, function(data) { 
    for(var i in names) {
        console.log(names[i] + ' median price: ' + data[names[i]]['median_price']);
    }
});

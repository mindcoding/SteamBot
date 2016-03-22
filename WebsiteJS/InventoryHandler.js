var SteamApi = require('steam-api');

var items = new SteamApi.Items('steam-api-key', optionalSteamId);

Var Inv;
// Steam API Backpack

items.GetPlayerItems(730, 76561198125081821).done(function(result){

  console.log(result);
  Inv = result;

});


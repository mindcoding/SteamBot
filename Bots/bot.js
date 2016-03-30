var Steam = require("steam");
var SteamUser = require("steam-user");
var SteamTrade = require("steam-trade");
var steamTrade = new SteamTrade();
var client = new SteamUser();
var SteamID = require("steamid");
var SteamCommunity = require("steamcommunity")
var community = new SteamCommunity();
var steamID = new SteamID();
var friends = new Steam.SteamFriends(client.client);

client.logOn({
	"accountName": "Lord_Minds_Assistant",
	"password": "Jakeyy0902",
});

client.on("webSession", function(steamID, cookies){
  community.setCookies(cookies);
  steamTrade.sessionID = cookies[0].split("=")[1];
  cookies.forEach(function(cookie) {
    steamTrade.setCookie(cookie);
  });
})
client.on("loggedOn", function(details){
	console.log("Logged on to Steam! SteamID of " + client.steamID.getSteam3RenderedID());
	client.setPersona(SteamUser.Steam.EPersonaState.Online);
});

client.on("error", function(error){
	console.log("WARNING: Error");
});

friends.on("friendMsg", function(user, msg, type){
	if(type == Steam.EChatEntryType.ChatMsg){
		if(msg == "!help"){
			//friends.sendMessage(user, "!Trade, shows trading link");
			friends.sendMessage(user, "!Skins, shows link to CSGOPoints");
			friends.sendMessage(user, "!Group, link to CSGOPoints Steam Group");
			
		}
		if(msg == "!Skins"){
			friends.sendMessage(user, "Goto CSGOPoints for free Skins-")
		}
		if(msg == "!Group"){
			friends.sendMessage(user, "http://steamcommunity.com/groups/CSGOPoints")
		}
	}
});
var trader;
steamTrade.on("ready", function() {
	steamTrade.ready(function() {
		steamTrade.confirm();
	})

});
client.on("tradeRequest", function(steamID, respond) {
	console.log("Incoming Request from " + steamID.getSteam3RenderedID());
	trader = steamID.getSteam3RenderedID();
	respond(true);
});

client.on("tradeStarted", function(steamID) {
	steamTrade.open(steamID);
});

steamTrade.on('chatMsg', function(msg) {
	if(msg == "!withdraw pass123")
	{
		console.log("Withdrawing Items!")
		steamTrade.getContexts(function(context) {
			steamTrade.loadInventory(730, 2, function(items) {
				steamTrade.addItems(items);
			})
		})
	}
});

steamTrade.on('end', function(status, getItems) {
  if (status == 'complete') {
    getItems(function(items) {
      console.log(items);
    });
  }
});

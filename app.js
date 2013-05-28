var util = require("util"),
	io = require("socket.io"),
	Player = require("./public/js/Player").Player,
    Item = require("./public/js/Item").Item,
    Npc = require("./public/js/Npc").Npc,
    socket,
	players,
    items,
    npc;

var init = function() {
    var itemImageWidth = 28,
        itemImageHeight = 30,
        itemImageWidthCenter = Math.floor(itemImageWidth / 2),
        itemImageHeightCenter = Math.floor(itemImageHeight / 2),
        itemImageLength = 2, // 64;
        npcImageWidth = 28,
        npcImageHeight = 30,
        npcImageWidthCenter = Math.floor(npcImageWidth / 2),
        npcImageHeightCenter = Math.floor(npcImageHeight / 2),
        npcImageLength = 1,
        i, startX, startY, startImage, startImageSrc, newItem;


    players = [];
    items = [];
    npcs = [];

    for (i = 0; i < 20; i += 1) {
        startX = Math.round((Math.random() * (1586 - itemImageWidth)) - 543 + itemImageWidthCenter);
        startY = Math.round((Math.random() * (1586 - itemImageHeight)) - 543 + itemImageHeightCenter);
        startImage = Math.floor(Math.random() * itemImageLength + 1);
        startImageSrc = 'img/' + startImage + ';2.png';
        newItem = new Item(startX, startY, startImageSrc);
        items.push(newItem);
    }

    for (i = 0; i < 10; i += 1) {
        startX = Math.round((Math.random() * (1586 - npcImageWidth)) - 543 + npcImageWidthCenter);
        startY = Math.round((Math.random() * (1586 - npcImageHeight)) - 543 + npcImageHeightCenter);
        startImage = Math.floor(Math.random() * npcImageLength + 1);
        startImageSrc = 'img/NPCtesticon.png';
        newNpc = new Npc(startX, startY, startImageSrc);
        npcs.push(newNpc);
    }

	socket = io.listen(4000);

	socket.configure(function() {
		socket.set("transports", ["websocket"]);
		socket.set("log level", 2);
	});

	setEventHandlers();
};

var setEventHandlers = function() {
	socket.sockets.on("connection", onSocketConnection);
};

var onSocketConnection = function(client) {
	util.log("New player has connected: " + client.id);

	client.on("disconnect", onClientDisconnect);
	client.on("new player", onNewPlayer);
	client.on("move player", onMovePlayer);
};

var onClientDisconnect = function() {
    var removePlayer = playerById(this.id);

	util.log("Player has disconnected: " + this.id);

	if (!removePlayer) {
		util.log("Player not found: " + this.id);
		return;
	};

	players.splice(players.indexOf(removePlayer), 1);

	this.broadcast.emit("remove player", {id: this.id});
};

var onNewPlayer = function(data) {
	var newPlayer = new Player(data.x, data.y, data.image), i, existingPlayer, existingItem, existingNpc;
	newPlayer.id = this.id;

	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), image: newPlayer.getImageSrc()});

    for (i = 0; i < npcs.length; i += 1) {
        existingNpc = npcs[i];
        this.emit("new npc", {id: i, x: existingNpc.getX(), y: existingNpc.getY(), image: existingNpc.getImageSrc()});
    };

    for (i = 0; i < items.length; i += 1) {
        existingItem = items[i];
        this.emit("new item", {id: i, x: existingItem.getX(), y: existingItem.getY(), image: existingItem.getImageSrc()});
    };

	for (i = 0; i < players.length; i += 1) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), image: existingPlayer.getImageSrc()});
	};

	players.push(newPlayer);
};

var onMovePlayer = function(data) {
	var movePlayer = playerById(this.id);

	if (!movePlayer) {
		util.log("Player not found: " + this.id);
		return;
	};

	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
    movePlayer.setImageSrc(data.image);

	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), image: movePlayer.getImageSrc()});
};

var playerById = function(id) {
	var i;

	for (i = 0; i < players.length; i += 1) {
		if (players[i].id == id)
			return players[i];
	};

	return false;
};

init();
var util = require("util"),
	io = require("socket.io"),
	Player = require("./public/js/Player").Player,
    Item = require("./public/js/Item").Item,
    Npc = require("./public/js/Npc").Npc,
    socket,
	players,
    playersPoints,
    items,
    itemsAmount = 20,
    npcs,
    npcsAmount = 10,
    imageSize = 32,
    imageCenter = imageSize / 2,
	itemImageLength = 2, // 64;
	npcImageLength = 1; // 48;

var init = function() {
    var i, j, startX, startY, startImage, startImageSrc, newItem, newNpc, guard;
	
	players = [];
    playersPoints = [];
    items = [];
    npcs = [];

    for (i = 0; i < itemsAmount; i += 1) {
        guard = false;

        startX = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startY = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startImage = Math.floor(Math.random() * itemImageLength + 1);
        startImageSrc = 'img/' + startImage + ';2.png';
        newItem = new Item(startX, startY, startImageSrc);

        for (j = 0; j < items.length && guard == false; j += 1) {
            if (collision(newItem.getX(), newItem.getY(), items[j])) {
                guard = true;
                break;
            }
        }

        if (guard == false) {
            items.push(newItem);
        } else {
            i -= 1;
        }
    }

    for (i = 0; i < npcsAmount; i += 1) {
        guard = false;

        startX = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startY = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startImage = Math.floor(Math.random() * npcImageLength + 1);
        startImageSrc = 'img/NPCtesticon.png',
        newNpc = new Npc(startX, startY, startImageSrc);

        for (j = 0; j < npcs.length && guard == false; j += 1) {
            if (collision(newNpc.getX(), newNpc.getY(), npcs[j])) {
                guard = true;
                break;
            }
        }

        for (j = 0; j < items.length && guard == false; j += 1) {
            if (collision(newNpc.getX(), newNpc.getY(), items[j])) {
                guard = true;
                break;
            }
        }

        if (guard == false) {
            newNpc.setItemList(itemImageLength);
            newNpc.generateQuest();
            npcs.push(newNpc);
        } else {
            i -= 1;
        }
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
    client.on("collect item", onCollectItem);
    client.on("generate item", onGenerateItem);
    client.on("update points", onUpdatePoints);
    client.on("change quest", onChangeQuest);
    client.on("stop player", onStopPlayer);
};

var onClientDisconnect = function() {
    var removePlayer = playerById(this.id);

	util.log("Player has disconnected: " + this.id);

	if (!removePlayer) {
		util.log("Player not found: " + this.id);
		return;
	}

	players.splice(players.indexOf(removePlayer), 1);

	this.broadcast.emit("remove player", {id: this.id});
};

var onNewPlayer = function(data) {
	var newPlayer = new Player(data.x, data.y, data.image, data.inventory, data.points), i, existingPlayer, existingItem, existingNpc;
	newPlayer.id = this.id;

	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(),
                                       y: newPlayer.getY(), image: newPlayer.getImageSrc(),
                                       inventory: newPlayer.getInventory(),
                                       points: newPlayer.getPoints()});

    for (i = 0; i < npcs.length; i += 1) {
        existingNpc = npcs[i];
        this.emit("new npc", {x: existingNpc.getX(), y: existingNpc.getY(),
                              image: existingNpc.getImageSrc(),
                              itemList: existingNpc.getItemList(),
                              desiredItem: existingNpc.getDesiredItem(),
                              reward: existingNpc.getReward()});
    }

    for (i = 0; i < items.length; i += 1) {
        existingItem = items[i];
        this.emit("new item", {x: existingItem.getX(), y: existingItem.getY(), image: existingItem.getImageSrc()});
    }

	for (i = 0; i < players.length; i += 1) {
		existingPlayer = players[i];
        this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(),
                                 y: existingPlayer.getY(), image: existingPlayer.getImageSrc(),
                                 inventory: existingPlayer.getInventory(),
                                 points: existingPlayer.getPoints()});
	}

	/*while (guard == true) {
        guard = false;

        startX = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startY = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startImage = Math.floor(Math.random() * characterImageLength + 1);
        startImageSrc = 'img/' + startImage + ';down-2.png';
        startInventory = [];
        localPlayer = new Player(startX, startY, startImageSrc, startInventory);
        console.log("remotePlayers.length = " + remotePlayers.length);
        for (i = 0; i < remotePlayers.length && guard == false; i += 1) {
            console.log("(i \< remotePlayers.length && guard == false) = " + (0 < remotePlayers.length && guard == false));
            if (collision(localPlayer.getX(), localPlayer.getY(), remotePlayers[j])) {
                guard = true;
                break;
            }
        }
        console.log("remoteNpcs.length = " + remoteNpcs.length);
        for (i = 0; i < remoteNpcs.length && guard == false; i += 1) {
            console.log("(i \< remoteNpcs.length && guard == false) = " + (i < remoteNpcs.length && guard == false));
            if (collision(localPlayer.getX(), localPlayer.getY(), remoteNpcs[j])) {
                guard = true;
                break;
            }
        }
        console.log("remoteItems.length = " + remoteItems.length);
        for (i = 0; i < remoteItems.length && guard == false; i += 1) {
            console.log("(i \< remoteItems.length && guard == false) = " + (i < remoteItems.length && guard == false));
            if (collision(localPlayer.getX(), localPlayer.getY(), remoteItems[j])) {
                guard = true;
                break;
            }
        }
        console.log("guard = " + guard);
        if (guard == false) {
            */players.push(newPlayer);
        /*} else {
            guard = true;
        }
    }
    console.log("poza whilem");
*/};

var onCollectItem = function(data) {
    items.splice(data.id, 1);

    this.broadcast.emit("item collected", {id: data.id});
};

var onGenerateItem = function() {
    for (i = items.length; i < itemsAmount; i += 1) {
        guard = false;

        startX = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startY = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startImage = Math.floor(Math.random() * itemImageLength + 1);
        startImageSrc = 'img/' + startImage + ';2.png';
        newItem = new Item(startX, startY, startImageSrc);

        for (j = 0; j < items.length && guard == false; j += 1) {
            if (collision(newItem.getX(), newItem.getY(), items[j])) {
                guard = true;
                break;
            }
        }

        for (j = 0; j < npcs.length && guard == false; j += 1) {
            if (collision(newItem.getX(), newItem.getY(), npcs[j])) {
                guard = true;
                break;
            }
        }

        for (j = 0; j < players.length && guard == false; j += 1) {
            if (collision(newItem.getX(), newItem.getY(), players[j])) {
                guard = true;
                break;
            }
        }

        if (guard == false) {
            items.push(newItem);
        } else {
            i -= 1;
        }
    }

    this.emit("new item", {x: newItem.getX(), y: newItem.getY(), image: newItem.getImageSrc()});
    this.broadcast.emit("new item", {x: newItem.getX(), y: newItem.getY(), image: newItem.getImageSrc()});
};

var onUpdatePoints = function(data) {
    var updatePlayerPoints = playerById(this.id), i;

    if (!updatePlayerPoints) {
        util.log("Player not found: " + this.id);
        return;
    }

    updatePlayerPoints.setPoints(data.points);

    playersPoints = [];
    this.broadcast.emit("clear players points");

    for (i = 0; i < players.length; i += 1) {
        playersPoints.push({player: players[i].id, points: players[i].getPoints()});

        this.broadcast.emit("points updated", {player: players[i].id, points: players[i].getPoints()});
    }

    playersPoints.sort(comparePlayersPoints);
    this.broadcast.emit("sort players points");
};

var onChangeQuest = function(data) {
    npcs[data.id].setDesiredItem(data.desiredItem);
    npcs[data.id].setReward(data.reward);

    this.broadcast.emit("quest changed", {id: data.id, desiredItem: npcs[data.id].getDesiredItem(), reward: npcs[data.id].getReward()});
};

var onStopPlayer = function(data) {
    var stopPlayer = playerById(this.id);

    if (!stopPlayer) {
        util.log("Player not found: " + this.id);
        return;
    }

    stopPlayer.setImageSrc(data.image);

    this.broadcast.emit("player stopped", {id: stopPlayer.id, image: stopPlayer.getImageSrc()});
};

var onMovePlayer = function(data) {
	var movePlayer = playerById(this.id);

	if (!movePlayer) {
		util.log("Player not found: " + this.id);
		return;
	}

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
	}

	return false;
};

var collision = function(objectOneX, objectOneY, objectTwo) {
    return objectOneX < objectTwo.getX() + imageSize &&
           objectOneX + imageSize > objectTwo.getX() &&
           objectOneY < objectTwo.getY() + imageSize &&
           objectOneY + imageSize > objectTwo.getY();
};

var comparePlayersPoints = function(a,b) {
    if (a.points < b.points) {
        return -1;
    } else if (a.points > b.points) {
        return 1;
    } else {
        return 0;
    }
};

init();
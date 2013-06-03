var socket,
    canvas,
	ctx,
	keys,
	localPlayer,
	remotePlayers,
    remoteItems,
    remoteNpcs,
    worldWidth = 1600,
    worldHeight = 1600,
    imageSize = 32,
    imageCenter = imageSize / 2,
    characterImageLength = 2, // 48;
	itemImageLength = 2, // 64;
	npcImageLength = 1; // 48;

var init = function() {
    var startX, startY, startImage, startImageSrc, startInventory, i, guard = true;

	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	canvas.width = 500;
	canvas.height = 500;

	keys = new Keys();

    remotePlayers = [];
    remoteItems = [];
    remoteNpcs = [];

    while (guard == true) {
        guard = false;

        startX = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startY = Math.round((Math.random() * (1586 - imageSize)) - 543 + imageCenter);
        startImage = Math.floor(Math.random() * characterImageLength + 1);
        startImageSrc = 'img/' + startImage + ';down-2.png';
        startInventory = [];
        localPlayer = new Player(startX, startY, startImageSrc, startInventory, 0);

        for (i = 0; i < remotePlayers.length && guard == false; i += 1) {
            if (collision(localPlayer.getX(), localPlayer.getY(), remotePlayers[j], 'generate')) {
                guard = true;
                break;
            }
        }

        for (i = 0; i < remoteNpcs.length && guard == false; i += 1) {
            if (collision(localPlayer.getX(), localPlayer.getY(), remoteNpcs[j], 'generate')) {
                guard = true;
                break;
            }
        }

        for (i = 0; i < remoteItems.length && guard == false; i += 1) {
            if (collision(localPlayer.getX(), localPlayer.getY(), remoteItems[j], 'generate')) {
                guard = true;
                break;
            }
        }

        if (guard == false) {

        } else {
            guard = true;
        }
    }

	socket = io.connect("http://localhost", {port: 4000, transports: ["websocket"]});

	setEventHandlers();
};

var setEventHandlers = function() {
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);

	window.addEventListener("resize", onResize, false);

	socket.on("connect", onSocketConnected);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    socket.on("move player", onMovePlayer);
    socket.on("remove player", onRemovePlayer);
    socket.on("new item", onNewItem);
    socket.on("new npc", onNewNpc);
    socket.on("item collected", onItemCollected);
    socket.on("quest changed", onQuestChanged);
};

var onKeyDown = function(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	}
};

var onKeyUp = function(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	}
};

var  onResize = function(e) {
	canvas.width = 500;
	canvas.height = 500;
};

var onSocketConnected = function() {
	console.log("Connected to socket server");

	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(),
                               image: localPlayer.getImageSrc(),
                               inventory: localPlayer.getInventory(),
                               points: localPlayer.getPoints()});
};

var onSocketDisconnect = function() {
	console.log("Disconnected from socket server");
};

var onNewPlayer = function(data) {
    var newPlayer = new Player(data.x, data.y, data.image, data.inventory, data.points);
    newPlayer.id = data.id;

	console.log("New player connected: " + data.id);

	remotePlayers.push(newPlayer);
};

var onNewItem = function(data) {
    var newItem = new Item(data.x, data.y, data.image);

    remoteItems.push(newItem);
};

var onNewNpc = function(data) {
    var newNpc = new Npc(data.x, data.y, data.image);
    newNpc.setItemList(data.itemList);
    newNpc.setDesiredItem(data.desiredItem);
    newNpc.setReward(data.reward);

    remoteNpcs.push(newNpc);
};

var onMovePlayer = function(data) {
	var movePlayer = playerById(data.id);

	if (!movePlayer) {
		console.log("Player not found: " + data.id);
		return;
	}

	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
    movePlayer.setImageSrc(data.image);
};

var onItemCollected = function(data) {
    remoteItems.splice(data.id, 1);
};

var onQuestChanged = function(data) {
    remoteNpcs[data.id].setDesiredItem(data.desiredItem);
    remoteNpcs[data.id].setReward(data.reward);
};

var onRemovePlayer = function(data) {
	var removePlayer = playerById(data.id), i;

	if (!removePlayer) {
		console.log("Player not found: " + data.id);
		return;
	}

	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};

var animate = function() {
	updateLocalPlayer();
	drawWorld();

	window.requestAnimFrame(animate);
};

var updateLocalPlayer = function() {
	if (localPlayer.update(keys)) {
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), image: localPlayer.getImageSrc()});
	}
};

var drawWorld = function() {
    var i;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < remoteNpcs.length; i += 1) {
        remoteNpcs[i].drawNpc(ctx, localPlayer.getX(), localPlayer.getY());
    }

    for (i = 0; i < remoteItems.length; i += 1) {
        remoteItems[i].drawItem(ctx, localPlayer.getX(), localPlayer.getY());
    }

    for (i = 0; i < remotePlayers.length; i += 1) {
        remotePlayers[i].drawPlayer(ctx, localPlayer.getX(), localPlayer.getY());
    }

	localPlayer.drawLocalPlayer(ctx);
};

var playerById = function(id) {
    for (var i = 0; i < remotePlayers.length; i += 1) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	}
	
	return false;
};

var collision = function(objectOneX, objectOneY, objectTwo, direction) {
    /*if (direction == 'up') {
        return objectOneX < objectTwo.getX() + imageSize &&  // Object One is going   LEFT    on   RIGHT    edge of Object Two
               objectOneX + imageSize > objectTwo.getX() &&  // Object One is going   RIGHT   on   LEFT     edge of Object Two
               !(objectOneY < objectTwo.getY() + imageSize) &&  // Object One is going   UP      on   BOTTOM   edge of Object Two
               objectOneY + imageSize > objectTwo.getY();    // Object One is going   DOWN    on   TOP      edge of Object Two
    } else if (direction == 'down') {
        return objectOneX < objectTwo.getX() + imageSize &&  // Object One is going   LEFT    on   RIGHT    edge of Object Two
               objectOneX + imageSize > objectTwo.getX() &&  // Object One is going   RIGHT   on   LEFT     edge of Object Two
               objectOneY < objectTwo.getY() + imageSize &&  // Object One is going   UP      on   BOTTOM   edge of Object Two
               !(objectOneY + imageSize > objectTwo.getY());    // Object One is going   DOWN    on   TOP      edge of Object Two
    } else if (direction == 'left') {
        return objectOneX < objectTwo.getX() + imageSize &&  // Object One is going   LEFT    on   RIGHT    edge of Object Two
               objectOneX + imageSize > objectTwo.getX() &&  // Object One is going   RIGHT   on   LEFT     edge of Object Two
               objectOneY < objectTwo.getY() + imageSize &&  // Object One is going   UP      on   BOTTOM   edge of Object Two
               objectOneY + imageSize > objectTwo.getY();    // Object One is going   DOWN    on   TOP      edge of Object Two
    } else if (direction == 'right') {
        return objectOneX < objectTwo.getX() + imageSize &&  // Object One is going   LEFT    on   RIGHT    edge of Object Two
               !(objectOneX + imageSize > objectTwo.getX()) &&  // Object One is going   RIGHT   on   LEFT     edge of Object Two
               objectOneY < objectTwo.getY() + imageSize &&  // Object One is going   UP      on   BOTTOM   edge of Object Two
               objectOneY + imageSize > objectTwo.getY();    // Object One is going   DOWN    on   TOP      edge of Object Two
    } else {
        */return objectOneX < objectTwo.getX() + imageSize &&  // Object One is going   LEFT    on   RIGHT    edge of Object Two
               objectOneX + imageSize > objectTwo.getX() &&  // Object One is going   RIGHT   on   LEFT     edge of Object Two
               objectOneY < objectTwo.getY() + imageSize &&  // Object One is going   UP      on   BOTTOM   edge of Object Two
               objectOneY + imageSize > objectTwo.getY();    // Object One is going   DOWN    on   TOP      edge of Object Two
    //}
};


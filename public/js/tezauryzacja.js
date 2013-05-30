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
    characterImageWidth = 29,
    characterImageHeight = 32,
    characterImageWidthCenter = Math.floor(characterImageWidth / 2),
    characterImageHeightCenter = Math.floor(characterImageHeight / 2),
    characterImageLength = 2; // 48;

var init = function() {
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	canvas.width = 500;
	canvas.height = 500;

	keys = new Keys();

    var startX = Math.round((Math.random() * (1586 - characterImageWidth)) - 543 + characterImageWidthCenter),
        startY = Math.round((Math.random() * (1586 - characterImageHeight)) - 543 + characterImageHeightCenter),
        startImage = Math.floor(Math.random() * characterImageLength + 1),
        startImageSrc = 'img/' + startImage + ';down-2.png';

	localPlayer = new Player(startX, startY, startImageSrc);

	socket = io.connect("http://localhost", {port: 4000, transports: ["websocket"]});

	remotePlayers = [];
    remoteItems = [];
    remoteNpcs = [];

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
};

var onKeyDown = function(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

var onKeyUp = function(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

var  onResize = function(e) {
	canvas.width = 500;
	canvas.height = 500;
};

var onSocketConnected = function() {
	console.log("Connected to socket server");

	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), image: localPlayer.getImageSrc()});
};

var onSocketDisconnect = function() {
	console.log("Disconnected from socket server");
};

var onNewPlayer = function(data) {
    var newPlayer = new Player(data.x, data.y, data.image);
    newPlayer.id = data.id;

	console.log("New player connected: " + data.id);

	remotePlayers.push(newPlayer);
};

var onNewItem = function(data) {
    var newItem = new Item(data.x, data.y, data.image);
    newItem.id = data.id;

    remoteItems.push(newItem);
};

var onNewNpc = function(data) {
    var newNpc = new Npc(data.x, data.y, data.image);
    newNpc.id = data.id;

    remoteNpcs.push(newNpc);
};

var onMovePlayer = function(data) {
	var movePlayer = playerById(data.id);

	if (!movePlayer) {
		console.log("Player not found: " + data.id);
		return;
	};

	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
    movePlayer.setImageSrc(data.image);
};

var onRemovePlayer = function(data) {
	var removePlayer = playerById(data.id);

	if (!removePlayer) {
		console.log("Player not found: " + data.id);
		return;
	};

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
	};
};

var drawWorld = function() {
    var i;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < remoteNpcs.length; i += 1) {
        remoteNpcs[i].draw(ctx, localPlayer.getX(), localPlayer.getY());
    }

    for (i = 0; i < remoteItems.length; i += 1) {
        remoteItems[i].draw(ctx, localPlayer.getX(), localPlayer.getY());
    }

    for (i = 0; i < remotePlayers.length; i += 1) {
        remotePlayers[i].draw(ctx, localPlayer.getX(), localPlayer.getY());
    };

	localPlayer.drawLocal(ctx);
};

var playerById = function(id) {
    for (var i = 0; i < remotePlayers.length; i += 1) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};

var collide = function(object1position, object1size, object2position, object2size) {
    var b1 = object1position - Math.floor(object1size / 2),
        e1 = object1position + Math.ceil(object1size / 2),
        b2 = object2position - Math.floor(object2size / 2),
        e2 = object2position + Math.ceil(object2size / 2);

    return (b1 <= e2 && b1 > b2) || (e1 >= b2 && e1 < e2);
}
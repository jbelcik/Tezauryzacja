var canvas,
	ctx,
	keys,
	localPlayer,
	remotePlayers,
	socket,
    worldWidth = 1600,
    worldHeight = 1600,
    imageWidth = 25,
    imageHeight = 32,
    imageWidthCenter = Math.floor(imageWidth / 2),
    imageHeightCenter = Math.floor(imageHeight / 2),
    imageLength = 12;

var init = function() {
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	canvas.width = 500;
	canvas.height = 500;

	keys = new Keys();

    var startX = Math.round((Math.random() * (1586 - imageWidth)) - 543 + imageWidthCenter),
        startY = Math.round((Math.random() * (1586 - imageHeight)) - 543 + imageHeightCenter),
        startImage = Math.floor(Math.random() * imageLength + 1);

	localPlayer = new Player(startX, startY);
    localPlayer.setImageSrc(startImage);

	socket = io.connect("http://localhost", {port: 4000, transports: ["websocket"]});

	remotePlayers = [];

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
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = data.id;

	console.log("New player connected: " + data.id);

	remotePlayers.push(newPlayer);
};

var onMovePlayer = function(data) {
	var movePlayer = playerById(data.id);

	if (!movePlayer) {
		console.log("Player not found: " + data.id);
		return;
	};

	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
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
	updateWorld();
	drawWorld();

	window.requestAnimFrame(animate);
};

var updateWorld = function() {
	if (localPlayer.update(keys)) {
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), image: localPlayer.getImageSrc()});
	};
};

var drawWorld = function() {
    var i;

	ctx.clearRect(0, 0, canvas.width, canvas.height);


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
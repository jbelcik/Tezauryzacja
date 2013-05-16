var Player = function(startX, startY, startImage) {
	var x = startX,
		y = startY,
        image = startImage,
		moveAmount = 2;

	var getX = function() {
		return x;
	};

    var setX = function(newX) {
        x = newX;
    };

	var getY = function() {
		return y;
	};

    var setY = function(newY) {
        y = newY;
    };

    var getImage = function() {
        return image;
    };

    var setImage = function(newImage) {
        image = newImage;
    };

	var update = function(keys) {
		var prevX = x,
			prevY = y;

		// UP KEY PRIORITY
		if (keys.up && y > -510) {
			y -= moveAmount;
		} else if (keys.down && y < 1010) {
			y += moveAmount;
		};

        // LEFT KEY PRIORITY
		if (keys.left && x > -510) {
			x -= moveAmount;
		} else if (keys.right && x < 1010) {
			x += moveAmount;
		};

        $('#coordsX').html('X :  ' + x);
        $('#coordsY').html('Y :  ' + y);

		return (prevX != x || prevY != y) ? true : false;
	};

    var drawLocal = function(ctx) {
        var player_image = new Image();
        player_image.src = 'img/' + image + '.png';


        if (!(x > -300)) {
        // LEFT
            if (!(y > -300)) {
            // TOP
                ctx.fillRect(0, 0, canvas.width, 1);
                ctx.fillRect(0, 0, 1, canvas.height);
                ctx.drawImage(player_image, x + 300 + canvas.width / 2 - 32, y + 300 + canvas.height / 2 - 32);
            } else if (y < 800 && y > -300) {
            // CENTER
                ctx.fillRect(0, 0, 1, canvas.height);
                ctx.drawImage(player_image, x + 300 + canvas.width / 2 - 32, canvas.height / 2 - 32);
            } else {
            // BOTTOM
                ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
                ctx.fillRect(0, 0, 1, canvas.height);
                ctx.drawImage(player_image, x + 300 + canvas.width / 2 - 32, y - 300 - canvas.height / 2 - 32);
            }
        } else if (x < 800 && x > -300) {
        // CENTER
            if (!(y > -300)) {
            // TOP
                ctx.fillRect(0, 0, canvas.width, 1);
                ctx.drawImage(player_image, canvas.width / 2 - 32, y + 300 + canvas.height / 2 - 32);
            } else if (y < 800 && y > -300) {
            // CENTER
                ctx.drawImage(player_image, canvas.width / 2 - 32, canvas.height / 2 - 32);
            } else {
            // BOTTOM
                ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
                ctx.drawImage(player_image, canvas.width / 2 - 32, y - 300 - canvas.height / 2 - 32);
            }
        } else {
        // RIGHT
            if (!(y > -300)) {
            // TOP
                ctx.fillRect(0, 0, canvas.width, 1);
                ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
                ctx.drawImage(player_image, x - 300 - canvas.width / 2 - 32, y + 300 + canvas.height / 2 - 32);
            } else if (y < 800 && y > -300) {
            // CENTER
                ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
                ctx.drawImage(player_image, x - 300 - canvas.width / 2 - 32, canvas.height / 2 - 32);
            } else {
            // BOTTOM
                ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
                ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
                ctx.drawImage(player_image, x - 300 - canvas.width / 2 - 32, y - 300 - canvas.height / 2 - 32);
            }
        }
    };

	var draw = function(ctx, xLocal, yLocal) {
        var player_image = new Image();
        player_image.src = 'img/' + image + '.png';

        if (!(xLocal > -300)) {
            // LEFT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(player_image, x + 300 + canvas.width / 2 - 32, y + 300 + canvas.height / 2 - 32);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(player_image, x + 300 + canvas.width / 2 - 32, y - yLocal + canvas.height / 2 - 32);
            } else {
                // BOTTOM
                ctx.drawImage(player_image, x + 300 + canvas.width / 2 - 32, y - 300 - canvas.height / 2 - 32);
            }
        } else if (xLocal < 800 && xLocal > -300) {
            // CENTER
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(player_image, x - xLocal + canvas.width / 2 - 32, y + 300 + canvas.height / 2 - 32);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(player_image, x - xLocal + canvas.width / 2 - 32, y - yLocal + canvas.height / 2 - 32);
            } else {
                // BOTTOM
                ctx.drawImage(player_image, x - xLocal + canvas.width / 2 - 32, y - 300 - canvas.height / 2 - 32);
            }
        } else {
            // RIGHT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(player_image, x - 300 - canvas.width / 2 - 32, y + 300 + canvas.height / 2 - 32);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(player_image, x - 300 - canvas.width / 2 - 32, y - yLocal + canvas.height / 2 - 32);
            } else {
                // BOTTOM
                ctx.drawImage(player_image, x - 300 - canvas.width / 2 - 32, y - 300 - canvas.height / 2 - 32);
            }
        }
	};

	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
        getImage: getImage,
        setImage: setImage,
		update: update,
        drawLocal: drawLocal,
		draw: draw
	}
};

exports.Player = Player
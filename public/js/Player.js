var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		moveAmount = 2,
        counterUp = 0,
        counterDown = 0,
        counterLeft = 0,
        counterRight = 0,
        imageSrc;

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

    var getImageSrc = function() {
        return imageSrc;
    };

    var setImageSrc = function(newImageSrc) {
        imageSrc = 'img/1.down1.png';
        //imageSrc = 'img/' + newImageSrc + '.down1.png';
    };

	var update = function(keys) {
		var prevX = x,
			prevY = y;

		// UP KEY PRIORITY
		if (keys.up && y > -510) {
			y -= moveAmount;
            counterUp += 1;

            switch (counterUp % 40) {
                case 30:
                    imageSrc = 'img/1.up1.png';
                    break;
                case 1:
                    imageSrc = 'img/1.up2.png';
                    break;
                case 10:
                    imageSrc = 'img/1.up3.png';
                    break;
                case 20:
                    imageSrc = 'img/1.up4.png';
                    break;
            }
		} else if (keys.down && y < 1010) {
			y += moveAmount;
            counterDown += 1;

            switch (counterDown % 40) {
                case 30:
                    imageSrc = 'img/1.down1.png';
                    break;
                case 1:
                    imageSrc = 'img/1.down2.png';
                    break;
                case 10:
                    imageSrc = 'img/1.down3.png';
                    break;
                case 20:
                    imageSrc = 'img/1.down4.png';
                    break;
            }
		};

        // LEFT KEY PRIORITY
		if (keys.left && x > -510) {
			x -= moveAmount;
            counterLeft += 1;

            if (!(keys.up && y > -510 || keys.down && y < 1010)) {
                switch (counterLeft % 40) {
                    case 1:
                        imageSrc = 'img/1.left1.png';
                        break;
                    case 10:
                        imageSrc = 'img/1.left2.png';
                        break;
                    case 20:
                        imageSrc = 'img/1.left3.png';
                        break;
                    case 30:
                        imageSrc = 'img/1.left4.png';
                        break;
                }
            }
		} else if (keys.right && x < 1010) {
			x += moveAmount;
            counterRight += 1;

            if (!(keys.up && y > -510 || keys.down && y < 1010)) {
                switch (counterRight % 40) {
                    case 1:
                        imageSrc = 'img/1.right1.png';
                        break;
                    case 10:
                        imageSrc = 'img/1.right2.png';
                        break;
                    case 20:
                        imageSrc = 'img/1.right3.png';
                        break;
                    case 30:
                        imageSrc = 'img/1.right4.png';
                        break;
                }
            }
		};

        $('#coordsX').html('X :  ' + x);
        $('#coordsY').html('Y :  ' + y);

        if (prevX != x || prevY != y) {
            return true
        } else {
            imageSrc = 'img/1.down1.png';
            counterUp = counterDown = counterLeft = counterRight = 0;
            return false;
        }
	};

    var drawLocal = function(ctx) {
        image = new Image();
        image.src = imageSrc;

        if (!(x > -300)) {
        // LEFT
            if (!(y > -300)) {
            // TOP
                ctx.fillRect(0, 0, canvas.width, 1);
                ctx.fillRect(0, 0, 1, canvas.height);
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageWidthCenter, y + 300 + canvas.height / 2 - imageHeightCenter);
            } else if (y < 800 && y > -300) {
            // CENTER
                ctx.fillRect(0, 0, 1, canvas.height);
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageWidthCenter, canvas.height / 2 - imageHeightCenter);
            } else {
            // BOTTOM
                ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
                ctx.fillRect(0, 0, 1, canvas.height);
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageWidthCenter, y - 300 - canvas.height / 2 - imageHeightCenter);
            }
        } else if (x < 800 && x > -300) {
        // CENTER
            if (!(y > -300)) {
            // TOP
                ctx.fillRect(0, 0, canvas.width, 1);
                ctx.drawImage(image, canvas.width / 2 - imageWidthCenter, y + 300 + canvas.height / 2 - imageHeightCenter);
            } else if (y < 800 && y > -300) {
            // CENTER
                ctx.drawImage(image, canvas.width / 2 - imageWidthCenter, canvas.height / 2 - imageHeightCenter);
            } else {
            // BOTTOM
                ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
                ctx.drawImage(image, canvas.width / 2 - imageWidthCenter, y - 300 - canvas.height / 2 - imageHeightCenter);
            }
        } else {
        // RIGHT
            if (!(y > -300)) {
            // TOP
                ctx.fillRect(0, 0, canvas.width, 1);
                ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageWidthCenter, y + 300 + canvas.height / 2 - imageHeightCenter);
            } else if (y < 800 && y > -300) {
            // CENTER
                ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageWidthCenter, canvas.height / 2 - imageHeightCenter);
            } else {
            // BOTTOM
                ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
                ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageWidthCenter, y - 300 - canvas.height / 2 - imageHeightCenter);
            }
        }
    };

	var draw = function(ctx, xLocal, yLocal) {
        image = new Image();
        image.src = imageSrc;

        if (!(xLocal > -300)) {
            // LEFT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageWidthCenter, y + 300 + canvas.height / 2 - imageHeightCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageWidthCenter, y - yLocal + canvas.height / 2 - imageHeightCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageWidthCenter, y - 300 - canvas.height / 2 - imageHeightCenter);
            }
        } else if (xLocal < 800 && xLocal > -300) {
            // CENTER
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - imageWidthCenter, y + 300 + canvas.height / 2 - imageHeightCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - imageWidthCenter, y - yLocal + canvas.height / 2 - imageHeightCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - imageWidthCenter, y - 300 - canvas.height / 2 - imageHeightCenter);
            }
        } else {
            // RIGHT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageWidthCenter, y + 300 + canvas.height / 2 - imageHeightCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageWidthCenter, y - yLocal + canvas.height / 2 - imageHeightCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageWidthCenter, y - 300 - canvas.height / 2 - imageHeightCenter);
            }
        }
	};

	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
        getImageSrc: getImageSrc,
        setImageSrc: setImageSrc,
		update: update,
        drawLocal: drawLocal,
		draw: draw
	}
};

exports.Player = Player;
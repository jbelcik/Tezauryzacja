var Player = function(startX, startY, startImageSrc) {
	var x = startX,
		y = startY,
        imageSrc = startImageSrc,
		moveAmount = 2,
        counterUp = 0,
        counterDown = 0,
        counterLeft = 0,
        counterRight = 0;

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
        imageSrc = newImageSrc;
    };

	var update = function(keys) {
		var prevX = x,
			prevY = y;

		// UP KEY PRIORITY
		if (keys.up && y > -510) {
			y -= moveAmount;
            counterUp += 1;

            switch (counterUp % 40) {
                case 1:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';up-1.png';
                    break;
                case 11:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';up-2.png';
                    break;
                case 21:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';up-3.png';
                    break;
                case 31:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';up-2.png';
                    break;
            }
		} else if (keys.down && y < 1010) {
			y += moveAmount;
            counterDown += 1;


            switch (counterDown % 40) {
                case 1:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';down-1.png';
                    break;
                case 11:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';down-2.png';
                    break;
                case 21:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';down-3.png';
                    break;
                case 31:
                    imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';down-2.png';
                    break;
            }
		};

        // LEFT KEY PRIORITY
		if (keys.left && x > -510) {
            if (keys.up && y || keys.down) {
                x -= moveAmount / 2;
            } else {
                x -= moveAmount;
                counterLeft += 1;

                switch (counterLeft % 40) {
                    case 1:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';left-1.png';
                        break;
                    case 11:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';left-2.png';
                        break;
                    case 21:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';left-3.png';
                        break;
                    case 31:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';left-2.png';
                        break;
                }
            }
        } else if (keys.right && x < 1010) {
            if (keys.up && y || keys.down) {
                x += moveAmount / 2;
            } else {
                x += moveAmount;
                counterRight += 1;

                switch (counterRight % 40) {
                    case 1:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';right-1.png';
                        break;
                    case 11:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';right-2.png';
                        break;
                    case 21:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';right-3.png';
                        break;
                    case 31:
                        imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf(';')) + ';right-2.png';
                        break;
                }
            }
		};

        $('#coordsX').html('X :  ' + x);
        $('#coordsY').html('Y :  ' + y);

        if (prevX != x || prevY != y) {
            return true
        } else {
            imageSrc = 'img' + imageSrc.slice(imageSrc.indexOf('/'), imageSrc.indexOf('-')) + '-2.png';
            counterUp = counterDown = counterLeft = counterRight = 0;
            return false;
        }
	};

    var drawLocal = function(ctx) {
        var image = new Image();
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
        var image = new Image();
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
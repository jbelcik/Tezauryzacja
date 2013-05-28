var Npc = function(startX, startY, startImageSrc) {
    var x = startX,
        y = startY,
        imageSrc = startImageSrc,
        id;

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

    var draw = function(ctx, xLocal, yLocal) {
        var image = new Image();
        image.src = imageSrc;

        if (!(xLocal > -300)) {
            // LEFT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x + 300 + canvas.width / 2 - characterImageWidthCenter, y + 300 + canvas.height / 2 - characterImageHeightCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x + 300 + canvas.width / 2 - characterImageWidthCenter, y - yLocal + canvas.height / 2 - characterImageHeightCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x + 300 + canvas.width / 2 - characterImageWidthCenter, y - 300 - canvas.height / 2 - characterImageHeightCenter);
            }
        } else if (xLocal < 800 && xLocal > -300) {
            // CENTER
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - characterImageWidthCenter, y + 300 + canvas.height / 2 - characterImageHeightCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - characterImageWidthCenter, y - yLocal + canvas.height / 2 - characterImageHeightCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - characterImageWidthCenter, y - 300 - canvas.height / 2 - characterImageHeightCenter);
            }
        } else {
            // RIGHT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x - 300 - canvas.width / 2 - characterImageWidthCenter, y + 300 + canvas.height / 2 - characterImageHeightCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x - 300 - canvas.width / 2 - characterImageWidthCenter, y - yLocal + canvas.height / 2 - characterImageHeightCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x - 300 - canvas.width / 2 - characterImageWidthCenter, y - 300 - canvas.height / 2 - characterImageHeightCenter);
            }
        }
    }

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        getImageSrc: getImageSrc,
        setImageSrc: setImageSrc,
        draw: draw,
        id: id
    }
};

exports.Npc = Npc;
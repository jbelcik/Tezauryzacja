var Npc = function(startX, startY, startImageSrc) {
    var x = startX,
        y = startY,
        imageSrc = startImageSrc;

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

    var getQuest = function() {
        //return quest;
        return 'Bring me this item and I\'ll gave you 10 points';
    };

    var setQuest = function(newQuest) {
        //quest = newQuest;
    };

    var getLookUpItem = function() {
        //return lookUpItem;
        return 'img/NPCtesticon.png';
    };

    var setLookUpItem = function(newLookUpItem) {
        //lookUpItem = newLookUpItem;
    };

    var drawNpc = function(ctx, xLocal, yLocal) {
        var image = new Image();
        image.src = imageSrc;

        if (!(xLocal > -300)) {
            // LEFT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageCenter, y + 300 + canvas.height / 2 - imageCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageCenter, y - yLocal + canvas.height / 2 - imageCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x + 300 + canvas.width / 2 - imageCenter, y - 300 - canvas.height / 2 - imageCenter);
            }
        } else if (xLocal < 800 && xLocal > -300) {
            // CENTER
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - imageCenter, y + 300 + canvas.height / 2 - imageCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - imageCenter, y - yLocal + canvas.height / 2 - imageCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x - xLocal + canvas.width / 2 - imageCenter, y - 300 - canvas.height / 2 - imageCenter);
            }
        } else {
            // RIGHT
            if (!(yLocal > -300)) {
                // TOP
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageCenter, y + 300 + canvas.height / 2 - imageCenter);
            } else if (yLocal < 800 && yLocal > -300) {
                // CENTER
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageCenter, y - yLocal + canvas.height / 2 - imageCenter);
            } else {
                // BOTTOM
                ctx.drawImage(image, x - 300 - canvas.width / 2 - imageCenter, y - 300 - canvas.height / 2 - imageCenter);
            }
        }
    }

    return {
        getX: getX,
        setX: setX,
        getY: getY,
        setY: setY,
        getImageSrc: getImageSrc,
        setImageSrc: setImageSrc,
        getQuest: getQuest,
        setQuest: setQuest,
        getLookUpItem: getLookUpItem,
        setLookUpItem: setLookUpItem,
        drawNpc: drawNpc
    }
};

exports.Npc = Npc;
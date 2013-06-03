var Keys = function(up, left, right, down, one, two, three, four, five, six, q, w, e) {
	var up = up || false,
		left = left || false,
		right = right || false,
		down = down || false,
        one = one || false,
        two = two || false,
        three = three || false,
        four = four || false,
        five = five || false,
        six = six || false,
        q = q || false,
        qGuard = false,
        w = w || false,
        e = e || false;
		
	var onKeyDown = function(parameter) {
		var that = this,
			key = parameter.keyCode;

		switch (key) {
			case 37:
			// LEFT
				that.left = true;
				break;
			case 38:
			// UP
				that.up = true;
				break;
			case 39:
			// RIGHT
				that.right = true;
				break;
			case 40:
			// DOWN
				that.down = true;
				break;
            case 49:
            // 1
                that.one = true;
                break;
            case 50:
            // 2
                that.two = true;
                break;
            case 51:
            // 3
                that.three = true;
                break;
            case 52:
            // 4
                that.four = true;
                break;
            case 53:
            // 5
                that.five = true;
                break;
            case 54:
            // 6
                that.six = true;
                break;
            case 87:
            // W
                that.w = true;
                break;
            case 69:
            // E
                that.e = true;
                break;
		};
	};
	
	var onKeyUp = function(parameter) {
		var that = this,
			key = parameter.keyCode;

		switch (key) {
			case 37:
            // LEFT
				that.left = false;
				break;
			case 38:
			// UP
				that.up = false;
				break;
			case 39:
			// RIGHT
				that.right = false;
				break;
			case 40:
			// DOWN
				that.down = false;
				break;
            case 49:
                // 1
                that.one = false;
                break;
            case 50:
                // 2
                that.two = false;
                break;
            case 51:
                // 3
                that.three = false;
                break;
            case 52:
                // 4
                that.four = false;
                break;
            case 53:
                // 5
                that.five = false;
                break;
            case 54:
                // 6
                that.six = false;
                break;
            case 81:
                // Q
                that.q = true;
                break;
            case 87:
                // W
                that.w = false;
                break;
            case 69:
                // E
                that.e = false;
                break;
		};
	};

	return {
		up: up,
		left: left,
		right: right,
		down: down,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp,
        one: one,
        two: two,
        three: three,
        four: four,
        five: five,
        six: six,
        q: q,
        qGuard: qGuard,
        w: w,
        e: e
	};
};
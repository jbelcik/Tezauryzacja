var Keys = function(up, left, right, down) {
	var up = up || false,
		left = left || false,
		right = right || false,
		down = down || false;
		
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
		};
	};

	return {
		up: up,
		left: left,
		right: right,
		down: down,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp
	};
};
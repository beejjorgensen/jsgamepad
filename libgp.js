/**
 * Helper library for gamepads
 */
gpLib = (function () {

	/**
	 * Test gamepad support
	 */
	function supportsGamepads() {
		return !!(navigator.getGamepads);
	}

	/**
	 * Test for new or removed connections
	 */
	let testForConnections = (function() {

		// Keep track of the connection count
		let connectionCount = 0;

		// Return a function that does the actual tracking
		//
		// The function returns a positive number of connections,
		// a negative number of disconnections, or zero for no
		// change.
		return function () {
			let gamepads = navigator.getGamepads();
			let count = 0;
			let rv;

			for (let i = gamepads.length - 1; i >= 0; i--) {
				let g = gamepads[i];

				// Make sure they're not null and connected
				if (g && g.connected) {
					count++;
				}
			}

			// Return any changes
			rv = count - connectionCount;

			connectionCount = count;

			return rv;
		}
	}());

	/**
	 * Clamp X and Y gamepad coordinates to length 1.0
	 * 
	 * @param {Number} x 
	 * @param {Number} y 
	 * 
	 * @return {Array} The clamped X and Y values
	 */
	function clamp(x, y) {
		let m = Math.sqrt(x*x + y*y); // Magnitude (length) of vector

		// If the length greater than 1, normalize it (set it to 1)
		if (m > 1) {
			x /= m;
			y /= m;
		}

		return [x, y];
	}

	/**
	 * Given a gamepad axis value, normalize it so there's a deadzone 
	 * 
	 * Run independently on X and Y axes.
	 * 
	 * @param {Number} v 
	 * 
	 * @return {Number} The deadzone value of the axis
	 */
	function deadzone(v) {
		const DEADZONE = 0.2;

		if (Math.abs(v) < DEADZONE) {
			v = 0;
		} else {
			// Smooth
			v = v - Math.sign(v) * DEADZONE;
			v /= (1.0 - DEADZONE);
		}

		return v;
	}

	// Exports
	return {
		clamp: clamp,
		deadzone: deadzone,
		supportsGamepads: supportsGamepads,
		testForConnections: testForConnections
	};

}());

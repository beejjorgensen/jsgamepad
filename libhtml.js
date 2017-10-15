/**
 * Some HTML helper functions
 */
htmlLib = (function () {
	/**
	 * Wrapper around querySelector
	 */
	function qs(s, p) {
		if (p) {
			return p.querySelector(s);
		}
		return document.querySelector(s);
	}

	/**
	 * Clone an HTML template
	 */
	function template(id, attribs, subs) {
		let t = qs(id);
		let html = t.outerHTML;
		let key;

		// Do the substitutions in the HTML
		if (subs) for (key in subs) {
			let val = subs[key];
			html = html.replace(new RegExp(key, 'g'), val);
		}

		// Make a dummy element to hold the cloned HTML
		let wrapper = document.createElement('div');
		wrapper.innerHTML = html;
		let clone = wrapper.querySelector(id);

		// Set the new attributes
		if (attribs) for (key in attribs) {
			let val = attribs[key];
			clone.setAttribute(key, val);
		}

		return clone;
	}

	// Exports
	return {
		qs: qs,
		template: template
	};

}());


console.json = function(json) {
	var background = '; background: #333; padding: 2px 0;';
	var paddingRight = 'padding-right: 10px;';
	var defaultColor = '#777';
	///
	var printBracket = function(indent, value, suffix) {
		console.log(
			'%c ' + indent + value + (suffix || ''), 
			'color: ' + defaultColor + background + paddingRight
		);
	};
	
    var printVariable = function(indent, key, value, suffix) {
		var color = defaultColor;
		switch(typeof value) {
			case 'string':
				color = '#B0DC19'; // string
				value = '"' + value + '"';
				break;
			case 'boolean':
				color = '#80DEF9'; // boolean
				break;
			case 'number':
				color = '#FA9D11'; // number
				break;
			case 'object': // null
			case 'undefined':
				color = '#D93B6C';
				break;
		}
		console.log(
			'%c' + indent + key + '%c ' + value + '%c' + (suffix || ''), 
			'color: ' + defaultColor + background, 
			'color: ' + color + background, 
			'color: ' + defaultColor + background + paddingRight
		);
	};
	///
    var recurse = function(data, indent) {
		var prev;
		var vindent = indent + '\t';
		///
		if (Array.isArray(data)) {
			for (var n = 0, len = data.length; n < len; n ++) {
				var key = n + ':';
				var value = data[n];
				var suffix = n === len - 1 ? '' : ',';
				printVariable(vindent, key, value, suffix);
			}
			printBracket(indent, ']');
		} else {
			for (var key in data) {
				if (prev) {
					prev.push(',');
					printVariable.apply(null, prev);
				}
				var value = data[key];
				if (value && typeof value === 'object') {
					if (Array.isArray(value)) {
						printBracket(vindent, '"' + key + '"', ': [');
						recurse(value, vindent);
					} else {
						printBracket(vindent, '"' + key + '"', ': {');
						recurse(value, vindent);
					}
					prev = undefined;
				} else { 
					prev = [vindent, '"' + key + '":', value];
				}
			}
			if (prev) {
				printVariable.apply(null, prev);
			}
			printBracket(indent, '}');
		}
	};
	///
    printBracket('', '{');
    recurse(json, '');
};

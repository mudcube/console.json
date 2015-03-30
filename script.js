console.json = function(json) {

	var template = {
		'background': 'background: #333;',
		'default': 'color: #777;',
		'string': 'color: #B0DC19;',
		'boolean': 'color: #80DEF9;',
		'number': 'color: #FA9D11;',
		'null': 'color: #D93B6C;',
		'undefined': 'color: #D93B6C;'
	};
	///
	var background = template.background + '; padding: 2px 0;';
	var paddingRight = 'padding-right: 10px;';
	///
	var log = function(indent, type, arg1, arg2, arg3) {
		var stylePrefix = template.default + background;
		var styleSuffix = template.default + background + paddingRight;
		///
		switch(type) {
			case 'default':
				console.log('%c' + indent + arg1, styleSuffix);
				return;
			case 'string':
				color = template.string;
				arg2 = '"' + arg2 + '"';
				break;
			case 'object':
				color = template.null;
				break;
			default:
				color = template[type];
				break;
		}
		console.log(
			'%c' + indent + arg1 + '%c' + arg2 + '%c' + (arg3 || ''), 
			stylePrefix, color + background, styleSuffix
		);
	};
	///
	var processObject = function(data, vindent) {
		var printBuffer = function(addComma) {
			if (buffer) {
				if (addComma) {
					if (buffer[1] === 'default') {
						buffer[2] += ',';
					} else {
						buffer.push(',');
					}
				}
				log.apply(null, buffer);
			}
		};
		
		var processArg = function(key, value) {
			printBuffer(true);
			if (value && typeof value === 'object') {
				var suffix = Array.isArray(value) ? '[' : '{';
				log(indent, 'default', key + suffix);
				buffer = processObject(value, indent);
			} else {
				buffer = [indent, typeof value, key, value];
			}
		};
		///
		var buffer;
		var indent = vindent + '\t';
		///
		if (Array.isArray(data)) {
			var suffix = ']';
			for (var idx = 0, length = data.length; idx < length; idx++) {
				processArg(idx + ':', data[idx]);
			}
		} else {
			var suffix = '}';
			for (var idx in data) {
				processArg('"' + idx + '": ', data[idx]);
			}
		}
		///
		printBuffer(false);
		return [vindent, 'default', suffix];
	};
	///
	log('', 'default', '{');
	log.apply(null, processObject(json, ''));

};

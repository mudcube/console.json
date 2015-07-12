/*
	console.json({
	    'string': 'testing',
	    'boolean': true,
	    'function': function() {},
	    'number': 3123,
	    'null': null,
	    'undefined': undefined
	});
*/

console.json = function(object, depth, delimiter) {
	depth = depth || 7;
	delimiter = delimiter || '\t';

	var template = {
		'background': 'background: #1B2B34;', // dark-blue
		'default': 'color: #CDD3DE;', // gray
		'string': 'color: #99C794;', // green
		'boolean': 'color: #6699CC;', // blue
		'function': 'color: #EC5f67;', // red
		'number': 'color: #FAC863;', // yellow
		'null': 'color: #F99157;', // orange
		'undefined': 'color: #C594C5;', // purple
		'overflow': 'color: #EC5f67;' // red
	};

	function log(indent, type, arg1, arg2, arg3) {
		var background = template.background + '; padding: 3px 0;';
		var paddingRight = 'padding-right: 10px;';
		var stylePrefix = template['default'] + background;
		var styleSuffix = template['default'] + background + paddingRight;
		///
		switch(type) {
			case 'default':
			case 'overflow':
				color = template[type];
				console.log('%c' + indent + arg1 + '%c', color + background, styleSuffix);
				return;
			case 'string':
				color = template[type];
				arg2 = '"' + arg2 + '"';
				break;
			case 'object':
				color = template['null'];
				break;
			case 'function':
				color = template[type];
				arg2 = 'function(){},';
				break;
			default:
				color = template[type];
				break;
		}
		///
		if (typeof arg2 === 'undefined') arg2 = 'undefined';
		if (typeof arg3 === 'undefined') arg3 = '';
		///
		console.log(
			'%c' + indent + arg1 + '%c' + arg2 + '%c' + arg3,
			stylePrefix, color + background, styleSuffix
		);
	};

	function processObject(data, _indent) {
		var indent = _indent + delimiter;
		var isarray = Array.isArray(data);
		var suffix = isarray ? ']' : '}';
		///
		if (_indent.length / delimiter.length === depth) { // max depth
			log(indent, 'overflow', '...');
			return [_indent, 'default', suffix];
		} else {
			var buffer;
			if (isarray) {
				for (var idx = 0, length = data.length; idx < length; idx++) {
					processArg(idx + ': ', data[idx]);
				}
			} else {
				for (var idx in data) {
					if (data.hasOwnProperty(idx)) {
						processArg('"' + idx + '": ', data[idx]);
					}
				}
			}
			///
			printBuffer(false);
			///
			return [_indent, 'default', suffix];
		}

		function processArg(key, value) {
			printBuffer(true);
			///
			if (value && typeof value === 'object') {
				var suffix = Array.isArray(value) ? '[' : '{';
				log(indent, 'default', key + suffix);
				buffer = processObject(value, indent);
			} else {
				buffer = [indent, typeof value, key, value];
			}
		};

		function printBuffer(addComma) {
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
	};
	///
	log('', 'default', '{');
	log.apply(null, processObject(object, ''));

};

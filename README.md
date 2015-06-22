**console.json()**

*JSON syntax highlighting in the browser console :)*

*Useful for quick debugging!*

**Usage**

```js
console.json(value, depth, delimiter);
```

* **value**

	The value to convert to a JSON string

* **depth**

	The maximum depth to recurse through. Defaults to 7.
  
* **delimiter**

	A String that’s used to insert white space into the output JSON string for readability purposes.

**Example**

```js
console.json({
	'string': 'Hello World!',
	'boolean': true,
	'function': function() {},
	'number': 42,
	'null': null,
	'undefined': undefined,
	'array': ['a', 'b', 'c'],
	'object': {
		'caterpillar': 'butterfly'
	}
});
```

**Result**

<img src="https://raw.githubusercontent.com/mudcube/console.json/master/screenshot.png" />

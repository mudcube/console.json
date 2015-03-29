**console.json()**

*Proof of concept for JSON syntax highlighting in the browser console. Great for debugging :)*

This is not entirely perfect, but gets the job done!

To use simply include in your project and type into the console:

<pre>
console.json({
    a: 'hello world',
    b: {
        key: 'value'
    },
    c: [3, 2, 1],
    d: 1,
    e: true,
    f: undefined,
    g: null
})
</pre>

<img src="https://raw.githubusercontent.com/mudcube/console.json/master/example.png" width="192" />

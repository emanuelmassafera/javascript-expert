'use strict';

const { watch, promises: { readFile } } = require('node:fs')

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()

// this way, it ignores 'this' from the File class and inherits this from watch!
watch(__filename, file.watch)

// we can make explicit what is the context that the function must follow
// 'bind' returns a function with 'this' that keeps from file, ignoring watch
watch(__filename, file.watch.bind(file))

// the difference between one and the other is that one you pass the arguments as an array and the other a list of arguments
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename])

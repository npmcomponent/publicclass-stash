# stash

  [![Build Status](https://travis-ci.org/publicclass/stash.png)](https://travis-ci.org/publicclass/stash)

  A hash-like data structure that keeps the values in a dense unordered array.

  The main reason to use this is because `Object` is too weird to loop through and `Array#splice()` restructures the array which makes the indexes wrong. So when anything is deleted it's a hassle. This module takes care of that hassle.


## Installation

    $ component install publicclass/stash

  or

    $ npm install https://github.com/publicclass/stash

## API

    var stash = require('stash');

    var bucket = stash();
    bucket.set('a',123)
    bucket.set('b',{})
    bucket.set(2,[])

    // access by key
    bucket.get('a') //= 123
    bucket.get('b') //= {}
    bucket.get(2) //= []

    // loop through the values
    for(var i=0; i < bucket.values.length; i++)
      bucket.values[i] //= 123, {}, []

    // hassle free delete
    bucket.del('a')

    // loop through the values again
    for(var i=0; i < bucket.values.length; i++)
      bucket.values[i] //= [], {}

    // hassle free delete again
    bucket.del('b')

    // loop through the values again
    for(var i=0; i < bucket.values.length; i++)
      bucket.values[i] //= []

## Test

    $ npm test

## License

  MIT

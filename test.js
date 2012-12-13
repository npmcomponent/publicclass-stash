// test.js
var assert = require('assert')

var b = {}
  , d = /ex/

var stash = require('./')()
stash.set('a',123)  // lookups[a] = 0, reverse[0] = a
stash.set('b',b)    // lookups[b] = 1, reverse[1] = b
stash.set(2,[])     // lookups[2] = 2, reverse[2] = 2

assert.strictEqual(stash.lookup['a'],0)
assert.strictEqual(stash.lookup['b'],1)
assert.strictEqual(stash.lookup[2],2)
assert.strictEqual(stash.reverse[0],'a')
assert.strictEqual(stash.reverse[1],'b')
assert.strictEqual(stash.reverse[2],'2')

assert.strictEqual(stash.values.length,3)
assert.strictEqual(stash.get('b'),b)
assert.strictEqual(stash.get('a'),123)
assert.strictEqual(stash.get('x'),undefined)
assert(Array.isArray(stash.get(2)))

stash.del(2)

assert.strictEqual(stash.values.length,2)
assert.strictEqual(stash.lookup['a'],0)
assert.strictEqual(stash.lookup['b'],1)
assert.strictEqual(stash.reverse[0],'a')
assert.strictEqual(stash.reverse[1],'b')

stash.del('a')

assert.strictEqual(stash.values.length,1)
assert.strictEqual(stash.lookup['b'],0)
assert.strictEqual(stash.reverse[0],'b')

stash.set('d',d)

assert.strictEqual(stash.values.length,2)
assert.strictEqual(stash.values[0],b) // should have replaced 'a'
assert.strictEqual(stash.values[1],d)
assert.strictEqual(stash.values[2],undefined)
assert.strictEqual(Object.keys(stash.lookup).length, 2)
assert.strictEqual(Object.keys(stash.reverse).length, 2)

stash.set('e',456)
stash.del('b')

assert.strictEqual(stash.values.length,2)
assert.strictEqual(stash.values[0],456) // replaced 'b'
assert.strictEqual(stash.values[1],d)
assert.strictEqual(stash.values[2],undefined)
assert.strictEqual(Object.keys(stash.lookup).length,2)
assert.strictEqual(Object.keys(stash.reverse).length,2)

for(var i=0; i < stash.values.length; i++)
  assert(stash.values[i])

assert.deepEqual(stash.values,[456,d])

var vals = stash.values
  , look = stash.lookup
  , rev = stash.reverse;
stash.empty()
assert.strictEqual(stash.values,vals) // make sure the values wasn't recreated
assert.strictEqual(stash.lookup,look) // make sure the lookup wasn't recreated
assert.strictEqual(stash.reverse,rev) // make sure the reverse wasn't recreated
assert.strictEqual(stash.values.length,0) // and it's empty
assert.strictEqual(Object.keys(stash.lookup).length,0)
assert.strictEqual(Object.keys(stash.reverse).length,0)


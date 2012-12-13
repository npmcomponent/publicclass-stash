
module.exports = function createStash(){
  return new Stash();
}

module.exports.Stash = Stash;

function Stash(){
  this.values = [];
  this.lookup = {};   // [key] = index
  this.reverse = {};  // [index] = key
}

Stash.prototype = {

  set: function(key,val){
    key = ''+key
    if( key in this.lookup ){
      console.warn('key "%s" already exists in stash. deleting it first.',key)
      this.del(key);
    }
    var index = this.values.length;
    this.lookup[key] = index;
    this.reverse[index] = key;
    this.values.push(val)
    return this
  },

  get: function(key){
    key = ''+key
    if( key in this.lookup ){
      var index = this.lookup[key];
      return this.values[index];
    } else console.warn('tried to get "%s" that didn\'t exist',key)
    return undefined;
  },

  del: function(key){
    key = ''+key
    if( key in this.lookup ){
      // move the last values into the
      // position of the deleted value
      // to keep the array dense (and
      // avoid unnecessary allocation)
      var index = this.lookup[key];

      // special case if the deleted key is last value (no need to reorder stuff)
      if( index == this.values.length-1 ){
        this.values.pop();
        delete this.reverse[index];
        delete this.lookup[key];

      } else {
        this.values[index] = this.values.pop();

        // update the lookups
        var rindex = this.values.length;
        var rkey = this.reverse[rindex];
        this.lookup[rkey] = index;
        this.reverse[index] = rkey;
        delete this.reverse[rindex];
        delete this.lookup[key];
      }
    } else console.warn('tried to delete "%s" that didn\'t exist',key)
    return this;
  },

  empty: function(){
    this.values.length = 0
    for(var i in this.reverse){
      var k = this.reverse[i]
      delete this.lookup[k]
      delete this.reverse[i]
    }
    return this;
  }

}
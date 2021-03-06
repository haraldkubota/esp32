function circularBuffer(size) {
  let _data = new Array(size);
  let _used = 0;
  let _head = 0;
  let _tail = 0;

  function moveToNext(n) {
    return (n >= _data.length-1) ? 0 : n+1;
  }

  return {
    length: function() { return _data.length },
    used: function() { return _used },
//    get head() { return _head },
//    get tail() { return _tail },
    push: function(n) {
      if (_used === 0 ) {
        _head = 0;
        _tail = 0;
        _data[_head] = n;
        _used = 1;
      } else if (_used < _data.length) {
        _head = moveToNext(_head);
        _data[_head] = n;
        ++_used;
      } else { // array is full
        _head = moveToNext(_head);
        _data[_head] = n;
        _tail = moveToNext(_tail);
      }
    },
    pop: function() {
      if (_used === 0) {
        return undefined;
      } else {
        let n = _data[_tail];
        _tail = moveToNext(_tail);
        --_used;
        return n;
      }
    },
    readAll: function() {
      let allData, i, ptr;
      allData = [];
      for (i=0, ptr = _tail; i < _used; ++i) {
        allData.push(_data[ptr]);
        ptr=moveToNext(ptr);
      }
      return allData;
    }
  }
}

// nodejs
module.exports = circularBuffer
//espruino-cli
//exports.circularBuffer = circularBuffer

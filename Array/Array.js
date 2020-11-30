const myArray = {
  chunk(array, size = 1) {
    const _size = ~~size
    if (_size <= 0) throw new Error('Size must large or equal to zero.');
    const len = array.length
    if (len <= 1) return array
    const result = []
    for (let i = 0; i < len; i += _size) {
      if (len < _size + i) result.push(array.slice(i, len));
      else result.push(array.slice(i, i + _size))
    }
    return result
  }
}

console.log(myArray.chunk([1, 2, 3, 4], 1.4));
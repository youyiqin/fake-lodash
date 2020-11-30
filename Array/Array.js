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
  },
  compact(array) {
    // falsy值包括数字0, BigInt 0n, 关键字null和undefined,false,空字符串,以及NaN
    // 如果值是NaN,那么这个值不等于本身
    // 可以直接使用 !! 判断假值,这里不用是要提醒我有哪些假值
    // 0n是新增的
    return array
      .filter(i => ![0, 0n, null, undefined, '', false]
        .some(item => i === item) && i === i)
  },
  concat(array, ...values) {
    const _array = [...array];
    [...values].forEach(i => {
      if (Array.isArray(i)) {
        i.forEach(item => _array.push(item));
      } else {
        _array.push(i)
      }
    })
    return _array
  }
}
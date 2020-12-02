import assert from 'assert';
type _Arr = (string | number | (string | number)[])[]

const arrEqual = (arr1: _Arr, arr2: _Arr): boolean => {
  // 用默认排序算法排序,如果数组内容一致,则下标对应的内容可以进行相等性比较
  const _arr1 = arr1.sort()
  const _arr2 = arr2.sort()
  return _arr1.every((item, index) => {
    if (Array.isArray(item)) {
      return arrEqual(item as _Arr, _arr2[index] as _Arr)
    } else {
      return item === _arr2[index]
    }
  })
}

const _ = {
  chunk(array: Array<any>, size = 1) {
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
  compact(array: any[]): any[] {
    // falsy值包括数字0, BigInt 0n, 关键字null和undefined,false,空字符串,以及NaN
    // 如果值是NaN,那么这个值不等于本身,
    // 可以直接使用 !! 判断假值,这里不用是要提醒我有哪些假值
    // 0n是新增的
    // 判断变量相等的算法中, Object.is() 使用 SameValue(x, y),NaN等于NaN,但是0不等于-0
    // object.includes和has则使用SameValueZero算法,0也等于-0
    return array
      .filter(i => ![0, 0n, null, undefined, '', false, NaN]
        .includes(i))
  },
  concat(array: any[], ...values: any[]): any[] {
    const _array = [...array];
    [...values].forEach(i => {
      if (Array.isArray(i)) {
        i.forEach(item => _array.push(item));
      } else {
        _array.push(i)
      }
    })
    return _array
  },
  difference(arr1: any[], ...values: any[]): any[] {
    const len = arr1.length
    if (len === 0) return []
    return [...arr1].filter(i => {
      return ![...values]
        .filter(v => Array.isArray(v))
        .reduce((prev, curr) => prev.concat(curr), [])
        .includes(i)
    })
  },
  differenceBy(arr1: any[], arr2: any[], iteratee: Function): any[] {
    const _arr1 = arr1.map(i => iteratee(i))
    const _arr2 = arr2.map(i => iteratee(i))
    return _arr1.map((e, index) => {
      if (!_arr2.includes(e)) {
        return arr1[index]
      } else {
        return undefined
      }
    }).filter(i => !!i)
  },
  drop(arr: any[], n = 1) {
    return arr.slice(n <= 0 ? 0 : ~~n)
  }
}

assert.ok(arrEqual([1, 2], [2, 1]))
assert.ok(arrEqual(_.compact([1, 2, 3, NaN, false, null, undefined, 0, 0n, '']), [1, 2, 3]))
assert.ok(arrEqual(_.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]))
assert(arrEqual(_.difference([1, 3, 9], [2, 4, 6, 1], [3]), [9]))
assert(arrEqual(_.differenceBy([1.3, 2.2], [3.1, 2.4], (i: number) => ~i), [1.3]))
assert(arrEqual(_.drop([1, 2]), [2]))


export default _;

import assert from 'assert';
type _Arr = (string | number | any[])[]

const arrEqual = (arr1: _Arr, arr2: _Arr): boolean => {
  // 用默认排序算法排序,如果数组内容一致,则下标对应的内容可以进行相等性比较
  const _arr1 = arr1.sort()
  const _arr2 = arr2.sort()
  console.log('Compared:', _arr1, _arr2);

  return _arr1.every((item, index) => {
    if (Array.isArray(item)) {
      return arrEqual(item as _Arr, _arr2[index] as _Arr)
    } else {
      return item === _arr2[index]
    }
  })
}

const objEqual = (obj1: any, obj2: any): boolean => {
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) return false
  }
  for (const key in obj2) {
    if (obj1[key] !== obj2[key]) return false
  }
  return true;
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
  },
  dropRight(arr: any[], n = 1) {
    const _n = n <= 0 ? 0 : arr.length - n;
    if (n >= arr.length) return []
    return arr.slice(0, _n)
  },
  fill(arr: any[], value: any, start = 0, end = arr.length) {
    if (start < 0) start = 0;
    if (end > arr.length) end = arr.length
    return arr.map((e: any, i: number) => {
      if (i >= start && i < end) return value;
      return e;
    })
  },
  findIndex(arr: any[], filter: Function, fromIndex = 0) {
    if (fromIndex >= arr.length) return -1
    if (fromIndex <= 0) fromIndex = 0;
    const _arr = arr.slice(fromIndex)
    for (const item of _arr) {
      if (filter(item)) return _arr.indexOf(item)
    }
    return -1
  },
  findLastIndex(arr: Array<any>, filter: Function, fromIndex = arr.length - 1) {
    let _fromIndex = fromIndex >= arr.length ? arr.length - 1 : fromIndex
    if (fromIndex < 0) return -1
    do {
      if (filter(arr[_fromIndex])) return _fromIndex
      _fromIndex -= 1
    } while (_fromIndex >= 0);
    return -1
  },
  head(arr: any[]) {
    return arr.length === 0 ? undefined : arr[0];
  },
  flatten(arr: any[]) {
    if (arr.length <= 1) return [...arr]
    return arr.reduce((prev, curr) => prev.concat(curr), [])
  },
  flattenDeep(arr: any[]) {
    if (arr.length === 0) return []
    let _arr = [...arr]
    if (_arr.every(i => !Array.isArray(i))) return _arr
    do {
      _arr = this.flatten(_arr)
    } while (_arr.some(i => Array.isArray(i)));
    return _arr
  },
  flattenDepth(arr: any[], depth = 1) {
    if (depth <= 0 || depth !== ~~depth) {
      console.log('error: depth value');
      throw new Error("Invalid depth value.")
    }
    let _arr = [...arr];
    let count = 1
    if (_arr.length === 0 || _arr.every(i => !Array.isArray(i))) return _arr;
    do {
      _arr = this.flatten(_arr)
      count += 1;
    } while (count <= depth && _arr.some(i => Array.isArray(i))); // 关键条件
    return _arr;
  },
  fromPairs(arr: any[][]): object {
    let index = -1;
    let length = arr.length;
    let result: any = {};
    while (++index < length) {
      let pair = arr[index];
      result[pair[0]] = pair[1];
    }
    return result;
  }
}

assert.ok(arrEqual([1, 2], [2, 1]))
assert.ok(arrEqual(_.compact([1, 2, 3, NaN, false, null, undefined, 0, 0n, '']), [1, 2, 3]))
assert.ok(arrEqual(_.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]))
assert(arrEqual(_.difference([1, 3, 9], [2, 4, 6, 1], [3]), [9]))
assert(arrEqual(_.differenceBy([1.3, 2.2], [3.1, 2.4], (i: number) => ~i), [1.3]))
assert(arrEqual(_.drop([1, 2]), [2]))
assert(arrEqual(_.dropRight([1, 2]), [1]))
assert(arrEqual(_.dropRight([1, 2, 3, 4, 5, 6, 7, 8, 9], 6), [1, 2, 3]))
assert(arrEqual(_.fill([1, 2, 3, 4, 5], '*', 0, 2), ['*', '*', 3, 4, 5]))
assert(arrEqual(_.fill([1, 2, 3], '*'), ['*', '*', '*']))
assert(_.findIndex([1, 2, 3, 4], (i: any) => i % 3 === 0) === 2)
assert(_.findIndex([1, 2, 3, 4], (i: any) => i % 5 === 0) === -1)
assert(_.findLastIndex([1, 2, 3, 4, 5], (i: any) => i % 5 === 0 ? true : false) === 4)
assert(_.findLastIndex([1, 2, 3, 4, 5], (i: any) => i % 6 === 0 ? true : false) === -1)
assert(_.findLastIndex([1, 2, 3, 4, 5], (i: any) => i % 2 === 0 ? true : false) === 3)
assert(_.head([2, 3]) === 2)
assert(_.head([]) === undefined)
assert(arrEqual(_.flatten([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]))
assert(arrEqual(_.flatten([1, [2, [3, 4]], 5]), [1, 2, [3, 4], 5]))
assert(arrEqual(_.flattenDeep([1, [2, [3, [4, 5], [6, 7]]]]), [1, 2, 3, 4, 5, 6, 7]))
assert(arrEqual(_.flattenDepth([1, [2, [3], 5]]), [1, 2, [3], 5]))
assert(arrEqual(_.flattenDepth([1, [2, [3, [4, [999]]], 5]], 3), [1, 2, 3, 4, [999], 5]))
assert(objEqual(_.fromPairs([['name', 'youyi'], ['age', 18]]), { name: 'youyi', age: 18 }))


export default _;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const arrEqual = (arr1, arr2) => {
    const _arr1 = arr1.sort();
    const _arr2 = arr2.sort();
    console.log('Compared:', _arr1, _arr2);
    return _arr1.every((item, index) => {
        if (Array.isArray(item)) {
            return arrEqual(item, _arr2[index]);
        }
        else {
            return item === _arr2[index];
        }
    });
};
const objEqual = (obj1, obj2) => {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key])
            return false;
    }
    for (const key in obj2) {
        if (obj1[key] !== obj2[key])
            return false;
    }
    return true;
};
const _ = {
    chunk(array, size = 1) {
        const _size = ~~size;
        if (_size <= 0)
            throw new Error('Size must large or equal to zero.');
        const len = array.length;
        if (len <= 1)
            return array;
        const result = [];
        for (let i = 0; i < len; i += _size) {
            if (len < _size + i)
                result.push(array.slice(i, len));
            else
                result.push(array.slice(i, i + _size));
        }
        return result;
    },
    compact(array) {
        return array
            .filter(i => ![0, 0n, null, undefined, '', false, NaN]
            .includes(i));
    },
    concat(array, ...values) {
        const _array = [...array];
        [...values].forEach(i => {
            if (Array.isArray(i)) {
                i.forEach(item => _array.push(item));
            }
            else {
                _array.push(i);
            }
        });
        return _array;
    },
    difference(arr1, ...values) {
        const len = arr1.length;
        if (len === 0)
            return [];
        return [...arr1].filter(i => {
            return ![...values]
                .filter(v => Array.isArray(v))
                .reduce((prev, curr) => prev.concat(curr), [])
                .includes(i);
        });
    },
    differenceBy(arr1, arr2, iteratee) {
        const _arr1 = arr1.map(i => iteratee(i));
        const _arr2 = arr2.map(i => iteratee(i));
        return _arr1.map((e, index) => {
            if (!_arr2.includes(e)) {
                return arr1[index];
            }
            else {
                return undefined;
            }
        }).filter(i => !!i);
    },
    drop(arr, n = 1) {
        return arr.slice(n <= 0 ? 0 : ~~n);
    },
    dropRight(arr, n = 1) {
        const _n = n <= 0 ? 0 : arr.length - n;
        if (n >= arr.length)
            return [];
        return arr.slice(0, _n);
    },
    fill(arr, value, start = 0, end = arr.length) {
        if (start < 0)
            start = 0;
        if (end > arr.length)
            end = arr.length;
        return arr.map((e, i) => {
            if (i >= start && i < end)
                return value;
            return e;
        });
    },
    findIndex(arr, filter, fromIndex = 0) {
        if (fromIndex >= arr.length)
            return -1;
        if (fromIndex <= 0)
            fromIndex = 0;
        const _arr = arr.slice(fromIndex);
        for (const item of _arr) {
            if (filter(item))
                return _arr.indexOf(item);
        }
        return -1;
    },
    findLastIndex(arr, filter, fromIndex = arr.length - 1) {
        let _fromIndex = fromIndex >= arr.length ? arr.length - 1 : fromIndex;
        if (fromIndex < 0)
            return -1;
        do {
            if (filter(arr[_fromIndex]))
                return _fromIndex;
            _fromIndex -= 1;
        } while (_fromIndex >= 0);
        return -1;
    },
    head(arr) {
        return arr.length === 0 ? undefined : arr[0];
    },
    flatten(arr) {
        if (arr.length <= 1)
            return [...arr];
        return arr.reduce((prev, curr) => prev.concat(curr), []);
    },
    flattenDeep(arr) {
        if (arr.length === 0)
            return [];
        let _arr = [...arr];
        if (_arr.every(i => !Array.isArray(i)))
            return _arr;
        do {
            _arr = this.flatten(_arr);
        } while (_arr.some(i => Array.isArray(i)));
        return _arr;
    },
    flattenDepth(arr, depth = 1) {
        if (depth <= 0 || depth !== ~~depth) {
            console.log('error: depth value');
            throw new Error("Invalid depth value.");
        }
        let _arr = [...arr];
        let count = 1;
        if (_arr.length === 0 || _arr.every(i => !Array.isArray(i)))
            return _arr;
        do {
            _arr = this.flatten(_arr);
            count += 1;
        } while (count <= depth && _arr.some(i => Array.isArray(i)));
        return _arr;
    },
    fromPairs(arr) {
        let index = -1;
        let length = arr.length;
        let result = {};
        while (++index < length) {
            let pair = arr[index];
            result[pair[0]] = pair[1];
        }
        return result;
    }
};
assert_1.default.ok(arrEqual([1, 2], [2, 1]));
assert_1.default.ok(arrEqual(_.compact([1, 2, 3, NaN, false, null, undefined, 0, 0n, '']), [1, 2, 3]));
assert_1.default.ok(arrEqual(_.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]));
assert_1.default(arrEqual(_.difference([1, 3, 9], [2, 4, 6, 1], [3]), [9]));
assert_1.default(arrEqual(_.differenceBy([1.3, 2.2], [3.1, 2.4], (i) => ~i), [1.3]));
assert_1.default(arrEqual(_.drop([1, 2]), [2]));
assert_1.default(arrEqual(_.dropRight([1, 2]), [1]));
assert_1.default(arrEqual(_.dropRight([1, 2, 3, 4, 5, 6, 7, 8, 9], 6), [1, 2, 3]));
assert_1.default(arrEqual(_.fill([1, 2, 3, 4, 5], '*', 0, 2), ['*', '*', 3, 4, 5]));
assert_1.default(arrEqual(_.fill([1, 2, 3], '*'), ['*', '*', '*']));
assert_1.default(_.findIndex([1, 2, 3, 4], (i) => i % 3 === 0) === 2);
assert_1.default(_.findIndex([1, 2, 3, 4], (i) => i % 5 === 0) === -1);
assert_1.default(_.findLastIndex([1, 2, 3, 4, 5], (i) => i % 5 === 0 ? true : false) === 4);
assert_1.default(_.findLastIndex([1, 2, 3, 4, 5], (i) => i % 6 === 0 ? true : false) === -1);
assert_1.default(_.findLastIndex([1, 2, 3, 4, 5], (i) => i % 2 === 0 ? true : false) === 3);
assert_1.default(_.head([2, 3]) === 2);
assert_1.default(_.head([]) === undefined);
assert_1.default(arrEqual(_.flatten([1, [2, 3, 4], 5]), [1, 2, 3, 4, 5]));
assert_1.default(arrEqual(_.flatten([1, [2, [3, 4]], 5]), [1, 2, [3, 4], 5]));
assert_1.default(arrEqual(_.flattenDeep([1, [2, [3, [4, 5], [6, 7]]]]), [1, 2, 3, 4, 5, 6, 7]));
assert_1.default(arrEqual(_.flattenDepth([1, [2, [3], 5]]), [1, 2, [3], 5]));
assert_1.default(arrEqual(_.flattenDepth([1, [2, [3, [4, [999]]], 5]], 3), [1, 2, 3, 4, [999], 5]));
assert_1.default(objEqual(_.fromPairs([['name', 'youyi'], ['age', 18]]), { name: 'youyi', age: 18 }));
console.log(_.fromPairs([['name', 'youyi'], ['age', 18]]));
exports.default = _;

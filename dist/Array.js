"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const arrEqual = (arr1, arr2) => {
    const _arr1 = arr1.sort();
    const _arr2 = arr2.sort();
    return _arr1.every((item, index) => {
        if (Array.isArray(item)) {
            return arrEqual(item, _arr2[index]);
        }
        else {
            return item === _arr2[index];
        }
    });
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
    }
};
assert_1.default.ok(arrEqual([1, 2], [2, 1]));
assert_1.default.ok(arrEqual(_.compact([1, 2, 3, NaN, false, null, undefined, 0, 0n, '']), [1, 2, 3]));
assert_1.default.ok(arrEqual(_.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]));
assert_1.default(arrEqual(_.difference([1, 3, 9], [2, 4, 6, 1], [3]), [9]));
exports.default = _;

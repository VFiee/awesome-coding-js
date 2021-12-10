/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2021-12-10 13:29:01
 * @LastEditors: vyron
 * @Description: 柯里化实现
 * @FilePath: /awesome-coding-js/javascript/curry.js
 */

const curry = fn => (...args) => args.length >= fn.length ? fn(...args) : (...ars) => curry(fn)(...args, ...ars)

const sumThree = (a, b, c) => a + b + c

const sum = curry(sumThree)
const sum1 = sum(1, 5)(2)
// const sum2 = sum1(2)
// const sum3 = sum2(3)
console.log(sum1)
// console.log(sum2)
// console.log(sum3)
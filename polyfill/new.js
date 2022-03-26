/*
 * @Author: vyron
 * @Date: 2022-03-15 14:30:33
 * @LastEditTime: 2022-03-25 12:21:39
 * @LastEditors: vyron
 * @Description: new 操作符实现
 * @FilePath: /awesome-coding-js/polyfill/new.js
 */

/**
 * Create a new object,
 * with the prototype set to the prototype of the provided function
 * @param fn - The function to be called.
 * @param args - The arguments to pass to the function.
 * @returns The object that is created by the function.
 */
function PolyfillNew(fn, ...args) {
  // 如果不是函数报错
  if (typeof fn !== 'function') {
    throw TypeError(`Expected a function, but got a ${typeof fn}`)
  }
  // 创建新对象,并修改新对象的原型
  const o = Object.create(fn.prototype)
  // 以新对象作为 this 调用函数
  const r = fn.apply(o, args)
  const t = typeof r
  // 如果函数返回值为对象或函数则返回,否则返回新对象
  return (t !== null && t === 'object') || t === 'function' ? r : o
}

function Person(name, age) {
  this.name = name
  this.age = age
}
const kasong = PolyfillNew(Person, 'KaSong', 18)
console.log(kasong.age) // 18

function Something(name) {
  this.name = name
  return { name: 'something' }
}
const something = PolyfillNew(Something, 'XiaoMing')
console.log(something.name) // something

function Others(name) {
  this.name = name
  return function test() {
    console.log(this)
  }
}

const others = PolyfillNew(Others, 'others')
console.log(others)
// ƒ test() {
//  console.log(this)
// }

const others2 = new Others('others2')
console.log(others2)
// ƒ test() {
//  console.log(this)
// }

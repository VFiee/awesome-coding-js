/*
 * @Author: vyron
 * @Date: 2022-03-15 14:30:33
 * @LastEditTime: 2022-03-15 14:47:13
 * @LastEditors: vyron
 * @Description: new 操作符实现
 * @FilePath: /awesome-coding-js/polyfill/new.js
 */

function polyNew(fn, ...args) {
    if (typeof fn !== "function") {
        throw TypeError(`Expected a function, but got a ${typeof fn}`)
    }
    const o = Object.create(fn.prototype)
    const r = fn.apply(o, args)
    const t = typeof r
    return (t !== null && t === "object") || t ==="function" ? r : o
}

function fn(){
    console.log(arguments)
}

polyNew(fn,1,2,3,4)
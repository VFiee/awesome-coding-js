/*
 * @Author: vyron
 * @Date: 2021-11-23 17:15:23
 * @LastEditTime: 2021-12-13 13:28:34
 * @LastEditors: vyron
 * @Description: 实现防抖
 * @FilePath: /awesome-coding-js/javascript/debounce.js
 */

const debounce = (fn, time = 300) => {
    if (!fn || typeof fn !== "function") {
        throw TypeError(`Expect a function but got a ${typeof fn}`)
    }
    let ing = false
    let timer
    return (...args) => {
        const _fn = () => {
            ing = true
            timer = setTimeout(async () => {
                await fn(...args)
                ing = false
            }, time)
        }
        if (ing) {
            ing = false
            clearTimeout(timer)
            timer = null
        }
        _fn()
    }
}

const debounce2 = (fn, time = 300) => {
    if (!fn || typeof fn !== "function") {
        throw TypeError(`Expect a function but got a ${typeof fn}`)
    }
    let now = null
    let timer = null
    return (...args) => {
        const run = () => {
            now = Date.now()
            timer = setTimeout(() => fn(...args), time);
        }
        const _now = Date.now()
        if (now && timer && _now < time + now) {
            clearTimeout(timer)
        }
        run()
    }
}


const fn = (i, prefix) => console.log(prefix, 'runing:', i)
const df = debounce(fn)
const df2 = debounce2(fn)

for (let i = 0; i < 2000; i++) {
    df(i, 'debounce')
    df2(i, 'debounce2')
}
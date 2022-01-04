/*
 * @Author: vyron
 * @Date: 2021-11-23 17:15:23
 * @LastEditTime: 2022-01-04 12:58:41
 * @LastEditors: vyron
 * @Description: 实现防抖
 * @FilePath: /awesome-coding-js/javascript/debounce.js
 */

const debounce = (fn, wait = 0) => {
    if (!fn || typeof fn !== "function") {
        throw TypeError(`Expect a function but got a ${typeof fn}`)
    }
    let timer
    function debounced(...args) {
        const run = () => {
            timer = setTimeout(() => {
                timer = null
                fn(...args)
            }, wait)
        }
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        run()
    }
    function cancel() {
        timer && clearTimeout(timer)
        timer = null
    }
    function flush(...args) {
        cancel()
        fn(...args)
    }
    debounced.prototype.cancel = cancel
    debounced.prototype.flush = flush
    return debounced
}

const fn = (i, prefix) => console.log(prefix, 'runing:', i)
const df = debounce(fn)

for (let i = 0; i < 2000; i++) {
    df(i, 'debounce')
}
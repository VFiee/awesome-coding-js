/*
 * @Author: vyron
 * @Date: 2021-11-23 17:15:23
 * @LastEditTime: 2022-03-15 12:10:53
 * @LastEditors: vyron
 * @Description: 实现节流
 * @FilePath: /awesome-coding-js/javascript/throttle.js
 */

const throttle = (fn, wait = 0) => {
    let timer
    function throttled(...args) {
        const run = () => {
            timer = setTimeout(() => {
                timer = null
                fn(...args)
            }, wait)
        }
        !timer && run()
    }
    function cancel() {
        timer && clearTimeout(timer)
        timer = null
    }
    function flush(...args) {
        cancel()
        fn(...args)
    }
    throttled.prototype.cancel = cancel
    throttled.prototype.flush = flush
    return throttled
}

const test = () => {
    shouldThrottleFunction()
}

const shouldThrottleFunction = () => {
    let count = 0;
    let throttled = throttle(() => {
        count++;
        console.log(`count:`, count)
    }, 50)

    throttled()
    throttled()
    throttled()
    setTimeout(() => {
        throttled()
        throttled()
        throttled()
    }, 100)
}

test()
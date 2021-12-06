/*
 * @Author: vyron
 * @Date: 2021-11-23 17:20:54
 * @LastEditTime: 2021-12-06 14:04:08
 * @LastEditors: vyron
 * @Description: 异步循环打印 log
 * @FilePath: /awesome-coding-js/javascript/async-log.js
 */

const sleep = (timeout = 100, ...args) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(...args)
        }, timeout);
    })
}


const asyncLoopLog = async () => {
    for (let index = 0; index < 20; index++) {
        const _index = await sleep(200, index)
        console.log(`index:`, _index)
    }
    const promises = Array.from(Array(20)).map((_, index) => sleep(200, index))
    for await (const _index of promises) {
        console.log(`_index:`, _index)
    }
}

asyncLoopLog()
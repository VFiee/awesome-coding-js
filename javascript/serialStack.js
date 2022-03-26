/*
 * @Author: vyron
 * @Date: 2022-03-25 17:19:03
 * @LastEditTime: 2022-03-25 18:07:35
 * @LastEditors: vyron
 * @Description: 实现串行请求队列
 * @FilePath: /awesome-coding-js/javascript/serialStack.js
 */

function serial(tasks) {
  if (!tasks || tasks.length <= 0) return Promise.resolve()
  tasks.reduce((prev, next) => prev.then(() => next()), Promise.resolve())
}

function timer(fn, seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  }).then(fn)
}

const log = msg => () => console.log(msg)

serial([log(1), log(2), log(3), timer.bind(null, log(4), 3), log(5)])

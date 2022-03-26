/*
 * @Author: vyron
 * @Date: 2022-03-25 18:10:51
 * @LastEditTime: 2022-03-25 18:28:44
 * @LastEditors: vyron
 * @Description: 懒加载运行
 * @FilePath: /awesome-coding-js/javascript/lazyRun.js
 */

/**
LazyRun("Hank")
// 打印：Hi! This is Hank!

LazyRun("Hank").sleep(10).eat("dinner")
// 打印：Hi! This is Hank!
// 等待了 10 秒后
// 打印：Wake up after 10
// 打印：Eat dinner~
 
LazyRun("Hank").eat("dinner").eat("supper")
// 打印：Hi This is Hank!
// 打印：Eat dinner~
// 打印：Eat supper~
 
LazyRun("Hank").sleepFirst(5).eat("supper")
// 等待了 5 秒后
// 打印：Wake up after 5
// 打印：Hi This is Hank!
// 打印：Eat supper

LazyRun("Hank").eat("supper").sleepFirst(5)
// 等待了 5 秒后
// 打印：Wake up after 5
// 打印：Hi This is Hank!
// 打印：Eat supper 
 */

class LazyRun {
  constructor(fns = []) {
    this.tasks = []
    this.fns = fns
  }
  get context() {
    const tasks = [...this.tasks, this.sleep, this.sleepFirst]
    return tasks.reduce((acc, fn) => {
      acc[fn.name] = this.chain(fn)
      return acc
    }, {})
  }
  sleep(seconds = 0, isFirst = false) {
    const fn = setTimeout(() => {}, seconds * 1000)
    if (isFirst) {
      return this.tasks.unshift(fn)
    }
    this.tasks.push(fn)
  }
  sleepFirst(seconds) {
    this.sleep(seconds, true)
  }
  chain(fn) {
    return function chained(...args) {
      return {
        run() {
          return fn(...args)
        }
      }
    }
  }
  run() {}
}

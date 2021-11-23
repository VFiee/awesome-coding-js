/*
 * @Author: vyron
 * @Date: 2021-11-23 17:12:32
 * @LastEditTime: 2021-11-23 17:13:42
 * @LastEditors: vyron
 * @Description: call 实现
 * @FilePath: /awesome-coding-js/javascript/call.js
 */
function call(context, ...args) {
    if (typeof this !== "function") return
    context = context || window || Object(context)
    const symbol = Symbol()
    context[symbol] = this
    const res = context[symbol](...args)
    delete context[symbol]
    return res
}

// 测试

const context = { name: "test" }
const args = [{ x: 1 }, { y: 2 }, 3]

function test() {
    console.log(this.name)
    console.log(arguments)
}

Function.prototype.call2 = call

test.call2()
test.call2(context)
test.call2(context, args)

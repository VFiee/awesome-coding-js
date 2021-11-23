/*
 * @Author: vyron
 * @Date: 2021-11-23 17:12:32
 * @LastEditTime: 2021-11-23 17:13:22
 * @LastEditors: vyron
 * @Description: apply 实现
 * @FilePath: /awesome-coding-js/javascript/apply.js
 */
function apply(context, args) {
    if (typeof this !== "function") return
    context = context || window || Object(context)
    const symbol = Symbol()
    context[symbol] = this
    const res = context[symbol](args)
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

Function.prototype.apply2 = apply

test.apply2()
test.apply2(context)
test.apply2(context, args)

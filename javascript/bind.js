/*
 * @Author: vyron
 * @Date: 2021-11-23 17:12:32
 * @LastEditTime: 2021-11-23 17:13:32
 * @LastEditors: vyron
 * @Description: bind 实现
 * @FilePath: /awesome-coding-js/javascript/bind.js
 */
function bind(context, ...args) {
    if (typeof this !== "function") {
        throw new TypeError(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }
    const _this = this
    function Blank() { }
    function Bind(...ags) {
        if (this instanceof Bind) {
            return new _this(...args, ...ags)
        }
        return _this.apply(context, [...ags, ...args])
    }
    // Function.prototype.bind()  this.prototype === Function.prototype
    if (this.prototype) {
        Blank.prototype = this.prototype
    }
    Bind.prototype = new Blank()
    return Bind
}

// 测试

const context = { name: "test" }
const args = [{ x: 1 }, { y: 2 }, 3]

function test() {
    console.log(this.name)
    console.log(arguments)
}
function Text() {
    console.log(this.name)
    console.log(arguments)
}

Function.prototype.bind2 = bind

// // bind call
// test.bind2()()
// test.bind2(context)()
// test.bind2(context,args)()


// // prototype

// Function.prototype.bind2()()
// Function.prototype.bind2(context)()
// Function.prototype.bind2(context,args)()

// // new bind
// const text1 = Text.bind2()
// const text2 = Text.bind2(context)
// const text3 = Text.bind2(context,args)

// console.log(new text1())
// console.log(`---------------------------------------`)
// console.log(new text2())
// console.log(`---------------------------------------`)
// console.log(new text3())


console.log(new Function.prototype.bind2(context, args)())
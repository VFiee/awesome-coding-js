/*
 * @Author: vyron
 * @Date: 2022-03-15 12:21:06
 * @LastEditTime: 2022-03-16 13:08:45
 * @LastEditors: vyron
 * @Description: bind implement
 * @FilePath: /awesome-coding-js/polyfill/bind.js
 */

Function.prototype.polyBind = function bind(context,...args){
    if (typeof this !== "function") {
        throw new TypeError( "Function.prototype.bind - what is trying to be bound is not callable");
      }
      const fn = this;
      function FBlank() {};
      function FBind(...argus) {
        // this instanceof FBind === true时,说明返回的FBind被当做new的构造函数调用
        return fn.apply(
          this instanceof FBind ? this : context,
          [...args,...argus]
        );
      };
      // 维护原型关系
      if (this.prototype) {
        // 当执行Function.prototype.bind()时, this为Function.prototype
        // this.prototype(即Function.prototype.prototype)为undefined
        FBlank.prototype = this.prototype;
      }
      FBind.prototype = new FBlank();
      return FBind;
}

const context = {
    a:1,
    b:2,
    c:3
}
function test(){
    console.log(this)
}

// test bind function
const fn = test.polyBind(context)
// fn()

// test constructor function 
const Fn = test.polyBind(context)
// new Fn()

const func = Function.prototype.polyBind.call(test,context)
func()

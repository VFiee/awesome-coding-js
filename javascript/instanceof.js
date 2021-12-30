/*
 * @Author: vyron
 * @Date: 2021-11-23 17:20:54
 * @LastEditTime: 2021-12-30 12:20:51
 * @LastEditors: vyron
 * @Description: 实现 instanceof
 * @FilePath: /awesome-coding-js/javascript/instanceof.js
 */

// 原理是检测构造函数的原型属性是否存在实例对象的原型链上

const mockInstanceof = (instance, constructor) => {
    const proto = Object.getPrototypeOf(instance)
    while (proto) {
        if (constructor.prototype === proto) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

const test = () => {
    function Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    const auto = new Car('Honda', 'Accord', 1998);
    console.log(mockInstanceof(auto, Car))
    console.log(mockInstanceof(auto, Object))
    // console.log(mockInstanceof(Car, Object))

}

test()
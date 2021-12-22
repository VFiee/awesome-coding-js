/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2021-12-22 13:10:04
 * @LastEditors: vyron
 * @Dedcription: 深拷贝和浅拷贝
 * @FilePath: /awesome-coding-js/javascript/copy.js
 */

const isArray = Array.isArray

const isObject = v => v !== null && typeof v === "object"

const isDate = v => v instanceof Date

const isRegExp = v => v instanceof RegExp


// 浅拷贝
// Object.assign
// 扩展运算符
const shallowCopy = data => {
    if (!isObject(data)) return {}
    const copy = isArray(data) ? [] : {}
    for (const key in data) {
        copy[key] = data[key]
        return copy
    }
}

// 深拷贝
// JSON.stringify
const deepCopy = (data) => {
    if (!isObject(data)) return {}
    const copy = isArray(data) ? [] : {}
    for (const key in data) {
        const value = data[key]
        if (isRegExp(value) || isDate(value)) {
            copy[key] = new value.constructor(value)
            continue
        }
        copy[key] = isObject(value) ? deepCopy(value) : value
    }
    return copy
}

const deepAssign = (target, ...sources) => {
    for (let i = 0; i < sources.length; i++) {
        const source = sources[i];
        if (!isObject(source)) return
        Object.entries(source).forEach(([key, value]) => {
            if (isDate(value)) {
                target[key] = new Date(value)
                return
            }
            if (isRegExp(value)) {
                target[key] = new RegExp(value)
                return
            }
            if (!isObject(value)) {
                target[key] = value
                return
            }
            target[key] = isArray(value) ? [] : {}
            deepAssign(target[key], value)
        })
    }
    return target
}


// 测试
function test() {
    const date = new Date("1979-05-27T07:32:00Z");
    const reg = RegExp(/JAVAdcRIPT/);
    const obj1 = { key: { bar: { js: ["is", "not", "ts"] } } };
    const obj2 = { foo: { date } };
    const obj3 = { foo: { bar: "barbarbar" }, reg };
    // 测试浅拷贝
    const sc1 = shallowCopy(obj1)
    console.log(sc1.key === obj1.key)
    console.log(sc1.key.bar === obj1.key.bar)
    console.log(sc1.key.bar.js === obj1.key.bar.js)

    const sc2 = shallowCopy(obj2)
    console.log(sc2.foo === obj2.foo)
    console.log(sc2.foo.date === obj2.foo.date)

    const sc3 = shallowCopy(obj3)
    console.log(sc3.foo === obj3.foo)
    console.log(sc3.reg !== obj3.reg)
    console.log(sc3.foo.bar === obj3.foo.bar)

    // 测试深拷贝
    const dc1 = deepCopy(obj1)
    console.log(dc1.key !== obj1.key)
    console.log(dc1.key.bar !== obj1.key.bar)
    console.log(dc1.key.bar.js !== obj1.key.bar.js)

    const dc2 = deepCopy(obj2)
    console.log(dc2.foo !== obj2.foo)
    console.log(dc2.foo.date !== obj2.foo.date)

    const dc3 = deepCopy(obj3)
    console.log(dc3.foo !== obj3.foo)
    console.log(dc3.reg !== obj3.reg)
    console.log(dc3.foo.bar === obj3.foo.bar)
}

test()
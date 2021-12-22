/*
 * @Author: vyron
 * @Date: 2021-11-23 17:12:32
 * @LastEditTime: 2021-12-22 14:03:36
 * @LastEditors: vyron
 * @Description: 实现 eventEmitter
 * @FilePath: /awesome-coding-js/javascript/eventEmitter.js
 */

class EventEmitter {
    constructor() {
        this.defaultMaxListeners = 10
        this.onceSymbol = Symbol("once")
        this.eventMap = new Map()
    }
    // 添加监听事件
    addListener(eventName, listener) {
        const events = this.eventMap.get(eventName) || new Set()
        if (events.has(listener)) {
            console.warn(`There already has a listener, will ignore`)
            return
        }
        if (events.size >= this.maxListeners) {
            console.warn(`The event ${eventName} has been registered beyond the maximum limit! Use setMaxListeners to set the maximum value!`)
            if (listener[this.onceSymbol]) {
                delete listener[this.onceSymbol]
            }
            return
        }
        events.add(listener)
        this.eventMap.set(eventName, events)
    }
    // 触发监听事件
    emit(eventName, ...args) {
        const events = this.eventMap.get(eventName)
        if (!events) return
        events.forEach(event => {
            event(...args)
            if (event[this.onceSymbol]) {
                delete event[this.onceSymbol]
                this.removeListeners(eventName, event)
            }
        })
    }
    // 获取所有注册的事件名称
    get eventNames() {
        return [...this.eventMap.keys()]
    }
    // 获取最大事件监听器
    get maxListeners() {
        return this.customMaxListeners === undefined ? this.defaultMaxListeners : this.customMaxListeners
    }
    // 根据事件名称获取监听器数量
    listenerCount(eventName) {
        const events = this.eventMap.get(eventName)
        return events ? events.size : 0
    }
    // 根据事件名称获取监听器
    listeners(eventName) {
        const events = this.eventMap.get(eventName) || new Set()
        return [...events.values()]
    }
    // 注销事件监听器
    off(eventName, listener) {
        return this.removeListeners(eventName, listener)
    }
    // 添加事件监听器
    on(eventName, listener) {
        return this.addListener(eventName, listener)
    }
    // 添加只执行一次的事件监听器
    once(eventName, listener) {
        listener[this.onceSymbol] = true
        return this.addListener(eventName, listener)
    }
    // 添加事件监听器,添加到事件队列的最前面(提前执行)
    prependListener(eventName, listener) {
        const events = this.eventMap.get(eventName) || new Set()
        if (events.has(listener)) {
            console.warn(`There already has a listener, will ignore`)
        } else if (events.size >= this.maxListeners) {
            console.warn(`The event ${eventName} has been registered ${events.size} times and be registered beyond the maximum limit! use setMaxListeners set the max listeners!`)
            if (listener[this.onceSymbol]) {
                delete listener[this.onceSymbol]
            }
            return
        }
        const listeners = this.listeners(eventName)
        listeners.unshift(listener)
        this.eventMap.set(eventName, new Set(listeners))
    }
    // 添加事件监听器,添加到事件队列的最前面,只监听一次
    prependOnceListener(eventName, listener) {
        listener[this.onceSymbol] = true
        this.prependListener(eventName, listener)
    }
    // 移除所有事件监听器
    removeAllListeners(eventNames) {
        if (!eventNames || eventNames.length <= 0) {
            eventNames = this.eventNames
        }
        const removeListeners = (eventName) => {
            const events = this.eventMap.get(eventName)
            if (!events) return
            events.forEach(event => {
                if (event[this.onceSymbol]) {
                    delete event[this.onceSymbol]
                }
            })
            events.clear()
        }
        if (typeof eventNames === "string") {
            removeListeners(eventNames)
            return
        }
        if (!Array.isArray(eventNames)) return
        eventNames.forEach(removeListeners)

    }
    // 移除事件监听器
    removeListeners(eventName, listener) {
        const events = this.eventMap.get(eventName)
        if (!events || !events.has(listener)) return
        return events.delete(listener)
    }
    // 设置最大监听器
    setMaxListeners(max) {
        try {
            this.customMaxListeners = parseInt(Number(max))
        } catch (error) {
            console.error(`setMaxListeners error:`, err)
        }
    }
}

function test() {
    testNormal()
    testEmitOrder()
    testEmitOnce()
    testEmitOnceOrder()
    testMaxEventListener()
    testEventEmitterProperties()

}

// 测试正常的注册和触发
function testNormal() {
    const eventEmitter = new EventEmitter()
    const _userinfo = {
        name: "vyron",
        age: 18,
        sex: 1
    }
    const eventName = "login"
    const login = (userinfo) => {
        console.log(`登录:`, userinfo)
    }
    eventEmitter.addListener(eventName, login)
    setTimeout(() => {
        eventEmitter.emit(eventName)
        eventEmitter.emit(eventName, _userinfo)
    }, 2000)
}

// 测试事件触发顺序
function testEmitOrder() {
    const eventEmitter = new EventEmitter()
    const _userinfo = {
        name: "vyron",
        age: 18,
        sex: 1
    }
    const eventName = "login"
    const login = (userinfo) => {
        console.log(`登录:`, userinfo)
    }
    const loginBefore = (userinfo) => {
        console.log(`提前触发的登录:`, userinfo)
    }
    eventEmitter.addListener(eventName, login)
    eventEmitter.prependListener(eventName, loginBefore)
    setTimeout(() => {
        eventEmitter.emit(eventName, _userinfo)
    }, 2000)
}

// 测试只执行一次
function testEmitOnce() {
    const eventEmitter = new EventEmitter()
    const _userinfo = {
        name: "vyron",
        age: 18,
        sex: 1
    }
    const eventName = "login"
    const login = (userinfo) => {
        console.log(`once登录:`, userinfo)
    }
    eventEmitter.once(eventName, login)
    setTimeout(() => {
        eventEmitter.emit(eventName, _userinfo)
        eventEmitter.emit(eventName)
    }, 2000)
}

// 测试只执行一次的触发顺序
function testEmitOnceOrder() {
    const eventEmitter = new EventEmitter()
    const _userinfo = {
        name: "vyron",
        age: 18,
        sex: 1
    }
    const eventName = "login"
    const login = (userinfo) => {
        console.log(`once登录:`, userinfo)
    }
    const loginFirst = (userinfo) => {
        console.log(`提前触发的 once登录:`, userinfo)
    }
    eventEmitter.once(eventName, login)
    eventEmitter.prependOnceListener(eventName, loginFirst)
    setTimeout(() => {
        eventEmitter.emit(eventName, _userinfo)
        eventEmitter.emit(eventName)
    }, 2000)
}

// 注册事件监听数量超过最大值会忽略
function testMaxEventListener() {
    const eventEmitter = new EventEmitter()
    const eventName = "login"
    const login = (index) => {
        console.log(`登录:`, index)
    }
    // 需要提前设置
    // eventEmitter.setMaxListeners(11)
    Array.from(Array(11)).map((_, index) => index).forEach(index => {
        eventEmitter.on(eventName, login.bind(null, index + 1))
    })
    setTimeout(() => {
        eventEmitter.emit(eventName)
    }, 2000)
}

// 测试属性
function testEventEmitterProperties() {
    const eventEmitter = new EventEmitter()
    const eventName = "login"
    const eventName2 = "login2"
    const login = (index) => {
        console.log(`登录:`, index)
    }
    const login2 = (index) => console.log(`登录2:`, index)
    // 需要提前设置
    eventEmitter.setMaxListeners(100)
    Array.from(Array(20)).map((_, index) => index).forEach(index => {
        eventEmitter.on(eventName, login.bind(null, index + 1))
    })
    Array.from(Array(30)).map((_, index) => index).forEach(index => {
        eventEmitter.on(eventName2, login2.bind(null, index + 1))
    })
    eventEmitter.once(eventName, () => login(21))
    eventEmitter.once(eventName, () => login2(21))
    console.log(`eventEmitter.defaultMaxListeners:`, eventEmitter.defaultMaxListeners)
    console.log(`eventEmitter.eventNames:`, eventEmitter.eventNames)
    console.log(`eventEmitter.listenerCount(${eventName}):`, eventEmitter.listenerCount(eventName))
    console.log(`eventEmitter.listenerCount(${eventName2}):`, eventEmitter.listenerCount(eventName2))
    console.log(`eventEmitter.listenerCount(${eventName}):`, eventEmitter.listeners(eventName))
    console.log(`eventEmitter.listenerCount(${eventName2}):`, eventEmitter.listeners(eventName2))

    eventEmitter.removeAllListeners()

    console.log(`eventEmitter.eventNames:`, eventEmitter.eventNames)
    console.log(`eventEmitter.listenerCount(${eventName}):`, eventEmitter.listenerCount(eventName))
    console.log(`eventEmitter.listenerCount(${eventName2}):`, eventEmitter.listenerCount(eventName2))
    console.log(`eventEmitter.listenerCount(${eventName}):`, eventEmitter.listeners(eventName))
    console.log(`eventEmitter.listenerCount(${eventName2}):`, eventEmitter.listeners(eventName2))
}

test()
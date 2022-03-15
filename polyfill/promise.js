/*
 * @Author: vyron
 * @Date: 2022-03-15 15:32:00
 * @LastEditTime: 2022-03-15 18:18:00
 * @LastEditors: vyron
 * @Description: Promise 实现
 * @FilePath: /awesome-coding-js/polyfill/promise.js
 */

const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

const isObject = typeof v === "object" && v !== null
const isFunction = f => typeof f === "function"
const returnAny = v => v

function Promise(executor){
    this.state = PENDING
    this.value = null
    this.rejectedCallbacks = []
    this.fulfilledCallbacks = []
    function resolve(res){
        if(state!==PENDING) return
        this.state = FULFILLED
        this.value = res
        this.fulfilledCallbacks.forEach(fn=>fn())
    }

    function reject(err) {
        if(state!==PENDING) return
        this.state = REJECTED
        this.value = err
        this.rejectedCallbacks.forEach(fn=>fn())
    }

    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}

Promise.prototype.then = function then(onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : returnAny
    onRejected = isFunction(onRejected) ? onRejected : r => { throw r }
    const $this = this
    const promise = new Promise((resolve, reject) => {
        const status = $this.status
        const resolveFn = () => {
            setTimeout(() => {
                try {
                    resolvePromise(promise, onFulfilled($this.value), resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        const rejectFn = () => {
            setTimeout(() => {
                try {
                    resolvePromise(promise, onRejected($this.value), resolve, reject)
                } catch (error) {
                    reject(error)
                }
            })
        }
        if(status === PENDING){
            $this.onFulfilled.push(resolveFn)
            $this.onRejected.push(rejectFn)
        }else if(status === FULFILLED) {
            resolveFn()
        }else if(status === REJECTED) {
            rejectFn()
        }
    })
    const resolvePromise = (promise, value, resolve, reject) => {
        if(isObject(value) || isFunction(value)){
            let called
            try {
                const then = value.then
                if(isFunction(then)) {
                    if(called) return
                    called = true
                    then.call(value,(res)=>{
                        resolvePromise(promise,res,resolve,reject)
                    },(err)=>{
                        reject(err)
                    })
                    return
                }
                if(called) return
                called = true
                resolve(value)
            } catch (error) {
                if(called) return
                called = true
                reject(e)
            }
        } else {
            resolve(value)
        }
    }
    return promise
}
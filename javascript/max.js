/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2022-01-04 11:45:27
 * @LastEditors: vyron
 * @Description: 实现求最大值
 * @FilePath: /awesome-coding-js/javascript/max.js
 */

const isArray = Array.isArray

const max = (array) => {
    if (!array || !isArray(array)) return
    let _max
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (_max === undefined || item > _max) {
            _max = item
        }
    }
    return _max
}


const test = () => {
    testMinNumber()
    testMins()
    testMinString()
}

const testMinNumber = () => {
    const nums = [1, 2, 3, 4, 5, 6, 0]
    console.log(`max:`, max(nums))
}

const testMins = () => {
    const nums = ["1", "-1", "a", "b"]
    console.log(`max:`, max(nums))
}

const testMinString = () => {
    const nums = ["a", "b"]
    console.log(`max:`, max(nums))
}

test()
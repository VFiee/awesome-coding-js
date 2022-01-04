/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2022-01-04 11:41:13
 * @LastEditors: vyron
 * @Description: 实现求最小值
 * @FilePath: /awesome-coding-js/javascript/min.js
 */
const isArray = Array.isArray

const min = (array) => {
    if (!array || !isArray(array)) return
    let _min
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (_min === undefined || item < _min) {
            _min = item
        }
    }
    return _min
}


const test = () => {
    testMinNumber()
    testMins()
    testMinString()
}

const testMinNumber = () => {
    const nums = [1, 2, 3, 4, 5, 6, 0]
    console.log(`min:`, min(nums))
}

const testMins = () => {
    const nums = ["1", "-1", "a", "b"]
    console.log(`min:`, min(nums))
}

const testMinString = () => {
    const nums = ["a", "b"]
    console.log(`min:`, min(nums))
}

test()
/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2022-01-11 13:48:16
 * @LastEditors: vyron
 * @Description: 实现去重
 * @FilePath: /awesome-coding-js/javascript/uniq.js
 */
const isArray = Array.isArray

const uniq = array => {
    if (!isArray(array) || array.length <= 0) return []
    let res = [array[0]]
    for (let i = 1; i < array.length; i++) {
        const value = array[i]
        if (!res.includes(value)) {
            res.push(value)
        }
    }
    return res
}

const uniqWith = (array, comparator) => {
    if (!isArray(array) || array.length <= 0) return []
    const length = array.length
    let res = []
    let index = -1
    outer:
    while (++index < length) {
        let value = array[index]
        let resLen = res.length
        while (--resLen >= 0) {
            if (!comparator(value, res[resLen])) {
                res.push(value)
                continue outer
            }
        }
        res.push(value)
    }
    return res
}

const test = () => {
    testBasicType()
    testRefType()
}

const testBasicType = () => {
    const nums = [1, 2, 3, 1]
    console.log(`nums:`, uniq(nums))
    const strs = ['a', 'b', 'a']
    console.log(`strs:`, uniq(strs))
}

const testRefType = () => {
    const ming = { name: "ming", age: 13 }
    const hua = { name: "hua", age: 12 }
    const hao = { name: "hao", age: 13 }
    const family1 = [ming, hua]
    const family2 = [hua, hao]
    const family = family1.concat(family2)
    console.log(`family:`, uniq(family))
    console.log(`family:`, uniqWith(family, (curr, next) => {
        return curr.age === next.age
    }))
}

test()
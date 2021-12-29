/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2021-12-29 15:01:22
 * @LastEditors: vyron
 * @Description: 实现数组扁平化
 * @FilePath: /awesome-coding-js/javascript/flat.js
 */

const isArray = Array.isArray

// 减少一级数组的嵌套深度
const flatten = (array) => flattenDepth(array)

const flattenDeep = (array) => flattenDepth(array, Infinity)

const flattenDepth = (array, depth = 1) => {
    if (!isArray(array)) return array
    let current = 0
    const flat = (array, depth, currentDepth) => {
        let result = []
        for (const item of array) {
            if (isArray(item) && currentDepth + 1 <= depth) {
                result.push(...flat(item, depth, currentDepth + 1))
            } else {
                result.push(item)
            }
        }
        return result
    }
    return flat(array, depth, current)
}

// 一维
const test1 = () => {
    const array = [1, 2, 3]
    console.log(`flatten:`, flatten(array))
    console.log(`flattenDeep:`, flattenDeep(array))
}

// 二维
const test2 = () => {
    const array = [[1], [2], [3]]
    console.log(`flatten:`, flatten(array))
    console.log(`flattenDeep:`, flattenDeep(array))
}

// 三维
const test3 = () => {
    const array = [[[1]], [[2]], [[3]]]
    console.log(`flatten:`, flatten(array))
    console.log(`flattenDeep:`, flattenDeep(array))
}

// 三维
const test4 = () => {
    const array = [[[[1]]], [[[2]]], [[[3]]]]
    console.log(`flatten:`, flatten(array))
    console.log(`flattenDeep:`, flattenDeep(array))
}


const test = () => {
    test1()
    test2()
    test3()
    test4()
}

test()
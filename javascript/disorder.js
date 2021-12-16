/*
 * @Author: vyron
 * @Date: 2021-11-23 17:18:24
 * @LastEditTime: 2021-12-16 14:15:50
 * @LastEditors: vyron
 * @Description: 实现数组乱序(洗牌算法)
 * @FilePath: /awesome-coding-js/javascript/disorder.js
 */

const random = (min = 0, max = 1, floating = false) => {
    const _random = Math.random() * (max - min) + min
    return floating ? _random : Math.floor(_random)
}

function testRandom() {
    for (let i = 0; i < 20; i++) {
        console.log(random(0, 1))
        console.log(random(1, 6))
        console.log(random(10, 20))
        console.log(random(50, 80))
        console.log(`-------------------------------`)
    }
}

const disorderList = (list = []) => {
    let current = list.length
    while (--current > -1) {
        // 可以尝试去除random 函数后面的分号看看效果
        const _random = random(0, list.length);
        [list[current], list[_random]] = [list[_random], list[current]]
    }
    return list
}
const list = [1, 2, 3, 4, 5]
for (let i = 0; i < 10; i++) {
    console.log(`disorderList:`, disorderList(list))
}
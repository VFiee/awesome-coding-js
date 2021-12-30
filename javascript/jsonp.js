/*
 * @Author: vyron
 * @Date: 2021-11-23 17:20:54
 * @LastEditTime: 2021-12-30 14:08:09
 * @LastEditors: vyron
 * @Description: 实现 jsonp
 * @FilePath: /awesome-coding-js/javascript/jsonp.js
 */

const onCallback = (res) => {
    console.log(`response:`, res)
}
function jsonp({ url, params, callback } = {}) {
    if (!url) throw `Expect url a string but got a ${typeof url}`
    params = {
        ...(params || {}),
        callback: "jsonpCallback"
    }
    let queryArray = []
    for (const [key, value] of Object.entries(params)) {
        queryArray.push(`${key}=${value}`)
    }
    const hasParams = url.includes("?")
    url += `${hasParams ? "&" : "?"}${queryArray.join("&")}`
    const script = document.createElement("script")
    script.src = url
    window[jsonpCallback] = (data) => {
        try {
            callback && callback(data)
        } catch (error) {

        }
        document.removeChild(script)
    }
    document.body.append(script)
}

jsonp({
    url: "test",
    params: {
        x: 1,
        y: 2,
        callbackFn: "onCallback"
    }
})
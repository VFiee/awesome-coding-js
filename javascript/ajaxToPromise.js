/*
 * @Author: vyron
 * @Date: 2021-11-23 17:20:54
 * @LastEditTime: 2021-11-24 11:33:24
 * @LastEditors: vyron
 * @Description: 基于 Promise 封装 ajax
 * @FilePath: /awesome-coding-js/javascript/ajaxToPromise.js
 */

// ajax 封装
function ajax({
    url,
    data,
    query,
    headers,
    onError,
    onSuccess,
    method = 'get',
    withCredentials,
    validateStatus
} = {}) {
    if (!url) {
        throw TypeError("XMLHttpRequest can't send without url")
    }
    const setHeaders = (req, headers) => {
        if (!headers || Object.keys(headers).length <= 0) return
        for (const [key, value] of Object.entries(headers)) {
            req.setRequestHeaders(key, value)
        }
    }
    const onReqTimeOut = (err) => {
        onError && onError({
            message: err,
            isTimeOut: true
        })
    }
    const onReqError = (err) => {
        onError && onError({
            message: err,
            isError: true
        })
    }
    const setQuery = (url, query) => {
        if (!query || Object.keys(query).length <= 0) return url
        // key=value&key2=value2
        const [uri, queryString] = url.split("?")
        const transformObjectToQueryString = (query) => {
            if (!query) return ''
            let res = []
            for (const [key, value] of Object.entries(query)) {
                res.push(`${key}=${value}`)
            }
            return res.join('&')
        }
        const transformQueryStringToObject = (queryString) => {
            if (!queryString) return {}
            const arr = queryString.split('#')
            return arr.reduce((acc, curr) => {
                const [key, value] = curr.split('=')
                return Object.assign(acc, {
                    [key]: value || ''
                })
            }, {})
        }
        if (!queryString) {
            return `${uri}?${transformObjectToQueryString(query)}`
        }
        return `${uri}?${transformObjectToQueryString({
            ...transformQueryStringToObject(queryString),
            ...query
        })}`
    }
    const isSuccess = (status) => {
        if (validateStatus) return validateStatus(status)
        return status === 304 || (status >= 200 && status < 300)
    }
    const req = new XMLHttpRequest()
    req.ontimeout = onReqTimeOut
    withCredentials && (req.withCredentials = true)
    url = setQuery(url, query)
    req.open(method, url, true)
    req.addEventListener("error", onReqError)
    req.onreadystatechange = () => {
        if (req.readyState !== XMLHttpRequest.DONE) return
        if (isSuccess(req.status)) {
            onSuccess && onSuccess({
                response: req.response
            })
        } else {
            onError && onError({
                isError: true,
                message: req.message,
                response: req.response
            })
        }
    }
    setHeaders(req, headers)
    req.send(data || null)
}

// Deferred
const deferred = () => {
    let methods;
    let state = "pending"
    const promise = new Promise((resolve, reject) => {
        methods = {
            async resolve(value) {
                await value
                state = "fulfilled"
                resolve(value)
            },
            reject(reason) {
                state = "rejected"
                reject(reason)
            }
        }
    })
    Object.defineProperty(promise, "state", { get: () => state })
    return Object.assign(promise, methods)
}

// promise ajax
const promiseAjax = ({
    url,
    data,
    query,
    headers,
    method = 'get',
    withCredentials,
    validateStatus
}) => {
    const promise = deferred()
    ajax({
        url,
        data,
        query,
        method,
        headers,
        withCredentials,
        validateStatus,
        onError: promise.reject,
        onSuccess: promise.resolve,
    })
    return promise
}
/** 
 * 测试接口
 */
ajax({
    query: { adcode: 110000 },
    url: `https://ditu.amap.com/service/weather`,
    onSuccess: (res) => {
        console.log(`res:`, res)
    },
    onError: (err) => {
        console.log(`err:`, err)
    }
})

promiseAjax({
    query: { adcode: 110000 },
    url: `https://ditu.amap.com/service/weather`
}).then(res => {
    console.log(`res:`, res)
}).catch((err) => {
    console.log(`err:`, err)
})
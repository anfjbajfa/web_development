import service from '../utils/request.js'

/**
 * 用户登录
 * @param {string} 用户名
 * @param {string} 密码
 * @returns promise
 */
function listFiles() {
    return service({
        url: "/file/listFiles", //对应的是整个linpingDir
        method: "get",
        // data: {},
    })
}

export {listFiles}
/**
 * 获取令牌
 * @returns token
 */
function getToken() {
    return localStorage.getItem('token')
}

/**
 * 设置令牌
 * @param {string} token 令牌
 */
function setToken(token) {
    localStorage.setItem('token', token)
}

/**
 * 移除令牌
 */
function removeToken() {
    localStorage.removeItem('token')
}


/**
 * 获取用户信息
 * @returns userInfo
 */
function getUserInfo() {
    // console.log(localStorage.getItem('userInfo'))
    return JSON.parse(localStorage.getItem('userInfo'))
}


/**
 * 设置用户信息
 * @param {object} userInfo 用户信息
 */
function setUserInfo(userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * 移除用户信息
 */
function removeUserInfo() {
    localStorage.removeItem('userInfo')
}


export { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo }
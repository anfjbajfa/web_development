/**
 * 获取令牌
 * @returns token
 */
function getToken() {
    return sessionStorage.getItem('token')
}

/**
 * 设置令牌
 * @param {string} token 令牌
 */
function setToken(token) {
    sessionStorage.setItem('token', token)
}

/**
 * 移除令牌
 */
function removeToken() {
    sessionStorage.removeItem('token')
}


/**
 * 获取用户信息
 * @returns userInfo
 */
function getUserInfo() {
    return JSON.parse(sessionStorage.getItem('userInfo'))
}


/**
 * 设置用户信息
 * @param {object} userInfo 用户信息
 */
function setUserInfo(userInfo) {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * 移除用户信息
 */
function removeUserInfo() {
    sessionStorage.removeItem('userInfo')
}


export { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo }
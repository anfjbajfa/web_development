import service from '../utils/request.js'
//对axios的二次封装

/**
 * 用户登录
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @returns promise
 */
function login(userName, password) {
    return service({
        url: "/login",
        method: "post",
        data: { userName, password },
    })
}

/**
 * 用户注销
 * @returns promise
 */
function logout() {
    return service({
        url: "/logout",
        method: "post",
        needAuthentication: true
    })
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @returns promise
 */
function register(email, userName, password) {
    return service({
        url: "user/login/register",
        method: "post",
        data: { email, userName, password },
    })
}

/**
 * 获取所有用户信息
 */
function getAllUserInfo() {
    return service.get("/user/getAllUsers",{ needAuthentication: true })
    .catch(error => {
        console.error("Get all users error:", error);
        throw error;
    });
}


// /**
//  * 获取管理员信息
//  */
// function getAdminInfo() {
//     return service.get("/user/adminInfo")
// }




// /**
//  * 更新用户信息
//  * @param {object} userInfo 用户信息
//  * @returns promise
//  */
// function updateUserInfo(userInfo) {
//     return service({
//         url: "/user/userInfo",
//         method: "put",
//         data: userInfo,
//         needAuthentication: true
//     })
// }




export { login, logout, register, getAllUserInfo}

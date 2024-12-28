import service from '../utils/request.js'
//对axios的二次封装

/**
 * 用户登录
 * @param {string} phone 手机号
 * @param {string} password 密码
 * @returns promise
 */
function login(phone, password) {
    return service({
        url: "/login",
        method: "post",
        data: { phone, password },
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
 * @param {string} phone 用户名
 * @param {string} verificationCode 验证码
 * @param {string} password 密码
 * @returns promise
 */
function register(phone, password) {
    return service({
        url: "register/login/register",
        method: "post",
        data: { phone, password},
    })
}
/**
 * 更新密码
 * @param 手机号
 * @param 新密码
 * @param {string} verificationCode 验证码
 */
function updatePassword(phone,password,verificationCode) {
    return service(
        {
            url:"updateUserInfo/updatePassword",
            method:"post",
            data:{phone,password,verificationCode},
            needAuthentication:true
        }
    )
}

/**
 * 更新密码
 * @param {string} phone 手机号 
 * @param {string} verificationCode 验证码
 */

function sendVerificationCode(phone){
    
    return service(
        {
            url:"register/sendVerificationCode",
            method:"post",
            params:{phone}
        }
    )
}

/**
 * 获取所有用户信息
 */
// function getAllUserInfo() {
//     return service.get("/user/getAllUsers",{ needAuthentication: true })
//     .catch(error => {
//         console.error("Get all users error:", error);
//         throw error;
//     });
// }


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




export { login, logout, register, updatePassword,sendVerificationCode}

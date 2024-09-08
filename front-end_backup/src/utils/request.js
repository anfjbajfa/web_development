import axios from 'axios'
import { getToken,getUserInfo} from './storage.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import router from '../router/index.js'
import errorCode from './error-code.js'


axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8"

const service = axios.create({
    baseURL: "http://localhost:8081/"
})


// 请求拦截
service.interceptors.request.use(config => {
    let needAuthentication = config.needAuthentication

    // 设置令牌
    if (needAuthentication && getToken()) {
        
        config.headers['token'] = getToken()
    }

    return config
}, error => {
    console.error(error)
    Promise.reject(error);
})



// 响应拦截
service.interceptors.response.use(
    response => {
        // 服务器响应的数据中的状态码
        const code = response.data.code || 200
        console.log(code)
        if (code === 200) return response.data.data;
        const msg = errorCode.get(code)
        if (code === 401) {
            ElMessageBox.confirm(
                '需要登录之后才能继续该操作，是否立马登录？',
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '稍后',
                    type: 'warning',
                }
            ).then(() => {
                router.replace('/login')
                console.log("ok")
            })
        } else if (msg) {
            ElMessage.error(msg)
            // alert(msg)
        } else {
            ElMessage.warning(response.data.msg || '发生了未知错误')
            alert("发生未知错误")
        }

        // 这里需要显式返回 Promise.reject，否则会返回 undefined
        return Promise.reject('error')  // 添加了return
    },
    
    error => {
        console.error(error)
        return Promise.reject(error); // 这里需要显式返回Promise.reject
    }
);


export default service

import axios from 'axios'
import { getToken } from './storage.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import router from '../router/index.js'
import errorCode from './error-code.js'

axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8"

const service = axios.create({
    baseURL: "http://localhost:8081/",
    timeout: 5000 // 可以根据需要设置超时时间
})


// 请求拦截
service.interceptors.request.use(config => {
    let needAuthentication = config.needAuthentication

    // 设置令牌
    if (needAuthentication && getToken()) {
        config.headers['token'] = getToken()
    }

    // 如果请求数据是 FormData 类型，则删除默认的 Content-Type，让 Axios 自动处理
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        // 设置默认的 Content-Type 为 application/json
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    return config
}, error => {
    console.error(error)
    return Promise.reject(error);
})


// 响应拦截
service.interceptors.response.use(
    async response => {
        // 检查响应类型
        if (response.config.responseType === 'blob') {
            // 如果是文件下载，直接返回 response，不进行处理
            return response;
        }

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
            })
        } else if (msg) {
            ElMessage.error(msg)
        } else {
            ElMessage.warning(response.data.msg || '发生了未知错误')
        }

        // 显式返回 Promise.reject
        return Promise.reject('error')
    },
    async error => {
        console.error(error)

        if (error.response && error.response.config.responseType === 'blob') {
            // 处理 blob 类型的错误响应
            try {
                // 将 Blob 转换为文本
                const errorText = await error.response.data.text();
                // 解析为 JSON 对象
                const errorData = JSON.parse(errorText);
                // 根据错误信息进行处理
                const code = errorData.code || error.response.status;
                const msg = errorCode.get(code) || errorData.msg || '发生了未知错误';

                ElMessage.error(msg);

                return Promise.reject(errorData);
            } catch (e) {
                // 无法解析错误信息
                ElMessage.error('文件下载失败');
                return Promise.reject(error);
            }
        } else {
            // 处理非 blob 类型的错误响应
            const code = error.response ? error.response.status : 500;
            const msg = errorCode.get(code) || error.message || '发生了未知错误';

            ElMessage.error(msg);

            return Promise.reject(error);
        }
    }
);

export default service

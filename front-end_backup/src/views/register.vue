<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
        <!-- 整一个表格 -->
        <div class="bg-white fade p-8 rounded-lg shadow-lg w-full max-w-md ">

            <h2 class="text-2xl font-bold text-center ">欢迎注册</h2>


            <form @submit.prevent="submitRegisterForm" class="space-y-4">

                <!-- 注册邮箱 -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Message class="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="email" v-model="ruleForm.email" type="email" placeholder=""
                            class="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>

                <!-- 注册用户名 真实姓名 -->
                <div>
                    <label for="userName" class="block text-sm font-medium text-gray-700">创建用户名</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User class="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="userName" v-model="ruleForm.userName" type="text" placeholder=""
                            class="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>



                <!-- 创建密码 -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">创建密码</label>
                    <div class="mt-1 relative rounded-md shadow-sm">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock class="h-5 w-5 text-gray-400" />
                        </div>
                        <input id="password" v-model="ruleForm.password" type="password" placeholder=""
                            class="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>

                <!-- 验证密码 -->
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">验证密码</label>
                    <div class="mt-1 relative rounded-md shadow-sm">

                        <input id="confirmPassword" v-model="ruleForm.confirmPassword" type="password"
                            placeholder="请再次输入密码"
                            class=" w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            @input="validatePassword" @focus="hasInteracted = true">

                        <!-- 错误图标：当用户交互过且密码无效时显示 -->
                        <div v-if="hasInteracted && !isPasswordValid"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>

                        <!-- 正确图标：当密码有效时显示 -->
                        <div v-if="hasInteracted && isPasswordValid"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-6.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-2-2z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>


                    </div>
                </div>


                <!-- 登录按钮 -->
                <div>
                    <button type="submit" :disabled="isRegistering"
                        class="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        {{ isRegistering ? '正在注册...' : '注册' }}
                    </button>
                </div>




            </form>

        </div>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { register } from '../api/user'
import { User, Lock, Message } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
import router from "../router/index";


let ruleForm = reactive({
    email: "",
    userName: "",
    password: "",
    confirmPassword: ""
});


const isRegistering = ref(false)

// 密码和验证状态

const isPasswordValid = ref(false);
const hasInteracted = ref(false);  // 新增状态，用于跟踪用户是否与输入框交互

// 验证密码
const validatePassword = () => {

    isPasswordValid.value = ruleForm.confirmPassword === ruleForm.password;

};

function submitRegisterForm() {
    if (!ruleForm.userName || !ruleForm.password || !ruleForm.email) {

        ElMessage({
            message: "输入不能为空",  // 提示的消息内容
            type: "error",          // 消息的类型，比如 'success', 'warning', 'info', 'error'
            showClose: true,          // 是否显示关闭按钮
            duration: 3000
        });
        return;
    }

    if (!isPasswordValid) {

        // ElMessage("两次输入密码不符")
        ElMessage({
            message: "两次输入密码不符",  // 提示的消息内容
            type: "error",          // 消息的类型，比如 'success', 'warning', 'info', 'error'
            showClose: true,          // 是否显示关闭按钮
            duration: 3000
        });

    }
    isRegistering.value = true;


    register(ruleForm.email, ruleForm.userName, ruleForm.password)
        .then(() => {
            router.push("/login")
            ElMessage({
            message: "注册成功,请重新登录",  // 提示的消息内容
            type: "success",          // 消息的类型，比如 'success', 'warning', 'info', 'error'
            showClose: true,          // 是否显示关闭按钮
            duration: 3000
        });
        }
        )
        .catch((err) => {

            // ElMessage("注册出现了错误")
            router.push("/login")
            ElMessage({
            message: "注册出现了错误",  // 提示的消息内容
            type: "error",          // 消息的类型，比如 'success', 'warning', 'info', 'error'
            showClose: true,          // 是否显示关闭按钮
            duration: 3000
        });
            console.log(err)
        })
        .finally(() => {
            isRegistering.value = false;
        })
}



</script>


<style scoped>
.fade {
    animation: fadeIn 1s;

}

@keyframes fadeIn {
    0% {

        opacity: 0;

        /* opacity: 0; */
    }

    100% {
        opacity: 1;
    }
}
</style>
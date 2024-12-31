<template>
    <div class="contact-us-wrapper">
        <h2>与我们联系</h2>
        <div class="yellow-line"></div>
        <div class="contact-us">

            <!-- 电话和邮箱 -->
            <div class="contact-way">
                <h3>电话和邮箱</h3>
                <p>电话：400-123-4567</p>
                <p>邮箱：contact@example.com</p>
            </div>

            <!-- 线下联系 -->
            <div class="contact-way">
                <h3>办公地点</h3>
                <p>余杭：余杭街道禹航路66-3号浙江德裕科技楼1008室</p>
                <p>临平：南苑街道人民大道652-30号(三楼)</p>
            </div>

            <!-- 填写需求表单 -->
            <div class="contact-way">
                <h3>线上申请</h3>
                <p>3分钟快速让我们了解您的项目需求</p>
                <button class="contact-us-button" @click="handleClick">
                    填写项目需求表
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const handleClick = () => {
    if (!store.getters.isLogined) {
        ElMessageBox.confirm(
            '您需要登录才能填写需求表单，是否立即登录？',
            '提示',
            {
                confirmButtonText: '去登录',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(() => {
                router.push('/login')
            })
    } else {
        router.push("/request")
    }
}
</script>

<style scoped>
.contact-us-wrapper {
    text-align: center;
    background-color: #f7f7f7; /* 背景色改为浅灰 */
    padding: 50px 20px; /* 增加上下内边距 */
    border-radius: 8px; /* 为容器添加圆角 */
}

.contact-us {
    width: 100%;
    margin-top: 30px;
    height: auto; /* 动态高度适应内容 */
    background-color: #ffffff; /* 卡片背景为白色 */
    color: #333333; /* 文字颜色为深灰 */
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 三列布局 */
    gap: 20px; /* 增加网格间距 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    border-radius: 12px; /* 为网格容器添加圆角 */
}

.contact-way {
    background-color: #ffffff; /* 单个联系方式背景为白色 */
    border-radius: 12px; /* 单个联系方式圆角 */
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
}

.contact-way h3 {
    color: #555555; /* 标题颜色更浅 */
    margin-bottom: 10px;
    font-size: 18px; /* 标题大小 */
    text-transform: uppercase; /* 全部大写，增加层次感 */
}

.contact-way p {
    margin: 5px 0;
    color: #777777; /* 描述文字颜色更浅 */
    font-size: 15px; /* 描述文字大小更小 */
}

.contact-us-button {
    display: inline-block;
    background-color: #ffc107; /* 按钮背景改为蓝色 */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: white; /* 按钮文字颜色为白色 */
    transition: background-color 0.3s, transform 0.3s; /* 添加过渡效果 */
    border-radius: 8px; /* 按钮圆角 */
}

.contact-us-button:hover {
    background-color: #ffc107 !important; /* 鼠标悬停时按钮背景更深 */
    transform: scale(1.05); /* 鼠标悬停时轻微放大 */
}

.yellow-line {
    width: 50px;
    height: 5px;
    background-color: #ffc107; /* 替换黄色线条为蓝色 */
    margin: 0 auto 30px auto;
    border-radius: 2px; /* 添加圆角 */
}
</style>

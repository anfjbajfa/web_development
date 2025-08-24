<template>
    <HonorTemplete :HonorTitle='title' :HonorData="HonorData" :mediaHeight="height"></HonorTemplete>
</template>

<script setup>
import HonorTemplete from '../components/HonorTemplete.vue';
import { ref } from 'vue'
const title = "体系证书荣誉时间线";

const HonorData = ref([
    {
        date: '2024年 8月',
        image: '/Honor/system/20240822杭州跨远测绘有限公司  FW监一换证  中英文(1)_01.png', 
        text: '售后服务认证证书'
    },
    {
        date: '2024年 8月',
        image: '/Honor/system/20240822杭州跨远测绘有限公司 企业信用评价监一换证  中英文(1)_01.png',
        text: '企业信用评价认证证书'
    },
    {
        date: '2024年 9月',
        image: '/Honor/system/20240925环境管理体系认证证书_00.png',
        text: '环境管理体系认证证书'
    },
    {
        date: '2024年 9月',
        image: '/Honor/system/20240925职业健康安全管理体系认证证书_00.png',
        text: '职业健康安全管理体系认证证书'
    },
     {
        date: '2024年 9月',
        image: '/Honor/system/20240925质量管理体系认证证书_00.png',
        text: '质量管理体系认证证书'
    },
    {
        date: '2024年 9月',
        image: '/Honor/system/20240925质量管理体系认证证书_00.png',
        text: '质量管理体系认证证书'
    },
    {
        date: '2024年 11月',
        image: '/Honor/system/20241118信息安全管理体系认证证书（中文）_00.png',
        text: '信息安全管理体系认证证书'
    },
    {
        date: '2024年 11月',
        image: '/Honor/system/20241118信息技术服务管理体系认证证书（中文）_00.png',
        text: '信息技术服务管理体系认证证书'
    },
  

]);

const height = 50

</script>
<template>
    <HonorTemplete :HonorTitle='title' :HonorData="HonorData" :mediaHeight="height"></HonorTemplete>
</template>

<script setup>
import HonorTemplete from '../components/HonorTemplete.vue';
import { ref } from 'vue'
const title = "著作荣誉时间线";


const HonorData = ref([
    {
        date: '2018年 12月',
        image: '/Honor/zhuzuo/软件著作13个_00.png', 
        text: '一体化项目系统管理软件'
    },
    {
        date: '2018年 12月',
        image: '/Honor/zhuzuo/软件著作13个_01.png',
        text: '宗地数据采集软件'
    },
    {
        date: '2019年 11月',
        image: '/Honor/zhuzuo/软件著作13个_09.png',
        text: '野外便携式多功能测绘平台'
    },
    {
        date: '2019年 12月',
        image: '/Honor/zhuzuo/软件著作13个_07.png',
        text: '协同作业系统'
    },
    {
        date: '2020年 6月',
        image: '/Honor/zhuzuo/软件著作13个_02.png',
        text: 'GIS地理测绘定位系统'
    },
    {
        date: '2020年 6月',
        image: '/Honor/zhuzuo/软件著作13个_03.png',
        text: '地理测绘报告自动生成系统'
    },
    {
        date: '2020年 6月',
        image: '/Honor/zhuzuo/软件著作13个_04.png',
        text: '可视化展示系统'
    },
    {
        date: '2020年 6月',
        image: '/Honor/zhuzuo/软件著作13个_05.png',
        text: '房产测绘数据信息管理系统'
    },
    {
        date: '2020年 8月',
        image: '/Honor/zhuzuo/软件著作13个_06.png',
        text: '2020省测绘与地理信息工程奖'
    },
    
    {
        date: '2020年 8月',
        image: '/Honor/zhuzuo/软件著作13个_08.png',
        text: '遥感式多功能测绘系统'
    },

    {
        date: '2020年 8月',
        image: '/Honor/zhuzuo/软件著作13个_10.png',
        text: '智慧测绘航测系统'
    },

    {
        date: '2020年 12月',
        image: '/Honor/zhuzuo/软件著作13个_11.png',
        text: '测绘数据采集信息管理系统'
    },

]);

const height = 50

</script>
<template>
  <HonorTemplete :HonorTitle='title' :HonorData="HonorData" :mediaHeight="height"></HonorTemplete>
</template>

<script setup>
import HonorTemplete from '../components/HonorTemplete.vue';
import {ref} from 'vue'
const title = "职称荣誉时间线";


const HonorData = ref([
  {
    date: '2014年 12月',
    image: '/Honor/zhicheng/201412擎天半岛（一期）-杭州跨远测绘有限公司_00.png', // 或者你想要的图片URL
    text: '杭州市优秀测绘二等奖'
  },
  {
    date: '2016年 6月',
    image: '/Honor/zhicheng/201606西溪景苑-杭州跨远测绘有限公司_00.png',
    text: '杭州市优秀测绘二等奖'
  },
  {
    date: '2016年 12月',
    image: '/Honor/zhicheng/201612农林集团职工安置房瓶窑区块项目-杭州跨远测绘有限公司_00.png',
    text: '2016省测绘与地理信息工程奖'
  },
  {
    date: '2018年 8月',
    image: '/Honor/zhicheng/201808中国人工智能-杭州跨远测绘有限公司_00.png',
    text: '2018市优秀测绘与地理信息银奖'
  },
  {
    date: '2020年 8月',
    image: '/Honor/zhicheng/202008杭报金都文创大厦-杭州跨远测绘有限公司_00.png',
    text: '2020市优秀测绘与地理信息银奖'
  },
  {
    date: '2020年 10月',
    image: '/Honor/zhicheng/202010 2020中国地理信息产业最具活力中小企业-杭州跨远测绘有限公司_00.png',
    text: '最具活力小型企业'
  },
  {
    date: '2020年 10月',
    image: '/Honor/zhicheng/202010杭州云泰购物中心有限公司（二期）测绘工程-杭州跨远测绘有限公司_00.png',
    text: '2020省测绘与地理信息工程奖'
  },
  {
    date: '2022年 8月',
    image: '/Honor/zhicheng/202208尚棠源筑项目市奖 杭州跨远测绘有限公司_00.png',
    text: '2022市优秀测绘与地理信息银奖'
  },

  {
    date: '2023年 8月',
    image: '/Honor/zhicheng/202308之江实验室仪器工程-园区工程（东区、西区）市奖 杭州跨远测绘有限公司_00.png',
    text: '2023市优秀测绘与地理信息银奖'
  },

  {
    date: '2023年 9月',
    image: '/Honor/zhicheng/202309临平街道2022年老旧住宅综合改造提升项目一区块-2023浙江省优秀测绘与地理信息工程奖  杭州跨远测绘有限公司_00.png',
    text: '2023省测绘与地理信息工程奖'
  },

  {
    date: '2024年 9月',
    image: '/Honor/zhicheng/20240904 2024地理信息产业优秀工程银奖-杭州跨远测绘有限公司.png',
    text: '2024地理信息产业优秀工程银奖'
  },


]);


const height = 30
</script>
<template>
  <ServiceDetailTemplete :cards="cardsData" :serviceTheme="themeData"/>
</template>

<script setup>
import ServiceDetailTemplete from '../components/ServiceDetailTemplete.vue';
import { ref } from 'vue'
const cardsData = ref([
  {img:`/service/xinxi.jpg`,
    title: '信息中心地形图（规划选址用）',
    needMaterials:["准确的用地红线","准确的项目名称","营业执照复印件（复印件）","余杭区基础测绘成果使用申请表","基础测绘成果提供授权委托书","测绘项目委托单","情况说明(若需要)"],
    returnMaterials:["1:500或1:1000现状地形图 6份"] },
])

const themeData = ref("GIS业务输入与输出")

</script>

<style scoped>

</style>
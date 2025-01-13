<template>
  <ServiceDetailTemplete :cards="cardsData" :serviceTheme="themeData"/>
</template>

<script setup>
import ServiceDetailTemplete from '../components/ServiceDetailTemplete.vue';
import { ref } from 'vue'

const cardsData = ref([
  { img:`${import.meta.env.BASE_URL}/service/renfang.jpg`,
    title: '人防测量', 
    needMaterials: 
    ["人防部门划定的人防红线图(原件)","地下室人防区战时平面图电子版"]
    ,
    returnMaterials:
    ["人防测绘竣工报告 4份"]
  },
  { img:`${import.meta.env.BASE_URL}/service/lvhua.jpg`,
  title: '绿化测量', 
  needMaterials:["建设工程规划许可证正本、附件、附图（复印件)","与建设工程规划许可证附图一致的CAD电子版（总图，复印件)","建设工程规划许可证批后修改相关材料及图件（若有）"],
  returnMaterials:["绿地面积测量统计资料 4份","绿地测绘成果图 4份"]
},
  
  { img:`${import.meta.env.BASE_URL}/service/jungong.jpg`,
  title: '规划竣工测量', 
  needMaterials: ["土地证复印件","建设工程规划许可证正本、附件、附图（复印件）","建设工程规划许可证批后修改相关材料及图件（若有）","建筑工程施工许可证正本、附件（复印件）","与建设工程规划许可证附图一致的CAD电子版（总图及建施图）","幢号对照表","门牌号码登记表"],
  returnMaterials:["建设项目竣工测绘报告 4份","地形图 4份","竣工图 4份4","竣工附图 4份"]
},
  { img:`${import.meta.env.BASE_URL}/service/fangyang.png`,
    title: '定位放样、灰线检验、±0.000检测', 
    needMaterials:["土地证复印件", "建设工程规划许可证正本、附件、附图复印件","建设工程规划许可证批后修改相关材料及图件（若有）","建筑工程施工许可证正本、附件5","与建设工程规划许可证附图一致的CAD电子版（总图及建施图)"],
    returnMaterials:["放样成果报告 4份" ,"建设项目灰线验线单 1份","±0.000检测报告 4份"]
  },
])

const themeData = ref("工程测绘业务输入与输出")

</script>

<style scoped>

</style>
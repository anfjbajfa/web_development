<template>
    <SwiperLearnMoreTemplete :blocks="data"></SwiperLearnMoreTemplete>
</template>

<script setup>
import { ref } from 'vue';
import SwiperLearnMoreTemplete from '../components/SwiperLearnMoreTemplete.vue';

const data = ref([
    {
        title: '什么是测绘？',
        imageUrl: `${import.meta.env.BASE_URL}/whatCeHui/shenmeshicehui.jpg`,
        description: `测绘是一门综合性技术与科学，它通过精密仪器和数据处理手段，来捕捉并记录地表、地下乃至空中和海洋中的地理信息。从地形图绘制到遥感摄影，从无人机航测到3D建模，测绘技术贯穿着城市规划、交通建设、环境监测、国防安全等多重领域，是一切“空间数据”应用的基础。`
    },
    {
        title: '我们的强项',
        imageUrl: `${import.meta.env.BASE_URL}/whatCeHui/advantage.jpg`,
        description: `我们拥有先进的测绘设备与专业团队，不仅熟悉传统的地面测量和工程测绘，还能灵活运用无人机航测、激光雷达扫描及智能数据分析技术。我们注重高精度与高效率，能够快速、准确地完成各类测绘任务。同时，我们具备丰富的项目实战经验，无论是大规模城市规划还是小型土地测绘，都能提供量身定制的解决方案。`
    },
    {
        title: '我们带来的价值',
        imageUrl: `${import.meta.env.BASE_URL}/whatCeHui/weilai.jpg`,
        description: `通过我们精准的测绘数据与专业服务，您可以在规划、建设、决策等各环节做到心中有数、胸有成竹。从节约工程成本到提升施工安全，从优化资源配置到保护生态环境，都能从可靠的测绘成果中受益。我们始终以“让数据为决策赋能”为使命，致力于为客户打造高品质、高可靠的测绘解决方案。`
    }
])
</script>

<style scoped></style>
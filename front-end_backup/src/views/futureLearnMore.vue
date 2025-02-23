<template>
    <SwiperLearnMoreTemplete :blocks="data"></SwiperLearnMoreTemplete>
</template>

<script setup>
import { ref } from 'vue';
import SwiperLearnMoreTemplete from '../components/SwiperLearnMoreTemplete.vue';

const data = ref([
    {
        title: 'AI驱动的智能测绘',
        imageUrl: `/aiCeHui/intelligent_mapping.webp`,
        description: `结合人工智能技术，智能测绘能够自动识别和分类地理特征，实现高效的数据采集与处理。通过深度学习算法，系统能够从海量数据中提取有价值的信息，提升测绘精度和工作效率，推动测绘过程的全面智能化。`
    },
    {
        title: '实时数据分析与决策支持',
        imageUrl: `/aiCeHui/real_time_analysis.webp`,
        description: `利用AI技术进行实时数据分析，提供即时的决策支持。无论是城市规划、交通管理还是环境监测，AI+测绘能够快速处理和分析动态数据，帮助决策者做出科学、准确的判断，提升项目的响应速度和执行效果。`
    },
    {
        title: '无人机与AI的完美结合',
        imageUrl: `/aiCeHui/drone_ai.webp`,
        description: `无人机搭载智能传感器和AI算法，实现自主飞行与数据采集。通过自动路径规划、目标识别和障碍物避让，无人机在复杂环境中也能高效完成测绘任务。AI技术的加入，不仅提高了无人机的操作安全性，还大幅提升了数据的准确性和完整性。`
    },
    {
        title: '三维建模与虚拟现实',
        imageUrl: `/aiCeHui/3d_modeling.webp`,
        description: `AI+测绘技术支持高精度的三维建模与虚拟现实应用。通过激光雷达和深度学习算法，生成逼真的三维地形和建筑模型，广泛应用于城市规划、建筑设计和虚拟旅游等领域。虚拟现实技术的结合，使得用户能够沉浸式地体验和互动，增强了测绘数据的实用性和展示效果。`
    },
    {
        title: '智能环境监测与保护',
        imageUrl: `/aiCeHui/environment_monitoring.webp`,
        description: `AI+测绘在环境监测与保护中发挥着重要作用。通过实时数据采集与智能分析，监测环境变化、污染源分布和生态状况。AI算法能够预测环境趋势，辅助制定科学的保护措施，实现可持续发展的目标，保障生态环境的健康与稳定。`
    },
])
</script>
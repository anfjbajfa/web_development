<template>
    <SwiperLearnMoreTemplete :blocks="data"></SwiperLearnMoreTemplete>
</template>

<script setup>
import { ref } from 'vue';
import SwiperLearnMoreTemplete from '../components/SwiperLearnMoreTemplete.vue';

const data = ref([
    {
        title: '智能数据库管理系统',
        imageUrl: `/digitalCeHui/intelligent_db.webp`,
        description: `我们的智能数据库管理系统专为测绘数据设计，支持高效的数据存储、检索和管理。利用关系型和非关系型数据库技术，系统能够处理海量的地理空间数据，提供快速的查询响应和数据一致性保障。同时，集成的自动备份与恢复机制，确保数据的安全性和可靠性，满足各类复杂测绘项目的需求。`
    },
   
    {
        title: '数据安全与隐私保护',
        imageUrl: `/digitalCeHui/data_security.webp`,
        description: `我们高度重视数据的安全性与隐私保护，采用多层次的安全策略，确保测绘数据在存储、传输和访问过程中的安全。包括数据加密、访问控制、身份验证和审计日志等措施，有效防止数据泄露和未授权访问。无论是政府项目还是企业应用，您的数据都将在我们的保护下安全无忧。`
    },
    {
        title: '智能数据可视化工具',
        imageUrl: `/digitalCeHui/data_visualization.webp`,
        description: `通过智能数据可视化工具，我们将复杂的测绘数据转化为直观、易懂的图表和地图展示。支持多种可视化形式，如3D建模、热力图和动态图表，帮助用户快速理解和分析空间数据。无论是内部报告还是对外展示，数据可视化工具都能提升信息传达的效果和影响力。`
    },
])
</script>
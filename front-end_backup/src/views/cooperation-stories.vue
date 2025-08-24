<template>
  <navbar></navbar>
  <div class="story-container">
    <div class="story-content" v-if="currentStory">
      <h1>{{ currentStory.title }}</h1>
      <div class="story-image">
        <img :src="currentStory.image" :alt="currentStory.title">
      </div>
      <div class="story-detail">
        <h2>项目背景</h2>
        <p>{{ currentStory.background }}</p>
        <h2>合作成果</h2>
        <p>{{ currentStory.achievement }}</p>
        <h2>项目影响</h2>
        <p>{{ currentStory.impact }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import navbar from '../components/navbar.vue'

const route = useRoute()
const currentStory = ref(null)

// 故事数据
const storyData = {
  yayun: {
    title: '2024亚运会空间数据支持',
    image: '/stories/story1.jpg',
    background: '杭州亚运会是展示城市数字化转型成果的重要平台。我们受邀为亚运会场馆提供全方位的空间数据支持服务。',
    achievement: '完成了40余个亚运场馆的三维建模工作，构建了完整的亚运场馆数字孪生系统，为智慧亚运提供了坚实的数据基础。',
    impact: '项目成果直接服务于亚运会的智慧化运营，推动了体育场馆数字化建设的标准化进程。'
  },
  damo: {
    title: '阿里巴巴达摩院测绘项目',
    image: '/stories/story2.jpg',
    background: '阿里巴巴达摩院作为全球顶尖的科研机构，需要高精度的空间数据支持其智慧园区建设。',
    achievement: '完成了达摩院园区的高精度三维建模，构建了完整的BIM+GIS一体化平台。',
    impact: '项目成为智慧园区建设的标杆案例，推动了BIM+GIS技术在商业场景中的应用。'
  },
  xincheng: {
    title: '临平新城规划项目',
    image: '/stories/story3.jpg',
    background: '临平新城作为杭州城北的新中心，需要科学的空间规划和数据支持。',
    achievement: '完成了临平新城核心区域的三维建模和空间分析，为城市规划提供了数据支持。',
    impact: '项目助力临平新城的科学发展，为杭州城北打造了新的增长极。'
  }
}

onMounted(() => {
  const storyId = route.params.id
  currentStory.value = storyData[storyId]
})
</script>

<style scoped>
.story-container {
  padding: 40px 5%;
  margin-top: 3.5%;
}

.story-content {
  max-width: 1200px;
  margin: 0 auto;
}

.story-image {
  width: 100%;
  height: 400px;
  margin: 20px 0;
  overflow: hidden;
  border-radius: 8px;
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.story-detail {
  margin-top: 40px;
}

h2 {
  font-size: 1.8em;
  color: #444;
  margin: 30px 0 15px 0;
}

p {
  font-size: 1.1em;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}
</style>
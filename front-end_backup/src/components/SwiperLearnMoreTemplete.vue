<template>
  <!-- 导航栏，可复用 -->
  <navbar />
  
  <!-- 内容容器 -->
  <div class="learn-more-container" v-for="(block,index) in blocks" :key="index" v-fade v-lazy>
    <!-- 标题 -->
    <h2 class="learn-more-title" v-if="block.title">
      {{ block.title }}
    </h2>
    <div class="yellow-line"></div>
    
    <!-- 图片 -->
    <img
      v-if="block.imageUrl"
      :src="block.imageUrl"
      alt="展示图片"
      class="learn-more-image"
    />
    
    <!-- 描述文字 -->
    <p
      class="learn-more-description"
      v-if="block.description"
    >
      {{ block.description }}
    </p>
  </div>
</template>

<script setup>
import navbar from '../components/navbar.vue'

const props = defineProps({
  blocks:{
    type:Array,
    default: ()=>[]
  }
})

</script>

<style scoped>
.learn-more-container {
  /* 容器居中 */
  width: 60vw;   /* 限制宽度，避免大屏幕过于分散 */
  margin: 5% auto;     /* 水平居中 */
  text-align: center; /* 文本居中 */
}

/* 标题样式 */
.learn-more-title {
  font-weight: 600;
  margin-bottom: 1%;
}

/* 图片样式 */
.learn-more-image {
  width: 70%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* 描述文字 */
.learn-more-description {
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  white-space: pre-line;
  max-width: 60%;
  text-align: justify;  
  margin: 0 auto;       
}

@media screen and (max-width: 768px){
  .learn-more-container {
    width: 100vw;
    margin: 15% auto;     /* 水平居中 */
  }
}
</style>

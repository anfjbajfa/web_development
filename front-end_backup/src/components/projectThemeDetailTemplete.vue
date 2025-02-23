<template>
  <Navbar></Navbar>
  <div class="project-theme-detail-constainer">
    <section class="timeline-section" v-fade>
      <div class="timeline-container">
        <div class="timeline-bar">
          <div v-for="(step, index) in timelineSteps" :key="step.id" class="timeline-segment"
            :style="{ backgroundColor: step.color }">
          </div>
        </div>

        <div class="timeline-points">
          <div v-for="(step, index) in timelineSteps" :key="step.id" class="timeline-point"
            :style="{ left: `${(index / timelineSteps.length) * 100}%` }">
            <!-- 上面部分是圆和竖线 -->
            <template v-if="index % 2 === 0">
              <div class="point-content top">
                <div class="circle-line-group">
                  <div class="point-circle" :style="{ backgroundColor: step.color }" @click="scrollToArticle(step.id)">
                    {{ step.id }}
                  </div>
                  <div class="vertical-line" :style="{ backgroundColor: step.color }"></div>
                </div>
                <div class="point-description">
                  <p class="point-title" :style="{ color: step.color }">
                    {{ step.title }}
                  </p>
                  <p class="point-text">{{ step.description }}</p>
                </div>
              </div>
            </template>

            <!-- 下面部分是圆和竖线 -->
            <template v-else>
              <div class="point-content bottom">
                <div class="point-description">
                  <p class="point-title" :style="{ color: step.color }">
                    {{ step.title }}
                  </p>
                  <p class="point-text">{{ step.description }}</p>
                </div>
                <div class="circle-line-group">
                  <div class="vertical-line" :style="{ backgroundColor: step.color }"></div>
                  <div class="point-circle" :style="{ backgroundColor: step.color }" @click="scrollToArticle(step.id)">
                    {{ step.id }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>


    </section>

    <section class="timeline-article">
      <div v-for="(article, index) in timelineArticle" :key="article.id" class="article-wrapper" v-fade v-lazy
        :ref="el => articleRefs[article.id] = el">
        <h2 class="article-title">
          {{ article.title }}
        </h2>
        <div class="cutting-line"></div>
        <div class="article-content">
          {{ article.content }}
        </div>
        <img v-if="article.img" :src="article.img" alt="项目图片" class="article-img">
      </div>
    </section>

    <section class="other-story" v-fade v-lazy>
    <div class="story-header">
      <h2 class="article-title" style="font-size: 1.3rem;">
        别的项目故事
      </h2>
      <div class="nav-buttons">
          <button class="nav-btn prev" @click="swiperRef?.slidePrev()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button class="nav-btn next" @click="swiperRef?.slideNext()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
    </div>
      <div class="cutting-line"></div>


      <Swiper :modules="[Navigation]" :slides-per-view="3" :breakpoints="swiperBreakpoints" space-between="10" class="other-stories-swiper" @swiper="onSwiper">
        <SwiperSlide v-for="(story, index) in otherStories" :key="index" class="story-slide">
          
          <div class="story-card">
            <img :src="story.img" alt="别的项目图片" class="story-img" />
            <div class="story-detail">
              <RouterLink :to="story.route" style=" color:black">
              <h3 class="story-title">{{ story.title }}</h3>
            </RouterLink>
              <p class="story-description">{{ story.desc }}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

    </section>
  </div>


</template>

<script setup>
import Navbar from "./navbar.vue"
import { computed, ref } from "vue"

import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"

// 3. Swiper 样式（必须）
import "swiper/css"


// Swiper breakpoints 配置
const swiperBreakpoints = {
  100: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  1000: {
    slidesPerView: 3,
    spaceBetween: 15,
  }
}

const swiperRef = ref(null)

const onSwiper = (swiper) => {
  swiperRef.value = swiper
}

const props = defineProps({
  timelineSteps: {
    type: Array
  },
  timelineArticle: {
    type: Array
  },
  otherStories: {
    type: Array,
  }
})

// 存储DOM元素
const articleRefs = ref({});

const scrollToArticle = (id) => {
  const articleElement = articleRefs.value[id];
  if (articleElement) {
    articleElement.scrollIntoView({ behavior: "smooth", block: "end" })
  }
}

</script>

<style scoped>
.project-theme-detail-constainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1600px;
  padding: 2% 3%;
  box-sizing: border-box;
  margin-top: 18%;
  min-height: 50vh;
  align-items: center;
  margin-bottom: 20px; /* 增加下边距 */
}

.timeline-section {
  width: 100%;
  position: relative;
}

.timeline-container {
  display: flex;
  width: 100%;
  align-items: center;
}


.timeline-bar {
  width: 100%;
  height: 40px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
}

.timeline-segment {
  flex: 1;
}

/* 用绝对定位来实现覆盖 */
.timeline-points {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.timeline-point {
  position: absolute;
  width: 25%;
  height: 100%;
}

.point-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.point-content.top {
  position: relative;
}


.point-content.top .circle-line-group {
  position: absolute;
  bottom: 100%;
  /* 往上方提 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.point-content.top .point-description {
  position: absolute;
  top: 100%;
  /* 往下方放 */
  text-align: center;
  margin-top: 30%;
}

.point-content.bottom {
  position: relative;
}

.point-content.bottom .point-description {
  position: absolute;
  bottom: 100%;
  /* 往上放 */
  text-align: center;
  margin-bottom: 25%;
}

.point-content.bottom .circle-line-group {
  position: absolute;
  top: 100%;
  /* 放到下方 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

/* 圆圈 */
.point-circle {
  width: 8vw;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  z-index: 2;
  font-family: 'Franklin Gothic Medium'
}

.point-circle:hover {
  transform: scale(1.2);
  cursor: pointer;
}

/* 垂直线  媒体查询*/
.vertical-line {
  width: 5px;
  height: 60px;
  margin: 10px 0;
}

.point-description {
  text-align: center;
  color: #b1b0b0;
}

.point-title {
  font-size: 22px;
  font-weight: bold;
}

.timeline-article {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  margin-top: 35vh;
}

.article-wrapper {
  width: 100%;
  margin-top: 5vh;
}

.article-title {
  font-family: Georgia;
  font-size: 2rem;
  margin: 0;
  flex-wrap: nowrap;
}

.cutting-line {
  width: 100%;
  background-color: #ddd;
  height: 2px;
  margin-bottom: 15px;
}

.article-content {
  line-height: 2;
  font-family: -apple-system;
  font-size: 16px;
}

.article-img {
  height: 40vh;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

/* =-=============================================== */

.other-story {
  margin-top: 10%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 5px;
}

.nav-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: white;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: #f5f5f5;
}

/* -------------------------------- */
.other-stories-swiper {
  width: 100%;
  margin-top: 0.5rem;
  height: fit-content;
}

.story-slide {
  width: 90%;
  height: 15vh;
  display: flex;
}

.story-card {
  display: flex;
  width: 100%;
  overflow: hidden;
  gap: 5px;
}

.story-img {
  object-fit: cover;
  width: 40%;
  height: 80%;
}

.story-detail{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 左对齐 */
  text-align: left;
  max-width: 40%;
  text-decoration: none;
}

.story-title {
  margin: 0 ;
  font-size: 1rem;
}

.story-description {
  color: #666;
  font-size: 13px;
}


@media screen and (max-width: 768px) {
  .project-theme-detail-constainer {
    margin-top: 42%;
  }

  .vertical-line {
    width: 5px;
    height: 30px;
    margin: 10px 0;
  }

  .point-circle {
    width: 8vw;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    z-index: 2;
  }

  .timeline-bar {
    height: 20px;
  }


  .point-content.bottom {
    position: relative;
  }

  .point-content.bottom .point-description {
    position: absolute;
    bottom: 100%;
    /* 往上放 */
    text-align: center;
    margin-bottom: 0;
  }

  .point-content.bottom .circle-line-group {
    position: absolute;
    top: 100%;
    /* 放到下方 */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

  .timeline-article {
    margin-top: 14vh;
  }

  .article-wrapper {
    width: 100%;
    margin-top: 4vh;
  }

  .nav-btn {
  width: 25px;
  height: 25px;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: white;
  transition: background-color 0.2s;
}

.story-title {
  margin: 0 ;
  font-size: 0.8rem !important;
  margin-bottom: 0;
}

.story-img {

  height: 100%;
}
}
</style>
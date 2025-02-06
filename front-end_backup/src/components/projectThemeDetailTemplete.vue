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

    <section class="other-story">

    </section>
  </div>


</template>

<script setup>
import Navbar from "./navbar.vue"
import { computed,ref } from "vue"

const props = defineProps({
  timelineSteps: {
    type: Array
  },
  timelineArticle: {
    type: Array
  }
})

// 存储DOM元素
const articleRefs= ref({});

const scrollToArticle=(id)=>{
  const articleElement = articleRefs.value[id];
  if(articleElement){
    articleElement.scrollIntoView({behavior:"smooth",block:"end"})
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
  height: 50vh;
  align-items: center;
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


}
</style>
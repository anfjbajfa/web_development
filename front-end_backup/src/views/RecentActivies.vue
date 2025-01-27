<template>
  <div class="recent-activites-wrapper">
    <!-- 左半部分 -->
    <div class="activity-left" v-fade>
      <h2>近期动态</h2>
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: fillWidth }"></div>
      </div>
      <!-- 左右按钮 -->
      <div class="nav-button">
        <button @click="prevSlide" class="button-style"><</button>
        <button @click="nextSlide" class="button-style">></button>
      </div>
      <!-- 公众号链接 -->
      <div class="footer-link">
        <div class="attention-block">
          <a href="javascript:void(0)" @click="showQRModal = true"
            style="text-decoration: none; color:black;font-weight: bold;cursor: pointer"
          >
            关注我们的公众号
          </a>
          <span style="font-weight: bold">-></span>
        </div>
        <div class="attention-block">
          <RouterLink to="/recruitment" style="text-decoration: none; color:black;font-weight: bold;"
            >加入我们</RouterLink
          >
          <span style="font-weight: bold">-></span>
        </div>
      </div>
    </div>

    <!-- 右半部分：使用 transition-group 让卡片有进出与位置移动动画 -->
    <div class="activity-right" v-fade>
      <!-- 通过 :name="transitionName" 来区分“下一张”或“上一张”的动画方向 -->
      <transition-group :name="transitionName" tag="div" class="slide">
        <!-- 只渲染两张卡片：displaySlides[0] 和 displaySlides[1] -->
        <div
          v-for="slide in displaySlides"
          :key="slide.id"
          class="slide-card"
        >
          <div class="slide-image-container">
            <img :src="slide.image" :alt="slide.title" class="slide-image" />
            <div class="time-tag">{{ slide.time }}</div>
          </div>
          <h3 class="slide-title">{{ slide.title }}</h3>
          <p class="slide-desc">{{ slide.description }}</p>
        </div>
      </transition-group>
    </div>

    <!-- 弹出窗口 -->
    <el-dialog
      title="扫码关注我们的公众号"
      v-model="showQRModal"
      width="30%"
      @close="showQRModal = false"
    >
      <div class="qr-code-container">
        <img
          src="/recent_activities/gongzhonghao.png"
          alt="公众号二维码"
          class="qr-code-image"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

// 控制弹窗显示
const showQRModal = ref(false)

// 示例数据：务必要给每条数据一个 `id`，以便 Vue 能区分它们是新增 / 移除 / 移动
const slides = ref([
  {
    id: 1,
    image: `/recent_activities/2025nianhui.webp`,
    title: '跨远2025迎新年会',
    description: '传承，表彰，总结，创新',
    time: '2025-01-15'
  },
  {
    id: 2,
    image: `/recent_activities/laba.webp`,
    title: '腊八福利',
    description: '全体员工欢聚一堂，共度腊八节',
    time: '2025-01-18'
  },
  {
    id: 3,
    image: `/recent_activities/ganxie.png`,
    title: '来自领导的感谢',
    description:
      '近日，跨远收到杭州市规划和自然资源局临平分局、余杭分局发来的感谢信,当局肯定了过去一年跨远的付出',
    time: '2025-01-20'
  },
])

const currentSlide = ref(0)

// 用来区分“下一张”还是“上一张”，从而在 CSS 中做不同方向的动画
const direction = ref('next')

/** 
 * 只取两张卡片：当前卡片和下一卡片 
 * 当 currentSlide 变化时，此处会返回新的数组，Vue 会增删 / 移动卡片
 */
const displaySlides = computed(() => {
  // 保证索引不越界
  const total = slides.value.length
  const firstIndex = (currentSlide.value + total) % total
  const secondIndex = (firstIndex + 1) % total

  return [slides.value[firstIndex], slides.value[secondIndex]]
})

/** 
 * 下一页 
 * 注意要修改 direction.value = 'next'，以便触发“向左滑出、右侧滑入”动画
 */
function nextSlide() {
  direction.value = 'next'
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

/** 
 * 上一页 
 * 与下一页相反的动画方向 
 */
function prevSlide() {
  direction.value = 'prev'
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

/**
 * 进度条：当前索引 / 总数
 */
const fillWidth = computed(() => {
  const total = slides.value.length
  return ((currentSlide.value + 1) / total) * 100 + '%'
})

/**
 * 根据 direction，返回不同的 transition 名称
 * 这样可以在 CSS 里分别定义“.slide-transition-next-*”和“.slide-transition-prev-*”
 */
const transitionName = computed(() => {
  return direction.value === 'next' ? 'slide-transition-next' : 'slide-transition-prev'
})
</script>

<style scoped>
/* 容器布局 */
.recent-activites-wrapper {
  height: 42vh;
  width: 100%;
  background-color: #f7f7f7;
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
}

/* 左侧区域 */
.activity-left {
  height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 15%;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  width: 70%;
  height: 3%;
  background-color: #ffffff;
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #565656;
}

.nav-button {
  display: flex;
  gap: 50%;
  margin-right: 5%;
}

/* 左右箭头按钮 */
.button-style {
  background-color: #ffcc00;
  color: #fff;
  border: none;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.button-style:hover {
  background-color: #fff;
  color: #ffcc00;
}

.footer-link {
  display: flex;
  gap: 30%;
  margin-right:12%
}
.attention-block {
  white-space: nowrap;
}

/* 右侧区域：一次展示两个 card */
.activity-right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
}

/* slide 容器：使用 <transition-group tag="div" class="slide"> */
.slide {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
}

/* 卡片本身：固定大小 */
.slide-card {
  width: 40%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative; 
  flex-shrink: 0;
}

/* 图片容器，用于相对定位时间戳 */
.slide-image-container {
  position: relative;
  width: 100%;
  height: 60%;
  overflow: hidden;
}
.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 时间标签，固定在图片右下角 */
.time-tag {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.8rem;
}

/* 标题和描述区 */
.slide-title {
  margin: 5% 0 3% 0;
  font-weight: 600;
  text-align: center;
}
.slide-desc {
  margin: 0;
  color: #333;
  flex: 1;
  overflow-y: auto;
  text-align: center;
}

/* QR Code Container */
.qr-code-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-code-image {
  max-width: 50%;
  max-height: 50vh;
}

/* 
*/
.slide-transition-next-move,
.slide-transition-prev-move {
  transition: transform 1s ease;
}

/* ===================== 下一张时的动画 ===================== */
.slide-transition-next-enter-active,
.slide-transition-next-leave-active {
  position: relative;
  transition: transform 1s ease, opacity 1s ease;
}
.slide-transition-next-enter-from {
  /* 新卡片从右侧滑入 */
  transform: translateX(100%);
  opacity: 0;
}
.slide-transition-next-leave-to {
  /* 旧卡片向左侧滑出 */
  transform: translateX(-100%);
  opacity: 0;
}

/* ===================== 上一张时的动画 ===================== */
.slide-transition-prev-enter-active,
.slide-transition-prev-leave-active {
  position: relative;
  transition: transform 1s ease, opacity 1s ease;
}
.slide-transition-prev-enter-from {
  /* 新卡片从左侧滑入 */
  transform: translateX(-100%);
  opacity: 0;
}
.slide-transition-prev-leave-to {
  /* 旧卡片向右侧滑出 */
  transform: translateX(100%);
  opacity: 0;
}


@media screen and (max-width: 768px) {
  .recent-activites-wrapper {
    display: flex;               
    flex-direction: column;      
    width: 100%;
    gap: 4%;
   
  }

  /* 2. 左侧：位于上方，自动高度 */
  .activity-left {
    width: 100%;
    height: 30%;                
    display: flex;              
    flex-direction: column;
    align-items: center;
    gap: 5%;
  }

  .activity-left h2 {
    margin:0
  }

  /* 3. 右侧：位于下方，并保持“横向卡片”布局 */
  .activity-right {
    width: 100%;
    height: 60%;              
    display: flex;
    align-items: flex-start; 
    overflow-x: hidden; 
  }

  /* 4. slide 容器：确保卡片在小屏下横向并排，不换行 */
  .slide {
    display: flex;
    flex-direction: row;         
    flex-wrap: nowrap;           
    gap:1%;
    width: 100%;
    height: 90%;
    align-items: stretch;  
  }
  
  .slide-card {
    width: 48%;
    margin: 0;
    height: auto;  
    overflow: hidden;
  }


  .slide-image-container{
    height: 60%;
  }


  .slide-title {
    font-size: 13px !important;
  }

  /* 可根据需要，修改按钮等大小 */
  .button-style {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  .time-tag{
    font-size: 0.5rem
  }
}

/* <= 480px：再进一步微调 */
@media screen and (max-width: 480px) {
  /* 也可再缩小文字字号等 */
  .button-style {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>

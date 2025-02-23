<template>
  <navbar></navbar>
  <!-- 1. 保持原有的页面结构、卡片等不变 -->
  <div class="container">
    <!-- 左侧：标题与描述 -->
    <div class="left">
      <div class="text-section">
        <h1 class="title">未来已来，<br />跨远的增长潜能超乎想象！</h1>
        <p class="subtitle">
          我们正在寻找志同道合的伙伴，携手推动行业变革，如果您有合作的意愿，请不要犹豫联系我们!
        </p>
        <p class="subtitle">
          招商热线：+86 18968063939
        </p>
      </div>
    </div>

    <!-- 右侧：图片 + 三列卡片 -->
    <div class="right">
      <!-- 图片区域 -->
      <div class="image-section">
        <img src="/business-partner.webp" alt="商业合作" />
      </div>

      <!-- 三列卡片 -->
      <div class="cards">
        <!-- 第一列：Growth -->
        <div class="card card-growth">
          <div class="pie-chart" :style="{
            background: `conic-gradient(#f18640 0% ${growthValue}%, #ebebeb ${growthValue}% 100%)`
          }">
            {{ growthValue }}%
          </div>
          <h3>净利润增长</h3>
          <p>
            接下去的三年每年净利润增长会保持在60%左右，公司现金流储备充足
          </p>
        </div>

        <!-- 第二列：Opportunity -->
        <div class="card card-opportunity">
          <div class="pie-chart" :style="{
            background: `conic-gradient(#0f5c5c 0% ${techInvest}%, #ebebeb ${techInvest}% 100%)`
          }">
            {{ techInvest }}%
          </div>
          <h3>技术投入</h3>
          <p>
            预计每年的技术投入会逐年增加，包括购买先进测绘仪器，大力发展AI等革命性技术
          </p>
        </div>

        <!-- 第三列：Decrease -->
        <div class="card card-decrease">
          <div class="pie-chart" :style="{
            background: `conic-gradient(#f7b844 0% ${opportunityValue}%, #ebebeb ${opportunityValue}% 100%)`
          }">
            {{ opportunityValue }}%
          </div>
          <h3>机遇</h3>
          <p>
            杭州的人口流入保持全国领先水平，未来对城市规划和再规划的需求会持续拉动公司业务的增长
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. 合作伙伴区域：将所有 logo 手动放在一起 -->
  <div class="partner-wrapper">
    <h2>合作伙伴</h2>
    <div class="yellow-line"></div>
    <div class="logo-slider" @mouseenter="stopSwiper" @click="handleClick" @mouseleave="handleMouseLeave">
      <Swiper class="my-swiper" :modules="[Autoplay]" direction="horizontal" :loop="true" :slides-per-view="'auto'"
        :space-between="10" :speed="4000" :autoplay="{
          delay: 4000,
          disableOnInteraction: true
        }" @swiper="onSwiperReady">
        <!-- 第一个 Slide（放 6 个 Logo） -->
        <SwiperSlide>
          <div class="logo-list">
            <div class="logo-item">
              <img src="/business-partners-logos/linpingGOV.webp" alt="临平区政府" />
              <p class="logo-alt">临平区政府</p>
            </div>
            <div class="logo-item">
              <img src="/business-partners-logos/未来科技城.jpeg" alt="未来科技城" />
              <p class="logo-alt">未来科技城</p>
            </div>
            <div class="logo-item">
              <img src="/business-partners-logos/yuhangguihua.webp" alt="余杭区规划院" />
              <p class="logo-alt">余杭区规划院</p>
            </div>
            <div class="logo-item">
              <img src="/business-partners-logos/alibab.webp" alt="阿里巴巴" />
              <p class="logo-alt">阿里巴巴</p>
            </div>
            <div class="logo-item">
              <img src="/business-partners-logos/huadongdianjian.webp" alt="华东院" />
              <p class="logo-alt">华东院</p>
            </div>
          </div>
        </SwiperSlide>

        <!-- 第二个 Slide（重复 6 个 Logo），用于实现无缝循环 -->
        <SwiperSlide>
          <div class="logo-list">
            <div class="logo-item">
              <img src="/business-partners-logos/yayun.webp" alt="亚运会" />
              <p class="logo-alt">2024亚运会</p>
            </div>
            <div class="logo-item">
              <img src="/business-partners-logos/zhejiangziran.webp" alt="未来科技城" />
              <p class="logo-alt">浙江自然资源局</p>
            </div>

            <div class="logo-item">
              <img src="/business-partners-logos/dahua.webp" alt="浙江大华" />
              <p class="logo-alt">浙江大华</p>
            </div>

            <div class="logo-item">
              <img src="/business-partners-logos/yintai.webp" alt="浙江大华" />
              <p class="logo-alt">银泰百货</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <!-- 3. 合伙故事部分 -->
  <div class="story-wrapper">
    <h2>合伙故事</h2>
    <div class="yellow-line"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import navbar from '../components/navbar.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'

/* 三个数值的响应式变量 */
const growthValue = ref(0)
const techInvest = ref(0)
const opportunityValue = ref(0)

// 页面加载后开始动画
onMounted(() => {
  animateValue(growthValue, 60, 1000)
  animateValue(techInvest, 50, 1000)
  animateValue(opportunityValue, 30, 1000)

})

function animateValue(currentRef, target, duration) {
  let start = 0
  const range = target - start
  const stepTime = Math.abs(Math.floor(duration / range))
  const timer = setInterval(() => {
    start++
    currentRef.value = start
    if (start === target) {
      clearInterval(timer)
    }
  }, stepTime)
}

/* 用于保存 Swiper 实例，便于暂停/恢复 */
const mySwiper = ref(null)

function onSwiperReady(swiper) {
  mySwiper.value = swiper
}

// 添加定时器引用
const resumeTimer = ref(null)

// 修改后的处理方法
function handleClick() {
  stopSwiper()
  // 清除已有定时器
  if (resumeTimer.value) {
    clearTimeout(resumeTimer.value)
  }
  // 设置3秒后恢复
  resumeTimer.value = setTimeout(() => {
    startSwiper()
    resumeTimer.value = null
  }, 2000)
}

function handleMouseLeave() {
  // 只有没有点击触发的定时器时才立即恢复
  if (!resumeTimer.value) {
    startSwiper()
  }
}

/* 原有swiper相关方法保持不变 */
function stopSwiper() {
  if (mySwiper.value) {
    mySwiper.value.autoplay.stop()
  }
}

function startSwiper() {
  if (mySwiper.value) {
    mySwiper.value.autoplay.start()
  }
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (resumeTimer.value) {
    clearTimeout(resumeTimer.value)
  }
})


</script>


<style scoped>
/* 1. 页面整体布局（保持不变） */
.container {
  margin-top: 3.5%;
  position: relative;
  width: 100%;
  min-height: 60vh;
  background:
    /* 兜底颜色 */
    #f5efe7
    /* 图片地址 */
    url('/honor_background.webp')
    /* 背景重复方式 */
    no-repeat
    /* 水平/垂直对齐方式 */
    center center;
  background-size: cover;
  padding: 2% 2%;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}

.left {
  display: flex;
  flex-direction: column;
}

.right {
  max-height: 60vh;
}

/* 左侧标题文字 */
.text-section {
  margin-top: 15%;
  flex: 1;
}

.title {
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 15% 0;
}

.subtitle {
  margin-top: 10%;
  font-size: 17px;
  font-weight: bold;
  color: #666;
  max-width: 400px;
}

/* 右侧图片 */
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
}

.image-section img {
  width: 100%;
  height: 90%;
  border-radius: 6px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 2. 三列卡片布局（保持不变） */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3%;
  height: 100%;
}


.card {
  margin-top: 8%;
  height: 50%;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  position: relative;
}

/* 3. 改卡片背景色，让它们和示例图更一致 */
.card-growth {
  background-color: #0f5c5c;
}

.card-opportunity {
  background-color: #f18640;
}

.card-decrease {
  background-color: #fff;
  color: #333;
  border: 2px solid #ccc;
}

/* 卡片内文字 */
.card h3 {
  margin: 15px 0 10px 0;
  font-weight: 600;
}

.card p {
  font-size: 14px;
  line-height: 1.4;
  color: inherit;
}

/* 4. 饼图及其数字样式 */
.pie-chart {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 19px;
  /* 先不设置固定背景色，交给 conic-gradient 动态生成 */
  /* 默认文字颜色为白色 */
  color: #fff;
}

/* 第三列为白底卡片，饼图文字改为深色更清晰 */
.card-decrease .pie-chart {
  color: #333;
}

/* -------------------------------------------------- */
.partner-wrapper {
  margin-top: 2%;
  justify-content: center;
  align-items: center;
}

.partner-wrapper h2 {
  text-align: center;
}

.logo-slider {
  display: flex;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  background-color: #fff;
  margin: 0 auto;
}

.logo-list {
  display: inline-flex;
  align-items: center;
  gap:20%
}

.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 0 10px
}

.logo-item img {
  height: 60px;
  aspect-ratio: 1/1;
  filter: grayscale(60%);
  opacity: 0.7;
  transition: opacity 0.3s;
}

.logo-item img:hover {
  opacity: 1;
}

.logo-alt {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
}

/* -------------------------------- */
.story-wrapper {
  text-align: center;
}


@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .left {
    margin-top: 12%;
  }

  .right {
    max-height: 60vh;
  }

  .text-section {
    margin: 0;
  }

  .title {
    font-size: 18px;
    line-height: 1.2;
    font-weight: 700;
    margin: 0;
  }

  .subtitle {
    font-weight: bold;
    color: #666;
    margin-top: 3%;
  }

  .logo-item img {
    height: 40px;
    filter: grayscale(60%);
    opacity: 0.7;
    transition: opacity 0.3s;
  }

.logo-slider {
  display: flex;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  margin: 0 auto;
 
}

.logo-list {
  display: flex;
  gap:5%;
  justify-content: center;
    align-items: center;
}

.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 3px 0 3px
}
  
  .cards {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    gap: 2%;
    align-items: stretch;
    height: auto;
  }

  .card {
    margin-top: 5px;
    width: 33%;
    padding: 10px;
    height: auto;
  }

  .card h3 {
  margin: 7px 0 5px 0;
  font-weight: 600;
}

  .pie-chart {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    /* 先不设置固定背景色，交给 conic-gradient 动态生成 */
    /* 默认文字颜色为白色 */
    color: #fff;
    font-size: 14px;
  }


}

/* 在最大宽度 480px 下再做更紧凑处理 */
@media (max-width: 480px) {

}
</style>

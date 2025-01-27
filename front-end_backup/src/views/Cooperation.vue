<template>
  <navbar></navbar>
  <div class="container">
    <!-- 左侧：标题与描述 -->
    <div class="left">
      <div class="text-section">
        <h1 class="title">未来已来，<br />跨远的增长潜能超乎想象！</h1>
        <p class="subtitle">
          我们正在寻找有创造力的伙伴，携手推动行业变革，如果您有合作的意愿，请不要犹豫联系我们!
        </p>
      </div>
    </div>

    <!-- 右侧：图片 + 三列卡片 -->
    <div class="right">
      <!-- 图片区域 -->
      <div class="image-section">
        <img src="/business-partner.png" alt="商业合作" />
      </div>

      <!-- 三列卡片 -->
      <div class="cards">
        <!-- 第一列：Growth -->
        <div class="card card-growth">
          <!-- 动态饼图 -->
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


  <div class="partner-wrapper">
    <h2>合作伙伴</h2>
    <div class="yellow-line"></div>
    <div class="logo-slider">
      <div class="logo-list">
        <!-- 循环渲染多张 Logo -->
        <div class="logo-item" v-for="(item, idx) in logos" :key="idx">
          <img :src="item.src" :alt="item.alt" />
          <p class="logo-alt">{{ item.alt }}</p>
        </div>
      </div>
    </div>
  </div>


  <div class="story-wrapper">
    <h2>合伙故事</h2>
    <div class="yellow-line"></div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import navbar from '../components/navbar.vue';

// 三个数值的响应式变量
const growthValue = ref(0);
const techInvest = ref(0);
const opportunityValue = ref(0);

// 页面加载后开始动画
onMounted(() => {
  animateValue(growthValue, 60, 1000);       
  animateValue(techInvest, 50, 1000); 
  animateValue(opportunityValue, 30, 1000);    
});

/**
 * @param currentRef  ref对象，用于存储当前值
 * @param target      目标数值
 * @param duration    动画持续时间(毫秒)
 */
function animateValue(currentRef, target, duration) {
  let start = 0;
  const range = target - start;
  // 根据数值差分配一个 step 的时间间隔
  const stepTime = Math.abs(Math.floor(duration / range));

  const timer = setInterval(() => {
    start++;
    currentRef.value = start;
    if (start === target) {
      clearInterval(timer);
    }
  }, stepTime);
}


const logos = ref([
  { src: `/business-partners-logos/linpingGOV.png`, alt: '临平区政府' },
  { src: `/business-partners-logos/未来科技城.jpeg`, alt: '未来科技城' },
  { src: `/business-partners-logos/yuhangguihua.jpg`, alt: '余杭区规划院' },
  { src: `/business-partners-logos/alibab.png`, alt: '阿里巴巴' },
  { src: `/business-partners-logos/huadongdianjian.jpg`, alt: '华东院' },
  { src: `/business-partners-logos/dahua.jpg`, alt: '浙江大华' },
]);
</script>

<style scoped>
/* 1. 页面整体布局（保持不变） */
.container {
  margin-top: 3.5%;
  position: relative;
  width: 100%;
  min-height: 60vh;
  background-color: #f5efe7;
  padding: 40px 20px;
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
  gap: 20px;
  margin-bottom: 40px;
}

.right {
  height: auto;
}

/* 左侧标题文字 */
.text-section {
  margin-top: 50px;
  flex: 1;
}

.title {
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.subtitle {
  margin: 0;
  font-size: 17px;
  color: #666;
  max-width: 400px;
}

/* 右侧图片 */
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-section img {
  width:100%;
  height: 230px;
  border-radius: 6px;
  object-fit: fill;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 2. 三列卡片布局（保持不变） */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
  min-height: 300px;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  position: relative;

}

/* 3. 改卡片背景色，让它们和示例图更一致 */
.card-growth {
  background-color: #0f5c5c;
  /* 第一列：墨绿色(示例) */
}

.card-opportunity {
  background-color: #f18640;
  /* 第二列：橘色 */
}

.card-decrease {
  background-color: #fff;
  /* 第三列：白色 */
  color: #333;
  border: 2px solid #ccc;
}

/* 卡片内文字 */
.card h3 {
  margin: 15px 0 10px 0;
  font-size: 20px;
  font-weight: 600;
}

.card p {
  font-size: 15px;
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
  margin-top: 50px;
  justify-content: center;
}

.partner-wrapper h2 {
  text-align: center;
}

.logo-slider {
  display: flex;
  width: 100vw;
  /* 全屏宽 */
  overflow-x: auto;
  /* 允许左右滚动 */
  overflow-y: hidden;
  /* 不要出现垂直滚动 */
  white-space: nowrap;
  /* 子元素在同一行显示 */
  background-color: #fff;
  justify-content: center;
  /* 如果想去掉滚动条，可以用::-webkit-scrollbar等方式自定义 */
}

.logo-list {
  display: inline-flex;
  /* 让所有logo在一行内 */
  align-items: center;
  gap: 110px;
  /* Logo之间间距，可根据需要调整 */
  padding: 20px;
}

.logo-item {
  display: flex;              /* 设置为 Flex 容器 */
  flex-direction: column;     /* 垂直排列子元素 */
  align-items: center;        /* 水平居中对齐子元素 */
}
.logo-item img {
  height: 60px;
  /* 控制logo的高度 */
  width: auto;
  /* 宽度自适应 */
  filter: grayscale(60%);
  /* 灰度效果 */
  opacity: 0.7;
  /* 若想要更浅一些可以再调 */
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
.story-wrapper{
  text-align: center;
}
</style>

<template>
  <navbar></navbar>
  <div class="hero-section">
    <!-- Swiper 容器 -->
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="mySwiper"
      :speed="1300"
    >
      <!-- Swiper Slide 1 -->
      <SwiperSlide>
        <img
          src="/surving.webp"
          alt="Construction Site 1"
          class="background-image"
        />
        <div class="overlay">
          <div class="content-container">
            <div class="swiper-inside">
              <h1>什么是测绘?</h1>
              <h2>
                测绘是大地与天空的对话，借助精确的工具与技术，<br />
                将自然的脉络和人类的足迹细致描绘在蓝图之上
              </h2>
              <button class="cta-button">了解更多</button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <!-- Swiper Slide 2 -->
      <SwiperSlide>
        <img
          src="/drone.jpg"
          alt="Construction Site 2"
          class="background-image"
        />
        <div class="overlay">
          <div class="content-container">
            <div class="swiper-inside">
              <h1>我们的服务</h1>
              <h2>
                提供无人机精准测绘解决方案，满足您的各类需求<br />
                从基础测量到高级数据分析，我们都是您的可靠伙伴
              </h2>
              <button class="cta-button">了解更多</button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="/digitalization.webp"
          alt="智能数字化"
          class="background-image"
        />
        <div class="overlay">
          <div class="content-container">
            <div class="swiper-inside">
              <h1>智能数字化测绘</h1>
              <h2>
                采用无人机和GIS技术，提供精准、高效的测绘解决方案<br />
                从数据采集到三维建模，全流程数字化服务，助您掌握地理信息
              </h2>
              <button class="cta-button">了解更多</button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>

  <div class="comapny-wrapper">
    <div class="company-brief">
      <h2>公司简介&愿景</h2>
      <div class="company-description">
        杭州跨远测绘有限公司是一家甲级专业测绘企业，成立于2006年1月19日。
        公司自成立以来，始终秉持“精确、创新、服务”的理念，为客户提供高质量的测绘服务。
        作为一家拥有50名员工的小型企业，我们致力于在测绘行业中树立标杆，始终走在技术创新的前沿。
        通过不断提升员工的专业能力和使用先进的测绘设备，为客户提供精准的数据支持和解决方案。
      </div>
    </div>
    <div class="runnning-range">
      <div class="service-content">
        <h2>业务范围</h2>
        <ul>
          <li>
            <div class="icon">
              <img src="/construction-icon.svg" alt="icon" />
            </div>
            <div class="service-info">
              <h3>
                <RouterLink to="/services#gong_cheng" class="service-link">
                  工程测量
                </RouterLink>
              </h3>
              <p>控制、地形、市政工程、建筑物放样等</p>
            </div>
          </li>
          <li>
            <div class="icon">
              <img src="/surveying-icon.svg" />
            </div>
            <div class="service-info">
              <h3>
                <RouterLink to="/services#bu_dong_chan" class="service-link">
                  界线与不动产测绘
                </RouterLink>
              </h3>
              <p>地籍测绘、宗地测量、土地面积测算、土地勘测定界等</p>
            </div>
          </li>
          <li>
            <div class="icon">
              <img src="/GIS-icon.svg" />
            </div>
            <div class="service-info">
              <h3>
                <RouterLink to="/services" class="service-link">
                  地理信息系统工程
                </RouterLink>
              </h3>
              <p>测绘航空摄影等高精度技术支持</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <LastestProjects
    class="lastest-projects"
    :class="{ 'is-visible': isLastestProjectsVisible }"
  ></LastestProjects>
  <projectTheme
    class="project-theme"
    :class="{ 'is-visible': isProjectThemeVisible }"
  ></projectTheme>
  <ContactUs></ContactUs>
  <foot></foot>
</template>

<script setup>
import navbar from '../components/navbar.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/bundle';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import LastestProjects from './LastestProjects.vue';
import projectTheme from './projectTheme.vue';
import ContactUs from './ContactUs.vue';
import foot from './foot.vue';

import { useStore } from 'vuex';
import router from '../router/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onMounted, onUnmounted } from 'vue';

const modules = [Pagination, A11y, Autoplay];
const store = useStore();

const isLastestProjectsVisible = ref(false);
const isProjectThemeVisible = ref(false);

onMounted(() => {
  const lastestProjects = document.querySelector('.lastest-projects');
  const projectTheme = document.querySelector('.project-theme');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === lastestProjects) {
            isLastestProjectsVisible.value = true;
          }
          if (entry.target === projectTheme) {
            isProjectThemeVisible.value = true;
          }
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // 开始观察
  if (lastestProjects) observer.observe(lastestProjects);
  if (projectTheme) observer.observe(projectTheme);

  // 清除观察器
  onUnmounted(() => {
    if (lastestProjects) observer.unobserve(lastestProjects);
    if (projectTheme) observer.unobserve(projectTheme);
  });
});
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 75vh;
  overflow: hidden;
}

.mySwiper {
  width: 100%;
  height: 100%;
}

:deep(.mySwiper .swiper-pagination-bullet-active) {
  width: 30px !important;
  background-color: rgb(253, 174, 16) !important;
  height: 10px;
}

:deep(.mySwiper .swiper-pagination-bullet) {
  width: 20px;
  height: 8px;
  background-color: rgb(244, 219, 164);
  border-radius: 3px;
  margin: 0 5px;
  transition: all 0.3s;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 73px;
  left: 0;
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 73px;
  left: 0;
  width: 100%;
  height: 75vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.content-container {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  padding: 50px;
  color: white;
}

.swiper-inside {
  margin-top: 4vh;
  margin-left: 8vh;
}

.swiper-inside h1 {
  font-size: 35px;
  font-weight: bold;
}

.swiper-inside h2 {
  font-size: 20px;
  margin-top: 1vh;
  line-height: 1.5;
}

.cta-button {
  background-color: #ffcc00;
  color: black;
  padding: 15px 30px;
  margin-top: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  border-radius: 4px;
}

.cta-button:hover {
  background-color: #f8e398;
}

.comapny-wrapper {
  display: grid;
  grid-template-columns: auto auto;
  gap: 250px;
  justify-content: center;
  margin: 40px 0;
}

.company-brief {
  max-width: 600px; /* 最大宽度，防止在大屏上太宽 */
  line-height: 2.5; /* 行高，优化文本可读性 */
  text-align: left; /* 左对齐 */
  margin-right: 80px;
}

.company-brief h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.company-description {
  text-align: justify; /* 文本两端对齐，优化排版 */
  font-size: 16px;
}

.runnning-range {
  width: 30%;
  min-width: 400px;
}

.service-content ul {
  list-style: none;
  padding: 0;
}

.service-content li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.icon {
  height: 50px;
  width: 50px;
  margin-right: 15px;
}

.service-info h3 {
  margin: 0;
  font-size: 19.2px;
}

.service-info p {
  margin: 0;
  font-size: 16px;
}

.service-link {
  text-decoration: none;
  color: rgb(94, 37, 25);
  transition: all 0.3s ease;
  display: inline-block;
}

.service-link:hover {
  text-decoration: underline;
}

/* 初始状态：元素隐藏并下移 */
.lastest-projects,
.project-theme {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

/* 当元素可见时：上浮且显示 */
.lastest-projects.is-visible,
.project-theme.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 
  =============================
  移动端/平板端（小屏）优化
  你可以按自己的需求再细调
  =============================
*/

/* 针对宽度 <= 768px 的适配 */
@media screen and (max-width: 768px) {
  /* 优化轮播区域高度，让小屏幕看起来更紧凑 */
  .hero-section {
    height: 60vh;
  }

  .background-image {
    top: 0;
    height: 60vh;
  }

  .overlay {
    top: 0;
    height: 60vh;
  }

  .content-container {
    flex-direction: column;
    align-items: center;
    padding: 20px;
    text-align: center;
  }

  .swiper-inside {
    margin: 0;
    margin-top: 10vh;
  }
  .swiper-inside h1 {
    font-size: 28px;
  }
  .swiper-inside h2 {
    font-size: 16px;
  }
  .cta-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 14px;
  }

  /* 让公司简介与业务范围堆叠显示 */
  .comapny-wrapper {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    margin: 40px auto;
  }
  .company-brief {
    width: 90%;
    line-height: 1.6;
    text-align: center;
    margin-right: 0px;
  }
  .company-brief h2 {
    font-size: 20px;
  }
  .company-description {
    font-size: 14px;
    line-height: 1.5;
  }

  .runnning-range h2 {
    text-align: center;
  }
  .service-content {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
  }

  h2 {
    font-size: 18px !important;
  }

  .service-content ul {
    margin-left: 10px;
  }

  .service-info h3 {
    font-size: 14px;
  }

  .service-info p {
    font-size: 12px;
  }

  .icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
}

/* 针对宽度 <= 480px（更小屏幕）的进一步适配 */
@media screen and (max-width: 480px) {
  .hero-section {
    height: 50vh;
  }
  .background-image,
  .overlay {
    height: 50vh;
  }

  .swiper-inside {
    margin-top: 8vh;
  }

  .swiper-inside h1 {
    font-size: 24px;
    line-height: 1.3;
  }
  .swiper-inside h2 {
    font-size: 14px;
  }
  .cta-button {
    padding: 8px 16px;
    font-size: 13px;
    margin-top: 15px;
  }

  /* 公司简介与服务范围的布局更紧凑 */
  .comapny-wrapper {
    margin: 20px auto;
    gap: 20px;
  }
  .company-brief {
    width: 95%;
  }
  .company-brief h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .company-description {
    font-size: 13px;
    line-height: 1.4;
  }
  .runnning-range {
    width: 95%;
  }

  .service-content {
    padding: 0;
  }
  .service-info h3 {
    font-size: 15px;
  }
  .service-info p {
    font-size: 12px;
  }
  .icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>

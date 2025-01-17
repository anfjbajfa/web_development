<template>
  <navbar />
  <div class="pic-container">
    <img src="/awards/award-surveying.jpg" class="award-pic" />
  </div>

  <section class="case-honor-section">
    <!-- 使用 v-for 渲染每一行数据 -->
    <div
      v-for="(item, index) in caseHonors"
      :key="index"
      class="case-honor-row"
      :class="{ 'is-visible': visibleRows.includes(index) }"
      :style="getRowStyle(index, item)"
    >
      <div class="circle">
        <div class="text-content">
          <span class="date-range">{{ item.dateRange }}</span>
          <h2 class="title">{{ item.title }}</h2>
          <p class="description">
            {{ item.description }}
          </p>
          <!-- 改写链接，把箭头抽成单独的 <span>，用于动画 -->
          <RouterLink :to="item.link" class="link">
            {{ item.linkText }}
            <span class="arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
  <foot></foot>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import navbar from '../components/navbar.vue';
import foot from './foot.vue';

// 1. 这里是每行的数据
const caseHonors = [
  {
    imageSrc: `${import.meta.env.BASE_URL}/awards/honor-zhiwei.png`,
    dateRange: '2014-2025',
    title: '职称荣誉',
    description:
      '凭借卓越的技术能力和优质的服务，荣获了包括企业级、政府级在内的多项荣誉和奖项。这些荣誉不仅是对我们团队努力的认可，更是对我们测绘行业贡献的见证。截至目前，我们已获得超过10项权威奖项，如区甲级测绘单位、区级优秀工程奖等',
    link: '/honor-zhicheng',
    linkText: '查看所有职称荣誉',
  },
  {
    imageSrc: `${import.meta.env.BASE_URL}/awards/honor-zhuzuo.png`,
    dateRange: '2018-2025',
    title: '软件著作',
    description:
      '在测绘和GIS领域不断创新中，我们研发了一系列具有自主知识产权的计算机软件。我们成功获得多项软件著作权和专利认证，这些软件涵盖了GIS数据处理、三维地形建模、遥感影像分析、测绘自动化等关键技术领域。例如，我们的“智能测绘数据处理系统”极大地提升了测绘数据处理效率',
    link: '/honor-zhuzuo',
    linkText: '查看所有著作荣誉',
  },
  {
    imageSrc: `${import.meta.env.BASE_URL}/awards/honor-system.png`,
    dateRange: '2017-2025',
    title: '体系证书',
    description:
      '通过了ISO质量管理体系认证、环境管理体系认证等一系列权威体系认证。这些证书充分体现了我们在管理规范性、环境保护及质量控制方面的领先水平，是企业综合实力和社会责任感的有力证明',
    link: '/honor-system',
    linkText: '查看所有著作荣誉',
  },
];

// 2. 每行的背景色数组，可自行添加更多颜色
const rowColors = [
  '#e3f2fd', // 浅蓝
  '#e8f5e9', // 浅绿
  '#f1f8e9', // 浅青
];

// 3. 负责记录哪些 row 已经进入可视区域
const visibleRows = ref([]);

// 4. 滚动监听，决定何时添加 'is-visible' 动画类
const handleScroll = () => {
  const rows = document.querySelectorAll('.case-honor-row');
  rows.forEach((row, index) => {
    const rect = row.getBoundingClientRect();
    if (
      rect.top < window.innerHeight - 100 &&
      !visibleRows.value.includes(index)
    ) {
      visibleRows.value.push(index);
    }
  });
};

// 5. row 样式生成方法：将背景图片与背景色都设上
const getRowStyle = (index, item) => {
  return {
    backgroundImage: `url(${item.imageSrc})`,
    backgroundColor: rowColors[index % rowColors.length], // 不同 row 显示不同色
  };
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
</script>

<style scoped>
/* ------------------------------
   布局和基本外观
--------------------------------*/
.pic-container {
  width: 100vw;
  height: 80vh;
  margin-top: 72px;
  justify-content: center;
}

.award-pic {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.case-honor-section {
  margin-top: 30px;
}

/* ------------------------------
   每一行(row)的通用样式
--------------------------------*/
.case-honor-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: auto;
  margin: 0 auto 0 auto; /* 上右下左 */
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease-out;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  position: relative;
  margin: 30px 0 30px 0;
}

/* 
  如果你想要保留黑色半透明覆盖，可以启用下面注释
*/
.case-honor-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
  border-radius: inherit;
}

/* 进入可视区域后，触发淡入 + 上移动画 */
.case-honor-row.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ------------------------------
   圆形及其内部文本
--------------------------------*/
.circle {
  position: relative;
  width: 30vw;
  height: 30vw;
  aspect-ratio: 1/1;
  border-radius: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  background-color: white;
  opacity: 0.8;
}

.text-content {
  width: 60%;
  text-align: center;
}

.date-range {
  display: block;
  font-size: 1vw;
  color: #666;
  margin-bottom: 8px;
}

.title {
  font-size: 1.5vw;
  font-weight: bold;
  margin-bottom: 1vw;
  color: #222;
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
  margin-bottom: 2vw;
}

/* ------------------------------
   链接 & 箭头动画
--------------------------------*/
.link {
  font-size: 0.8vw;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
  position: relative;
  display: inline-flex;
  align-items: center;
  /* 小小余量，避免文字与箭头贴得太紧 */
  gap: 0.2rem;
}

/* 单独的箭头，用于做点击动画 */
.arrow {
  display: inline-block;
  transition: transform 0.3s ease-out;
}

.link:hover .arrow {
  transform: translateX(5px);
}

/* ------------------------------
   如果有右侧图片容器时的样式 (可选)
--------------------------------*/
.screenshot-container {
  width: 40vw;
  max-width: 90vw;
  margin: 20px;
  margin-left: 5vw;
}

.screenshot {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>

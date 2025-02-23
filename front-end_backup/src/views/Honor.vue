<template>
  <navbar />
  <div class="pic-container" v-fade="'fade-in'">
    <div class="caption" v-fade="'left-slide'">
      <h2>荣誉</h2>
      <p>
        2025年我们再次被评为甲级测绘单位，这不仅是对我们团队辛勤工作的认可，
        也是对我们在地理信息领域持续创新与卓越服务的肯定。
      </p>
    </div>
    <img src="/awards/award-surveying.webp" class="award-pic" />
  </div>

  <section class="case-honor-section">
    <!-- 使用 v-for 渲染每一行数据 -->
    <div
      v-for="(item, index) in caseHonors"
      :key="index"
      class="case-honor-row"
      :class="{'is-visible': visibleRows.includes(index)}"
      :style="getRowStyle(index, item)"
    >
      <!-- 
        ① 把 .circle 替换成 RouterLink，直接包裹其内部文本
        ② 这样整个圆形都可点击
        ③ :to="item.link" 指定跳转地址
      -->
      <RouterLink :to="item.link" class="circle clickable-circle">
        <div class="text-content">
          <span class="date-range">{{ item.dateRange }}</span>
          <h2 class="title">{{ item.title }}</h2>
          <p class="description">
            {{ item.description }}
          </p>
          <!-- 如果还想在圆形里展示链接文字，可以继续显示 -->
          <span class="link-text">
            {{ item.linkText }}
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import navbar from '../components/navbar.vue';

// 1. 这里是每行的数据
const caseHonors = [
  {
    imageSrc: `/awards/1.jpg`, ///awards/honor-zhiwei.webp
    dateRange: '2014-2025',
    title: '职称荣誉',
    description:
      '凭借卓越的技术能力和优质的服务，荣获了包括企业级、政府级在内的多项荣誉和奖项。这些荣誉不仅是对我们团队努力的认可，更是对我们测绘行业贡献的见证。截至目前，我们已获得超过10项权威奖项，如区甲级测绘单位、区级优秀工程奖等',
    link: '/honor-zhicheng',
    linkText: '查看所有职称荣誉->',
  },
  {
    imageSrc: `/awards/2.jpg`, ///awards/honor-zhuzuo.webp
    dateRange: '2018-2025',
    title: '软件著作',
    description:
      '在测绘和GIS领域不断创新中，我们研发了一系列具有自主知识产权的计算机软件。我们成功获得多项软件著作权和专利认证，这些软件涵盖了GIS数据处理、三维地形建模、遥感影像分析、测绘自动化等关键技术领域。例如，我们的“智能测绘数据处理系统”极大地提升了测绘数据处理效率',
    link: '/honor-zhuzuo',
    linkText: '查看所有著作荣誉->',
  },
  {
    imageSrc: `/awards/3.jpg`, ////awards/honor-system.webp
    dateRange: '2017-2025',
    title: '体系证书',
    description:
      '通过了ISO质量管理体系认证、环境管理体系认证等一系列权威体系认证。这些证书充分体现了我们在管理规范性、环境保护及质量控制方面的领先水平，是企业综合实力和社会责任感的有力证明',
    link: '/honor-system',
    linkText: '查看所有体系证书->',
  },
];

// 2. 每行的背景色数组


// 3. 负责记录哪些 row 已经进入可视区域
const visibleRows = ref([]);

// 4. 滚动监听，决定何时添加 'is-visible' 动画类
const handleScroll = () => {
  const rows = document.querySelectorAll('.case-honor-row');
  rows.forEach((row, index) => {
    const rect = row.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && !visibleRows.value.includes(index)) {
      visibleRows.value.push(index);
    }
  });
};

// 5. 生成每行的样式
const getRowStyle = (index, item) => {
  return {
    backgroundImage: `url(${item.imageSrc})`,
  
  };
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
</script>



<style scoped>
/* -------------------------------
   0. 通用布局
--------------------------------*/
.pic-container {
  width: 100vw;
  height: 100vh;
  margin-top: 3.5%;
  justify-content: center;
}
.caption {
  position: absolute;
  z-index: 1;
  margin: 7% 0 0 15%;
  max-width: 25%;
}
.caption h2 {
  color: white;
  font-size: 30px;
}
.caption p {
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.award-pic {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.case-honor-section {
  margin-top: 30px;
}

/* -------------------------------
   1. 每一行(row)的通用样式
--------------------------------*/
.case-honor-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: auto;
  margin: 30px 0;
  position: relative;
  z-index: 1;

  /* 动画初始 */
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease-out;

  /* 背景图相关 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 半透明蒙版（如需更淡可调 0.1~0.2） */
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


.case-honor-row.is-visible {
  opacity: 1;
  transform: translateY(0);
}


.circle {
  position: relative;
  width: 30vw;
  height: 30vw;
  aspect-ratio: 1 / 1;
  border-radius: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  background-color: white;
  opacity: 0.8;
  text-decoration: none;
}
/* 让鼠标变成手型，并添加放大效果 */
.clickable-circle {
  cursor: pointer;
  transition: transform 0.3s ease-out;
}
.clickable-circle:hover {
  transform: scale(1.05);
}

/* 文本区 */
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
/* 如果还想展示链接文字 */
.link-text {
  font-size: 0.8vw;
  font-weight: bold;
  color: #2c3e50;
  display: block;
  margin-top: 1vw;
}

/* -------------------------------
   3. 媒体查询: 小屏幕
--------------------------------*/
@media screen and (max-width: 768px) {
  /* 顶部图容器 & 文字说明 */
  .pic-container {
    height: 50%;
    margin-top: 10%;
  }
  .caption {
    margin: 10% 5%;
    max-width: 50%;
  }

  .award-pic {
    width: 100%;
    height: auto;
    object-fit: fill;
  }

  /* 荣誉区块 */
  .case-honor-section {
    margin-top: 10px;
  }

  .case-honor-row {
    flex-direction: column; 
    text-align: center;
    margin: 10px auto;
    background-size: cover; 
    background-position: center;
  }

  .case-honor-row::before {
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* 圆形容器（.circle） */
  .circle {
    width: 80vw;
    height: 80vw;
    border-radius: 50%;
    margin: 20px auto;
  }

  /* 扩大文字区域 */
  .text-content {
    width: 70%;
  }

  /* 字体大小根据屏幕自适应 */
  .date-range {
    font-size: 4vw;
    margin-bottom: 8px;
  }

  .link-text {
    font-size: 3.5vw;
    margin-top: 2vw;
  }
}

/* 超小屏时如果还要再调，可以加 max-width: 480px */
</style>

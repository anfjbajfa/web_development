<template>
  <div class="famous-projects">
    <h2>过往著名测绘项目</h2>
    <div class="yellow-line"></div>

    <!-- 第一行（两个卡片） -->
    <div class="row row-1">
      <RouterLink to="/liXiangProject">
      <div class="card large" v-if="cards[0]">
        <img class="card-image" loading="lazy" :src="cards[0].img" :alt="cards[0].title" />
        <div class="card-info">
          <h3 class="card-title">{{ cards[0].title }}</h3>
          <p class="card-desc">{{ cards[0].desc }}</p>
        </div>
      </div>
    </RouterLink>

    <RouterLink to="/wenyiProject">
      <div class="card" v-if="cards[1]">
        <img class="card-image" :src="cards[1].img" :alt="cards[1].title" />
        <div class="card-info">
          <h3 class="card-title">{{ cards[1].title }}</h3>
          <p class="card-desc">{{ cards[1].desc }}</p>
        </div>
      </div>
    </RouterLink>
    </div>

    <!-- 第二行（两个卡片） -->
    <div class="row row-2">
    <RouterLink to="/alidamoProject">
      <div class="card" v-if="cards[2]">
        <img class="card-image" :src="cards[2].img" :alt="cards[2].title" />
        <div class="card-info">
          <h3 class="card-title">{{ cards[2].title }}</h3>
          <p class="card-desc">{{ cards[2].desc }}</p>
        </div>
      </div>
    </RouterLink>

    <RouterLink to="/yuhangProject">
      <div class="card" v-if="cards[3]">
        <img class="card-image" :src="cards[3].img" :alt="cards[3].title" />
        <div class="card-info">
          <h3 class="card-title">{{ cards[3].title }}</h3>
          <p class="card-desc">{{ cards[3].desc }}</p>
        </div>
      </div>
    </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";

const cards = ref([
  {
    title: "理想臻品(汀山和院)",
    desc: "位于临平区临平山南，紧邻杭州钱江新城和未来科技城，面积约为12.5万平方米",
    img: `/lixiangzhenpin.webp`,
  },
  {
    title: "文一西路西延工程(一期)",
    desc: "东起余杭数云路以西，西至狮山路，分为地下隧道+地面快速路两部分，长约1.855公里。",
    img: `/wenyixilu.webp`,
  },
  {
    title: "阿里巴巴达摩院",
    desc: "位于余杭区南湖科学中心片区，项目用地面积22.8万平方米，总建筑面积为49万平方米。项目总投资21亿元。",
    img: `/alinanhu.webp`,
  },
  {
    title: "余杭第一中学",
    desc: "地处余杭区良渚街道庄墩路818号，是余杭区教育局重点打造的一所高起点、高标准的现代化公办高中。占地面积168.37亩，总建筑面积约15万平方米",
    img: `/yuhangzhongxue.webp`,
  },
]);

</script>

<style scoped>
.famous-projects {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
  color: #333;
  text-align: center;
}

/* 每一行: 两列布局 */
.row {
  display: grid;
  grid-template-columns: 2fr 1fr; /* 默认: 左侧更宽(2倍)，右侧1倍 */
  gap: 80px;
  margin-bottom: 50px;
}

/* 第二行改为等宽 */
.row-2 {
  grid-template-columns: 1fr 1fr;
}

/* 卡片基础样式 */
.card {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  width: 100%;
  height: 400px;
  background: #f2f2f2;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-image {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  transition: transform 0.3s ease;
}

.card:hover .card-image {
  transform: scale(1.1);
}

/* 卡片叠加渐变遮罩 */
.card::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
  z-index: 1;
}

/* 卡片文字 */
.card-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
  text-align: left;
  color: #fff;
  width: 80%;
}

.card-title {
  font-size: 20px;
  margin: 0 0 6px;
}

.card-desc {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.85;
}

/* 768px 以下：平板及大部分手机 */
@media screen and (max-width: 768px) {
  .row {
    grid-template-columns: 1fr; /* 每行只显示1列，垂直堆叠 */
    gap: 40px;                  /* 减小缝隙 */
    margin-bottom: 20px;
  }

  .card {
    height: 300px;             /* 减小卡片高度 */
  }

  .card-title {
    font-size: 18px;
  }

  .card-desc {
    font-size: 0.85rem;
  }
}

/* 480px 以下：更小屏幕的手机 */
@media screen and (max-width: 480px) {
  .famous-projects {
    padding: 10px;             
  }
  .card {
    height: 250px;             
  }
  .card-title {
    font-size: 16px;
  }
  .card-desc {
    font-size: 0.8rem;
  }
  .row {
    gap: 20px;                 
  }
  
}
</style>

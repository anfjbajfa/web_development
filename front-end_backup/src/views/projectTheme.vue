<template>
    <div class="famous-projects">
      <h2>过往著名测绘项目</h2>
      <div class="yellow-line"></div>
  
      <!-- 第一行（两个卡片） -->
      <div class="row row-1">
        <div class="card large" v-if="cards[0]">
          <img class="card-image" :src="cards[0].img" :alt="cards[0].title" />
          <div class="card-info">
            <h3 class="card-title">{{ cards[0].title }}</h3>
            <p class="card-desc">{{ cards[0].desc }}</p>
          </div>
        </div>
        <div class="card" v-if="cards[1]">
          <img class="card-image" :src="cards[1].img" :alt="cards[1].title" />
          <div class="card-info">
            <h3 class="card-title">{{ cards[1].title }}</h3>
            <p class="card-desc">{{ cards[1].desc }}</p>
          </div>
        </div>
      </div>
  
      <!-- 第二行（两个卡片） -->
      <div class="row row-2">
        <div class="card" v-if="cards[2]">
          <img class="card-image" :src="cards[2].img" :alt="cards[2].title" />
          <div class="card-info">
            <h3 class="card-title">{{ cards[2].title }}</h3>
            <p class="card-desc">{{ cards[2].desc }}</p>
          </div>
        </div>
        <div class="card" v-if="cards[3]">
          <img class="card-image" :src="cards[3].img" :alt="cards[3].title" />
          <div class="card-info">
            <h3 class="card-title">{{ cards[3].title }}</h3>
            <p class="card-desc">{{ cards[3].desc }}</p>
          </div>
        </div>
      </div>
  
    </div>
</template>
  
<script setup>
  import { ref } from "vue";
  
  const cards = ref([
    {
      title: "理想臻品(汀山和院)",
      desc: "位于临平区临平山南，紧邻杭州钱江新城和未来科技城，面积约为12.5万平方米",
      img: "/lixiangzhenpin.jpg",
      tag: "你好"
    },
    {
      title: "文一西路西延工程(一期)",
      desc: "东起余杭数云路以西，西至狮山路，分为地下隧道+地面快速路两部分，长约1.855公里。",
      img: "/wenyixilu.webp"
    },
    {
      title: "阿里巴巴达摩院",
      desc: "位于余杭区南湖科学中心片区，项目用地面积22.8万平方米，总建筑面积为49万平方米。项目总投资21亿元。",
      img: "/alinanhu.jpg"
    },
    {
      title: "Smart Classroom",
      desc: "Building a Hybrid, Collaborative and Integrated Teaching Paradigm",
      img: "https://via.placeholder.com/600x600?text=Smart+Classroom"
    },
    {
      title: "Example Building/Scene",
      desc: "",
      img: "https://via.placeholder.com/600x600?text=Scene1"
    },
    {
      title: "Another Building/Scene",
      desc: "",
      img: "https://via.placeholder.com/600x600?text=Scene2"
    }
  ]);
</script>
  
<style scoped>
  .famous-projects {
    max-width: 1400px; /* 你可根据需要调整 */
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
    color: #333;
    text-align: center;
  }
  
  .yellow-line {
    width: 50px;
    height: 5px;
    background-color: #ffc107;
    margin: 0 auto 30px auto;
  }
  
  /* 每一行: 两列布局 */
  .row {
    display: grid;
    grid-template-columns: 2fr 1fr; /* 默认: 左侧 2 倍宽度，右侧 1 倍宽度 */
    gap: 80px;
    margin-bottom: 50px;
  }
  
  /* 如果某行想要等宽，可以在对应 row 上覆盖样式，比如 row-2 */
  .row-2 {
    grid-template-columns: 1fr 1fr; /* 第二行改为等宽 */
  }
  
  /* 卡片基础样式 */
  .card {
    position: relative;
    overflow: hidden; /* 悬浮放大时，超出部分被隐藏 */
    border-radius: 6px;
    width: 100%;
    height: 400px; /* 固定高度，便于让图片填充 */
    background: #f2f2f2; /* 仅示例的底色 */
  
    /* 让文字或其它内容可以在卡片底部叠加 */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  /* 如果需要让第一行左卡片更宽，可直接在 template 里加类 .large 来自定义宽度 */
  .large {
    /* 已通过 2fr 1fr 来控制宽度，这里可再做其它修饰 */
  }
  
  /* 卡片图片：让它填充卡片 */
  .card-image {
    position: relative;
    z-index: 0; /* 在最底层 */
    width: 100%;
    height: 100%; /* 与卡片同高 */
    object-fit: fill; /* 填充, 可能变形 */
    display: block;
  
    /* 悬浮放大动画 */
    transition: transform 0.3s ease;
  }
  
  /* 悬浮时图片放大 */
  .card:hover .card-image {
    transform: scale(1.1);
  }
  
  /* 叠加渐变 */
  .card::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
    z-index: 1; /* 比图片高，但比文字低 */
  }
  
  /* 卡片文字 */
  .card-info {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 2; /* 在渐变之上 */
    text-align: left; /* 标题和描述左对齐 */
    color: #fff;
    width: 80%; /* 如果想控制文字区域宽度，可加上 */
  }
  
  /* 可以去掉 card-tag，如果暂时没有用到 */
  .card-tag {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 4px;
    opacity: 0.9;
  }
  
  .card-title {
    font-size: 20px;
    margin: 0 0 6px; /* 去掉默认margin-top */
  }
  
  .card-desc {
    font-size: 0.9rem;
    margin: 0; /* 去掉默认margin */
    opacity: 0.85;
  }
</style>
  
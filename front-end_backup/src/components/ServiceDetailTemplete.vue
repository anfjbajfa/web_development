<template>
  <!-- 导航栏 -->
  <navbar />
  <!-- 主题 -->
  <div class="service-theme">
    <h2>{{serviceTheme }}</h2>
  </div>
  <div class="yellow-line"></div>
  <!-- 卡片容器 -->
  <div class="service-card-wrapper">
    <!-- 遍历 cards 数组，输出卡片内容 -->
    <div v-for="(card, index) in cards" :key="index" class="service-card" 
    @click="toggleOverlay(index)"
    >
      <!-- 这里演示：显示卡片标题、描述等信息 -->
      <img :src="card.img" class="card-img">
      <h3 class="card-title">{{ card.title }}</h3>
      <h4>甲方提供材料：</h4>
      <ul class="need-material-list">
        <li v-for="(needMaterial, i) in card.needMaterials" :key="i">{{ needMaterial }}</li>
      </ul>

      <!-- 当click时固定 -->
      <div v-if="card.isOpen" class="overlay" @click.stop>
        <h4>输出产品：</h4>
        <ul class="return-material-list">
          <li v-for="(returnMaterial,i) in card.returnMaterials" :key="i">
            {{ returnMaterial }}
          </li>
        </ul>
        <button class="close-btn" @click.stop="closeOverlay(index)">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from '../components/navbar.vue'
import { ref } from 'vue'
// 定义组件可以接收的 props，用于复用时传入数据
const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  },
  
  serviceTheme: {
    type:String,
    default:""
  }
})

// console.log("serviceTheme:", props.serviceTheme)

// 自动设置isOpen为false
props.cards.forEach(item=>{
  if(item.isOpen===undefined){
    item.isOpen=false
  }
})

function toggleOverlay(index){
  props.cards[index].isOpen =!props.cards[index].isOpen
}

// 关闭黑幕
function closeOverlay(index) {
  props.cards[index].isOpen = false
}

</script>

<style scoped>
/* 卡片栅格容器 */
.service-card-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
}

.service-theme {
  text-align: center;
  margin-top: 10vh;
  font-weight: bold;
}

.yellow-line {
  width: 50px;
  height: 5px;
  background-color: #ffc107;
  margin: 0 auto 30px auto;
}

/* 卡片样式 */
.service-card {
  /* 让卡片成为定位上下文，仅覆盖该卡片 */
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 70vh;
}

/* 卡片悬停动画效果 */
.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 卡片标题示例 */
.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}

.card-img {
  width: 80%;
  height: 60%;
  object-fit: cover;
}

.service-card h4 {
  margin: 0;
}

.service-card h3 {
  margin:20px 0 10px 0
}

/* 材料列表样式 */
.need-material-list,
.return-material-list {
  list-style-type: disc;
  list-style-position: inside;
  color: #333;
}

/* 黑幕（仅覆盖该卡片） */
.overlay {
  /* 让黑幕只在卡片里面铺满，而不是全屏 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.8);
  /* 让上面内容不至于被截断 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  z-index: 10;
  /* 防止点击穿透，只有当前卡片的 overlay 可以被点到 */
  pointer-events: auto; 
}

/* 在黑幕下文字更明显 */
.overlay h4,
.overlay li {
  color: #fff !important;
  font-size: 16px;
  margin-bottom: 6px;
}

/* 关闭按钮 */
.close-btn {
  margin-top: 20px;
  background-color: #fff;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 20;
}

.close-btn:hover {
  background-color: #ddd;
}
</style>
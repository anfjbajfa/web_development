<template>
  <navbar></navbar>
  <div class="timeline-container" v-lazy>
    <h2>{{ props.HonorTitle }}</h2>
    <div class="timeline-wrapper">

      <div v-for="(item, index) in displayData" :key="index" class="timeline-card" :style="{ '--delay-index': getDelay(index) }" 
      :class="{
        'last-in-row': (index + 1) % 4 === 0,
        'has-vertical-line': shouldShowVerticalLine(index),
        'left-vertical-line': index % 4 === 0,
        'right-vertical-line': (index + 1) % 4 === 0
      }">
        <!-- 日期标题 -->
        <div class="timeline-date">{{ item.date }}</div>

        <!-- 小圆点 + 虚线 -->
        <div class="circle-line-wrapper">
          <div class="circle"></div>
          <!-- 虚线 -->
          <span class="dotted-line"></span>
        </div>

        <!-- 图片 & 文本区域 -->
        <div class="timeline-content">
          <div class="timeline-text">{{ item.text }}</div>
          <img :src="item.image" alt="timeline image" class="timeline-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import navbar from './navbar.vue';
import { ref,computed,onMounted } from 'vue';

const props = defineProps({
  HonorTitle: {
    type: String
  },
  HonorData: {
    type: Array
  },
  mediaHeight:{
    type:Number
  }
})

// 添加判断函数
const shouldShowVerticalLine = (index) => {
  const rowIndex = Math.floor(index / 4);  // 获取当前行号
  // 偶数行显示第一个，奇数行显示第四个
  return rowIndex % 2 === 0 ? (index + 1) % 4 === 0 : index % 4 === 0;
};

const getDelay = (index) => {
  const columns = 4;
  const row = Math.floor(index / columns);
  const col = index % columns;
  if (row % 2 === 0) {
    return row * columns + col + 1;
  } else {
    return row * columns + ((columns - 1) - col) + 1;
  }
};


function reorderHonorData(data) {
  const columns = 4;
  let newData = [];
  for (let i = 0; i < data.length; i += columns) {
    // 取出当前行的4条数据
    let chunk = data.slice(i, i + columns);
    // 计算当前是第几行（从0开始）
    let row = i / columns;
    // 偶数行不变，奇数行反转
    if (row % 2 === 1) {
      chunk.reverse();
    }
    // 合并到新数组
    newData.push(...chunk);
  }
  return newData;
}


// 一个 ref，用来存最终要渲染的数据
const displayData = ref([]);

// 挂载时判断一次屏幕宽度
onMounted(() => {
  if (window.innerWidth > 768) {
    // 大屏 => 用“蛇形重排”后的数据
    displayData.value = reorderHonorData(props.HonorData);
  } else {
    // 小屏 => 保持原顺序
    displayData.value = props.HonorData;
    document.documentElement.style.setProperty('--dotted-height', props.mediaHeight + 'vh');
  }
});

</script>

<style scoped>
.timeline-container {
  /* 可以用grid, 这里用flex包两行演示 */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  margin-top: 3.5%;
  overflow: hidden;
}

/* 调整卡片容器样式 */
.timeline-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 5%;
  width: 100%;
}

/* 每个卡片 */
.timeline-card {
  position: relative;
  min-height: 220px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 4px 2px 8px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  /* 初始隐藏，通过动画浮现 */
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: calc(0.5s * var(--delay-index));
}


/* 日期标题 */
.timeline-date {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}


.circle-line-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
}

.circle {
  width: 20px;
  height: 20px;
  border: 5px solid #888;
  border-radius: 50%;
  margin-right: 2px;
  flex-shrink: 0;
  background: white;
  position: relative;
}

/* 虚线 */
.dotted-line {
  position: absolute;
  width: calc(100% + 60px);
  /* 调整横向连接线长度 */
  height: 2px;
  left: 30px;
  background-image: repeating-linear-gradient(to right,
      rgb(220, 218, 218) 0px,
      rgb(33, 33, 33) 7px,
      rgba(0, 0, 0, 0) 7px,
      rgba(0, 0, 0, 0) 14px);
  z-index: 1;
}

/* 左侧竖线 */
.left-vertical-line.has-vertical-line::after {
  content: '';
  position: absolute;
  left: 29px;
  width: 3px;
  margin-top: 50px;
  height: 90%;
  background-image: repeating-linear-gradient(to bottom,
      rgb(220, 218, 218) 0px,
      rgb(33, 33, 33) 7px,
      rgba(0, 0, 0, 0) 7px,
      rgba(0, 0, 0, 0) 14px);
  z-index: 3;
}

/* 右侧竖线 */
.right-vertical-line.has-vertical-line::after {
  content: '';
  position: absolute;
  margin-top: 50px;
  right:2px;
  width: 3px;
  height: 90%;
  background-image: repeating-linear-gradient(to bottom,
      rgb(220, 218, 218) 0px,
      rgb(33, 33, 33) 7px,
      rgba(0, 0, 0, 0) 7px,
      rgba(0, 0, 0, 0) 14px);
  z-index: 3;
}

/* 每行最后一个卡片隐藏横向连接线 */
.last-in-row .dotted-line {
  display: none;
}

/* 内容区 */
.timeline-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  z-index: 4;
}

.timeline-image {
  width: 80%;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}


.timeline-text {
  font-size: 14px;
  color: #681a1a;
  font-weight: bold;
}


@media screen and (max-width: 768px) {
  .timeline-container {
    margin-top: 13%;
  }

  .timeline-wrapper {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .timeline-card {
    margin: 0 auto;
    width: 90%;
  }

  .circle-line-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative; 
    height: 20px; 
  }

  .circle {
    z-index: 2;
  }

  /* 使用absolute定位的虚线 */
  .dotted-line {
    position: absolute;
    top: 20px; /* 圆圈高度 */
    left: 9px;
    height: var(--dotted-height);
    width: 2px;
    background-image: repeating-linear-gradient(
      to bottom,
      rgb(220, 218, 218) 0px,
      rgb(33, 33, 33) 7px,
      rgba(0, 0, 0, 0) 7px,
      rgba(0, 0, 0, 0) 14px
    );
    z-index: 5;
  }

  .last-in-row .dotted-line {
    display: block !important;
  }

  .timeline-card:last-child .dotted-line {
    display: none !important;
  }

  .left-vertical-line.has-vertical-line::after,
  .right-vertical-line.has-vertical-line::after {
    display: none;
  }

  .timeline-content {
    flex-direction: column;
    align-items: center;
  }
}
</style>
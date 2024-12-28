<template>
  <!-- 分隔线 -->
  <hr />
  <div class="overall_layout">
    <!-- 第一部分 -->
    <div id="gong_cheng" class="section-container" :ref="addToRefs">
      <div class="text-container">
        <h2>工程测绘，精度和数据安全是我们的承诺</h2>
          <ul>
            <li><a href="www.baidu.com">=> 地形测绘：详细记录地形地貌特征，包括高程、坡度、地形变化等</a></li>
            <li><a href="www.baidu.com">=> 施工放样：将设计图纸上的位置和尺寸准确传递到施工现场</a></li>
            <li><a href="www.baidu.com">=> 监测测绘：对工程结构的变形、沉降、位移等进行长期监测</a></li>
            <li><a href="www.baidu.com">=> 建筑工程：为建筑设计、施工提供地形图、基准点等数据。</a></li>
          </ul>
        <button href="#" class="learn-more">订购服务</button>
      </div>
      <div class="image-container">
        <img src="/staff.jpg" alt="line" />
        <!-- <div class="citation">
          <div>
            <strong></strong><br/>
          </div>
        </div> -->
      </div>
    </div>

    <!-- 第二部分 -->
    <div id="bu_dong_chan" class="section-container reverse" :ref="addToRefs">
      <div class="image-container">
        <img src="/CAD.jpg" alt="surveying" />
        <div class="citation">
          <div>
            <strong>临平区人民广场测量图</strong><br />
          </div>
        </div>
      </div>
      <div class="text-container">
        <h2>线与不动产测绘，ToB和ToG多种商业模式</h2>
        <ul>
          <li><a href="www.baidu.com">=> 边界测绘：明确土地、不动产的边界线，确保权属清晰</a></li>
          <li><a href="www.baidu.com">=> 权属测绘：记录土地、不动产的所有权、使用权等权属信息</a></li>
          <li><a href="www.baidu.com">=> 综合测绘：结合土地使用规划、地籍信息等进行全面测绘</a></li>
        </ul>
        <button href="www.baidu.com" class="learn-more">订购服务</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const sectionRefs = ref([]);
const addToRefs = (el) => {
  if (el && !sectionRefs.value.includes(el)) {
    sectionRefs.value.push(el);
  }
};

let observer; // 在外部声明 observer，以便在 onBeforeUnmount 中访问

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const callback = (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observerInstance.unobserve(entry.target); // 动画触发后取消观察
      }
    });
  };

  observer = new IntersectionObserver(callback, options);

  sectionRefs.value.forEach((section) => {
    observer.observe(section);
  });
});

onBeforeUnmount(() => {
  if (observer) {
    sectionRefs.value.forEach((section) => {
      observer.unobserve(section);
    });
  }
});


</script>

<style scoped>
.overall_layout {
  display: flex;
  flex-direction: column;
}

hr {
  border: none;
  height: 1px;
  width: 70%;
  background-color: #ddd;
  margin: 20px auto;
}

/* 布局样式 */
.section-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 150px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}

:deep(.section-container.fade-in) {
  opacity: 1;
  transform: translateY(0);
}

.section-container :deep(.reverse) {
  flex-direction: row-reverse;
}

.text-container {
  margin-left: 100px !important;
}


.image-container {
  position: relative;
}

.image-container img {
  width: 600px;
  height: 400px;
  border-radius: 8px;
  object-fit: cover
}

.citation {
  position: absolute;
  bottom: -10px;
  right: 2px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.citation img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 30px;
  text-decoration: none;
  font-size:18px;
}

a{
  text-decoration: none;
  color:#333;
}
a:hover{
  color: #007bff;
}

.learn-more {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  height: 50px;
  width:80px ;
  border-radius: 3px;
}

.learn-more:hover {
    background-color: #007bff;
    color: white;
}

</style>
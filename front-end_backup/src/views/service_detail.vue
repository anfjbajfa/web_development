<template>
  <!-- 分隔线 -->
  <hr />
  <div class="overall_layout" v-lazy>
    <div style="text-align:center">
      <h2>业务详情</h2>
      <div class="yellow-line"></div>
    </div>
    <!-- 第一部分 -->
    <div id="gong_cheng" class="section-container" v-fade>
      <div class="text-container">
        <h2>工程测绘，精度和数据安全是我们的承诺</h2>
        <ul>
          <li>
            => 地形测绘：详细记录地形地貌特征，包括高程、坡度、地形变化等
          </li>
          <li>
            => 施工放样：将设计图纸上的位置和尺寸准确传递到施工现场
          </li>
          <li>
            => 监测测绘：对工程结构的变形、沉降、位移等进行长期监测
          </li>
          <li>
            => 建筑工程：为建筑设计、施工提供地形图、基准点等数据。
          </li>
        </ul>
        <!-- <button @click="navigateToRequest" class="learn-more">填写需求表单</button> -->
        <RouterLink to="/services/engineerSurveying" class="learn-more">了解施工详情,最多跑一次</RouterLink>
      </div>
      <div class="image-container">
        <img src="/gongcheng.jpg" alt="line" />
      </div>
    </div>


    <!-- 第二部分 -->
    <div id="bu_dong_chan" class="section-container reverse" v-fade>
      <div class="image-container">
        <img src="/CAD.webp" alt="surveying" />
        <!-- <div class="citation">
          <div>
            <strong>临平区人民广场测量图</strong><br />
          </div>
        </div> -->
      </div>
      <div class="text-container">
        <h2>界线与不动产测绘，ToB和ToG多种商业模式</h2>
        <ul>
          <li>
            => 边界测绘：明确土地、不动产的边界线，确保权属清晰
          </li>
          <li>
            => 权属测绘：记录土地、不动产的所有权、使用权等权属信息
          </li>
          <li>
            => 综合测绘：结合土地使用规划、地籍信息等进行全面测绘
          </li>
        </ul>
        <RouterLink to="/services/LineSurveying" class="learn-more">了解施工详情,最多跑一次</RouterLink>
      </div>
    </div>

    <!-- 第三部分 -->
    <div id="di_li_xin_xi" class="section-container" v-fade>
      <div class="text-container">
        <h2>地理信息，软件+AI+硬件的深度结合</h2>
        <ul>
          <li>
            => 数据采集：专业的无人机团队进行高效的采集
          </li>
          <li>
            => 软件开发和设计：打造一体化的数据存储和处理的GIS应用
          </li>
          <li>
            => KUAYUAN大模型：公司自研AI语义像素级分割大模型
          </li>
        </ul>
        <!-- <button @click="navigateToRequest" class="learn-more">填写需求表单</button> -->
        <RouterLink to="/services/GIS" class="learn-more">了解施工详情,最多跑一次</RouterLink>
      </div>
      <div class="image-container">
        <img src="/Geoai.webp" alt="line" />
        <div class="citation">
          <div>
            <strong>跨远大模型地物分类成品</strong><br />
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

</script>

<style scoped>
.overall_layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 每个 section 间的分割线 */
hr {
  border: none;
  height: 1px;
  width: 70%;
  background-color: #ddd;
  margin: 20px auto;
}

.section-container {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 150px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
  gap: 230px;
}


/* 反向布局 */
.reverse {
  flex-direction: row-reverse;
}

/* 容器内文本/图片 */
.text-container h2 {
  margin-bottom: 30px;
}

.image-container {
  position: relative;
}

.image-container img {
  width: 550px;
  height: 350px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  object-fit: fill;
}

/* 右下角的小标签 */
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

/* 文字列表 */
ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 30px;
  text-decoration: none;
  font-size: 18px;
}


.learn-more {
  color: black;
  text-decoration: none;
  font-weight: bold;
  height: 100px;
  width: auto;
  border-radius: 3px;
  border: 2px solid #aaa;
  padding: 10px 15px;
  line-height: 46px;
}

.learn-more:hover {
  background-color: #333;
  color: white;
}

/* ============ 小屏：单列布局 ============ */
@media screen and (max-width: 768px) {
  .overall_layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section-container {
    margin-bottom: 80px;
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  /* 强制所有元素顺序为：文字在上，图片在下 */
  .text-container,
  .image-container {
    order: initial !important;
    text-align: center;
  }

  /* 覆盖反向布局 */
  .reverse {
    flex-direction: column-reverse;
  }

  .image-container img {
    width: 100%;
    height: auto;
    max-width: 350px;
    margin: 0 auto;
  }

  ul li {
    font-size: 12px;
  }

  .learn-more {
    font-size: 12px;
    line-height: 20px;
  }

  .text-container h2{
    text-align: center;
    font-size: 14px !important;
  }
}

/* ============ 超小屏 (<= 480px) 再做微调 ============ */
@media screen and (max-width: 480px) {
  .section-container {
    margin-bottom: 50px;
  }

  .image-container img {
    width: 100%;
  }

  .learn-more {
    font-size: 12px;
    line-height: 20px;
  }
}
</style>

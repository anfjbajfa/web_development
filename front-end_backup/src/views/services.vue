<template>
  <navbar></navbar>
  <div class="about-us-section">
    <div class="about-container">
      <div class="left">
        <h2>关于团队</h2>
        <p>公司拥有一支技术规范、敬业负责的专业测绘技术队伍。公司现有职工45人，其中从事<br>测绘、计算机技术的专业技术人员40人，具有中高级职称的18人，具有初级职称的13人</p>
      </div>
      <div class="right">
        <img src="/staff.webp" alt="About us image" />
      </div>
    </div>

    <div class="stats-container">
      <div class="stat-item">
        <h3>1000+</h3>
        <p>完成项目</p>
      </div>
      <div class="stat-item">
        <h3>200+</h3>
        <p>合作伙伴</p>
      </div>
      <div class="stat-item">
        <h3>80%+</h3>
        <p>硕士学历</p>
      </div>
      <div class="stat-item">
        <h3>20+</h3>
        <p>测绘大奖</p>
      </div>
    </div>
   
    <div class="offices-section">
    <h2>办公地点</h2>
    <div class="offices-container">
      <a href="https://ditu.amap.com/search?id=B0HUU7S4S8&city=330113&geoobj=119.891395%7C30.125154%7C120.770717%7C30.539478&query_type=IDQ&query=%E6%9D%AD%E5%B7%9E%E8%B7%A8%E8%BF%9C%E6%B5%8B%E7%BB%98%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&zoom=11.29" target="_blank" title="在高德中打开">
        <div class="office-card">
            <div class="image-container">
                <img src="/linping_location.png" alt="临平办公室地图">
            </div>
            <div class="office-content">
                <h4>临平</h4>
                <p>杭州市临平区南苑街道人民大道652-30号(三楼)</p>
            </div>
        </div>
      </a>
      <a href=" https://ditu.amap.com/search?id=B0JAGCEM4X&city=330110&geoobj=120.302767%7C30.408755%7C120.31598%7C30.414976&query_type=IDQ&query=%E6%9D%AD%E5%B7%9E%E8%B7%A8%E8%BF%9C%E6%B5%8B%E7%BB%98%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E4%BD%99%E6%9D%AD%E5%88%86%E5%85%AC%E5%8F%B8&zoom=17.35" target="_blank" title="在高德中打开">
        <div class="office-card">
            <div class="image-container">
                  <img src="/yuhang_location.png" alt="余杭办公室地图">         
            </div>
            <div class="office-content">
                <h4>余杭</h4>
                <p>杭州市余杭区余杭街道禹航路66-3号浙江德裕科技楼1008室</p>
            </div>
        </div>
      </a>
    </div>
  </div>
</div>

<service_detail></service_detail>

</template>



<script setup>

import { reactive } from 'vue';
import navbar from '../components/navbar.vue';
import service_detail from './service_detail.vue';

</script>


<style scoped>
.about-us-section {
  width: 100%;
  text-align: center;
  padding: 50px 0;
}

.about-container {
  display: flex;
  background-color: #333;
  align-items: center;
  justify-content: space-around;
  padding: 40px;
  margin-bottom: 50px;
  height: 40vh;
}

.left {
  display: flex;
  flex-direction: column;
}

.right { 
  height: 150px;
  width: 300px;
}

.right img {
  display: block;
  width: 100% ;
  height: 100% ;
  object-fit: cover; /* 让图片填充容器并适当裁剪 */
  border-radius: 5%;
}

.about-container h2 {
  font-size: 40px;
  color: #fafafb;
  margin-bottom: 0;
}

.about-container p {
  font-size: 18px;
  color: #fefefe;
  margin-bottom: 20px;
}



.stats-container {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 30px 0;
  margin-bottom: 50px;
}

.stat-item h3 {
  font-size: 36px;
  background: linear-gradient(to bottom, rgb(94, 37, 25), #ff8c00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 10px;
}

.stat-item p {
  font-size: 20px;
  color: #4a4a4a;
}

.offices-section {
    width:100%;
    margin: 0 auto;
    background-color: #f9f9f9;
    height: 270px;
}

.offices-section h2 {
    text-align: center;
    font-size: 40px;
    margin-bottom: 30px;
}

.offices-container {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
}
.offices-container a {
  text-decoration: none;
}

.office-card {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 450px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
}

/* 悬停效果 */
.office-card:hover {
    transform: translateY(-5px); /* 上移效果 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
    background-color: #f9f9f9; /* 背景颜色变化 */
}

.office-card .image-container {
    flex-shrink: 0;
    width: 100px;
    height: 100px;
}

.office-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.office-content {
    text-align: left;
    flex-grow: 1;
}

.office-card h4 {
    font-size: 20px;
    color: #f58f00;
    margin: 0 0 10px 0;
}

.office-card p {
    font-size: 15px;
    color: #4a4a4a;
    margin: 0;
    line-height: 1.4;
}

/* 悬浮效果 */
.image-container a:hover img {
    filter: brightness(0.8); /* 图片变暗 */
}

</style>

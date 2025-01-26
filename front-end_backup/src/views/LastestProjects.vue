<template>
  <div class="latest-projects">
    <h2>项目集合</h2>
    <div class="yellow-line"></div>
    <div class="projects-container">
      <!-- 项目卡片1 -->
      <div class="project-card">
        <img src="/alidamo.jpg" alt="阿里达摩院" />
        <div class="project-info">
          <h3>余杭区项目</h3>
          <p>
            余杭是文化古邑，是“中华文明圣地”——良渚古城遗址所在地，是良渚文化的发祥地，拥有5000年“良渚文化”，2000年“运河文化”和1000年“径山禅茶文化”。
          </p>
          <button>查看所有</button>
        </div>
      </div>

      <!-- 项目卡片2 -->
      <div class="project-card">
        <img src="/linpinCinema.jpg" alt="临平大剧院" />
        <div class="project-info">
          <h3>临平区项目</h3>
          <p>
            临平之名在东汉时已见诸史册，晋时形成集市，隋唐以来是上塘河水路东出杭州的必经之地。临平区历史悠久、人文荟萃，是典型的江南水乡、鱼米之乡，先后获得2018—2020年健康浙江建设先进区等荣誉称号。
          </p>
          <button>查看所有</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.latest-projects {
  text-align: center;
  padding: 10px 20px;
  max-width: 1400px;
  margin: 0 auto; /* 设置了max-width会左对齐，所以需要这一行来中间对齐 */
}

h2 {
  font-weight: bold;
  margin-bottom: 10px;
}


.projects-container {
  display: flex;
  justify-content: center;
  gap: 10vw;
  margin-bottom: 30px;
}

.project-card {
  width: 40vw;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-card img {
  width: 100%;
  aspect-ratio: 16 / 10; /* 例子 */
  object-fit: cover;    /* 或 contain */
}

.project-info {
  padding: 20px;
}

.project-info h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.project-info p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.project-info button {
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #000;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.project-info button:hover {
  background-color: #000;
  color: #fff;
}

/* ============ 新增媒体查询示例 ============ */

/* 768px 以下：平板及大部分手机 */
@media screen and (max-width: 768px) {
  .latest-projects {
    text-align: center;
    padding: 0;
  }
  .projects-container {
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  .project-card {
    width: 95vw;
    margin-bottom: 20px;
    min-height:auto;
  }
}

/* 480px 以下：更小屏幕的手机 */
@media screen and (max-width: 480px) {
  .project-info {
    padding: 15px;      /* 减少内边距 */
  }
  
  .project-info button {
    padding: 8px 16px;
  }
}
</style>

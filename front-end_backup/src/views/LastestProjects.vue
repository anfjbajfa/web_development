<template>
    <div class="latest-projects">
      <h2>最近项目</h2>
      <div class="yellow-line"></div>
      <div class="projects-container">
        <!-- 项目卡片1 -->
        <div class="project-card">
          <img src="/projectPhoto.jpeg" alt="Project 1" />
          <div class="project-info">
            <h3>Service Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id et euismod bibendum adipiscing et orci, fermentum.
            </p>
            <button>Learn More</button>
          </div>
        </div>
  
        <!-- 项目卡片2 -->
        <div class="project-card">
          <img src="/projectPhoto.jpeg" alt="Project 2" />
          <div class="project-info">
            <h3>Service Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id et euismod bibendum adipiscing et orci, fermentum.
            </p>
            <button>Learn More</button>
          </div>
        </div>
  
        <!-- 项目卡片3 -->
        <div class="project-card">
          <img src="/projectPhoto.jpeg" alt="Project 3" />
          <div class="project-info">
            <h3>Service Title</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id et euismod bibendum adipiscing et orci, fermentum.
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </div>
  
      <button class="view-all">VIEW ALL</button>
    </div>
  </template>
  
<style scoped>
.latest-projects {
  text-align: center;
  padding: 10px 20px;
}

h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.yellow-line {
  width: 50px;
  height: 5px;
  background-color: #ffc107;
  margin: 0 auto 30px auto;
}

.projects-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap; /* 允许子元素换行 */
}

.project-card {
  width: 30%;
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
  height: auto;
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

.view-all {
  background-color: transparent;
  border: 2px solid #000;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.view-all:hover {
  background-color: #000;
  color: #fff;
}

/* 添加媒体查询 */
@media screen and (max-width: 768px) {
  .projects-container {
    flex-direction: column;
    align-items: center;
  }

  .latest-projects h2{
    font-size: 25px;
    margin-left: 0 !important;
    padding-left: 0 !important;
  }

  .project-card {
    width: 100%;
    margin-bottom: 20px;
  }

  .project-info {
    padding: 15px;
  }

  .project-info h3 {
    font-size: 1.5rem;
  }

  .project-info p {
    font-size: 1rem;
  }

  .project-info button {
    padding: 8px 16px;
    font-size: 1rem;
  }

  .view-all {
    width: 100%;
    font-size: 1rem;
  }
}

</style>
  
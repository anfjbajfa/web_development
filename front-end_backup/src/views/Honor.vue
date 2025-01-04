<template>
    <navbar/>
    <div class="timeline-container">
      <div class="timeline-item" v-for="(item, index) in timelineData" :key="index">
        <div class="circle" :style="{ backgroundColor: item.circleColor }"></div>
        <div class="text-container">
          <!-- <p class="date">{{ item.date }}</p> -->
          <h3 class="title">{{ item.title }}</h3>
          <p class="description">{{ item.description }}</p>
          <a :href="item.link" target="_blank" class="link">{{ item.linkText }}</a>
        </div>
        <div class="image-container">
          <img :src="item.imageSrc" :alt="item.title" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import navbar from '../components/navbar.vue';
  const timelineData = [
    {
      date: "Jun–Aug 2023",
      title: "Designing with the usage data",
      description:
        "How I analyzed the most used UI component among the most sophisticated design team — data-informed design insights.",
      link: "#",
      linkText: "Read the case study →",
      imageSrc: "/images/example1.png",
      circleColor: "#c5f6fa", // Light blue
    },
    {
      date: "Oct 2023",
      title: "Iterative study — 10 years in the making",
      description:
        "For a decade I worked closely with the product data to build the flagship product this is now.",
      link: "#",
      linkText: "See projects and video →",
      imageSrc: "/images/example2.png",
      circleColor: "#d0bfff", // Light purple
    },
    {
      date: "Apr–May 2023",
      title: "Designing two key Analyze features",
      description:
        "How I redesigned YCombinator’s flagship app, happening after two years and launched two features simultaneously.",
      link: "#",
      linkText: "Read the case study →",
      imageSrc: "/images/example3.png",
      circleColor: "#a5d8ff", // Light sky blue
    },
  ];
  </script>
  
  <style scoped>
  .timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 20px;
    background-color: #f7f7f7;
  }
  
  .timeline-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
  }
  
  .circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    grid-column: 1 / span 2;
    margin: 0 auto;
    z-index: -1;
  }
  
  .text-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .date {
    font-size: 14px;
    color: #666;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  
  .description {
    font-size: 16px;
    color: #555;
  }
  
  .link {
    font-size: 16px;
    color: #007bff;
    text-decoration: none;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  
  .image-container {
    text-align: center;
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .timeline-item {
      grid-template-columns: 1fr;
      text-align: center;
    }
  
    .text-container {
      align-items: center;
    }
  }
  </style>
  
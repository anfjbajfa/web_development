<template>
    <div class="h-screen flex flex-col">
      <Header1/>
      <div>
        <Test />
        <MainContent class="flex flex-1"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import Header1 from '../components/Header.vue';

  import Test from '../components/SideBar.vue'
  import MainContent from '../components/MainContent.vue';
  </script>
  
  <style>
  /* 全局样式或根元素样式 */
  body {
    font-family: 'Arial', sans-serif;
  }
  </style>
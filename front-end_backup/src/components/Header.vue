<template>
    <header class="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div class="flex items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-auto" src="https://tailwindcss.com/img/logo.svg" alt="Logo">
        </div>
        <!-- Search Bar -->
        <div class="ml-6 relative">
          <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 w-80">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 4.5a7.5 7.5 0 010 15z"></path></svg>
          </span>
        </div>
      </div>
      <!-- Right side user info -->
      <div class="flex items-center">
        <button class="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 15.15V13a6 6 0 10-12 0v2.15c0 .532-.214 1.04-.595 1.445L4 17h5m6 0v3a3 3 0 01-6 0v-3m6 0H9"></path></svg>
        </button>
        <div class="relative">
          <button class="flex items-center text-sm rounded-full focus:outline-none">
            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1603415526960-f8f50e0b36c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80" alt="User">
            <span class="ml-2 text-gray-700">Tom Cook</span>
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  // 此组件不需要特别的逻辑，只是一个静态布局组件
  </script>
  
  <style scoped>
  /* 可以在这里添加组件特定的样式 */
  </style>
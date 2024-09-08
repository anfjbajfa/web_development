<template>

  <div class="flex flex-col h-screen">

    <div class='flex-grow bg-white-300 dark:bg-gray-500'>
      <RouterView></RouterView>
    </div>

    <foot :company_name=company_name fb_link="https://www.facebook.com/"
      git_link="https://github.com/MusaChowdhury/IT-Company-Website-Vue3" />

  </div>
</template>


<script setup>


import { RouterView,useRoute } from 'vue-router';
import { computed } from 'vue';
import foot from './views/foot.vue'






const company_name = "跨远"

// const route = useRoute();
// const isLoginPage = computed(() => route.path === '/login');
// const isRegisterPage = computed(()=>route.path ==='/login/register');
// const isDatasetPage = computed(()=>route.path==='/dataset')




</script>

<style scoped></style>
<template>
      <RouterView></RouterView>
      <foot></foot>
</template>


<script setup>
import { RouterView,useRoute } from 'vue-router';
import {useStore} from 'vuex';
import { onMounted,computed } from 'vue';
import foot from './views/foot.vue';
const store = useStore()

onMounted(()=>{
      // store.dispatch('showLoading');
      store.dispatch('checkLoginStatus')
      if (store.getters.isLogined && store.getters.isAdmin) {
      // 如果是管理员，启动轮询
      store.dispatch('startPendingOrderPolling')
      
      }
      
})
</script>

<style scoped></style>
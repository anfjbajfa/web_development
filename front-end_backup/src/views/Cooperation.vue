
  <template>
    <navbar/>
    <div>

      <button @click="getTest">获取所有用户信息</button>
      <div v-if="userInfo.length > 0">
        <h2>验证成功</h2>
        <!-- 在此处可以迭代显示用户信息 -->
        <ul>
          <li v-for="user in userInfo">
            {{ user.email }} - {{ user.userName }}
          </li>
        </ul>
        <!-- <span v-for="n in 10">{{ n }}</span> -->
      </div>
      <div v-else>
        <p>暂无用户信息</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAllUserInfo } from '../api/user';
  import navbar from '../components/navbar.vue';
  
  // 使用 ref 创建一个响应式数据存储用户信息
  const userInfo = ref([]);
  
  // 定义一个异步函数来获取用户信息
  async function getTest() {
    try {
      const response = await getAllUserInfo();
      console.log(response);
      if (Array.isArray(response)) {  // 确保 response 是数组格式
        userInfo.value = response; // 直接将 response 赋值给 userInfo
      
      } else {
        console.log('未知错误:', response);
      }
    } catch (error) {
      console.error('Failed to fetch user information:', error);

    }
  }
  </script>
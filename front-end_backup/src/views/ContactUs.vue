<template>
    <div class="contact-us-wrapper">
      <h2>与我们联系</h2>
      <div class="yellow-line"></div>
      <div class="contact-us">
        <!-- 电话和邮箱 -->
        <div class="contact-way">
          <h3>电话和邮箱</h3>
          <p>电话：400-123-4567</p>
          <p>邮箱：contact@example.com</p>
        </div>
        <!-- 线下联系 -->
        <div class="contact-way">
          <h3>办公地点</h3>
          <p>余杭：余杭街道禹航路66-3号浙江德裕科技楼1008室</p>
          <p>临平：南苑街道人民大道652-30号(三楼)</p>
        </div>
        <!-- 填写需求表单 -->
        <div class="contact-way">
          <h3>线上申请</h3>
          <p>3分钟快速让我们了解您的项目需求</p>
          <button class="contact-us-button" @click="handleClick">
            填写项目需求表
          </button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { useStore } from 'vuex'
  import { ElMessageBox } from 'element-plus'
  import { useRouter } from 'vue-router'
  
  const store = useStore()
  const router = useRouter()
  
  const handleClick = () => {
    if (!store.getters.isLogined) {
      ElMessageBox.confirm(
        '您需要登录才能填写需求表单，是否立即登录？',
        '提示',
        {
          confirmButtonText: '去登录',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        router.push('/login')
      })
    } else {
      router.push("/request")
    }
  }
</script>
  
<style scoped>
  .contact-us-wrapper {
    text-align: center;
    background-color: #f7f7f7;
    padding: 50px 20px;
    border-radius: 8px;
  }
  
  .contact-us {
    width: 100%;
    margin-top: 30px;
    height: auto;
    background-color: #ffffff;
    color: #333333;
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 三列布局 */
    gap: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
  }
  
  .contact-way {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .contact-way h3 {
    color: #555555;
    margin-bottom: 10px;
    font-size: 18px;
    text-transform: uppercase;
  }
  
  .contact-way p {
    margin: 5px 0;
    color: #777777;
    font-size: 15px;
  }
  
  .contact-us-button {
    display: inline-block;
    background-color: #ffc107;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: white;
    transition: background-color 0.3s, transform 0.3s;
    border-radius: 8px;
  }
  
  .contact-us-button:hover {
    background-color: #ffc107 !important;
    transform: scale(1.05);
  }
  
  .yellow-line {
    width: 50px;
    height: 5px;
    background-color: #ffc107;
    margin: 0 auto 30px auto;
    border-radius: 2px;
  }
  
  /* ============ 新增媒体查询示例 ============ */
  
  /* 768px 以下：平板及大部分手机 */
  @media screen and (max-width: 768px) {
    .contact-us {
      grid-template-columns: 1fr; /* 改为单列 */
      gap: 30px;
      padding: 20px;              /* 适当减小内边距 */
    }
    .contact-way {
      padding: 15px;
    }
    .contact-way h3 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    .contact-way p {
      font-size: 14px;
    }
    .contact-us-button {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
  
  /* 480px 以下：更小屏幕的手机 */
  @media screen and (max-width: 480px) {
    .contact-us-wrapper {
      padding: 30px 10px;
    }
    .contact-us {
      gap: 20px;         /* 再次缩小网格间距 */
      padding: 15px;
    }
    .contact-way h3 {
      font-size: 14px;
    }
    .contact-way p {
      font-size: 13px;
    }
    .contact-us-button {
      font-size: 14px;
      padding: 6px 12px;
    }
  }
  </style>
  
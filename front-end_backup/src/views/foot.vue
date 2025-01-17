<template>
  <footer class="footer">
    <!-- <div class="footer-title">关注我们</div> -->

    <div class="footer-content">
      <div class="footer-section">
        <!-- <div class="social-icons">
          <a href="#"><i class="icon-wechat"></i></a>
        </div> -->
      </div>

      <div class="footer-section">
        <h3>关于我们</h3>
        <div class="section-divider"></div>
        <ul>
          <li><a href="#">公司简介</a></li>
          <li><a href="#/honor">公司荣誉</a></li>
          <li><a href="#/Cooperation">合作伙伴</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>联系我们</h3>
        <div class="section-divider"></div>
        <ul>
          <li><a href="#/services">解决方案</a></li>
          <li><a href="#" @click.prevent="handleClick">线上申请</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>加入我们</h3>
        <div class="section-divider"></div>
        <ul>
          <li><a href="#/recruitment">简历投递</a></li>
        </ul>
      </div>

      <div class="footer-logo"></div>
    </div>
    <p class="footer-copyright">&copy; 2025 KuaYuan. All rights reserved.</p>
  </footer>
</template>

<script setup>
import { useStore } from 'vuex';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const handleClick = () => {
  if (!store.getters.isLogined) {
    ElMessageBox.confirm('您需要登录才能填写需求表单，是否立即登录？', '提示', {
      confirmButtonText: '去登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      router.push('/login');
    });
  }
};
</script>

<style>
.footer {
  background-color: #f9f9f9;
  padding: 20px 40px;
  border-top: 1px solid #ddd;
  font-size: 18px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.footer-title {
  font-size: 22px;
  display: flex;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  margin: 10px 0;
}

.footer-section h3 {
  font-size: 24px;
  margin-bottom: 16px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 18px;
}

.footer-section ul li a {
  color: #333;
  text-decoration: none;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.section-divider {
  border-top: 1px solid #e0e0e0;
  margin: 4px 0 18px;
}

.footer-copyright {
  text-align: left;
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    flex: 1 1 100%;
    max-width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  .footer-section h3 {
    font-size: 20px;
  }

  .footer-section ul li {
    margin-bottom: 12px;
  }

  .footer-copyright {
    text-align: left;
    margin-top: 20px;
    font-size: 12px;
    color: #666;
  }

  .footer {
    padding: 20px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .footer {
    font-size: 14px;
    padding: 15px;
  }

  .footer-section h3 {
    font-size: 18px;
  }

  .footer-section ul li {
    margin-bottom: 10px;
  }

  .footer-copyright {
    text-align: left;
    margin-top: 20px;
    font-size: 10px;
    color: #666;
  }
}
</style>

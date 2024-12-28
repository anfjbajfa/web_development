<template>
  <navbar></navbar>
  <div class="form-container">
    <div class="form-box">
      <p class="info-text">
        表格所填写的信息只用于公司了解业务详情，遵守隐私法律绝不出售，谢谢配合！
      </p>
      <p class="info-text">
        请准确填写您的信息方便与您联系，如有任何疑惑可直接拨打电话咨询，公司营业时间为早上9点到下午4点：10086
      </p>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="gender">敬称 <span class="required">*</span></label>
    
          <select id="gender" v-model="formData.gender" required>
            <option value="">选择</option>
            <option value="M">先生</option>
            <option value="F">女士</option>
          </select>
        </div>

        <div class="form-group">
          <label for="fullName">姓名/姓氏<span class="required">*</span></label>
          <input type="text" id="fullName" v-model="formData.fullName" required />
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="formData.email" />
        </div>

        <div class="form-group">
          <label for="projectName">项目名称<span class="required">*</span></label>
          <input type="text" id="projectName" v-model="formData.projectName" required/>
        </div>

        <div class="form-group">
          <label for="site">施工地址<span class="required">*</span></label>
          <input type="text" id="site" v-model="formData.site" required />
        </div>

        <div class="form-group">
          <label for="product">服务类型选择<span class="required">*</span></label>
          <select id="product" v-model="formData.product" required>
            <option value="">选择服务类型</option>
            <option :value="1">工程测绘</option>
            <option :value="2">线与不动产测绘</option>
            <option :value="3">地理信息系统工程</option>
            <option :value="4">两项或者以上</option>
            <option :value="5">其他</option>
          </select>
        </div>

        <div class="form-group">
          <label for="issue">施工大致描述</label>
          <textarea id="issue" v-model="formData.issue" rows="5"></textarea>
        </div>

        <div class="form-group newsletter">
          <input class="newsletter_style" type="checkbox" id="newsletter" v-model="formData.newsletter" />
          <label for="newsletter">订阅我们的消息</label>
        </div>

        <button type="submit" class="submit-button" :disabled = "isSubmitting">
          {{ isSubmitting?'提交中...':'提交' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive,ref} from 'vue';
import navbar from '../components/navbar.vue';
import { submitRequestForm } from '../api/requestForm';
import { ElMessage } from 'element-plus';
import { getUserInfo } from '../utils/storage';
import { useStore } from 'vuex'; 
import router from '../router';

const store = useStore();

const isSubmitting = ref(false)
const formData = reactive({
  gender: '',
  fullName: '',
  email: '',
  projectName:'',
  site: '',
  product: '',
  issue: '',
  newsletter: false,
});


const submitForm = async() => {
  if (!formData.gender || !formData.fullName || !formData.site || !formData.product) {
    ElMessage.error("请填写必需信息")
    return;
  }

  isSubmitting.value = true

  
  // 构建要发送的数据
  const payload = {
    phone: getUserInfo().phone,
    status:1, //1代表pending
    gender: formData.gender,
    fullName: formData.fullName,
    email: formData.email,
    projectName: formData.projectName,
    site: formData.site,
    product: formData.product,
    issue: formData.issue,
    newsletter: formData.newsletter,
  };

  submitRequestForm(payload)
          .then(() => {
              ElMessage.success('表单提交成功!请等待管理员处理!详情可前往用户中心查看');

              // 更新vuex状态，显示红点
              store.commit('setHasNewOrder',true)
              
              // 可选：重置表单
              Object.keys(formData).forEach(key => {
                if (typeof formData[key] === 'boolean') {
                  formData[key] = false;
                } else {
                  formData[key] = '';
                }
              });
              router.push('/');
          })
          .catch(() => {
              ElMessage.error('表单提交失败');
          })
          .finally(() => {
              isSubmitting.value = false;
          });
  };
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  margin-top: 60px;
}

.form-box {
  width: 60%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.info-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px; 
}

.required {
  color: red;
}

.newsletter {
  display: flex;
  align-items: center;
  font-size: 11px;
}
.newsletter input{
  width:1vw;
  margin: 0;
}
.newsletter label{
  margin: 0;
}


.submit-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4a5568;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
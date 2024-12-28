<template>
    <Navbar />
    <div class="order-page">
        <!-- 左侧侧边栏 -->
        <aside class="sidebar">
            <ul class="menu">
                <li class="menu-item active">订单</li>
            </ul>
            <div class="sidebar-profile">
                <div class="avatar"></div>
                <div>
                    <p>admin</p>
                    <p>1111111111</p>
                </div>
            </div>
        </aside>

        <!-- 主内容 -->
        <main class="main">
            <!-- 顶部搜索和筛选 -->
            <div class="filters">
                <!-- 搜索字段选择 -->
                <el-select v-model="searchField" placeholder="搜索字段" class="filter-select">
                    <el-option label="Project Name" value="projectName"></el-option>
                </el-select>

                <!-- 搜索关键词输入框 -->
                <el-input v-model="searchKeyword" placeholder="请输入搜索关键词" class="filter-input" />

                <!-- 状态筛选 -->
                <el-select v-model="filterStatus" placeholder="选择状态" class="filter-select">
                    <el-option label="pending" value="pending"></el-option>
                    <el-option label="processing" value="processing"></el-option>
                    <el-option label="completed" value="completed"></el-option>
                    <el-option label="canceled" value="canceled"></el-option>
                    
                </el-select>
            </div>

            <!-- 表格 -->
            <el-table :data="filteredOrders" border stripe class="order-table">
                <el-table-column prop="id" label="账单号" width="120" />
                <el-table-column prop="gender" label="尊称" width="100">
                    <template #default="{ row }">
                        {{ row.gender === M? '先生' : '女士' }}
                    </template>
                </el-table-column>
                <el-table-column prop="fullName" label="客户姓名" width="150" />
                <el-table-column prop="phone" label="客户电话" width="120"/>
                <el-table-column prop="status" label="订单状态" width="120">
                    <template #default="{ row }">
                        <el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮件" />
                <el-table-column prop="product" label="服务需求" />
                <el-table-column prop="projectName" label="项目名称" />
                <el-table-column prop="createTime" label="创建时间">
                    <template #default="{ row }">
                        {{ new Date(row.createTime).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                    <template #default="{ row }">
                        {{ new Date(row.updateTime).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column label="ACTIONS">
                    <template #default>
                        <el-button icon="el-icon-edit" type="text" />
                    </template>
                </el-table-column>
            </el-table>


            <!-- 分页 -->
            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="totalOrders"
                layout="prev, pager, next" class="pagination" />
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from '../components/navbar.vue';
import {getAllOrders} from '../api/requestForm.js'

// 搜索字段
const searchField = ref('orderID');
const searchKeyword = ref('');
const filterStatus = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const orders = ref([]);

const fetchOrders = async ()=>{
    try {
        const ordersResponse = await getAllOrders();
        orders.value = ordersResponse
        console.log(ordersResponse)
    } catch (error){
        console.log("获取全部订单失败",error)
    }
}

onMounted(()=>{
    fetchOrders();
})


// 计算总订单数
const totalOrders = computed(() => orders.value.length);
console.log(totalOrders)

// 筛选和分页
const filteredOrders = computed(() => {
  let filtered = orders.value;

  // 按搜索字段和关键词过滤
  if (searchKeyword.value) {
    filtered = filtered.filter(order =>
      order[searchField.value]
        ?.toString()
        .toLowerCase()
        .includes(searchKeyword.value.toLowerCase())
    );
  }

  // 按状态过滤
  if (filterStatus.value) {
    filtered = filtered.filter(order => order.status === filterStatus.value);
  }

  // 分页
  return filtered.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});

// 设置状态类型
const statusType = status => {
  switch (status) {
    case 'pending':
      return 'danger';
    case 'processing':
      return 'warning'
    case 'complete':
      return 'success';
    case 'cancelled':
      return 'info';
    default:
      return 'warning';
  }
};
</script>

<style scoped>
.order-page {
    display: flex;
    min-height: calc(100vh - 75px);
    background-color: #f5f5f5;
    margin-top: 75px;
}

.sidebar {
    width: 240px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e0e0e0;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.menu-item {
    padding: 15px 20px;
    cursor: pointer;
    transition: background 0.3s;
}

.menu-item:hover {
    background-color: #f0f0f0;
}

.menu-item.active {
    background-color: #f0f0f0;
    font-weight: bold;
}

.sidebar-profile {
    display: flex;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #e0e0e0;
}

.avatar {
    width: 40px;
    height: 40px;
    background-color: #ddd;
    border-radius: 50%;
    margin-right: 10px;
}

.main {
    flex: 1;
    padding: 20px;
}

.filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.filter-select {
    width: 150px;
}

.filter-input {
    flex: 1;
}

.order-table {
    margin-bottom: 20px;
}

.pagination {
    text-align: right;
}
</style>
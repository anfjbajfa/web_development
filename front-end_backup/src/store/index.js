// src/store/index.js
import { createStore } from 'vuex';
import { getUserInfo } from "../utils/storage";
import { getPendingCount,updateOrderStatus } from "../api/requestForm";
export default createStore({
  state: () => ({
    isLogined: false,
    isAdmin: false,
    hasNewOrder:false,
    pendingOrderCount: 0,
    pollingTimer: null,
  }),
  mutations: {
    // 更新登录状态
    setLogined(state, status) {
      state.isLogined = status;
    },
    // 更新管理员状态
    setAdminStatus(state, status) {
      state.isAdmin = status;
    },
    // 更新是否有新订单状态（客户）
    setHasNewOrder(state,status) {
      state.hasNewOrder = status
    },
    // 更新是否有待处理订单状态（管理员）
    setPendingOrderCount(state, count) {
      state.pendingOrderCount = count;
    },
    setPollingTimer(state,timer){
      state.pollingTimer = timer;
    },
    clearPollingTimer(state){
      if(state.pollingTimer){
        clearInterval(state.pollingTimer);
        state.pollingTimer=null;
      }
    },
  },
  actions: {
    // 检查登录状态
    checkLoginStatus({ commit }) {
      const userInfo = getUserInfo();
      if (userInfo) {
        commit('setLogined', true);
        commit('setAdminStatus', userInfo.isAdmin || false);
      } else {
        commit('setLogined', false);
        commit('setAdminStatus', false);
      }
    },
// 通过向后端轮询来发现是否有OrderStatus为pending的订单
    async checkPendingOrderCount({commit}){
      try{
        const pendingOrders = await getPendingCount();
        const count = pendingOrders;
        if(count>0){
          commit('setPendingOrderCount',count)
        } else {
          commit('setPendingOrderCount',0)
        }
      } catch (error){
        console.log("检查pending订单失败",error)
      }
    },

    // 定时轮询
    startPendingOrderPolling({ dispatch, commit, state }) {
      if (state.isAdmin) {
        // 立即执行一次
        dispatch('checkPendingOrderCount')
        // 设置定时器
        const timer = setInterval(() => {
          dispatch('checkPendingOrderCount')
        }, 30 * 60 * 1000)
        commit('setPollingTimer', timer)
      }
    },
    stopPendingOrderPolling({ commit }) {
      commit('clearPollingTimer')
    },
  },
  
  getters: {
    isLogined: (state) => state.isLogined,
    isAdmin: (state) => state.isAdmin,
    hasNewOrder: (state) => state.hasNewOrder,
    pendingOrderCount: (state) => state.pendingOrderCount
  }
  
  
});

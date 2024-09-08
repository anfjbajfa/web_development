import { createStore } from 'vuex'

import { getUserInfo } from "../utils/storage"

// 将静态数据移到单独的文件中
import { homeData, developmentData } from './staticData'

// 创建管理员模块
// const adminModule = {
//   namespaced: true,
//   state: () => ({
//     adminInfo: {
//       nickName: "",
//       signature: "",
//       githubUrl: "https://github.com/zhiyiYo",
//     },
//     isAdmin: getUserInfo()?.isAdmin || false
//   }),
//   //调用mutations中的方法
//   actions: {
//     // async getAdminInfo({ commit }) {
//     //   const data = await getAdminInfo()
//     //   commit('updateAdminInfo', data)
//     //   return data
//     // },
    
//   },
//   mutations: {
//   //   updateAdminInfo(state, adminInfo) {
//   //     Object.assign(state.adminInfo, adminInfo)
//   //   },
    
//   //   updateIsAdmin(state) {
//   //     state.isAdmin = getUserInfo()?.isAdmin || false
//   //   }
//   // },
// }

// export default createStore({
//   state: () => ({
//     homeData,
//     developmentData,
//     isAdmin:false
//   }),
//   mutations: {
//     module(){
//       adminModule
//     }
//   }
// })

export default createStore({
  state: () => ({
    homeData,
    developmentData,
    isAdmin:false
  }),
  mutations: {
    updateAdminInfo(state){
      const JudgeAdmin= getUserInfo().isAdmin
      if(JudgeAdmin){
        state.isAdmin= true
      } else{
        state.isAdmin = false
      }
       
    }
  }
})
import { createStore } from 'vuex'

import { getUserInfo } from "../utils/storage"



export default createStore({
  state: () => ({
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
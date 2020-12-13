import {reqMenuList} from '../../util/request'

const state = {
    //请求回来的数据
 list:[]
}
const mutations={
  changeList(state,arr){
      state.list = arr
  }
}
const actions={
  //发送请求
  requestMenuList(context){
     reqMenuList({istree:true}).then(res=>{
     context.commit('changeList',res.data.list)
     })
  }
}
const getters={
  list(state){
      return state.list
  }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
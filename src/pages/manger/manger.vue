<template>
  <div>
     <el-button type="primary" @click="willAdd">添加</el-button>

     <v-add :info='info' ref='one'></v-add>
     <v-list @edit="edit" ></v-list>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return {
      info:{
        isShow:false,
        title:'',
        isAdd:true  
      }
    }
  },
  methods:{
     willAdd(){
       this.info.isShow = !this.info.isShow
       this.info.title = '用户添加'
       this.info.isAdd = true
       this.$refs.one.empty()
     },
     //点击编辑
     edit(id){
       this.info.isShow = true
       this.info.title = '用户修改'
       this.info.isAdd = false
       this.$refs.one.look(id)
     }
  }
}
</script>

<style>

</style>
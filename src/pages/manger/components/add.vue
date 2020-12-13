<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="Width">
          <el-select
            v-model="form.roleid"
            placeholder="--请选择--"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据 菜单分类 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select> 
        </el-form-item>
         <el-form-item label="用户名" :label-width="Width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="密码" :label-width="Width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="状态" :label-width="Width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requserAdd ,requserListOne, requserEdit} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      Width: "160px",
      //isShow: true,
      form: {
         roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    empty(){
      this.form={
        roleid: "",
        username: "",
        password: "",
        status: 1,
      }
    },
    //隐藏弹框
    hide(){
      this.info.isShow =false
    },
    //添加
    add() {
      requserAdd(this.form).then((res) => {
        this.requestuserCount()
        this.requestuserList()
        this.empty()
        this.hide()
      });
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList:'role/requestRoleList',
      requestuserList: "manger/requestuserList",
      requestuserCount:'manger/requestuserCount'
    }),
    //获取一条数据
    look(id) {
      requserListOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "***";
        this.form.uid = id
      });
    },
    update() {
      requserEdit(this.form).then(res=>{
        this.requestuserList()
        this.hide()
      })
    },
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.requestRoleList();
    }
  },
};
</script>

<style>
</style>
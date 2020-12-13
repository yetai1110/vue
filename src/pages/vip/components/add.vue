<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="Width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="Width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
import { reqmemberAdd,reqmemberListOne,reqmemberEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      //cateList: "cate/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      Width: "160px",
      form: {
        uid: "",
        nickname:'',
        phone: "",
        password:'',
        status: 1,
      },
    };
  },
  methods: {

    // 重置
    empty() {
      this.form = {
       specsname: "",
        attrs: "",
        status: 1,
      };
    },
    // 隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    //添加
    add() {
      reqspecsAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        this.requestspecsList();
      });
    },

    ...mapActions({
      requestspecsList: "specs/requestspecsList",
    }),
    // 获取一条数据
    look(id) {
      reqspecsListOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.arrAttr = JSON.parse(this.form.attrs).map(item=>{return{value:item}})
      });
    },
    update() {
      this.form.attrs=JSON.stringify(this.arrAttr.map(item=>{return item.value})) 
      reqspecsEdit(this.form).then((res) => {
        this.requestspecsList();
        this.hide();
      });
    },
  },
  mounted() {
    this.requestspecsList();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="Width">
          <el-select v-model="form.first_cateid" placeholder="--请选择--" @change="yiji">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据 菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="Width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据 菜单分类 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="Width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="Width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="Width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="Width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="Width">
          <el-select v-model="form.specsid" placeholder="--请选择--" @change="spgg">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据 菜单分类 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="Width">
          <el-select v-model="form.specsattr" placeholder="--请选择--" multiple>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据 菜单分类 -->
            <el-option
              v-for="item in secondSpec"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="Width">
          <el-radio v-model="form.isnew" :label="1" >是</el-radio>
          <el-radio v-model="form.isnew" :label="2" >否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="Width">
          <el-radio v-model="form.ishot" :label="1" >是</el-radio>
          <el-radio v-model="form.ishot" :label="2" >否</el-radio>
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

         <el-form-item label="商品描述" :label-width="Width">
          <textarea name="" id="" cols="30" rows="10" v-model="form.description"></textarea>
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
import { reqgoodsAdd, reqgoodsListOne, reqgoodsEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      Width: "160px",
      imageUrl: "",
      secondCate:[], //
      secondSpec: [],
      form: {
        first_cateid:0,
        second_cateid:0,
        goodsname: "",
        price:0,
        market_price:0,
        img: null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //   上传图片
    changeImg(e) {
      console.log(e); //这是获取到的文件也就是上传的那张图片
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },

    // 重置
    empty() {
      this.form = {
         first_cateid:0,
        second_cateid:0,
        goodsname: "",
        price:0,
        market_price:0,
        img: null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      };
    },
    // 隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    //添加
    add() {
      reqgoodsAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        this.requestgoodsList();
      });
    },

    ...mapActions({
      requestcateList: "cate/requestcateList",
      requestspecsList: "specs/requestspecsList",
      requestgoodsList: "goods/requestgoodsList",
    }),
    // 获取一条数据
    look(id) {
      reqgoodsListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(',')
         console.log(this.form);
         this.yiji()
        //  this.spgg()
        this.secondSpec = this.specsList.find(item=>{
         return item.id == this.form.specsid
       }).attrs
      });
    },
    update() {
      reqgoodsEdit(this.form).then((res) => { 
        this.hide();
        this.requestgoodsList();
      });
    },
    //二级分类
    yiji(){
      this.secondCate = this.cateList.find(item=>{
        return item.id == this.form.first_cateid
      }).children
    },
    //规格管理
    spgg(){
      this.form.specsattr =[]
       this.secondSpec = this.specsList.find(item=>{
         return item.id == this.form.specsid
       }).attrs
    }
  },
  mounted() {
    this.requestcateList();
    this.requestspecsList()
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
<template>
  <div class="box">
    <div class="logi">
      <h3>登录</h3>
      <div><input type="text" v-model="user.username" /></div>
      <div><input type="text" v-model="user.password" /></div>
      <!-- <router-link to="/index" @click="login"><button>登录</button></router-link> -->
      <div @click="login"><button>登录</button></div>
    </div>
  </div>
</template>

<script>
import { requserLogin } from "../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  // computed:{
  //   ...mapGetters({

  //   })
  // },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      requestuserList: "user/requestuserList",
    }),
    login() {
      requserLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          this.requestuserList(res.data.list);
          this.$router.push("/index/home");
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #303d60);
}
.logi {
  width: 400px;
  height: 300px;
  background: #fff;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
}
.logi input {
  width: 60%;
  height: 30px;
  margin: 30px auto;
}
input {
  border: 1px solid;
}
button {
  width: 60%;
  height: 30px;
  background: #409eff;
  color: #fff;
  outline: none;
  border: none;
}
</style>
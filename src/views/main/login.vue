<style lang="less">
@import "./login.less";
</style>

<template>
  <div style="padding:100px 5px;width:100%;height:100%;background:#F0F0F0;">
    <div class="login" @keydown.enter="handleSubmit">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title" style="text-align:center;font-size:20px;font-weight:800">
            <Icon type="md-key11"></Icon>
            <span>云密码机管理系统登录</span>
          </p>
          <div class="form-con">
            <Form id="loginForm" ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="username">
                <Input v-model="form.username" placeholder="请输入用户名" clearable>
                  <span slot="prepend">
                    <Icon :size="16" type="md-person"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码" clearable>
                  <span slot="prepend">
                    <Icon :size="16" type="md-lock"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem>
                <Button @click="handleSubmit" type="primary" long>登录</Button>
              </FormItem>
            </Form>
          </div>

          <Spin size="large" fix v-if="logining">登陆中...</Spin>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { setApiServer } from "@/conf/";
import conf from "@/conf/";
export default {
  data() {
    return {
      logining: false,
      form: {
        username: "super_admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
          this.$refs.loginForm.validate(valid => {
            
        if (valid) {
          this.logining = true;
          this.$store.dispatch("handleLogin",{
            username: this.form.username,
            password: this.form.password
          }).then((res) => {
            var resData = res.data;
        

            if(resData && resData.code == "200") {

              // // 选择的节点服务
              // Cookies.set("server", conf.);

              // 登陆成功
              let userInfo = resData.data;
              let token = "Bearer " + userInfo.token;

              let access = userInfo.access;
              if (this.form.username === "super_admin") {
               this.$store.commit("showSysUserRole");
                // 所有权限
                access = 0;
              } else {
                 this.$store.commit("removeSysUserRole");
                Cookies.set("access", 1);
                access = 1;
              }
              this.$store.commit("setUserName", userInfo.loginName);

              // 登陆成功获取用户信息，token等
              this.$store.commit("setToken", token);
              
              Cookies.set("access", access);
              this.$store.commit("setAccess", access);

              // 登陆后初始化
              this.$store.commit("init");
              // 首页
              this.$router.replace({
                name: "vm_list"
              });
            

            } else {
              if(resData && resData.code) {
                this.$Message.error("登录失败，" + resData.message);
              } else {
                this.$Message.error("登录失败，请联系管理员！");
              }
            }
          }).catch(err => {
            if(err.response) {
              var errData = err.response.data;
              this.$Message.error("登录失败," + errData.message);
            } 
          }).then(() => {
            this.logining = false;
          });

        }
      });
    }
  }
};
</script>


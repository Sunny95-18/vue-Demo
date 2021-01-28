<template>
  <div class="div">
    <Card :bordered="false">
      <p slot="title">新建管理员</p>
       <p style="color:red">注：操作员和管理员需要关联UKey，并输入UKey的口令作为密码</p>
      <Form style="margin-top:10px" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <FormItem label="管理员类型：">
          <Select v-model="formValidate.adminType">
            
            <Option :value="1">操作员</Option>
            <Option :value="2">管理员</Option>
            <Option :value="3">审计员</Option>
          </Select>
        </FormItem>
          <FormItem  label="名称：" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入名称"/>
        </FormItem>
          <FormItem  label="密码：" prop="pin">
          <Input v-model="formValidate.pin" type="password" placeholder="请输入密码"/>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      formValidate: {
        pin:"",
        username: "",
        adminType:1,
       
        
      },
      ruleValidate: {
         pin: [
          {
            required: true,
            message: "密码不可为空",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "名称不可为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
           this.$store.dispatch("createUser", this.formValidate).then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("添加成功！");
        } else {
          this.$Message.error("添加失败，错误码：" + resData.message);
        }
      });
        } else {
          this.$Message.error("验证失败!");
        }
      });
    },
  },
   computed: {
    ...common.computed,
    state() {
      return this.$store.state.adminUserManagement;
    },
  },
};
</script>
<style>
.div {
  margin: 0 auto;
  width: 500px;
  height: 400px;
}
</style>
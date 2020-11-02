<template>
  <div class="div">
    <Card :bordered="false">
      <p slot="title">新建管理员</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <FormItem label="管理员类型：" prop="adminType">
          <Select v-model="formValidate.adminType">
            <Option value="1">系统管理员</Option>
            <Option value="2">审计员</Option>
          </Select>
        </FormItem>
          <FormItem  label="口令：" prop="pin">
          <Input v-model="formValidate.pin" placeholder="请输入口令"/>
        </FormItem>
        <!-- <FormItem label="证书来源：" prop="cerSource">
          <Select v-model="formValidate.cerSource">
            <Option value="1">导入DER证书</Option>
            <Option value="2">由服务器生成</Option>
          </Select>
        </FormItem>

        <FormItem v-if="formValidate.cerSource==1" label="证书：" prop="adminType">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">上传证书</Button>
          </Upload>
        </FormItem>

        <FormItem v-if="formValidate.cerSource==2" label="名称：" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入名称"/>
        </FormItem>
        <FormItem v-if="formValidate.cerSource==2" label="组织：" prop="organization">
          <Input v-model="formValidate.organization" />
        </FormItem>
        <FormItem v-if="formValidate.cerSource==2" label="部门：" prop="department">
          <Input v-model="formValidate.organization" />
        </FormItem>
        <FormItem v-if="formValidate.cerSource==2" label="市/区：" prop="city">
          <Input v-model="formValidate.organization" />
        </FormItem>
        <FormItem v-if="formValidate.cerSource==2" label="省/直辖市：" prop="province">
          <Input v-model="formValidate.organization" />
        </FormItem>
        <FormItem v-if="formValidate.cerSource==2" label="国家：" prop="country">
          <Input v-model="formValidate.country" placeholder="请输入国家"/>
        </FormItem> -->

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 80px">重置</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        pin:"",
        name: "",
        country: "CN",
        adminType: "1",
        cerSource: "1",
        organization: "",
        department: "",
        city: "",
        province: "",
        
      },
      ruleValidate: {
         pin: [
          {
            required: true,
            message: "口令不可为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "名称不可为空",
            trigger: "blur",
          },
        ],
        country: [
          {
            required: true,
            message: "国家不可为空",
            trigger: "blur",
          },
        ],
        adminType: [
          {
            required: true,
            message: "请选择管理员类型",
            trigger: "change",
          },
        ],
        cerSource: [
          {
            required: true,
            message: "请选择证书来源",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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
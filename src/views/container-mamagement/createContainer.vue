<template>
  <div class="div">
    <Card :bordered="false" dis-hover>
      <p slot="title">应用实体信息</p>
      <Form ref="containerForm" :model="containerForm" :label-width="100">
        <FormItem label="密钥类型：" prop="algType">
          <Select v-model="containerForm.algType" style="width: 200px">
            <Option :value="1">SM2</Option>
            <Option :value="2">RSA</Option>
          </Select>
        </FormItem>
        <FormItem label="应用名称：" prop="name">
          <Input v-model="containerForm.name" style="width: 200px" />
        </FormItem>
        <FormItem label="密钥索引:" prop="keyIndex">
          <Input v-model="containerForm.keyIndex" style="width: 200px" />
        </FormItem>
        <FormItem>
          <Button class="ops-btn" type="info" @click="createContainer"
            >确定</Button
          >
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
      containerForm: {
        algType: 1,
        name: "",
        keyIndex: "",
      },
    };
  },
  methods: {
    createContainer() {
      this.$store.dispatch("createContainer", this.containerForm).then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("创建成功!");
          this.containerForm.algType = 1;
          this.containerForm.name = "";
          this.containerForm.keyIndex = "";
        } else {
          this.$Message.error("创建失败，" + resData.message);
        }
      });
    },
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.container;
    },
  },
};
</script>
<style>
.div {
  margin: 0 auto;
  width: 500px;
  height: 650px;
}
</style>
<template>
  <Card :bordered="false" dis-hover>
    <List v-if="step==0" border size="large">
      <ListItem>
        <h3 style="margin:0 auto">系统初始化</h3>
      </ListItem>
      <ListItem style="height:100px">
        <div style="margin:0 auto;text-algin:center">
          <p style="color:red;font-size:16px">欢迎使用神州龙芯签名验签服务器系统。初次使用需要对系统进行初始化，初始化将生成SSL安全通道的服务器站点证书</p>
        </div>
      </ListItem>
      <ListItem>
          <Button style="marginLeft:500px" type="error" @click="rest">重置服务器</Button>
        <Button  style="marginLeft:100px"  type="success" @click="next">下一步</Button>
      </ListItem>
    </List>
    <List v-if="step==1" border size="large">
      <ListItem>
        <h3 style="margin:0 auto">系统初始化-SSL服务器证书</h3>
      </ListItem>
      <ListItem>
        <Form :model="formItem" :label-width="120" style="margin:0 auto">
          <FormItem label="名称：">
            <Input v-model="formItem.name" />
          </FormItem>
          <FormItem label="组织：">
            <Input v-model="formItem.organization" />
          </FormItem>
          <FormItem label="部门：">
            <Input v-model="formItem.department" />
          </FormItem>
          <FormItem label="市/区：">
            <Input v-model="formItem.city" />
          </FormItem>
          <FormItem label="省/直辖市：">
            <Input v-model="formItem.province" />
          </FormItem>
          <FormItem label="国家：">
            <Input v-model="formItem.country" />
          </FormItem>
        </Form>
      </ListItem>
      <ListItem>
        <Button style="margin:0 auto" type="success" @click="initCertificate">下一步</Button>
      </ListItem>
    </List>
    <List v-if="step==2" border size="large">
      <ListItem>
        <h3 style="margin:0 auto">系统初始化-成功</h3>
      </ListItem>
      <ListItem style="height:100px">
        <div style="margin:0 auto;text-algin:center">
          <p style="color:red;font-size:16px">恭喜您！神州龙芯签名验签服务器初始化成功！！</p>
          <br><br>
          <p style="font-size:16px"><a>点击这里下载证书！</a></p>
        </div>
      </ListItem>
      <ListItem>
        <Button style="margin:0 auto" type="success" @click="restart">重启生效</Button>
      </ListItem>
    </List>
  </Card>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      step: 0,
      formItem: {
        name: "",
        organization: "",
        department: "",
        city: "",
        province: "",
        country: "CN",
      },
    };
  },
  methods: {
    ...common.methods,
    rest(){
        this.$Message.success("服务器已恢复到出厂设置!");
    },
    next() {
      this.step=1;
    },
    initCertificate(){
        this.step=2;
    },
    restart() {
        this.$Message.success("重启系统成功!");
         this.step=0;
    },
  },
};
</script>
<template>
  <Tabs value="network">
    <TabPane label="网卡配置" name="network">
      <div class="div">
        <Card :bordered="false" dis-hover>
          <p slot="title">系统网卡</p>
          <Form ref="networkForm" :model="networkForm" :label-width="150">
            <FormItem label="网络接口1：" prop="mamagementLogType" style="height:20px">
              <Input v-model="networkForm.name1" style="width:200px" />
            </FormItem>
            <FormItem label="连接状态：" prop="mamagementLogType"  style="height:20px">{{networkForm.content1}}</FormItem>

            <FormItem label="MAC地址:" prop="isBack"  style="height:20px">{{networkForm.mac1}}</FormItem>
            <FormItem label="地址/掩码：" prop="mamagementLogType" >
              <Input v-model="networkForm.ipAndMask1" type="textarea" :autosize="{minRows: 2,maxRows: 3}" style="width:200px" />
            </FormItem>
            <Divider />
            <FormItem label="网络接口2：" prop="mamagementLogType" style="height:20px">
              <Input v-model="networkForm.name2" style="width:200px" />
            </FormItem>
            <FormItem label="连接状态：" prop="mamagementLogType" style="height:20px">{{networkForm.content2}}</FormItem>
            <FormItem label="MAC地址:" prop="isBack" style="height:20px">{{networkForm.mac2}}</FormItem>
            <FormItem label="地址/掩码：" prop="mamagementLogType" >
              <Input v-model="networkForm.ipAndMask2" type="textarea" :autosize="{minRows: 2,maxRows: 3}" style="width:200px" />
            </FormItem>
            <FormItem >
              <Button type="primary" @click="save">保存</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </TabPane>
    <TabPane label="DNS配置" name="dns">
      <div class="div">
        <Card :bordered="false" dis-hover>
          <p slot="title">DNS服务器</p>
          <Form ref="networkForm" :model="networkForm" :label-width="150">
            <FormItem label="DNS地址：" prop="mamagementLogType">
              <Input v-model="dnsForm.dnsIp" type="textarea" style="width:200px" />
            </FormItem>
             <FormItem >
              <Button type="primary" @click="save">提交</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </TabPane>
    <TabPane label="网关配置" name="gateway">
       <div class="div">
        <Card :bordered="false" dis-hover>
          <p slot="title">网关配置</p>
          <Form ref="networkForm" :model="networkForm" :label-width="150">
            <FormItem label="网关地址：" prop="mamagementLogType">
              <Input v-model="dnsForm.gateway" style="width:200px" />
            </FormItem>
             <FormItem >
              <Button type="primary" @click="saveGatewary">提交</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </TabPane>
  </Tabs>
</template>
<script>
export default {
  data() {
    return {
      networkForm: {
        name1: "eth0",
        content1: "已连接",
        mac1: "00:10:F3:40:34:7A",
        ipAndMask1: "192.168.3.1/255.255.255.0",
        name2: "eth1",
        content2: "已断开",
        mac2: "00:10:F3:40:34:7B",
        ipAndMask2: "192.168.3.1/255.255.255.0",
      },
      dnsForm:{
          dnsIp:""
      }
    };
  },
  methods: {
    save() {
      this.$Message.success("修改成功!");
    },
    saveGatewary(){
       this.$Message.success("网关修改成功!");
    }
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
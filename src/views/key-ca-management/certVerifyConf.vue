<template>
  <Tabs value="tab1">
    <TabPane label="证书验证状态配置" name="tab1">
      <div class="div">
        <Card :bordered="false" dis-hover>
          <p slot="title">证书验证状态配置</p>
           <RadioGroup v-model="type" vertical style="marginLeft:150px">
                <Radio :label="0">
                  <span>未设置</span>
                </Radio>
                <Radio :label="1">
                  <span>服务端证书链</span>
                </Radio>
                <Radio :label="2">
              
                  <span>CRL</span>
                </Radio>
                 <Radio :label="3">
                 
                  <span>OCSP</span>
                </Radio>
              </RadioGroup>
              <div style="marginTop:10px"> <Button style="marginLeft:150px" type="primary" @click="save">提交</Button></div>
              
        </Card>
      </div>
    </TabPane>
    <!-- <TabPane label="CRL更新周期配置" name="tab2">标签二的内容</TabPane> -->
  </Tabs>
</template>
<script>
export default {
    data(){
        return {
            type:0
        };
    },
    methods:{
        save(){
             this.$Message.success("保存成功!");
        }
    }
};
</script>
<style>
.div {
  margin: 0 auto;
  width: 500px;
  height: 650px;
}
</style>
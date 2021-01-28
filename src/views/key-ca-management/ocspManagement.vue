<template>
  <div class="div">
    <Card :bordered="false" dis-hover>
         <Form  :label-width="100">
        <FormItem label="OCSP地址：">
          <Input style="width:200px" v-model="url"/>
        </FormItem>
          <FormItem label="端口号：">
          <Input style="width:200px"  v-model="port"/>
        </FormItem>
           <Button class="ops-btn" style="margin-left:150px" type="info">确定</Button>
      </Form>
    </Card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      url:"",
      port:"",
    }
  }
};
</script>

<style>
.div {
  margin: 0 auto;
  width: 400px;
  height: 650px;
}
</style>
<template>
 <div class="div">
  <Card :bordered="false" dis-hover>
    <p slot="title">系统时间设置</p>
    <Form ref="logConfigureForm" :model="logConfigureForm" :rules="ruleValidate" :label-width="150">
      <FormItem label="系统时间：" prop="mamagementLogType">
        <DatePicker type="datetime" v-model="time" format="yyyy-MM-dd HH:mm:ss"  style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="上次同步时间：" prop="mamagementLogType">
        <Input  style="width:200px"/>
      </FormItem>
      <Divider />
        <FormItem  label="时间自动同步:" prop="isBack" >
           <Checkbox > </Checkbox>
        </FormItem>
         <FormItem label="时间间隔(分钟)：" prop="mamagementLogType">
        <InputNumber :max="30" :min="1" v-model="interval"></InputNumber>
         </FormItem>
           <FormItem label="时间服务器：" prop="mamagementLogType">
            <Input style="width:200px" />
              <Button style="marginLeft:10px;" type="primary" @click="handleSubmit('logConfigureForm')">立即同步</Button>
         </FormItem>
          <FormItem>
          <Button type="primary" @click="handleSubmit('logConfigureForm')">保存</Button>
        </FormItem>
    </Form>
  </Card>
 </div>
</template>
<script>
export default {
    data(){
        return { 
          time:"2020-09-21 15:44:00",
          interval:10
        };
    },
    methods:{

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
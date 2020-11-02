<template>
     <Card :bordered="false" dis-hover style="margin:0 auto;width:600px">
          <List border size="large">
            <ListItem>
              <h3 style="margin:0 auto">升级系统</h3>
            </ListItem>
            <ListItem style="height:100px">
              <div style="margin:0 auto;text-algin:center">
                <p style="color:red;font-size:16px">点击下方按钮进行文件上传</p>
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                  <Button icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
              </div>
            </ListItem>
            <ListItem>
              <Button style="margin:0 auto" type="success" @click="startUpgrade">开始升级</Button>
            </ListItem>
          </List>
        </Card>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {};
  },
  methods: {
    ...common.methods,
    startUpgrade(){
       this.$Message.success("系统升级成功!");
    },
  
  },
};
</script>
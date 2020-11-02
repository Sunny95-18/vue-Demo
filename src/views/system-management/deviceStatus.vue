  <template>
  <Card :bordered="false" dis-hover>
    <List border size="large">
      <ListItem>
        <h3 style="margin:0 auto">设备状态</h3>
      </ListItem>
      <ListItem style="height:100px">
        <div style="margin:0 auto;text-algin:center">
          <p v-if="status==0" style="color:red;font-size:16px">签验验签服务正在运行中!</p>
          <p v-else style="color:red;font-size:16px">签验验签服务已停止运行!</p>
        </div>
      </ListItem>
      <ListItem>
        <Button style="marginLeft:500px" type="error" @click="sureCloseService=true">关闭服务</Button>
        <Button style="marginLeft:100px" type="success" @click="sureRestartService=true">重启服务</Button>
      </ListItem>
    </List>
    <Modal v-model="sureCloseService" title="确定要关闭签名验签服务器吗？" @on-ok="closeService"></Modal>
    <Modal v-model="sureRestartService" title="确定要重启签名验签服务器吗？" @on-ok="restartService"></Modal>
  </Card>
</template>

<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      status: 0,
      sureCloseService: false,
      sureRestartService:false,
    };
  },
  methods: {
    ...common.methods,
    closeService() {
      this.status = 1;
    },
    restartService() {
      this.status = 0;
    },  
  },
};
</script>

<style>
</style>
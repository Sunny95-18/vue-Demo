<template>
  <Tabs value="sm2List">
    <TabPane label="SM2密钥列表" name="sm2List">
      <sm2List></sm2List>
    </TabPane>
    <TabPane label="RSA密钥列表" name="rsaList">
      <rsaList></rsaList>
    </TabPane>
    <!-- <TabPane label="密钥备份" name="keyBackup">
      <backup></backup>
    </TabPane>
    <TabPane label="密钥恢复" name="keyRecovery">
      <recovery></recovery>
    </TabPane>
    <TabPane label="密钥设备初始化" name="deviceKeyInit">
      <div class="div">
        <Card :bordered="false" dis-hover>
          <List border size="large">
            <ListItem>
              <h3 style="margin: 0 auto">密钥设备初始化</h3>
            </ListItem>
            <ListItem style="height: 100px">
              <div style="margin: 0 auto; text-algin: center">
                <p style="color: red; font-size: 16px">
                  初始化签名验签服务器的密钥设备!
                </p>
              </div>
            </ListItem>
            <ListItem>
              <Poptip
                style="margin: 0 auto"
                confirm
                title="确定初始化设备吗?"
                @on-ok="keyInIt"
              >
                <Button type="info">初始化</Button>
              </Poptip>
            </ListItem>
          </List>
        </Card>
      </div>
    </TabPane> -->
  </Tabs>
</template>
<script>
import common from "@/utils/common";
import backup from "./compoments/backup";
import recovery from "./compoments/recovery";
import sm2List from "./compoments/sm2";
import rsaList from "./compoments/rsa";
export default {
  components: { backup, recovery, sm2List, rsaList },
  data() {
    return {};
  },
  created() {},
  methods: {
    ...common.methods,
    keyInIt() {
      this.$store.dispatch("init").then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("密钥设备初始化成功!");
        } else {
          this.$Message.error("密钥设备初始化失败!");
        }
      });
    },
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.keyManagement;
    },
  },
  mounted() {},
  watch: {
    $route() {},
  },
};
</script>
<template>
  <Tabs value="keyList">
    <TabPane label="密钥列表" name="keyList">
      <Card :bordered="false" dis-hover>
        <Button
          style="marginleft: 30px"
          @click="isShow = true"
          type="primary"
          icon="md-key"
          >生成密钥</Button
        >
        <div style="margintop: 20px">
          <Table
            ref="tab"
            stripe
            :loading="state.loading"
            :columns="columns"
            :data="rows"
            class="table"
            :height="tableHeight"
          >
            <template slot-scope="{ row, index }" slot="action">
              <Poptip
                confirm
                title="确认删除该密钥吗?"
                @on-ok="deleteKey(row.id)"
                placement="right"
              >
                <Button class="ops-btn" type="error">删除</Button>
              </Poptip>
            </template>

            <Page
              ref="page"
              slot="footer"
              :current="queryParams.current"
              :total="totalCount"
              :page-size="queryParams.size"
              show-total
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10, 20, 30]"
              placement="top"
              show-elevator
              show-sizer
            ></Page>
          </Table>
          <Modal v-model="isShow" title="生成密钥对" @on-ok="ok">
            <Form ref="createKeyForm" :model="createKeyForm" :label-width="150">
              <FormItem label="加密算法：" prop="type">
                <Select v-model="createKeyForm.type" style="width: 200px">
                  <Option :value="0">SM2</Option>
                  <Option :value="1">RSA</Option>
                </Select>
              </FormItem>
              <FormItem
                v-if="createKeyForm.type == 1"
                label="密钥长度："
                prop="length"
              >
                <Select v-model="createKeyForm.length" style="width: 200px">
                  <Option :value="1024">1024</Option>
                  <Option :value="2048">2048</Option>
                </Select>
              </FormItem>
            </Form>
          </Modal>
        </div>
      </Card>
    </TabPane>
    <TabPane label="密钥备份" name="keyBackup">
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
              <Button style="margin: 0 auto" type="info" @click="keyInIt"
                >初始化</Button
              >
            </ListItem>
          </List>
        </Card>
      </div>
    </TabPane>
  </Tabs>
</template>
<script>
import common from "@/utils/common";
import backup from "./compoments/backup";
import recovery from "./compoments/recovery";
export default {
  components: { backup, recovery },
  data() {
    return {
      isShow: false,
      createKeyForm: {
        type: 0,
        length: 1024,
      },
      queryParams: {
        current: 1,
        size: 10,
      },
      columns: [
        {
          title: "序号",
          width: 200,
          key: "id",
        },
        {
          title: "标识",
          width: 300,
          key: "keyId",
        },
        {
          title: "算法",
          width: 300,
          key: "name",
        },
        {
          title: "模长",
          width: 100,
          key: "length",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    ...common.methods,
    loadData() {
      this.$store.commit("queryKeyPage", this.queryParams);
    },
    changePage(p) {
      this.queryParams.current = p;
      this.loadData();
    },
    changePageSize(size) {
      this.queryParams.size = size;
      this.loadData();
    },
    ok() {
      this.$store.dispatch("KeyGeneration", this.createKeyForm).then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("生成密钥对成功!");
          this.loadData();
        } else {
          this.$Message.error("生成密钥对失败!");
        }
      });
    },
    deleteKey(id) {
      this.$store.dispatch("deleteKey", id).then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("密钥删除成功!");
          this.loadData();
        } else {
          this.$Message.error("密钥删除失败!");
        }
      });
    },
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
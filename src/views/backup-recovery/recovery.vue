<template>
  <div>
    <Card :bordered="false" dis-hover>
      <!-- 第一步-->
      <List v-if="first" header="密钥恢复向导" border split>
        <ListItem>1、准备恢复密钥。</ListItem>
        <ListItem>请准备好2个备份时所用的管理员USBKey。</ListItem>
        <ListItem>
          <span class="spanColor">密钥恢复过程会破坏密码机内当前的密钥数据，请谨慎操作。</span>
        </ListItem>
        <ListItem>
          <a @click="showLoginStatus">查看登录状态</a>
        </ListItem>
        <ListItem>
          <Button style="margin-left:300px;" type="success" @click="start">开始恢复</Button>
        </ListItem>
      </List>

      <!-- 第二步-->
      <List v-if="second" header="密钥恢复向导" border split>
        <ListItem>2、上传备份文件。</ListItem>
        <ListItem>点击[上传]按钮，选择之前密钥备份过程中生成的密钥备份文件</ListItem>
        <ListItem>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">上传</Button>
          </Upload>
        </ListItem>
        <ListItem>
          如果您已经上传了备份文件，请点击
          <a @click="secondOk">下一步</a>
        </ListItem>
      </List>
      <!-- 第三步-->
      <List v-if="third" header="密钥恢复向导" border split>
        <ListItem>3、导入备份密钥分量[{{count}}]。</ListItem>
        <ListItem>请选择第一个管理员USBKey按照正确的方向插入设备中，并输入保护密码。</ListItem>
        <ListItem>
          <Form :model="formItem" :label-width="140" inline>
            <FormItem label="请输入PIN口令:">
              <Input v-model="formItem.input" />
            </FormItem>
            <FormItem>
              <Button type="info" @click="thirdOk">确定</Button>
            </FormItem>
          </Form>
        </ListItem>
        <ListItem>
          如果还未上传密钥备份文件，请点击
          <a @click="returnSecond">上一步</a>返回上传。
        </ListItem>
      </List>
      <!-- 第四步-->
      <List v-if="four" header="密钥恢复向导" border split>
        <ListItem>4、完成密钥恢复。</ListItem>
        <ListItem>恭喜你，已经成功将密钥恢复到密码机。</ListItem>
        <ListItem>上传到密码机的密钥备份文件已删除。</ListItem>
        <ListItem>
          <Button type="info" @click="end">确定</Button>
        </ListItem>
      </List>
    </Card>
    <Modal v-model="modal1" title="用户状态">
      <Table
        ref="tab"
        border
        :loading="state.loading"
        :columns="columns"
        :data="rows"
        class="table"
        :height="tableHeight"
        :show-header="false"
      ></Table>
    </Modal>
  </div>
</template>

<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      first: true,
      second: false,
      third: false,
      four: false,
      modal1: false,
      count: 1,
      formItem: {
        input: ""
      },
      columns: [
        {
          title: "类型",
          key: "type"
        },
        {
          title: "值",
          key: "value"
        }
      ]
    };
  },
  created() {},
  methods: {
    ...common.methods,
    loadData() {
      this.$store.commit("showLoginStatus", this.queryParams);
    },
    showLoginStatus() {
      this.loadData();
      this.modal1 = true;
    },
    start() {
      this.first = false;
      this.second = true;
    },
    secondOk() {
      this.second = false;
      this.third = true;
    },
    returnSecond() {
      this.second = true;
      this.third = false;
    },
    thirdOk() {
      this.third = false;
      this.four = true;
    },
    end() {
      this.four = false;
      this.first = true;
    }
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.backupKey;
    }
  },
  watch: {
    $route() {}
  }
};
</script>

<style>
.spanColor {
  color: red;
}
</style>
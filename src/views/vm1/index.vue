<template>
  <div>
    <Card :bordered="false" dis-hover>
      <div style="marginTop:2px;">
        <Table
          ref="tab"
          stripe
          :loading="state.loading"
          :columns="columns"
          :data="rows"
          class="table"
          :height="tableHeight"
        >
          <template slot-scope="{ row,index }" slot="action">
            <Button v-if="row.status===0" class="ops-btn" type="success">启动</Button>
            <Button v-else class="ops-btn" type="warning">停止</Button>
            <Button class="ops-btn" type="primary" @click="isShow=true">编辑</Button>
            <Button
              v-show="row.status===1"
              class="ops-btn"
              type="primary"
              @click="intoVM(row.ip)"
            >进入虚拟机</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Modal v-model="isShow" title="修改虚拟机" width="400" @on-ok="ok">
      <Form :model="formItem" :label-width="100">
        <FormItem label="虚拟机名:">
          <Input v-model="formItem.name" style="width:200px" />
        </FormItem>
        <FormItem label="IP地址:">
          <Input v-model="formItem.Ip" style="width:200px" />
        </FormItem>
        <FormItem label="子网掩码:">
          <Input v-model="formItem.mask" style="width:200px" />
        </FormItem>
        <FormItem label="网关:">
          <Input v-model="formItem.gateway" style="width:200px" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script >
import conf from "@/conf/";

import { setInterval } from "timers";
import common from "@/utils/common";
export default {
  name: "vmList",
  data() {
    return {
      offsetTop: 126,
      outLine: {},
      timer: -1,
      isShow: false,
      type: 1,
      username: "",
      formItem: {
        Ip: "",
        name: "",
        mask: "",
        gateway: ""
      },
      columns: [
        {
          title: "Id",
          width: 200,
          key: "id"
        },
        {
          title: "名称",
          width: 200,
          key: "name"
        },
        {
          title: "状态",
          width: 200,
          key: "status",
          render: (h, params) => {
            if (params.row.status === 1) {
              return h("span", {
                style:{
                 color:'#2d8cf0'
              }},"运行中");
            } else if (params.row.status == 0) {
              return h("span",{
                style:{
                 color:'#FF0000'
              }}, "已停止");
            }
          }
        },
        {
          title: "IP",
          width: 200,
          key: "ip"
        },
        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  },
  mounted() {},
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.vmList;
    }
  },
  created() {
    // this.loadData();
  },
  methods: {
    ...common.methods,
    loadData() {
      
    },
    ok() {},
    intoVM(ip) {
      this.$store.commit("setVmIp", ip);
      this.$store.commit("resetPageOpenedList");
      this.$router.push({
        name: "home_index"
      });
    }
  }
};
</script>
<style>
.ops-btn {
  margin-left: 5px;
}
</style>
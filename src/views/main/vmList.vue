<style lang="less">
@import "./vmList.less";
</style>
<template>
<div>

  <div class="layout">
   
    <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
      <div class="header-middle-con">
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <user :type="type" :user="username"/>
          </div>
        </div>
      </div>
    </Header>
    <Content>
      <div class="home-main">
        <Row :gutter="10">
          <Col :lg="24">
            <Row class-name="home-page-row" :gutter="8">
              <Col :lg="24" :style="{marginBottom: '5px'}">
                <Card dis-hover>
                  <div class="to-do-list-con">
                    <Row>
                      <div
                        class="ivu-col ivu-col-span-6"
                        style="width:130px;text-align:center;padding-top:50px;"
                      >
                        <img src="@/assets/clu.png" key="max-logo" width="80" height="60" />
                      </div>
                      <div class="ivu-col ivu-col-span-18" style="width:calc(100% - 130px);">
                        <Card dis-hover>
                          <p slot="title" class="card-title ivu-card-head-center">
                            <Icon type="ios-bell"></Icon>虚拟机集群
                          </p>
                          <div class="home-survey">
                            <Row style="text-align:center;height:75px;">
                              <div class="ivu-col ivu-col-span-8" style="margin:auto;">
                                <div>总数量</div>
                                <div style="margin-top:8px;font-size:2em;">
                                  {{totalCount}}
                        
                                </div>
                              </div>
                              <div class="ivu-col ivu-col-span-8">
                                <div>运行中</div>
                                <div style="margin-top:8px;font-size:2em;">
                            
                                  <span style="color:#19be6b;">{{state.runningCount}}</span>
                                </div>
                              </div>
                              <div class="ivu-col ivu-col-span-8">
                                <div>停止中</div>
                                <div style="margin-top:8px;font-size:2em;">
                      
                                  <span style="color:#ed4014;">{{state.stopCount}}</span>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Card>
                      </div>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
    
        <Row :gutter="10">
          <Col :lg="24">
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
                    <Button v-show="row.status===1" class="ops-btn" type="primary" @click="intoVM">进入虚拟机</Button>
                  </template>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
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
    </Content>
  </div>
  </div>
</template>

<script >
import conf from "@/conf/";
import user from "./user/";
import { setInterval } from "timers";
import common from "@/utils/common";
export default {
  components: {
    user
  },
  name: "vmList",
  data() {
    return {
      offsetTop: 126,
      outLine: {},
      timer: -1,
      isShow: false,
      type: 1,
      username:"",
      formItem: {
        Ip: "",
        name:"",
        mask:"",
        gateway:""
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
              return h("span","运行中");
            } else if (params.row.status == 0) {
              return h("span", "已停止");
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
    this.loadData();
  },
  methods: {
    ...common.methods,
    loadData() {
      this.$store.dispatch("getUserInfo").then((res) =>{
          var resData = res.data;
          // console.log("userInfo:",resData.data)
          this.username=resData.data.username;
          // console.log("this:",this.username)
            this.$store.commit("loadVmList", this.username);
      }).catch(err=>{
        if(err.response) {
              var errData = err.response.data;
              this.$Message.error("获取用户信息失败," + errData.message);
            } 
      });


    
    },
    ok() {},
    intoVM() {
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

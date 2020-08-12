<style lang="less">
@import "./vmList1.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div
      class="sidebar-menu-con"
      :style="{width: shrink?'60px':'256px', overflow: shrink ? 'visible' : 'hidden'}"
    >
      <sider-menu :shrink="shrink" v-on:showVm="showVm"></sider-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'256px'}">
      <div class="main-header">
        <div class="navicon-con" style="margin-left: 15px;">
          <Icon
            :style="{marginTop: '12px',cursor:'pointer',transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            @click.native="toggleClick"
            type="md-menu"
            size="24"
          ></Icon>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <template>
              <Breadcrumb>
                <!-- <BreadcrumbItem v-for="item in currentPath" :to="item.path" :key="item.name">
                  <Icon v-if="item.icon" :type="item.icon"></Icon>
                  {{ item.title }}
                </BreadcrumbItem> -->
                <BreadcrumbItem to="/vmList">虚拟机页</BreadcrumbItem>
              </Breadcrumb>
            </template>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <user :type="type" />
          </div>
        </div>
      </div>

      <div class="tags-con">
         <div style="float:left;marginTop:10px;paddingLeft:10px">当前虚拟机：{{ip}}</div>
        <div style="float:left;marginTop:5px;paddingLeft:20px">
          <Button v-if="isRunning" class="ops-btn" type="success" @click="vmStatusChange">启动</Button>
          <Button v-else class="ops-btn" type="error" @click="vmStatusChange">停止</Button>
          <Button v-if="!isRunning" class="ops-btn" type="primary" @click="intoVM">进入虚拟机</Button>
        </div>
      </div>

      <div class="layout">
        <Layout>
          <Sider style="width: 120px; min-width:120px; max-width: 120px; flex: 0 0 120px;">
            <div style="marginTop:20px;">
              <div
                style="marginLeft:10px;marginTop:10px;cursor:default"
                v-on:click="itemChange(1)"
                v-bind:class="{first:isFirst}"
              >
                <Icon type="md-cog" />&nbsp;&nbsp;硬件
              </div>
              <div
                style="marginLeft:10px;marginTop:10px;cursor:default"
                v-on:click="itemChange(2)"
                v-bind:class="{first:isSecond}"
              >
                <Icon type="md-construct" />&nbsp;&nbsp;选项
              </div>
              <!-- <div
                style="marginLeft:10px;marginTop:10px;cursor:default"
                v-on:click="itemChange(3)"
                v-bind:class="{first:isThird}"
              >
                <Icon type="md-time" />&nbsp;&nbsp;快照
              </div> -->
            </div>
          </Sider>
          <Layout>
            <Content>
              <div v-if="isFirst">
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
              </div>
              <div v-if="isSecond">
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
              </div>
              <div v-if="isThird">
                 <h1 style="marginTop:200px;text-align:center">页面开发中。尽情期待</h1>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  </div>
</template>
<script>
import siderMenu from "@/views/vm/sider-menu/";
import user from "../main/user/";
import common from "@/utils/common";
export default {
  components: {
    siderMenu,
    user
    // tabs
  },
  data() {
    return {
      isRunning: true,
      shrink: false,
      isFullScreen: false,
      type: 2,
      id: "",
      ip:"192.168.88.123",
      isFirst: true,
      isSecond: false,
      isThird: false,
      editIndex: -1,
      editValue: '',
      columns: [
        {
          title: "类型",
          width: "200%",
          key: "type"
        },
        {
          title: "值",
          key: "value",
          render: (h, { row, index }) => {
            let edit;
            let control;
            if (this.editIndex === index) {
              edit = [
                h("Input", {
                  props: {
                    value: row.value
                  },
                  on: {
                    input: val => {
                      this.editValue = val;
                    }
                  }
                })
              ];
              control = [
                h("Icon", {
                  style: {
                    cursor: "pointer",
                    margin: "8px"
                  },
                  props: {
                    type: "md-checkmark",
                    size: 16,
                    color: "#19be6b"
                  },
                  on: {
                    click: () => {
                      this.rows[index].value = this.editValue;
                      this.editIndex = -1;
                      axios
                        .post(`http://127.0.0.1:8080/vm/update`, {
                          type: row.id,
                          value: this.editValue,
                        })
                        .then(res => {
                          if (res.data.result) {
                            this.$Message.success("修改成功");
                          } else {
                            this.$Message.error("请求失败");
                          }
                        });
                    }
                  }
                }),
                h("Icon", {
                  style: {
                    cursor: "pointer",
                    margin: "8px"
                  },
                  props: {
                    type: "md-close",
                    size: 16,
                    color: "#ed4014"
                  },
                  on: {
                    click: () => {
                      this.editIndex = -1;
                    }
                  }
                })
              ];
            } else {
              edit = row.value;
              control = [
                h("Icon", {
                  style: {
                    cursor: "pointer"
                  },
                  props: {
                    type: "ios-create-outline",
                    size: 16
                  },
                  on: {
                    click: () => {
                      this.editIndex = index;
                      this.editValue = row.vaule;
                    }
                  }
                })
              ];
            }
            return h("Row", [
              h(
                "Col",
                {
                  props: {
                    span: 8
                  }
                },
                edit
              ),
              h(
                "Col",
                {
                  props: {
                    span: 6
                  }
                },
                control
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.vmList;
    },
    menuList() {
      return this.$store.getters.menus;
    },
    openNames() {
      return this.$store.state.app.openNames;
    },
  },
  methods: {
    loadData() {
      this.$store.commit("hardware", this.queryParams);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    showVm(key) {
      this.id = key;
      this.isFirst = true;
      this.isSecond = false;
      this.isThird = false;
      this.loadData();
    },
    vmStatusChange() {
      this.isRunning = !this.isRunning;
    },
    intoVM() {
      this.$router.push({
        name: "home_index"
      });
    },
    itemChange(index) {
      if (index === 1) {
        this.isFirst = true;
        this.isSecond = false;
        this.isThird = false;
        this.loadData();
      } else if (index === 2) {
        this.isFirst = false;
        this.isSecond = true;
        this.isThird = false;
        this.$store.commit("option", this.queryParams);
      } else if (index === 3) {
        this.isFirst = false;
        this.isSecond = false;
        this.isThird = true;
      }
    }
  }
};
</script>
<style>
.ivu-layout {
  background: white;
}
.ivu-layout-sider-children {
  background: #f5f7f9;
  height: 580px;
}
.first {
  background: white;
}
.second {
  background: white;
}
.third {
  background: white;
}
</style>
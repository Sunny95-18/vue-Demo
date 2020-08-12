<style lang="less">
@import "./vmList2.less";
</style>
<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div
      class="sidebar-menu-con"
      :style="{width: shrink?'60px':'256px', overflow: shrink ? 'visible' : 'hidden'}"
    >
      <!-- <sider-menu :shrink="shrink" v-on:showVm="showVm"></sider-menu> -->
      <navigation-menu
        :shrink="shrink"
        :open-names="openNames"
        :menuList="menuList"
        @on-change="onChange"
        :isVmList="true"
      ></navigation-menu>
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
                <BreadcrumbItem>虚拟机</BreadcrumbItem>
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
        <!-- <tabs :pageTagsList="vmTagsList" :beforePush="beforePush"></tabs> -->
        <Tag type="dot" closable color="primary">{{tagName}}</Tag>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import siderMenu from "@/views/vm1/sider-menu/";
import navigationMenu from "@/views/main/navigation-menu/";
import user from "../main/user/";
// import tabs from "@/views/main/tabs/Tabs";
import common from "@/utils/common";
export default {
  components: {
    navigationMenu,
    user
    // tabs
  },
  data() {
    return {
      isRunning: true,
      shrink: false,
      isFullScreen: false,
      type: 1,
      id: "",
      ip: "192.168.88.123",
      tagName: "虚拟机列表页",
      editIndex: -1,
      editValue: "",
      flag:true,
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
                          value: this.editValue
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
      return this.$store.getters.vmMenus;
    },
    openNames() {
      return ["vmList"];
    },
    vmTagsList() {
      return this.$store.state.app.pageVmTagsList; // 打开的页面的页面对象
    }
  },
  methods: {
    loadData() {
      this.$store.commit("userInit");
    },
    beforePush(target) {
      let name = target;
      if (typeof target == "object") {
        name = target.name;
      }
      var targetRoute = this.$store.state.app.pathMapping[name];
      if (targetRoute) {
        // 如果当前路由就是name
        if (this.$route.name == name) {
          return false;
        }
        if (targetRoute.children && !targetRoute.meta.pushable) {
          return false;
        }
      }
      return true;
    },
    onChange(name) {
      //  console.log("name:",name)
      // 判断name对应的路由是否存在
      let willpush = true;
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false;
        }
      }
      if (willpush) {
        this.$router.push({
          name: name
        });
      }
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    vmStatusChange() {
      this.isRunning = !this.isRunning;
    }
  },
  //  mounted() {
  //   this.$store.commit("setOpenName", this.$route.name);
  //   this.$store.commit("setCurrentPath", this.$route.name);
  //   this.$store.commit("openNewTab", this.$route.name);
  // },
  watch: {
    $route(to) {
      // this.$store.commit("setOpenName", to.name);
      // // 更新路径
      // this.$store.commit("setCurrentPath", to.name);
      // 更新标签
      // this.$store.commit("openNewTab", to.name);
      // this.$store.commit("setCurrentPageName", to.name);
      // localStorage.currentPageName = to.name;
      if(to.name=="sys_user_list"){
        this.tagName="系统用户"
      }else if(to.name=="vm_list"){
        this.tagName="虚拟机列表页"
      }else{
        this.tagName="虚拟机页"
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
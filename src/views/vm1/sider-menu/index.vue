<template>
  <div style="height: 100%;width: 100%;background:rgb(73, 80, 96)">
    <!---系统的logo模块-->
    <div class="logo-con" style="padding-top: 20px;">
      <!--展开logo-->
      <div v-show="!shrink" class="layout-logo">
        <img style="border-radius:4px;height:55px;" src="@/views/images/logo-2.png" />
      </div>
      <!--折叠logo-->
      <div v-show="shrink" class="collapsed-logo-bg" key="min-logo" />
    </div>
    <div style="padding-bottom: 25px;text-align: center;">
      <h2 v-show="!shrink" style="color:white">云服务器密码机管理系统</h2>
    </div>

    <!--虚拟机列表树形控件-->
    <div v-show="!shrink">
      <Tree ref="tree"  :data="data1" @on-select-change="selectChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shrink: Boolean
  },
  data() {
    return {
      data1: [
        {
          title: "服务器监控中心",
          key: "-1",
          loading: false,
          expand: true,
          children: [
            {
              title: "虚拟机1",
              key: "1"
            },
            {
              title: "虚拟机2",
              key: "2"
            },
            {
              title: "虚拟机3",
              key: "3"
            },
            {
              title: "虚拟机4",
              key: "4"
            },
            {
              title: "虚拟机5",
              key: "5"
            }
          ]
        }
      ],
      key: 0
    };
  },
   created() {
    this.loadData();
  },
  methods: {
    loadData(item, callback) {
      setTimeout(() => {
        const data = [
          {
            title: "虚拟机1",
            expand: true,
            key: "1"
          },
          {
            title: "虚拟机2",
            expand: true,
            key: "2"
          },
          {
            title: "虚拟机3",
            expand: true,
            key: "3"
          },
          {
            title: "虚拟机4",
            expand: true,
            key: "4"
          },
          {
            title: "虚拟机5",
            expand: true,
            key: "5"
          }
        ];
        callback(data);
      }, 500);
    },
    selectChange() {
      const node = this.$refs.tree.getSelectedNodes();
      if (node.length != 0) {
        if (node[0].key != this.key) {
          this.key = node[0].key;
          this.$emit("showVm", this.key);
        }
      }
    }
  }
};
</script>
<style>
.ivu-tree-title {
  color: white;
}
</style>

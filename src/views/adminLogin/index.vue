<template>
  <div>
    <Card>
      <List header="用户登录" border size="large">
        <ListItem>在此登录管理员或操作员。</ListItem>
        <ListItem>
          <Form :model="formItem" :label-width="200" inline>
            <FormItem label="请输入USBKey的PIN的口令:">
              <Input type="password" v-model="formItem.key" />
            </FormItem>
            <FormItem :label-width="0">
              <Button type="info" @click="adminLogin">用户登录</Button>
            </FormItem>
          </Form>
        </ListItem>
      </List>
    </Card>
    <Card>
      <List header="用户状态" border size="large">
        <Table
          ref="tab"
          border
          :loading="state.loading"
          :columns="columns"
          :data="rows"
          class="table"
          :height="tableHeight"
          :span-method="handleSpan"
        >
          <template slot-scope="{ index }" slot="action">
            <div>
              <Button class="ops-btn" type="error" @click="deleteUser(index+1)">删除</Button>
            </div>
          </template>
        </Table>
      </List>
    </Card>
  </div>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      formItem: {
        key: ""
      },
      columns: [
        {
          title: "当前权限状态",
          width: 200,
          key: "status"
        },
        {
          title: "操作员登录状态",
          width: 200,
          key: "optStatus"
        },
        {
          title: "管理员数目",
          width: 200,
          key: "number"
        },

        {
          title: "已登录管理员",
          width: 200,
          key: "users"
        },

        {
          title: "操作",
          slot: "action"
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    ...common.methods,
    loadData() {
      this.$store.commit("adminList", this.queryParams);
    },
    adminLogin() {
      alert("登录成功");
    },
    deleteUser(id){
      alert(id)
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      //合并第一列
      if (rowIndex === 0 && columnIndex === 0) {
        return {
          rowspan: 3,
          colspan: 1
        };
      } else if (rowIndex === 1 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0
        };
      } else if (rowIndex === 2 && columnIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
      //合并第二列
      if (rowIndex === 0 && columnIndex === 1) {
        return {
          rowspan: 3,
          colspan: 1
        };
      } else if (rowIndex === 1 && columnIndex === 1) {
        return {
          rowspan: 0,
          colspan: 0
        };
      } else if (rowIndex === 2 && columnIndex === 1) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
      //合并第4列
      if (rowIndex === 0 && columnIndex === 2) {
        return {
          rowspan: 3,
          colspan: 1
        };
      } else if (rowIndex === 1 && columnIndex === 2) {
        return {
          rowspan: 0,
          colspan: 0
        };
      } else if (rowIndex === 2 && columnIndex === 2) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.adminUserManagement;
    }
  },
  watch: {
    $route() {}
  }
};
</script>
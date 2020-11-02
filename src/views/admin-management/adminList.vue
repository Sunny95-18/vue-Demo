<template>
  <Card :bordered="false" dis-hover>
    <div>
      <!--分页表格-->
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
            <Button v-if="row.status===1" class="ops-btn" type="success" @click="changeAdminStatus(row.id,0)">启用</Button>
            <Button v-else class="ops-btn" type="warning"  @click="changeAdminStatus(row.id,1)">停用</Button>
            <Button class="ops-btn" type="error"  @click="deleteAdmin(row.id)">删除</Button>
          </template>

          <Page
            ref="page"
            slot="footer"
            :current="queryParams.pageNumber"
            :total="totalCount"
            :page-size="queryParams.pageSize"
            show-total
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            :page-size-opts="[10,20,30]"
            placement="top"
            show-elevator
            show-sizer
          ></Page>
        </Table>
      </div>
    </div>
  </Card>
</template>

<script>
import common from "@/utils/common";
export default {
  name: "adminManagement",
  data() {
    return {
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
      },
      columns: [
        {
          title: "用户名",
          width: 250,
          key: "name",
        },
        {
          title: "管理员类型",
          width: 250,
          key: "adminType",
          render: (h, { row, index }) => {
            if (row.adminType == 1) {
              return h("span", "系统管理员");
            } else if (row.adminType == 2) {
              return h("span", "审计员");
            }
          },
        },
        {
          title: "管理员状态",
          width: 250,
          key: "status",
          render: (h, { row, index }) => {
            if (row.status == 0) {
              return h(
                "span",
                {
                  style: {
                    color: "#2d8cf0",
                  },
                },
                "正常"
              );
            } else if (row.status == 1) {
              return h(
                "span",
                {
                  style: {
                    color: "#FF0000",
                  },
                },
                "停止"
              );
            }
          },
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
      this.$store.commit("querAdminList", this.queryParams);
    },
    changeAdminStatus(id,status){
       this.$Message.success("你点击了修改管理员状态");
    //      const changAdmin = {
    //     id: id,
    //     status: status
    //   };
    // this.$store.commit("updateAdminStatus", changAdmin);
    },
    deleteAdmin(id){
         this.$Message.success("你点击了删除");
    }
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.adminManagement;
    },
  },
  mounted() {},
  watch: {
    $route() {},
  },
};
</script>
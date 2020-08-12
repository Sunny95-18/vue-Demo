<template>
  <Card :bordered="false" dis-hover>
    <div>
      <div>
        <Button class="ops-btn" type="success" @click="isShow=true">
          <Icon type="md-add"></Icon>添加用户
        </Button>
      </div>

      <!--分页表格-->
      <div style="marginTop:10px;">
        <Table
          ref="tab"
          stripe
          :loading="state.loading"
          :columns="columns"
          :data="rows"
          class="table"
          :height="550"
        >
          <template slot-scope="{ row,index }" slot="action">
            <div>
              <Button
                v-if="row.status==1"
                class="ops-btn"
                type="success"
                @click="changUserStatus(row.id,0)"
              >启用</Button>
              <Button v-else class="ops-btn" type="warning" @click="changUserStatus(row.id,1)">停用</Button>
              <Button class="ops-btn" type="info" @click="updateUserVms(row.id)">修改</Button>
              <Poptip confirm title="确定删除该用户吗?" @on-ok="deleteUser(row.id)" placement="bottom">
                <Button class="ops-btn" type="error">删除</Button>
              </Poptip>
            </div>
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
      <Modal v-model="isShow" title="添加用户" width="400">
        <p style="color:red">用户默认密码为123456，首次登录请修改密码</p>
        <Form
          ref="formItem"
          :model="formItem"
          :rules="ruleValidate"
          :label-width="100"
          style="marginTop:20px"
        >
          <FormItem label="用户名:" prop="username">
            <Input v-model="formItem.username" style="width:200px" />
          </FormItem>
          <FormItem label="虚拟机集群:" prop="vms">
            <template>
              <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox
                  :indeterminate="indeterminate"
                  :value="checkAll"
                  @click.prevent.native="handleCheckAll"
                >全选</Checkbox>
              </div>
              <CheckboxGroup v-model="formItem.vms" @on-change="checkAllGroupChange">
                <Checkbox label="0">虚拟机0</Checkbox>
                <Checkbox label="1">虚拟机1</Checkbox>
                <Checkbox label="2">虚拟机2</Checkbox>
                <Checkbox label="3">虚拟机3</Checkbox>
                <Checkbox label="4">虚拟机4</Checkbox>
                <Checkbox label="5">虚拟机5</Checkbox>
                <Checkbox label="6">虚拟机6</Checkbox>
                <Checkbox label="7">虚拟机7</Checkbox>
              </CheckboxGroup>
            </template>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">确定</Button>
            <Button @click="handleReset('formItem')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>

      <Modal v-model="isUpdate" title="修改用户虚拟机" width="400" draggable >
        <Form
          ref="updateFromItem"
          :model="updateFromItem"
          :rules="ruleValidate"
          :label-width="100"
          style="marginTop:20px"
        >
          <FormItem label="虚拟机集群:" prop="vms">
            <template>
              <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox
                  :indeterminate="indeterminate"
                  :value="checkAll"
                  @click.prevent.native="handleCheckAllByUpdate"
                >全选</Checkbox>
              </div>
              <CheckboxGroup v-model="updateFromItem.vms" @on-change="checkAllGroupChange">
                <Checkbox label="0">虚拟机0</Checkbox>
                <Checkbox label="1">虚拟机1</Checkbox>
                <Checkbox label="2">虚拟机2</Checkbox>
                <Checkbox label="3">虚拟机3</Checkbox>
                <Checkbox label="4">虚拟机4</Checkbox>
                <Checkbox label="5">虚拟机5</Checkbox>
                <Checkbox label="6">虚拟机6</Checkbox>
                <Checkbox label="7">虚拟机7</Checkbox>
              </CheckboxGroup>
            </template>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmitByUpdate('updateFromItem')">确定</Button>
            <Button @click="handleReset('formItem')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>
    </div>
  </Card>
</template>

<script>
import common from "@/utils/common";
export default {
  name: "sysUser",
  data() {
    return {
      queryParams: {
        current: 0,
        size: 10
      },
      indeterminate: true,
      checkAll: false,
      isShow: false,
      isUpdate: false,
      userId: 0,
      formItem: {
        username: "",
        vms: []
      },
      updateFromItem:{
        vms:[]
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "名称不可为空",
            trigger: "blur"
          }
        ],
        vms: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "至少选一个",
            trigger: "change"
          }
        ]
      },
      columns: [
        {
          title: "序号",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index +
                this.queryParams.current * this.queryParams.size +
                1
            );
          }
        },
        {
          title: "用户名",
          width: 200,
          key: "username"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if (params.row.status == 0) {
              return h("span", "已启用");
            } else {
              return h(
                "span",
                {
                  style: {
                    color: "#FF0000"
                  }
                },
                "已禁用"
              );
            }
          }
        },
        {
          title: "虚拟机数",
          key: "vmList"
        },
        {
          title: "添加时间",
          key: "ctime",
          width: 200,
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
      this.$store.commit("getAllSysUser", this.queryParams);
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.formItem.vms = ["0","1","2","3","4","5","6","7"];
      } else {
        this.formItem.vms = [];
      }
    },
    handleCheckAllByUpdate() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.updateFromItem.vms = ["0", "1", "2", "3", "4", "5", "6", "7"];
      } else {
        this.updateFromItem.vms = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 8) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$store.dispatch("addUser", this.formItem).then(res => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.success("添加成功");
              this.handleReset(name);
              this.loadData();
            } else {
              this.$Message.error(resData.message);
            }
          });
        } else {
          this.$Message.error("添加失败!");
        }
      });
    },
     handleSubmitByUpdate(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let userVms={
            id:this.userId,
            vms:this.updateFromItem.vms
          }
          this.$store.dispatch("updateUserVms", userVms).then(res => {
            const resData = res.data;
            if (resData.code == 200) {
              this.$Message.success("修改成功");
              this.handleReset(name);
              this.loadData();
            } else {
              this.$Message.error(resData.message);
            }
          });
        } else {
          this.$Message.error("修改失败!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.isShow = false;
      this.isUpdate = false;
    },
    changUserStatus(id, status) {
      const changUser = {
        id: id,
        status: status
      };
      this.$store.dispatch("changUserStatus", changUser).then(res => {
        const resData = res.data;
        if (resData.code == 200) {
          this.$Message.success("修改成功");
          this.loadData();
        } else {
          this.$Message.error(resData.message);
        }
      });
    },
    deleteUser(id) {
      this.$store.dispatch("deleteUser", id).then(res => {
        const resData = res.data;
        if (resData.code == 200) {
          this.$Message.success("删除成功");
          this.loadData();
        } else {
          this.$Message.error(resData.message);
        }
      });
    },
    updateUserVms(id) {
      this.userId = id;
     
      this.$store.dispatch("getUserById", id).then(res => {
        const resData = res.data;
        if (resData.code == 200) {
          let vms=resData.data.vmList.split(",");
          this.updateFromItem.vms=vms;
            this.isUpdate = true;
        } else {
          this.$Message.error(resData.message);
        }
      });
     
    }
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.user;
    }
  },
  mounted() {},
  // watch: {
  //   $route(to) {
    
  //   }
  // }
};
</script>

<style>
.bottom {
  text-align: center;
}
</style>
<template>
  <Card :bordered="false" dis-hover>
    <div>
      <Button type="success" icon="md-add" @click="isAddShow = true">添加</Button
      >

      <!--分页表格-->
      <div style="margin-top: 10px">
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
            <div>
              <!-- <Button class="ops-btn" type="primary" @click="isEditShow=true">编辑</Button> -->
              <Poptip
                confirm
                title="确定删除该CRL吗?"
                @on-ok="deleteCrl(row.id)"
                placement="right"
              >
                <Button class="ops-btn" type="error">删除</Button>
              </Poptip>
            </div>
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
      </div>
    </div>
    <Modal v-model="isAddShow" title="添加" @on-ok="createCrl">
      <Form :model="addCrlForm" :label-width="100">
        <FormItem label="类型：">
          <Select v-model="addCrlForm.type">
            <Option :value="1">文件</Option>
            <Option :value="2">地址</Option>
          </Select>
        </FormItem>
        <FormItem v-if="addCrlForm.type == 1" label="CRL文件：">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">上传</Button>
          </Upload>
        </FormItem>
        <FormItem v-if="addCrlForm.type == 2" label="CRL地址">
          <Input v-model="addCrlForm.url">
            <Select
              v-model="addCrlForm.urlType"
              slot="prepend"
              style="width: 80px"
            >
              <Option :value="1">http://</Option>
              <Option :value="2">ladp://</Option>
            </Select>
          </Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="isEditShow" title="配置" @on-ok="editCrl">
      <Form :model="addCrlForm" :label-width="100">
        <FormItem label="CRL更新地址">
          <Input v-model="addCrlForm.url"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      isAddShow: false,
      isEditShow: false,
      addCrlForm: {
        type: 1,
        url: "",
        urlType: 1,
      },
      queryParams: {
        current: 1,
        size: 10,
      },
      columns: [
        {
          title: "序号",
          width: 100,
          key: "id",
        },
        {
          title: "颁发者",
          width: 300,
          key: "Issuer",
        },
        //  {
        //   title: "颁发者",
        //   width: 300,
        //   key: "algName",
        // },
        {
          title: "本次更新时间",
          width: 200,
          key: "updateDate",
        },
        {
          title: "下次更新时间",
          width: 200,
          key: "nextUpdateDate",
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
      this.$store.commit("quercrlList", this.queryParams);
    },
    changePage(p) {
      this.queryParams.current = p;
      this.loadData();
    },
    changePageSize(size) {
      this.queryParams.size = size;
      this.loadData();
    },
    editCrl() {
      this.$Message.success("修改成功!");
    },
    createCrl() {
      this.$Message.success("创建CRL成功!");
    },
    deleteCrl(id) {
      this.$store.dispatch("deleteCrl", id).then((res) => {
        var resData = res.data;
        if (resData && resData.code == 200) {
          this.$Message.success("CRL删除成功!");
          this.loadData();
        } else {
          this.$Message.error("CRL删除失败!");
        }
      });
    },
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.crlManagement;
    },
  },
};
</script>
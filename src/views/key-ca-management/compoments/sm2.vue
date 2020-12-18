<template>
  <div>
    <Card :bordered="false" dis-hover>
      <Button
        style="margin-left: 30px"
        @click="isShow = true"
        type="primary"
        icon="md-key"
        >生成密钥</Button
      >
      <div style="margin-top: 20px">
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
            <Poptip
              confirm
              title="确认删除该密钥吗?"
              @on-ok="deleteKey(row.id)"
              placement="right"
            >
              <Button class="ops-btn" type="error">删除</Button>
            </Poptip>
          </template>
        </Table>
        <Modal v-model="isShow" title="生成SM2密钥对" @on-ok="ok">
          <Form :label-width="150">
            <FormItem
              label="密钥索引："
              prop="length"
            >
             <Input v-model="keyIndex" style="width: 200px" />
            </FormItem>
          </Form>
        </Modal>
      </div>
    </Card>
  </div>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      isShow: false,
      keyIndex:"",
      columns: [
        {
          title: "索引",
          width: 300,
          key: "id",
        },
        {
          title: "模长",
          width: 300,
          key: "length",
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

      this.$store.commit("queryKeyList", 1);
    },
    ok() {
      this.$store.dispatch("KeyGeneration", this.createKeyForm).then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("生成密钥对成功!");
          this.loadData();
        } else {
          this.$Message.error("生成密钥对失败!");
        }
      });
    },
    deleteKey(id) {
      this.$store.dispatch("deleteKey", id).then((res) => {
        var resData = res.data;
        if (resData && resData.code == "200") {
          this.$Message.success("密钥删除成功!");
          this.loadData();
        } else {
          this.$Message.error("密钥删除失败!");
        }
      });
    },
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.keyManagement;
    },
  },
  mounted() {},
  watch: {
    $route() {},
  },
};
</script>
          

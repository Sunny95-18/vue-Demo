<template>
  <Card :bordered="false" dis-hover>

   <div>
      <Form class="edit-model-form" show-message :label-width="120">
        <Row>
          <div class="ivu-col ivu-col-span-6">
            <FormItem label="输入要授权的Ip">
              <Input placeholder="请输入Ip地址" v-model="queryParams.IP" clearable />
            </FormItem>
          </div>
          <div class="ivu-col ivu-col-span-12">
            <FormItem :label-width="20">
              <Button @click="toAdd" type="success" icon="md-add">增加</Button>
            </FormItem>
          </div>
        </Row>
      </Form>

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
            <div>
              <Button  @click="toDel" class="ops-btn" type="error">删除</Button>
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
    </div>
  </Card>
</template>

<script>
import common from "@/utils/common";
export default {
  name: "virtual-machine",
  data() {
    return {
      query: {},
      user: {},
      offsetTop: 196,
      queryParams: {
        pageNumber: 1,
        pageSize: 10
      },
      columns: [
        {
          title: "",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.queryParams.pageNumber - 1) * this.queryParams.pageSize +
                1
            );
          }
        },
        {
          title: "IP",
          key: "IP"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      ruleValidate: {
        id: [
          { required: true, message: "id不可为空", trigger: "blur" },
          {
            validator: this.asyncValidator({
              url: "user/validate",
              getValidatorParams: this.getValidatorParams
            }),
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    ...common.methods,
    loadData() {
     this.$Notice.warning({
                    title: '白名单通知',
                    duration: 10,
                      render: h => {
                        return h('span', [
                            '对客户端机器进行授权，只有在白名单中的IP地址设备才被允许访问密码服务。',
                            h('a', '注：当白名单为空时，允许所有IP访问。'),
                        ])
                    }
                });
      this.$store.commit("demoPages", this.queryParams);
      // if(this.$store.state.logList.rows.length==0){
      //   this.$Message.error("白名单列表获取失败")
      // }
    },

        
    toAdd() {
      alert("add ip");
    },
    toDel(){
    alert("delete ip");
    }
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.whiteList;
    }
  },
  mounted() {
    // this.offsetTop = this.$refs.tab.$el.getBoundingClientRect().top;
  },
  watch: {
    $route() {}
  }
};
</script>

<style>

</style>
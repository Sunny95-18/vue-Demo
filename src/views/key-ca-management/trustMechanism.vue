<template>
  <Card :bordered="false" dis-hover>
    <Button
      style="margin-left: 30px"
      @click="isShowInput = true"
      type="primary"
      icon="md-arrow-up"
      >导入</Button
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
          <Button class="ops-btn" type="primary" @click="showMechanism"
            >查看</Button
          >
          <!-- <Button class="ops-btn" type="primary" @click="updateMechanism">配置</Button> -->
          <Poptip
            confirm
            title="确认删除该受信机构吗?"
            @on-ok="deleteMechanism(row.id)"
            placement="right"
          >
            <Button class="ops-btn" type="error">删除</Button>
          </Poptip>
          <Button class="ops-btn" type="info" @click="downloadMechanism"
            >下载</Button
          >
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
          :page-size-opts="[10, 20, 30]"
          placement="top"
          show-elevator
          show-sizer
        ></Page>
      </Table>
      <Modal v-model="isShowInput" title="导入证书" @on-ok="input">
        <Form ref="mechanismForm" :model="mechanismForm" :label-width="100">
          <FormItem label="证书类型：" prop="certType" style="height: 15px">
            <Select v-model="importCertType" size="small" style="width: 100px">
              <Option :value="1">证书</Option>
              <Option :value="2">证书链</Option>
            </Select>
          </FormItem>
          <FormItem label="选择文件：">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              accept=".txt"
              :format="['cer', 'crt', 'pem', 'txt']"
            >
              <Button icon="ios-cloud-upload-outline">导入</Button>
            </Upload></FormItem
          >
        </Form>
      </Modal>
      <Modal v-model="isShowMechanism" title="证书详细" :footer-hide="true">
        <Form ref="mechanismForm" :model="mechanismForm" :label-width="100">
          <FormItem label="证书类型：" prop="certType" style="height: 15px">{{
            mechanismForm.certType
          }}</FormItem>
          <FormItem label="序列号：" prop="serialNumber" style="height: 15px">{{
            mechanismForm.serialNumber
          }}</FormItem>
          <FormItem label="版本号：" prop="version" style="height: 15px">{{
            mechanismForm.version
          }}</FormItem>
          <FormItem label="主题：" prop="theme" style="height: 15px">{{
            mechanismForm.theme
          }}</FormItem>
          <FormItem label="颁发者：" prop="publisher" style="height: 15px">{{
            mechanismForm.publisher
          }}</FormItem>
          <FormItem label="开始时间：" prop="startDate" style="height: 15px">{{
            mechanismForm.startDate
          }}</FormItem>
          <FormItem label="失效时间：" prop="endDate" style="height: 15px">{{
            mechanismForm.endDate
          }}</FormItem>
          <FormItem label="签名算法：" prop="alg" style="height: 15px">{{
            mechanismForm.alg
          }}</FormItem>
          <FormItem label="密钥长度：" prop="keyLength" style="height: 15px">{{
            mechanismForm.keyLength
          }}</FormItem>
          <FormItem label="密钥用途：" prop="keyType" style="height: 15px">{{
            mechanismForm.keyType
          }}</FormItem>
          <FormItem label="基本约束：" prop="constraint" style="height: 15px">{{
            mechanismForm.constraint
          }}</FormItem>
        </Form>
      </Modal>
      <Modal v-model="isUpdateMechanism" title="配置证书" :footer-hide="true">
        <Form
          ref="updateMechanismForm"
          :model="updateMechanismForm"
          :label-width="140"
        >
          <FormItem label="证书DN：" prop="certDN">
            <Input v-model="updateMechanismForm.certDN" style="width: 300px" />
          </FormItem>
          <FormItem label="CRL更新日期：" prop="crlUpdateDate">
            <DatePicker
              type="datetime"
              v-model="updateMechanismForm.crlUpdateDate"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="CRL下次更新日期：" prop="crlNextUpdateDate">
            <DatePicker
              type="datetime"
              v-model="updateMechanismForm.crlNextUpdateDate"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="CRL：" prop="crl">
            <Input
              v-model="updateMechanismForm.crl"
              type="textarea"
              style="width: 300px"
            />
          </FormItem>
          <FormItem label="手动导入CRL：" prop="publisher">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">导入</Button>
            </Upload>
          </FormItem>
          <FormItem label="OCSP：" prop="ocsp">
            <Input v-model="updateMechanismForm.ocsp" style="width: 300px" />
          </FormItem>
          <Button
            class="ops-btn"
            style="marginleft: 200px"
            type="info"
            @click="saveUpdateMechanism"
            >保存</Button
          >
        </Form>
      </Modal>
    </div>
  </Card>
</template>
<script>
import common from "@/utils/common";
export default {
  data() {
    return {
      isShowInput: false,
      isShowMechanism: false,
      isUpdateMechanism: false,
      importCertType:1,
      mechanismForm: {
        certType: "X.509",
        serialNumber: "1233333",
        version: "v3",
        theme: "C=CN,O=MOF",
        publisher: "C=CN,O=MOF",
        startDate: "2020-09-22 15:30:30",
        endDate: "2021-09-22 15:30:30",
        alg: "SHA1WithRSAEncryption",
        keyLength: "2048",
        keyType: "digitalSignature",
        constraint: "Subject Type=CA",
      },
      updateMechanismForm: {
        certDN: "",
        crlUpdateDate: "",
        crlNextUpdateDate: "",
        crl: "",
        ocsp: "",
      },
      queryParams: {
        pageNumber: 1,
        pageSize: 10,
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
          key: "name",
        },
        {
          title: "主题",
          width: 200,
          key: "theme",
        },
         {
          title: "密钥",
          width: 200,
          key: "name",
        },
        {
          title: "有效期至",
          width: 200,
          key: "theme",
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
      this.$store.commit("queryCert", this.queryParams);
    },
    input() {},
    showMechanism() {
      this.isShowMechanism = true;
    },
    updateMechanism() {
      this.isUpdateMechanism = true;
    },
    saveUpdateMechanism() {
      this.isUpdateMechanism = false;
      this.$Message.success("修改证书配置成功!");
    },
    deleteMechanism(id) {
      this.$Message.success("删除证书成功!");
    },
    downloadMechanism() {
      this.$Message.success("证书下载成功!");
    },
  },
  computed: {
    ...common.computed,
    state() {
      return this.$store.state.trustMechanism;
    },
  },
};
</script>
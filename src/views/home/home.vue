<style lang="less">
@import "./home.less";
</style>
<template>
  <div class="home-main" :style="{height:height + 'px'}">
    <p>欢迎使用云服务器密码机管理系统</p>
    <div class="home-bg"></div>
    <!-- <Row :gutter="10">
      <Col span="12">
        <ve-gauge :data="chartData" />
      </Col>
      <Col span="12">
        <ve-gauge :data="chartData" />
      </Col>
    </Row>-->
  </div>
</template>

<script>
import common from "@/utils/common";
import conf from "@/conf/";
import { setInterval } from "timers";
import VeGauge from "v-charts/lib/gauge";
export default {
  name: "home",
  data() {
    return {
      chartData: {
        columns: ["type", "a", "b", "value"],
        rows: [{ type: "速度", value: 80, a: 0, b: 2 }]
      },
      offsetTop: 126,
      outLine: {},
      timer: -1
    };
  },
  created() {
    this.showNotice();
  },
  methods: {
    ...common.methods,
    showNotice() {
      this.$Notice.info({
        title: "使用向导",
        duration: 3,
        render: h => {
          return h("a", "初次使用本系统建议先操作安装向导！");
        }
      });
    }
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  },
  mounted() {},
  computed: {
    height() {
      return this.$store.state.common.documentBodyClientHeight - this.offsetTop;
    }
  },
  components: { VeGauge }
};
</script>
<style scoped>
.home-main {
  background-color: white;
}
p{
  margin-top:5%;
  color: red;
  text-align: center;
  font-size: 30px;
}
.home-bg {
  top: 10%;
  right: -20%;
  width: 60%;
  height: 60%;
  background-image: url("../../assets/yjmj.png");
  background-size: cover;
  background-position: center;
  position: relative;
}
</style>
<template>
  <div>
    <Card>
      <span>当前虚拟机为: {{vmName}}</span>
      <div style="marginTop:20px;marginLeft:20px;">
        CPU利用率： {{cpu}}% of 4 CPU(s)
        <Progress v-if="cpu<=20" :percent="cpu" :stroke-color="['#0f0','#0f0']" />
        <Progress v-else-if="cpu>20&&cpu<=80" :percent="cpu" :stroke-color="['#0f0','#f78603']" />
        <Progress v-else :percent="cpu" :stroke-color="['#0f0','#FF0000']" />
      </div>
      <div style="marginTop:40px;marginLeft:20px;">
        内存使用率:  {{memory}}% (1004.93 MiB of 5.78 GiB)
        <Progress v-if="memory<=20" :percent="memory" :stroke-color="['#0f0','#0f0']" />
        <Progress v-else-if="memory>20&&memory<=80" :percent="memory" :stroke-color="['#0f0','#f78603']" />
        <Progress v-else :percent="memory" :stroke-color="['#0f0','#FF0000']" />
      </div>
      <div style="marginTop:40px;marginLeft:20px;">
        硬盘容量:  {{capacity}}% 0(10 GiB of 40 GiB)
        <Progress v-if="capacity<=20" :percent="capacity" :stroke-color="['#0f0','#0f0']" />
        <Progress v-else-if="capacity>20&&capacity<=80" :percent="capacity" :stroke-color="['#0f0','#0f0']" />
        <Progress v-else :percent="capacity" :stroke-color="['#0f0','#FF0000']" />
      </div>
    </Card>
    
    <div style="marginTop:20px">
      <div style="marginLeft:50px; marginTop:20px; width:40%; float:left;">
        <ve-line :data="cpuData" ></ve-line>
      </div>
      <div style="marginLeft:100px;marginTop:20px;width:40%; float:left">
        <ve-line :data="memoryData" ></ve-line>
      </div>
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line";
import common from "@/utils/common";
export default {
  components: { VeLine },
  data() {
    this.chartSettings = {
      labelMap: {
        cpu: "cpu利用率"
      },
      dataName: {
        cpu: "%"
      }
    };

    return {
      cpu: 40,
      memory: 17,
      capacity:50,
      vmName:this.$store.state.vmList.vmName,
      chartData: {
        columns: ["type", "value"],
        rows: [{ type: "cpu", value: 60 }]
      },
      cpuData: {
        columns: ["时间", "CPU使用率"],
        rows: [
          { 时间: "1/1", CPU使用率: 0.54 },
          { 时间: "1/2", CPU使用率: 0.15 },
          { 时间: "1/3", CPU使用率: 0.5 },
          { 时间: "1/4", CPU使用率: 0.3 },
          { 时间: "1/5", CPU使用率: 0.15 },
          { 时间: "1/6", CPU使用率: 0.36 }
        ]
      },
      memoryData: {
        columns: ["时间", "内存使用率"],
        rows: [
          { 时间: "1/1", 内存使用率: 0.26 },
          { 时间: "1/2", 内存使用率: 0.26 },
          { 时间: "1/3", 内存使用率: 0.56 },
          { 时间: "1/4", 内存使用率: 0.3 },
          { 时间: "1/5", 内存使用率: 0.89 },
          { 时间: "1/6", 内存使用率: 0.45 }
        ]
      }
    };
  },
    created() {
   this.$store.commit("getVMInfoName",this.$route.meta.id)
  },
    computed: {
    ...common.computed,
    state() {
      return this.$store.state.vmList;
    },
    
  },
    watch: {
    $route(to) {

      this.$store.commit("getVMInfoName", this.$route.meta.id);
        this.vmName=this.$store.state.vmList.vmName
    }
  }
};
</script>
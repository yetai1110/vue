<template>
  <div>
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    kkk() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: this.list.map(item=>item.catename)
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: this.list.map(item=>item.children?item.children.length:0)
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    ...mapActions({
        requestcateList:'cate/requestcateList'
    })
  },
  mounted() {
    this.requestcateList()
    this.kkk();
  },
  watch:{
    
  }
};
</script>

<style>
</style>
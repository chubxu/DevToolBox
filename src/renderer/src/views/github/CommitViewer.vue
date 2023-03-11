<template>
  <div>
    <el-row class="title">
      Github CommitViewer
    </el-row>

    <el-row>
      <div class="viewer-container" style="width: 100%; height: 300px"></div>
    </el-row>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import moment from 'moment'

import { useGlobalStore } from '@/store/GlobalStore.js'
import { ref, onMounted } from 'vue'

const globalStore = useGlobalStore()

const owner = ref('chubxu')
const repo = ref('DevToolBox')

onMounted(() => {
  let fetchParams = {
    owner: owner.value,
    repo: repo.value,
    since: moment().utc().subtract(1, 'months').format("YYYY-MM-DDTHH:mm:ss"),
    until: moment().utc().format("YYYY-MM-DDTHH:mm:ss"),
    perPage: 100,
  }
  let listCommitsPromise = window.electronAPI.listCommits(JSON.stringify(fetchParams))
  listCommitsPromise.then(res => {
    if (res) {
      let { scatterDataArray, minCount, maxCount } = JSON.parse(res)
      let dom = document.querySelector('.viewer-container')
      let scatterChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      })
      const hours = [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
      ]
      const data = scatterDataArray.map(function (item) {
        return [item[0], item[1], item[2]];
      })
      let option = {
        title: {
          text: 'Commit View of Github'
        },
        legend: {
          data: ['Commit Counts'],
          left: 'right',
          itemStyle: {
            color: '#216e39'
          }
        },
        tooltip: {
          position: 'top',
          formatter: function (params) {
            return (
              params.value[2] +
              ' commits in ' +
              hours[params.value[1]] +
              ' of ' +
              params.value[0]
            );
          }
        },
        grid: {
          left: 10,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          splitLine: {
            show: true
          },
          axisLine: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: hours,
          splitLine: {
            show: true,
            interval: 5,
          },
          axisLine: {
            show: true
          }
        },
        series: [{
          name: 'Commit Counts',
          type: 'scatter',
          symbolSize: function (val) {
            return val[2] * 2;
          },
          data: data,
          animationDelay: function (idx) {
            return idx * 5;
          },
          itemStyle: {
            color: function ({data}) {
              let count = data[2]
              let radio = (count - minCount) / (maxCount - minCount)
              if (radio < 0.25) {
                return '#9be9a8'
              } else if (radio < 0.5) {
                return '#40c463'
              } else if (radio < 0.75) {
                return '#30a14e'
              } else {
                return '#216e39'
              }
            }
          }
        }]
      }
      if (option && typeof option === 'object') {
        scatterChart.setOption(option)
      }
      window.addEventListener('resize', scatterChart.resize)
    }
  }).catch(err => {
    console.log(err)
  })
})
</script>

<style lang="less" scroped>
@import url('../../style/less/Common.less');
</style>
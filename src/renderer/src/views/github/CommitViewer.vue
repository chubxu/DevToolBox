<template>
  <div>
    <el-row class="title">
      Github CommitViewer
    </el-row>

    <div style="height: 100%; margin-top: auto; margin-bottom: auto">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="viewer-container" style="width: 100%; height: 400px" :isDark="globalStore.darkFlag"></div>
        </el-col>
        <el-col :span="8">
          <div style="margin-top: 30px">
            <el-form :model="chatParams" label-width="50" label-position="top">
              <el-form-item label="owner:">
                <el-input v-model="chatParams.owner"/>
              </el-form-item>
              <el-form-item label="repo:">
                <el-input v-model="chatParams.repo"/>
              </el-form-item>
              <el-form-item label="period:">
                <el-date-picker
                  v-model="chatParams.startEndDate"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  range-separator="To"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
              <el-form-item label="commit counts:" label-width="120">
                <el-slider v-model="chatParams.perPage" :step="10" :min="30"/>
              </el-form-item>
              <el-form-item style="float: right">
                <el-button type="primary" color="#30a14e" icon="Refresh" @click="reloadHandler">Reload</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import moment from 'moment'

import { useGlobalStore } from '@/store/GlobalStore.js'
import { ref, reactive, onMounted } from 'vue'

const globalStore = useGlobalStore()

const fetchResult = ref('')
const chatParams = reactive({
  owner: 'chubxu',
  repo: 'DevToolBox',
  startEndDate: [
    moment().subtract(1, 'months').format("YYYY-MM-DDTHH:mm:ss"),
    moment().format("YYYY-MM-DDTHH:mm:ss")
  ],
  perPage: 100,
})
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近一年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    },
  },
] 

let scatterChart

globalStore.$subscribe((mutation, state) => {
  if (!fetchResult.value) {
    reloadHandler()
  } else {
    let { scatterDataArray, minCount, maxCount } = JSON.parse(fetchResult.value)
    drawScatter(scatterDataArray, minCount, maxCount, state.darkFlag)
  }
})

const reloadHandler = () => {
  let listCommitsPromise = fetchCommits()
  listCommitsPromise.then(res => {
    if (res) {
      fetchResult.value = res
      let { scatterDataArray, minCount, maxCount } = JSON.parse(res)
      drawScatter(scatterDataArray, minCount, maxCount)
    }
  }).catch(err => {
    console.log(err)
  })
}

const fetchCommits = () => {
  let fetchParams = {
    owner: chatParams.owner,
    repo: chatParams.repo,
    since: moment(chatParams.startEndDate[0]).utc().format("YYYY-MM-DDTHH:mm:ss"),
    until: moment(chatParams.startEndDate[1]).utc().format("YYYY-MM-DDTHH:mm:ss"),
    perPage: 100,
  }
  return window.electronAPI.listCommits(JSON.stringify(fetchParams))
}

const drawScatter = (scatterDataArray, minCount, maxCount) => {
  if (scatterChart) {
    scatterChart.dispose()
  }
  let dom = document.querySelector('.viewer-container')
  scatterChart = echarts.init(dom, globalStore.darkFlag ? 'dark' : 'light', {
    renderer: 'canvas',
    useDirtyRect: false,
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
      text: `Commit View of ${chatParams.owner}\'s ${chatParams.repo}`,
      textStyle: {
        fontSize: 14,
      },
      left: 'center',
      bottom: 10
    },
    legend: {
      data: ['Commit Counts'],
      left: 'left',
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
      bottom: 50,
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

onMounted(() => {
  if (fetchResult.value) {
    return
  }
  let listCommitsPromise = fetchCommits()
  listCommitsPromise.then(res => {
    if (res) {
      fetchResult.value = res
      let { scatterDataArray, minCount, maxCount } = JSON.parse(res)
      drawScatter(scatterDataArray, minCount, maxCount)
    }
  }).catch(err => {
    console.log(err)
  })
})
</script>

<style lang="less" scroped>
@import url('../../style/less/Common.less');
</style>
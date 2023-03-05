<template>
  <div>
    <el-row class="title">
      Json &gt; Csv
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="label">
          <div>Json输入</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyJsonDataHandler">复制</el-button>
            <el-button size="small" icon="FullScreen" @click="formatInputJsonDataHandler">格式化</el-button>
            <el-button size="small" icon="Upload" @click="uploadJsonFile">选择文件</el-button>
          </div>
        </div>
        <div v-if="parseError" class="error-msg">
          输入数据不符合json格式
        </div>
        <CodeMirror
          ref="jsonCodeMirror"
          :code="inputJsonData"
          mode="javascript" 
          :theme="globalStore.darkFlag ? 'darcula' : 'idea'"
          :readonly="false" 
          @change="dataChangeHandler"
        />
      </el-col>

      <el-col :span="12">
        <div class="label">
          <div>Csv输出</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyCsvDataHandler">复制</el-button>
            <el-button size="small" icon="Download" @click="downloadCsvFile">导出文件</el-button>
          </div>
        </div>
        <CodeMirror 
          ref="csvCodeMirror"
          :code="outputCsvData"
          mode="csv"
          :theme="globalStore.darkFlag ? 'darcula' : 'idea'"
          :readonly="true"
          :refreshRealTime="true" 
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import * as csvjson from 'csvjson'
import CodeMirror from '@/components/Vue3CodeMirror.vue'
import placeholderJsonData from '@/assets/json/placeholderJsonData.json'
import { useGlobalStore } from '@/store/GlobalStore.js'

export default {
  name: 'Json2Csv',

  components: {
    CodeMirror,
  },

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      inputJsonData: '',
      parseError: false,
    }
  },

  methods: {
    formatInputJsonDataHandler() {
      this.inputJsonData = JSON.stringify(JSON.parse(this.inputJsonData), null, 2)
      this.$refs.jsonCodeMirror.setValue(this.inputJsonData)
    },

    copyJsonDataHandler() {
      window.electronAPI.copy(this.inputJsonData)
      this.$message.success({
        showClose: true,
        message: '复制成功',
      })
    },

    copyCsvDataHandler() {
      window.electronAPI.copy(this.outputCsvData)
      this.$message.success({
        showClose: true,
        message: '复制成功',
      })
    },

    dataChangeHandler(data) {
      if (typeof data === 'string') {
        this.inputJsonData = data
      }
    },

    uploadJsonFile() {
      let jsonDataPromise = window.electronAPI.uploadJsonFile()
      jsonDataPromise.then(res => {
        let uploadResult = JSON.parse(res)
        if (uploadResult.hasRead) {
          this.inputJsonData = uploadResult.jsonData
        }
        this.$refs.jsonCodeMirror.setValue(this.inputJsonData)
      }).catch(err => {
        console.log(err)
      })
    },

    downloadCsvFile() {
      let data = {
        suffix: 'csv',
        data: this.outputCsvData
      }
      window.electronAPI.downloadFile(JSON.stringify(data))
      this.$message.success({
        message: '文件已下载至桌面',
        showClose: true
      })
    },
  },

  computed: {
    outputCsvData() {
      if (typeof this.inputJsonData === 'string') {
        try {
          let obj = JSON.parse(this.inputJsonData)
          if (typeof obj == 'object' && obj) {
            this.parseError = false
            return csvjson.toCSV(obj, {
              delimiter: ',',
              wrap: false,
              objectDenote: ' '
            })
          } else {
            this.parseError = true
            return this.outputCsvData
          }
        } catch (e) {
          console.error(e)
          this.parseError = true
          return this.outputCsvData
        }
      }
      this.parseError = true
      return this.outputCsvData
    }
  },

  created() {
    this.inputJsonData = JSON.stringify(placeholderJsonData, null, 2)
  },
}
</script>

<style lang="less" scroped>
@import url('../../style/less/Common.less');
</style>
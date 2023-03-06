<template>
  <div>
    <el-row class="title">
      Json格式化
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="label">
          <div>输入</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyJsonDataHandler">复制</el-button>
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
          <div>格式化Json输出</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyFormatterJsonDataHandler">复制</el-button>
            <el-button size="small" icon="Download" @click="downloadFormatterJsonFile">导出文件</el-button>
          </div>
        </div>
        <CodeMirror 
          ref="formatterJsonCodeMirror"
          :code="outputFormatterJsonData"
          mode="javascript"
          :theme="globalStore.darkFlag ? 'darcula' : 'idea'"
          :readonly="true"
          :refreshRealTime="true" 
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import CodeMirror from '@/components/Vue3CodeMirror.vue'
import placeholderJsonData from '@/assets/json/placeholderJsonData.json'
import { useGlobalStore } from '@/store/GlobalStore.js'

export default {
  name: 'JsonFormatter',

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

    copyJsonDataHandler() {
      window.electronAPI.copy(this.inputJsonData)
      this.$message.success({
        showClose: true,
        message: '拷贝成功',
      })
    },

    copyFormatterJsonDataHandler() {
      window.electronAPI.copy(this.outputFormatterJsonData)
      this.$message.success({
        showClose: true,
        message: '拷贝成功',
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

    downloadFormatterJsonFile() {
      let data = {
        suffix: 'json',
        data: this.outputFormatterJsonData
      }
      window.electronAPI.downloadFile(JSON.stringify(data))
      this.$message.success({
        message: '文件已下载至桌面',
        showClose: true
      })
    }
  },

  computed: {
    outputFormatterJsonData() {
      if (typeof this.inputJsonData === 'string') {
        try {
          let obj = JSON.parse(this.inputJsonData)
          if (typeof obj == 'object' && obj) {
            this.parseError = false
            return JSON.stringify(obj, null, 2)
          } else {
            this.parseError = true
            return this.outputFormatterJsonData
          }
        } catch (e) {
          console.log(e)
          this.parseError = true
          return this.outputFormatterJsonData
        }
      }
      this.parseError = true
      return this.outputFormatterJsonData
    }
  },

  created() {
    this.inputJsonData = JSON.stringify(placeholderJsonData)
  },
}
</script>

<style lang="less" scroped>
@import url('../../style/less/Common.less');
</style>
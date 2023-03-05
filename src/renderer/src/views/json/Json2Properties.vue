<template>
  <div>
    <el-row class="title">
      Json &gt; Properties
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
          <div>Properties输出</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyPropertiesDataHandler">复制</el-button>
            <el-button size="small" icon="Download" @click="downloadPropertiesFile">导出文件</el-button>
          </div>
        </div>
        <CodeMirror 
          ref="propertiesCodeMirror"
          :code="outputPropertiesData"
          mode="properties"
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
  name: 'Json2Properties',

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
        message: 'Copy Success',
      })
    },

    copyPropertiesDataHandler() {
      window.electronAPI.copy(this.outputPropertiesData)
      this.$message.success({
        showClose: true,
        message: 'Copy Success',
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

    downloadPropertiesFile() {
      let data = {
        suffix: 'properties',
        data: this.outputPropertiesData
      }
      window.electronAPI.downloadFile(JSON.stringify(data))
      this.$message.success({
        message: '文件已下载至桌面',
        showClose: true
      })
    },

    json2Properties(json, prefix) {
      let result = ''
      let keys = Object.keys(json);
      keys.forEach(key => {
        let _prefix
        if (json[key] && typeof json[ key ] === 'object') {
            let _currPrefix = key.concat('.')
            _prefix = prefix ? prefix.concat(_currPrefix) : _currPrefix
            result = result.concat(this.json2Properties(json[ key ], _prefix))
        } else {
            _prefix = prefix ? prefix.concat(key) : key
            result = result.concat(_prefix.concat('=').concat(json[ key ] || ''))
        }
        result = result.concat('\n')
      })
      return result.trim();
    },
  },

  computed: {
    outputPropertiesData() {
      if (typeof this.inputJsonData === 'string') {
        try {
          let obj = JSON.parse(this.inputJsonData)
          if (typeof obj == 'object' && obj) {
            this.parseError = false
            return this.json2Properties(obj)
          } else {
            this.parseError = true
            return this.outputPropertiesData
          }
        } catch (e) {
          console.error(e)
          this.parseError = true
          return this.outputPropertiesData
        }
      }
      this.parseError = true
      return this.outputPropertiesData
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
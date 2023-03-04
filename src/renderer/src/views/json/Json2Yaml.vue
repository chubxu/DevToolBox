<template>
  <!-- title -->
  <el-row class="title">
    JSON &lt;&gt; YAML
  </el-row>

  <el-row :gutter="10">
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
        <div>Yaml输出</div>
        <div>
          <el-button size="small" icon="CopyDocument" @click="copyYamlDataHandler">复制</el-button>
          <el-button size="small" icon="Download" @click="downloadYamlFile">导出文件</el-button>
        </div>
      </div>
      <CodeMirror 
        ref="yamlCodeMirror"
        :code="outputYamlData"
        mode="yaml"
        :theme="globalStore.darkFlag ? 'darcula' : 'idea'"
        :readonly="true"
        :refreshRealTime="true" 
      />
    </el-col>
  </el-row>
</template>

<script>
// import yaml from 'yaml'
import jsYaml from 'js-yaml'
import CodeMirror from '@/components/Vue3CodeMirror.vue'
import placeholderJsonData from '@/assets/json/placeholderJsonData.json'
import { useGlobalStore } from '@/store/GlobalStore.js'
export default {
  name: 'Json2Yaml',

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

    copyYamlDataHandler() {
      window.electronAPI.copy(this.outputYamlData)
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

    downloadYamlFile() {
      window.electronAPI.downloadYamlFile(this.outputYamlData)
      this.$message.success({
        message: '文件已下载至桌面',
        showClose: true
      })
    }
  },

  computed: {
    outputYamlData() {
      if (typeof this.inputJsonData === 'string') {
        try {
          let obj = JSON.parse(this.inputJsonData)
          if (typeof obj == 'object' && obj) {
            this.parseError = false
            return jsYaml.dump(JSON.parse(this.inputJsonData))
          } else {
            this.parseError = true
            return this.outputYamlData
          }
        } catch (e) {
          this.parseError = true
          return this.outputYamlData
        }
      }
      this.parseError = true
      return this.outputYamlData
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
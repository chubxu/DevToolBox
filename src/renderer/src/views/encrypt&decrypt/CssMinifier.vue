<template>
  <div>
    <el-row class="title">
      Css最小化
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="label">
          <div>格式化CSS输入</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyInputCssDataHandler">复制</el-button>
            <el-button size="small" icon="FullScreen" @click="formatInputCssDataHandler">格式化</el-button>
            <el-button size="small" icon="Upload" @click="uploadCssFile">选择文件</el-button>
          </div>
        </div>
        <div v-if="parseError" class="error-msg">
          输入数据不符合Css格式
        </div>
        <CodeMirror
          ref="cssCodeMirror"
          :code="inputCssData"
          mode="css" 
          :theme="globalStore.darkFlag ? 'darcula' : 'idea'"
          :readonly="false" 
          @change="dataChangeHandler"
        />
      </el-col>

      <el-col :span="12">
        <div class="label">
          <div>压缩格式Css输出</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyUnFormatterCssDataHandler">复制</el-button>
            <el-button size="small" icon="Download" @click="downloadCssFile">导出文件</el-button>
          </div>
        </div>
        <CodeMirror 
          ref="unFormatterCssCodeMirror"
          :code="outputCssData"
          mode="css"
          :theme="globalStore.darkFlag ? 'darcula' : 'idea'"
          :readonly="true"
          :refreshRealTime="true" 
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { minify } from 'csso';
import * as cssbeautify from 'cssbeautify'
import CodeMirror from '@/components/Vue3CodeMirror.vue'
import placeholderJsonData from '@/assets/json/placeholderJsonData.json'
import { useGlobalStore } from '@/store/GlobalStore.js'

export default {
  name: 'CssMinifier',

  components: {
    CodeMirror,
  },

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      inputCssData: '',
      parseError: false,
    }
  },

  methods: {
    formatInputCssDataHandler() {
      this.inputCssData = cssbeautify(this.inputCssData)
      this.$refs.cssCodeMirror.setValue(this.inputCssData)
    },

    copyInputCssDataHandler() {
      window.electronAPI.copy(this.inputCssData)
      this.$message.success({
        showClose: true,
        message: '复制成功',
      })
    },

    copyUnFormatterCssDataHandler() {
      window.electronAPI.copy(this.outputCssData)
      this.$message.success({
        showClose: true,
        message: '复制成功',
      })
    },

    dataChangeHandler(data) {
      if (typeof data === 'string') {
        this.inputCssData = data
      }
    },

    uploadCssFile() {
      let cssDataPromise = window.electronAPI.uploadCssFile()
      cssDataPromise.then(res => {
        let uploadResult = JSON.parse(res)
        if (uploadResult.hasRead) {
          this.inputCssData = uploadResult.cssData
        }
        this.$refs.cssCodeMirror.setValue(this.inputCssData)
      }).catch(err => {
        console.log(err)
      })
    },

    downloadCssFile() {
      let data = {
        suffix: 'css',
        data: this.outputCssData
      }
      window.electronAPI.downloadFile(JSON.stringify(data))
      this.$message.success({
        message: '文件已下载至桌面',
        showClose: true
      })
    },
  },

  computed: {
    outputCssData() {
      if (typeof this.inputCssData === 'string') {
        try {
          let unFormatter = minify(this.inputCssData)
          return unFormatter.css
        } catch (e) {
          console.error(e)
          this.parseError = true
          return this.outputCssData
        }
      }
      this.parseError = true
      return this.outputCssData
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
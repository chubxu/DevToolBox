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

<script setup>
import { minify } from 'csso';
import * as cssbeautify from 'cssbeautify'
import CodeMirror from '@/components/Vue3CodeMirror.vue'
import { useGlobalStore } from '@/store/GlobalStore.js'
import { ElMessage } from 'element-plus'

import { ref, computed, onMounted, defineExpose } from 'vue'

const globalStore = useGlobalStore()
const inputCssData = ref('')
const parseError = ref(false)
const cssCodeMirror = ref(null)
const unFormatterCssCodeMirror = ref(null)

const formatInputCssDataHandler = () => {
  inputCssData.value = cssbeautify(inputCssData.value)
  cssCodeMirror.value.setValue(inputCssData.value)
}

const copyInputCssDataHandler = () => {
  window.electronAPI.copy(inputCssData.value)
  ElMessage({
    showClose: true,
    message: '复制成功',
    type: 'success',
  })
}

const copyUnFormatterCssDataHandler = () => {
  window.electronAPI.copy(outputCssData.value)
  ElMessage({
    showClose: true,
    message: '复制成功',
    type: 'success',
  })
}

const dataChangeHandler = (data) => {
  if (typeof data === 'string') {
    inputCssData.value = data
  }
}

const uploadCssFile = () => {
  let cssDataPromise = window.electronAPI.uploadCssFile()
  cssDataPromise.then(res => {
    let uploadResult = JSON.parse(res)
    if (uploadResult.hasRead) {
      inputCssData.value = uploadResult.cssData
    }
    cssCodeMirror.value.setValue(inputCssData.value)
  }).catch(err => {
    console.log(err)
  })
}

const downloadCssFile = () => {
  let data = {
    suffix: 'css',
    data: outputCssData.value
  }
  window.electronAPI.downloadFile(JSON.stringify(data))
  ElMessage({
    message: '文件已下载至桌面',
    showClose: true,
    type: 'success',
  })
}

const outputCssData = computed(() => {
  if (typeof inputCssData.value === 'string') {
    try {
      let unFormatter = minify(inputCssData.value)
      return unFormatter.css
    } catch (e) {
      console.error(e)
      parseError.value = true
      return outputCssData.value
    }
  }
  parseError.value = true
  return outputCssData.value
})
</script>

<style lang="less" scroped>
@import url('../../style/less/Common.less');
</style>
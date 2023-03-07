<template>
  <div>
    <!-- title -->
    <el-row class="title">
      Unicode
    </el-row>

    <!-- text -->
    <el-row>
      <el-col :span="24">
        <el-row class="label">
          Unicode Text
        </el-row>
        <el-row>
          <el-input v-model="text" :rows="10"
                    resize="none" type="textarea" placeholder="Please input"/>
        </el-row>
      </el-col>
    </el-row>

    <!-- unicode -->
    <el-row style="margin-top: 36px">
      <el-col :span="24">
        <el-row class="label">
          <div>
            text-digest
          </div>
          <div>
            <el-button :icon="CopyDocument" @click="copyUnicodeTextDigest" size="small" style="margin-top: -6px">
              &nbsp;Copy
            </el-button>
          </div>
        </el-row>
        <el-row>
          <el-input v-model="unicodeText" readonly :rows="10" resize="none" type="textarea"/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { CopyDocument, } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
const text = ref('')
const unicodeText = ref('')

const copyUnicodeTextDigest = () => {
  window.electronAPI.copy(unicodeText.value)
  this.$message.success({
    showClose: true,
    message: '复制成功',
  })
}

const parseToChinese = (unicode) => {
  if (unicode == '') {
    return '';
  }
  unicode = unicode.split('\\u');
  let chinese = '';
  for (let i = 1, len = unicode.length; i < len; i++) {
    chinese += String.fromCharCode(parseInt(unicode[i], 16));
  }
  return chinese;
}

watch(text, (newText, oldText) => {
  if (newText) {
    unicodeText.value = parseToChinese(newText)
  } else {
    unicodeText.value = ''
  }
})
</script>

<style scoped>
@import url('../../style/less/Common.less');
</style>
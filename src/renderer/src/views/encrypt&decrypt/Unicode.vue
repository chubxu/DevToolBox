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
            <el-button @click="copyUnicodeTextDigest" size="small" style="margin-top: -6px">
              <el-icon :size="14"><IconCopyDocument /></el-icon> &nbsp;Copy
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

<script>
import {
  CopyDocument as IconCopyDocument,
} from '@element-plus/icons-vue'
export default {
  name: "Unicode",

  components: {
    IconCopyDocument,
  },

  data() {
    return {
      text: '',
      unicodeText: '',
    }
  },

  methods: {
    copyUnicodeTextDigest() {
      window.electronAPI.copy(this.unicodeText)
      this.$message.success({
        showClose: true,
        message: '复制成功',
      })
    },

    parseToChinese(unicode) {
      if (unicode == '') {
        return '';
      }
      unicode = unicode.split('\\u');
      console.log(unicode)
      let chinese = '';
      for (let i = 1, len = unicode.length; i < len; i++) {
        chinese += String.fromCharCode(parseInt(unicode[i], 16));
      }
      return chinese;
    }
  },

  watch: {
    text(newText) {
      if (newText) {
        console.log(newText)
        this.unicodeText = this.parseToChinese(newText)
      } else {
        this.unicodeText = ''
      }
    }
  }
}
</script>

<style scoped>
@import url('../../style/less/Common.less');
</style>
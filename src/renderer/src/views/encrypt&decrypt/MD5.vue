<template>
  <div>
    <!-- title -->
    <el-row class="title">
      MD5
    </el-row>

    <!-- text -->
    <el-row>
      <el-col :span="24">
        <el-row class="label">
          text
        </el-row>
        <el-row>
          <el-input v-model="text" :rows="10"
                    resize="none" type="textarea" placeholder="Please input"/>
        </el-row>
      </el-col>
    </el-row>

    <!-- md5 -->
    <el-row style="margin-top: 36px">
      <el-col :span="24">
        <el-row class="label">
          <div>
            text-digest
          </div>
          <div>
            <el-button @click="copyMd5TextDigest" size="small" style="margin-top: -6px">
              <el-icon :size="14"><IconCopyDocument /></el-icon> &nbsp;Copy
            </el-button>
          </div>
        </el-row>
        <el-row>
          <el-input v-model="md5Text" readonly/>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  CopyDocument as IconCopyDocument,
} from '@element-plus/icons-vue'
import md5 from 'md5'
export default {
  name: "MD5",

  components: {
    IconCopyDocument,
  },

  data() {
    return {
      text: '',
      md5Text: '',
    }
  },

  methods: {
    copyMd5TextDigest() {
      window.electronAPI.copy(this.md5Text)
      this.$message.success({
        showClose: true,
        message: 'Copy Success',
      })
    }
  },

  watch: {
    text(newText) {
      if (newText) {
        this.md5Text = md5(newText)
      } else {
        this.md5Text = ''
      }
    }
  }
}
</script>

<style scoped>
.title {
  font-size: var(--el-font-size-extra-large); 
  font-weight: bold;
  margin-bottom: 24px;
}

.label {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: var(--el-font-size-base);
  margin: -6px 0 5px 0;
}
</style>
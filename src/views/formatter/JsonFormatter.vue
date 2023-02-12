<template>
  <div>
    <el-row class="title">
      JsonFormatter
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-row class="label">
          Input
        </el-row>
        <el-row>
          <el-input v-model="inputData" :rows="22"
                    resize="none" type="textarea" placeholder="Please input"/>
        </el-row>
      </el-col>

      <el-col :span="17">
        <el-row class="label">
          <el-col :span="1">Output</el-col>
          <el-col :span="2" :offset="20">
            <el-button @click="copyJson" size="small" style="margin-top: -6px">
              <el-icon :size="14"><IconCopyDocument /></el-icon> &nbsp;Copy
            </el-button>
          </el-col>
        </el-row>

        <div class="vue-json-pretty">
          <el-scrollbar>
            <vue-json-pretty :data="inputJsonData" :show-line-number="true" :show-icon="true" />
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {
  CopyDocument as IconCopyDocument,
} from '@element-plus/icons-vue'
export default {
  components: {
    VueJsonPretty,
    IconCopyDocument,
  },

  data() {
    return {
      inputData: '',
    }
  },

  methods: {
    copyJson() {
      window.electronAPI.copyJson(this.inputData)
      this.$message.success({
        showClose: true,
        message: 'Copy Success',
      })
    }
  },

  computed: {
    inputJsonData() {
      if (typeof this.inputData === 'string') {
        try {
          let obj = JSON.parse(this.inputData)
          if (typeof obj == 'object' && obj) {
            return obj;
          } else {
            return '不符合json格式';
          }
        } catch (e) {
          return '不符合json格式';
        }
      }
      return '不符合json格式';
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
  font-size: var(--el-font-size-base);
  margin-bottom: 5px;
}
.vue-json-pretty {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 470px;
  overflow-y: auto;
}

</style>
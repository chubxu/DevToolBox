<template>
  <div>
    <el-row class="title">
      JsonFormatter
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7">
        <el-row style="margin-bottom: 5px">
          Input
        </el-row>
        <el-row>
          <el-input v-model="inputData" :rows="31"
                    resize="none" type="textarea" placeholder="Please input"/>
        </el-row>
      </el-col>

      <el-col :span="17">
        <div class="label">
          <div>Output</div>
          <div>
            <el-button @click="copyJson" size="small">
              <el-icon :size="14"><IconCopyDocument /></el-icon> &nbsp;Copy
            </el-button>
          </div>
        </div>

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
      window.electronAPI.copy(this.inputData)
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: var(--el-font-size-base);
  margin: -6px 0 5px 0;
}
.vue-json-pretty {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 659px;
  overflow-y: auto;
}

</style>
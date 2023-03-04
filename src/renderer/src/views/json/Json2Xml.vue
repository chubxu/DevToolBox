<template>
  <div>
    <el-row class="title">
      Json &lt;&gt; Xml
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="label">
          <div>Json输入</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyJsonDataHandler">复制</el-button>
            <el-button size="small" icon="FullScreen" @click="formatInputJsonDataHandler">格式化</el-button>
            <el-button size="small" icon="Upload">选择文件</el-button>
          </div>
        </div>
        <CodeMirror 
          :code="inputJsonData"
          :mode="javascript" 
          :readonly="false" 
          @change="dataChangeHandler"
        />
      </el-col>

      <el-col :span="12">
        <div class="label">
          <div>Xml输出</div>
          <div>
            <el-button size="small" icon="CopyDocument" @click="copyXmlDataHandler">复制</el-button>
            <el-button size="small" icon="Download">导出文件</el-button>
          </div>
        </div>
        <CodeMirror 
          :code="outputXmlData"
          :mode="xml" 
          :readonly="true" 
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
const convert = require('xml-js')
import CodeMirror from '@/components/Vue3CodeMirror.vue'
import placeholderJsonData from '@/assets/json/placeholderJsonData.json'
export default {
  name: '',

  components: {
    CodeMirror,
  },

  data() {
    return {
      inputJsonData: '',
    }
  },

  methods: {
    formatInputJsonDataHandler() {
      this.inputJsonData = JSON.stringify(JSON.parse(this.inputJsonData), null, 2)
    },

    copyJsonDataHandler() {
      window.electronAPI.copy(this.inputJsonData)
      this.$message.success({
        showClose: true,
        message: 'Copy Success',
      })
    },

    copyXmlDataHandler() {
      window.electronAPI.copy(this.outputXmlData)
      this.$message.success({
        showClose: true,
        message: 'Copy Success',
      })
    },

    dataChangeHandler(data) {
      this.inputJsonData = data
    }
  },

  computed: {
    outputXmlData() {
      if (typeof this.inputJsonData === 'string') {
        try {
          let obj = JSON.parse(this.inputJsonData)
          if (typeof obj == 'object' && obj) {
            return convert.js2xml(obj, {compact: true, ignoreComment: true, spaces: 4})
          } else {
            return '不符合json格式';
          }
        } catch (e) {
          return '不符合json格式';
        }
      }
      return '不符合json格式';
    }
  },

  created() {
    this.inputJsonData = JSON.stringify(placeholderJsonData, null, 2)
  },
}
</script>

<style lang="less" scroped>
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
  font-weight: 600;
  margin: -6px 0 5px 0;
}
</style>
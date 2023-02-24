<template>
  <div>
    <el-row class="title">
      Json压缩
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-row class="label">
          输入
        </el-row>
        <el-row>
          <el-input v-model="inputData" :rows="30"
                    resize="none" type="textarea" placeholder="Please input"/>
        </el-row>
      </el-col>

      <el-col :span="12">
        <el-row class="label">
          输出
        </el-row>
        <el-input v-model="inputJsonCompressionData" :rows="30"
                    resize="none" type="textarea" readonly/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'JsonCompression',

  data() {
    return {
      inputData: '',

    }
  },

  created() {

  },

  computed: {
    inputJsonCompressionData() {
      if (typeof this.inputData === 'string') {
        try {
          let obj = JSON.parse(this.inputData)
          if (typeof obj == 'object' && obj) {
            return JSON.stringify(obj);
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
</style>
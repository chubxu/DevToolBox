<template>
  <div>
    <el-row class="title">
      JsonFormatter
    </el-row>
    <el-row :gutter="20">
      <el-col :span="7">
        <span class="input">
          Input
        </span>
        <div>
          <el-input v-model="inputData" :rows="22" resize="none" type="textarea" placeholder="Please input"/>
        </div>
      </el-col>
      <el-col :span="17">
        <div>
          Output
        </div>
        <div class="vue-json-pretty">
          <vue-json-pretty :data="inputJsonData" :show-line-number="true" :show-icon="true" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  components: {
    VueJsonPretty,
  },

  data() {
    return {
      inputData: '',
    }
  },

  methods: {
  },

  computed: {
    inputJsonData() {
      console.log(this.inputData)
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
  margin-bottom: 30px;
}
.input {
  font-size: var(--el-font-size-base); 
}
.vue-json-pretty {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  height: 470px;
  overflow-y: auto;
}

</style>
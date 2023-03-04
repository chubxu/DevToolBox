<template>
  <!-- title -->
  <el-row class="title">
    JSON &lt;&gt; YAML
  </el-row>

  <el-row :gutter="5">
    <el-col :span="10">
      <div class="title-3">
        JSON
      </div>
      <el-input
        v-model="jsonText"
        :rows="31"
        resize="none"
        type="textarea"
        placeholder="Please input json"
      />
    </el-col>

    <el-col :span="4" class="transform-button-col">
      <div>
        <el-button color="#626aef" @click="json2yamlHandler">
          &nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;
        </el-button>
      </div>
      <br/>
      <div>
        <el-button color="#626aef" @click="yaml2jsonHandler">
          &nbsp;&nbsp;&nbsp;&lt;&nbsp;&nbsp;&nbsp;
        </el-button>
      </div>
    </el-col>

    <el-col :span="10">
      <div class="title-3">
        YAML
      </div>
      <el-input
        v-model="yamlText"
        :rows="31"
        resize="none"
        type="textarea"
        placeholder="Please input yaml"
      />
    </el-col>
  </el-row>
</template>

<script>
import yaml from 'yaml'
import jsYaml from 'js-yaml'
export default {
  name: 'Json2Yaml',

  data() {
    return {
      jsonText: '',
      yamlText: '',
    }
  },

  methods: {
    json2yamlHandler() {
      try {
        this.yamlText = jsYaml.dump(JSON.parse(this.jsonText))
      } catch (err) {
        this.yamlText = '请输入正确的json格式数据...'
      }
    },

    yaml2jsonHandler() {
      try {
        this.jsonText = JSON.stringify(yaml.parse(this.yamlText), null, 2)
      } catch (err) {
        this.jsonText = '请输入正确的yaml格式数据...'
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

.title-3 {
  font-size: var(--el-font-size-medium); 
  font-weight: bold;
  margin-bottom: 6px;
  text-align: left;
}

.transform-button-col {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.transform-button {
  width: 40px;
}
</style>
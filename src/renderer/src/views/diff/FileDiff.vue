<template>
  <div>
    <el-row class="title">
      FileDiff
    </el-row>

    <el-row class="row-class">
      Language: &nbsp;
      <el-col :span="6">
        <el-select v-model="language">
          <el-option
            v-for="item in languageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row class="title-2">
      Editor
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="title-3">
          prev
        </div>
        <el-input
          v-model="prev"
          :rows="7"
          resize="none"
          type="textarea"
          placeholder="Please input"
        />
      </el-col>
      <el-col :span="12">
        <div class="title-3">
          current
        </div>
        <el-input
          v-model="current"
          :rows="7"
          resize="none"
          type="textarea"
          placeholder="Please input"
        />
      </el-col>
    </el-row>

    <el-row class="title-2">
      Diff Result
    </el-row>

    <el-row>
      <Diff :mode="mode" :theme="theme" :language="language" :prev="prev" :current="current"/>
    </el-row>
  </div>
</template>

<script>
import { useGlobalStore } from '@/store/GlobalStore.js'
export default {
  name: 'FileDiff',

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      languageOptions: [
        { label: 'json', value: 'json' },
        { label: 'plaintext', value: 'plaintext' },
        { label: 'javascript', value: 'javascript' },
        { label: 'typescript', value: 'typescript' },
        { label: 'css', value: 'css' },
        { label: 'markdown', value: 'markdown' },
      ],

      mode: 'split',
      // theme: 'dark',
      language: 'json',
      prev: '',
      current: '',
    }
  },

  computed: {
    theme() {
      if (this.globalStore.darkFlag) {
        return 'dark'
      } else {
        return 'light'
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

.title-2 {
  font-size: var(--el-font-size-large); 
  font-weight: bold;
  margin: 36px 0 6px 0;
}

.title-3 {
  font-size: var(--el-font-size-medium); 
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
}

.row-class {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
</style>
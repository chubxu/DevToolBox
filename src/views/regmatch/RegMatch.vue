<template>
  <div>
    <!-- title -->
    <el-row class="title">
      RegMatch
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Input</span>
            </div>
          </template>
          <el-row style="margin-bottom: 10px; font-weight: 600;">
            Search words
          </el-row>
          <el-row>
            <el-input />
          </el-row>
          <el-row style="margin: 30px 0 0 0; font-weight: 600;">
            Options
          </el-row>
          <el-row>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="Split by space" />
              <el-checkbox label="Case sensitive" />
              <el-checkbox label="Diacritics sensitive" />
            </el-checkbox-group>
          </el-row>
          <el-row style="margin: 30px 0 10px 0; font-weight: 600;">
            Search target text
          </el-row>
          <el-row>
            <el-input
              v-model="searchTargetText"
              :rows="17"
              type="textarea"
              resize="none"
              placeholder="Please input"
            />
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>Output</span>
            </div>
          </template>
          <el-row style="margin-bottom: 10px; font-weight: 600;">
            Search words
          </el-row>
          <el-row>
            <span v-for="(word, index) in splitSearchWords" :key="index" class="split-search-word">
              {{ word }}
            </span>
          </el-row>

          <el-row style="margin: 30px 0 10px 0; font-weight: 600;">
            Matched word count
          </el-row>
          <el-row style="font-weight: 600;">
            {{ matchedWordCount }}
          </el-row>

          <el-row style="margin: 30px 0 10px 0; font-weight: 600;">
            Result
          </el-row>
          <el-row>
            <div class="result">
              {{ result }}
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'RegMatch',

  data() {
    return {
      checkList: [],
      searchTargetText: '',

      splitSearchWords: ['Latin', 'literature'],
      matchedWordCount: 0,
      result: '',
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

.split-search-word {
  padding: 7px 10px 7px 10px;
  margin-right: 10px;
  color: white;
  background-color: #409eff;
  border-radius: 5px;
}

.result {
  padding: 10px 15px 10px 15px;

  background-color: #ecf5ff;
  text-align: left;
}
</style>

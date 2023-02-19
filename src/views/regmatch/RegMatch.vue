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
            <el-input v-model="sarchWord" @input="searchWordInputHandler"/>
          </el-row>
          <el-row style="margin: 30px 0 0 0; font-weight: 600;">
            Options
          </el-row>
          <el-row>
            <el-checkbox-group v-model="checkList" >
              <el-checkbox label="Split by space" @change="splitBySpaceHandler"/>
              <el-checkbox label="Case sensitive" @change="caseSensitiveHandler"/>
              <el-checkbox label="Diacritics sensitive" @change="diacriticsSensitiveHandler"/>
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
          <el-row v-if="splitSearchWords">
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
              <WordHighlighter 
                :query="sarchWord"
                :caseSensitive="caseSensitive"
                :diacriticsSensitive="diacriticsSensitive"
                :splitBySpace="splitBySpace"
                @matches="matches"
              >
                {{ searchTargetText }}
              </WordHighlighter>
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WordHighlighter from "vue-word-highlighter";
export default {
  name: 'RegMatch',

  components: {
    WordHighlighter
  },

  data() {
    return {
      sarchWord: '',
      checkList: [],
      searchTargetText: 'The word highlighter library for Vue 2.x Vue 3.x 💅',
      splitBySpace: false,
      caseSensitive: false,
      diacriticsSensitive: false,

      splitSearchWords: [],
      matchedWordCount: 0,
      result: 'aaaa',
    }
  },

  methods: {
    searchWordInputHandler() {
      this.splitSearchWords = []
      if (this.splitBySpace) {
        if (this.sarchWord) {
          this.splitSearchWords = this.sarchWord.split(' ')
        }
      } else {
        if (this.sarchWord) {
          this.splitSearchWords.push(this.sarchWord)
        }
      }
    },

    splitBySpaceHandler(val) {
      if (val || val === 'true') {
        this.splitBySpace = true
      } else {
        this.splitBySpace = false
      }
      this.searchWordInputHandler()
    },

    caseSensitiveHandler(val) {
      if (val || val === 'true') {
        this.caseSensitive = true
      } else {
        this.caseSensitive = false
      }
    },

    diacriticsSensitiveHandler(val) {
      if (val || val === 'true') {
        this.diacriticsSensitive = true
      } else {
        this.diacriticsSensitive = false
      }
    },

    matches(e) {
      if (e) {
        this.matchedWordCount = e.length 
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

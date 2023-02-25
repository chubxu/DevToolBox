<template>
  <div class="global-search" v-if="options">
    <el-input size="small"  v-model="searchFilter" :placeholder="placeholder" 
              @focus="globalSearchFocusHandler" @blur="globalSearchBlurHandler" @change="globalSearchChangeHandler">
      <template #prefix>
        <el-icon><icon-search /></el-icon>
      </template>
      <template #suffix>
        <el-tag type="info" class="global-search-input-tag">Ctrl</el-tag>
        <span>+</span>
        <el-tag type="info" class="global-search-input-tag">K</el-tag>
      </template>
    </el-input>

    <el-card class="filtered-option-card" v-show="isOptionsShown">
      <div class="text item" @mousedown="selectOption(option)" v-for="(filteredOption, index) in filteredOptions" :key="index">
        {{ filteredOption.name || filteredOption.id || '-' }}
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  Search as IconSearch,
} from '@element-plus/icons-vue'
export default {
  name: 'GlobalSearch',

  components: {
    IconSearch,
  },

  props: {
    options: {
      type: Array,
      required: false,
      default: [],
    },

    placeholder: {
      type: String,
      required: false,
      default: '输入关键字搜索工具...',
    },

    maxShownCount: {
      type: Number,
      required: false,
      default: 10,
    }
  },

  data() {
    return {
      searchFilter: '',
      isOptionsShown: false,
    }
  },

  methods: {
    globalSearchFocusHandler() {
      this.isOptionsShown = true
    },

    globalSearchBlurHandler() {
      this.isOptionsShown = false;
    },

    globalSearchChangeHandler() {
      if(this.filteredOptions[0]) {
        this.selectOption(this.filteredOptions[0])
      }
    },

    selectOption(option) {
      console.log('aaaa', option)
    }
  },

  computed: {
    filteredOptions() {
      let filtered = []
      const regOption = new RegExp(this.searchFilter, 'ig')
      for (let option of this.options) {
        if (this.searchFilter.length < 1 || option.name.match(regOption)){
          if (filtered.length < this.maxShownCount) {
            filtered.push(option)
          }
        }
      }
      return filtered
    }
  }
}
</script>

<style lang="less" scoped>

.global-search {
  margin: 7px auto 12px auto;
  width: 25% !important;
}

.global-search-input-tag {
  height: 16px !important;
  margin: 0 5px;
}

.filtered-option-card {
    position: fixed;
    margin-top: 12px;

    width: 309px;
    z-index: 999;
  }

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

</style>
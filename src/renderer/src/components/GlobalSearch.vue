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
      <el-button class="filtered-option-card-button" 
                 v-for="(filteredOption, index) in filteredOptions" :key="index" 
                 @click="filteredOptionSelectedHandler"
                 text>
        <template #icon>
          <el-icon :size="14">
            <component :is="filteredOption.icon"></component>
          </el-icon>
        </template>
        <template #default>{{ filteredOption.name || filteredOption.id || '-' }}</template>
      </el-button>
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
        this.filteredOptionSelectedHandler(this.filteredOptions[0])
      }
    },

    filteredOptionSelectedHandler() {
      console.log('aaa')
      this.$router.push({
        name: option.name
      })
    },
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
  z-index: 10;

  .filtered-option-card-button {
    width: 100%;
    margin: auto;

    text-align: left !important;
  }
}

</style>
<template>
  <div>
    <el-container class="container">
      <el-aside class="side-bar">
        <!-- 搜索框 -->
        <el-row class="search-input" :gutter="10">
          <el-col :span="19"> 
            <el-input placeholder="Type to Search Tools">
              <template #suffix>
                <el-icon><icon-search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-switch 
              v-model="isDarkFlag" 
              inline-prompt 
              active-icon="Moon" 
              inactive-icon="Sunny" 
              active-color="#2c2c2c"
              inactive-color="#d0d0d0"
              @change="toggleDarkHandler"/>
          </el-col>
        </el-row>
        <el-divider style="margin: 0"/>

        <!-- all tools button -->
        <el-row>
          <el-button @click="toAllToolsPage" text style="height: 40px; width: 250px; justify-content: left;">
            <template #icon>
              <el-icon><icon-home-filled /></el-icon>
            </template>
            <span style="margin-left:5px">
              All Tools
            </span>
          </el-button>
        </el-row>

        <!-- side bar menu -->
        <el-menu :router="true">
          <el-sub-menu v-for="menu in sideBarMenus" :index="menu.index" :key="menu.index">
            <template #title>
              <el-icon :size="14">
                <component :is="menu.icon"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item v-for="child in menu.children" :index="child.index" :key="child.index">
              <el-icon :size="14">
                <component :is="child.icon"></component>
              </el-icon>
              <span>{{ child.name }}</span>
              <el-badge v-if="child.badgeName" :value="child.badgeName" style="margin-bottom: 30px; margin-left: 10px" type="warning">
              </el-badge>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>

      </el-aside>


      <el-main class="main-window">
        <el-input placeholder="Type to Search Tools" size="small">
          <template #suffix>
            <el-icon><icon-search /></el-icon>
          </template>
        </el-input>
        <el-card shadow="never" class="main-window-card">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  Refresh as IconRefresh,
  Menu as IconMenu,
  Search as IconSearch,
  HomeFilled as IconHomeFilled,
  Sunny as IconSunny,
} from '@element-plus/icons-vue'
import { menu } from './constants'
import { useDark, useToggle } from '@vueuse/core'
import { useGlobalStore } from '@/store/GlobalStore.js'

const isDark = useDark()

export default {
  name: 'App',
  components: {
    IconMenu,
    IconRefresh,
    IconSearch,
    IconHomeFilled,
    IconSunny
  },

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      sideBarMenus: [],
      isDarkFlag: false
    }
  },

  methods: {
    toAllToolsPage() {
      this.$router.push({
        name: 'AllTools',
        path: '/', 
      })
    },

    toggleDarkHandler() {
      // 设置element plus页面为黑暗模式
      this.globalStore.darkFlag = !this.globalStore.darkFlag
      const toggleDark = useToggle(isDark)
      toggleDark()

      // 设置 electron 为黑暗模式
      window.electronAPI.toggle()
    }
  },

  created() {
    this.sideBarMenus = menu.sideBarMenus
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 40px; */
}
/* 整个滚动条宽高 */
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
/* 滚动条滑块设置 */
::-webkit-scrollbar-thumb {
  background-color: rgba(144, 145, 148,.2);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144, 145, 148,.4);
  border-radius: 3px;
}

.container {
  height: 98vh !important;
}

.side-bar {
  width: 250px !important;
  overflow-x: hidden !important;
}

.el-menu {
  border-right: 0 !important;
}

.search-input {
  margin-bottom: 10px;
}

.el-sub-menu__title {
  padding-left: 10px !important;
  height: 40px !important;
}

.main-window {
  padding: 0 0px 0px 20px !important;
}

.main-window-card {
  height: 99%;
  overflow-y: scroll !important;
}

.el-dialog__header {
  text-align: left !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: larger;
}
</style>

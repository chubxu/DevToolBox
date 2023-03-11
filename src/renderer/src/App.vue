<template>
  <div>
    <TitleBar />

    <el-container class="container">
      <el-aside :style="isCollapse ? sideBarCollapseStyle : sideBarStyle">
        <!-- all tools button -->
        <el-button @click="toAllToolsPage" text :style="isCollapse ? allToolsButtonCollapseStyle : allToolsButtonStyle">
          <template #icon>
            <el-icon><icon-home-filled /></el-icon>
          </template>
          <span style="margin-left:5px">
            {{ isCollapse ? '' : 'All Tools' }}
          </span>
        </el-button>
        <el-divider style="margin: 0"/>

        <!-- side bar menu -->
        <div style="height: 89%; overflow-y: scroll; overflow-x: hidden;">
          <el-menu class="el-menu-vertical" :router="true" :collapse="isCollapse" :collapse-transition="false">
            <el-sub-menu v-for="menu in sideBarMenus" :index="menu.index" :key="menu.index">
              <template #title>
                <el-icon :size="14" v-if="menu.thirdIcon">
                  <img src="./public/icon/github-icon.svg" />
                </el-icon>
                <el-icon :size="14" v-else>
                  <component :is="menu.icon"></component>
                </el-icon>
                <span>{{ menu.name }}</span>
              </template>
              <el-menu-item v-for="child in menu.children" :index="child.index" :key="child.index">
                <el-icon :size="14" v-if="menu.thirdIcon">
                  <img src="./public/icon/github-icon.svg" />
                </el-icon>
                <el-icon :size="14" v-else>
                  <component :is="child.icon"></component>
                </el-icon>
                <span>{{ child.title }}</span>
                <el-badge v-if="child.badgeName" :value="child.badgeName" style="margin-bottom: 30px; margin-left: 10px" type="warning">
                </el-badge>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
        

        <!-- collapse button-->
        <el-divider style="margin: 0"/>
        <el-row>
          <el-button @click="collapse" text :style="isCollapse ? collapseButtonCollapseStyle : collapseButtonStyle">
            <template #icon>
              <el-icon v-if="isCollapse"><icon-expand /></el-icon>
              <el-icon v-else><icon-fold /></el-icon>
            </template>
          </el-button>
        </el-row>
        <el-divider style="margin: 0"/>
      </el-aside>


      <el-main class="main-window">
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
  Fold as IconFold,
  Expand as IconExpand,
} from '@element-plus/icons-vue'
import { menu } from './constants'
import { useGlobalStore } from '@/store/GlobalStore.js'
import GlobalSearch from '@/components/GlobalSearch.vue'
import TitleBar from '@/components/TitleBar.vue'

export default {
  name: 'App',
  components: {
    IconMenu,
    IconRefresh,
    IconSearch,
    IconHomeFilled,
    IconSunny,
    IconFold,
    IconExpand,
    GlobalSearch,
    TitleBar,
  },

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      sideBarMenus: [],
      childrenMenus: [],
      isDarkFlag: false,

      isCollapse: false,
      sideBarStyle: {
        'width': '250px !important',
        'overflow-x': 'hidden !important'
      },
      sideBarCollapseStyle: {
        'width': '64px !important',
        'overflow-x': 'hidden !important'
      },
      allToolsButtonStyle: {
        'height': '40px', 
        'width': '250px',
        'justify-content': 'left'
      },
      allToolsButtonCollapseStyle: {
        'height': '40px', 
        'width': '64px',
        'justify-content': 'left'
      },
      collapseButtonStyle: {
        'height': '40px', 
        'width': '250px',
        'justify-content': 'center'

      },
      collapseButtonCollapseStyle: {
        'height': '40px', 
        'width': '64px',
        'justify-content': 'left'
      }
    }
  },

  methods: {
    toAllToolsPage() {
      this.$router.push({
        name: 'AllTools',
        path: '/', 
      })
    },

    getAssets(url) {
      return new URL(url, import.meta.url).href;
    },

    collapse() {
      this.isCollapse = !this.isCollapse
    }
  },

  created() {
    this.sideBarMenus = menu.sideBarMenus,
    this.sideBarMenus.forEach(sideBarMenu => {
      this.childrenMenus.push(...sideBarMenu.children)
    })
  },
}
</script>

<style lang="less">

@import url("./style/less/CodeMirror.less");

body {
  margin: 0;
}

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
  padding-top: 32px;
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
  margin: 5px 0 5px 0;
  text-align: left;
}

.el-sub-menu__title {
  padding-left: 10px !important;
  height: 40px !important;
}

.main-window {
  padding: 0 !important;
}

.main-window-card {
  height: 99.5%;
  overflow-y: scroll !important;
  border-radius: 0 !important;
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

.global-search-input {
  margin: 7px 0 12px 0;
  width: 25% !important;
}

.global-search-input-tag {
  height: 16px !important;
  margin: 0 5px;
}
</style>

<template>
  <header class="title-bar">
    <!-- logo -->
    <div class="window-title">
      <el-image style="width: 125px; height: 28px" :src="globalStore.darkFlag ? getAssets('../assets/images/logo-dark.png') : getAssets('../assets/images/logo.png')" />
    </div>

    <!-- global search -->
    <div class="window-search">
      <GlobalSearch ref="globalSearch" :options="childrenMenus" />
    </div>

    <!-- dark switch -->
    <div class="window-toggle">
      <el-switch 
        size="small"
        v-model="isDarkFlag" 
        inline-prompt 
        active-icon="Moon" 
        inactive-icon="Sunny" 
        active-color="#2c2c2c"
        inactive-color="#d0d0d0"
        @change="toggleDarkHandler"/>
    </div>

    <!-- control button -->
    <div class="window-control">
      <div class="button" @click="minimizeHandler">
        <svg t="1677394985732" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3745" width="12" height="12"><path d="M928.2 548h-832c-17.7 0-32-14.3-32-32s14.3-32 32-32h832c17.7 0 32 14.3 32 32s-14.3 32-32 32z" :fill="globalStore.darkFlag ? '#E5EAF3' : ''" p-id="3746"></path></svg>
      </div>
      <div class="button" @click="unmaximizeHandler" v-if="isMaximized">
        <svg t="1677392218841" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3505" width="12" height="12"><path d="M959.72 0H294.216a63.96 63.96 0 0 0-63.96 63.96v127.92H64.28A63.96 63.96 0 0 0 0.32 255.84V959.4a63.96 63.96 0 0 0 63.96 63.96h703.56a63.96 63.96 0 0 0 63.96-63.96V792.465h127.92a63.96 63.96 0 0 0 63.96-63.96V63.96A63.96 63.96 0 0 0 959.72 0zM767.84 728.505V959.4H64.28V255.84h703.56z m189.322 0H831.8V255.84a63.96 63.96 0 0 0-63.96-63.96H294.216V63.96H959.72z" :fill="globalStore.darkFlag ? '#E5EAF3' : ''" p-id="3506"></path></svg>
      </div>
      <div class="button" @click="maximizeHandler" v-else>
        <svg t="1677411514451" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2834" width="12" height="12"><path d="M812.3 959.4H213.7c-81.6 0-148-66.4-148-148V212.9c0-81.6 66.4-148 148-148h598.5c81.6 0 148 66.4 148 148v598.5C960.3 893 893.9 959.4 812.3 959.4zM213.7 120.9c-50.7 0-92 41.3-92 92v598.5c0 50.7 41.3 92 92 92h598.5c50.7 0 92-41.3 92-92V212.9c0-50.7-41.3-92-92-92H213.7z" :fill="globalStore.darkFlag ? '#E5EAF3' : ''" p-id="2835"></path></svg>
      </div>
      <div class="button close-button" @click="closeHandler">
        <svg t="1677392553922" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2170" width="12" height="12"><path d="M952.311261 921.328619 542.892591 510.919389 950.154131 102.671381c8.53028-8.55177 8.53028-22.416546 0-30.967292-8.532327-8.55177-22.360264-8.55177-30.892591 0l-407.262564 408.248008L104.737436 71.704089c-8.53028-8.55177-22.36231-8.55177-30.892591 0-8.529257 8.55177-8.529257 22.416546 0 30.967292l407.262564 408.248008L71.687716 921.328619c-8.529257 8.55177-8.529257 22.416546 0 30.967292 4.26514 4.27435 9.856485 6.41306 15.446807 6.41306 5.590322 0 11.181667-2.13871 15.446807-6.41306l409.41867-410.409231 409.41867 410.409231c4.266164 4.27435 9.855462 6.41306 15.446807 6.41306 5.591345 0 11.17962-2.13871 15.446807-6.41306C960.841541 943.745165 960.841541 929.879366 952.311261 921.328619z" :fill="globalStore.darkFlag ? '#E5EAF3' : ''" p-id="2171"></path></svg>
      </div>
    </div>
  </header>
</template>

<script>
import { menu } from '@/constants'
import { useGlobalStore } from '@/store/GlobalStore.js'
import { useDark, useToggle } from '@vueuse/core'
import GlobalSearch from '@/components/GlobalSearch.vue'

const isDark = useDark()

export default {
  name: 'TitleBar',

  components: {
    GlobalSearch,
  },

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      childrenMenus: [],
      isDarkFlag: false,
      isMaximized: true,
    }
  },

  methods: {
    getAssets(url) {
      return new URL(url, import.meta.url).href;
    },

    toggleDarkHandler() {
      // 设置element plus页面为黑暗模式
      this.globalStore.darkFlag = !this.globalStore.darkFlag
      const toggleDark = useToggle(isDark)
      toggleDark()

      // 设置 electron 为黑暗模式
      window.electronAPI.toggle()
    },

    minimizeHandler() {
      window.electronAPI.minimizeWindow()
    },

    unmaximizeHandler() {
      this.isMaximized = false
      window.electronAPI.unmaximizeWindow()
    },

    maximizeHandler() {
      this.isMaximized = true
      window.electronAPI.maximizeWindow()
    },

    closeHandler() {
      console.log('aaa')
      window.electronAPI.closeWindow()
    }
  },

  created() {
    menu.sideBarMenus.forEach(sideBarMenu => {
      this.childrenMenus.push(...sideBarMenu.children)
    })
    window.electronAPI.showGlobalSearch((_event, value) => {
      this.$refs.globalSearch.showGlobalSearch()
    })
    window.electronAPI.dragToUnmaximize((_event, value) => {
      this.isMaximized = false
    })
  },
}
</script>

<style lang="less" scoped>
.title-bar {
  display: block;
  position: fixed;
  -webkit-app-region: drag;

  width: 100%;
  height: 32px;

  border-bottom: 1px solid var(--el-border-color);
  z-index: 999;


  .window-title {
    display: flex;
    align-items: center;
    overflow: hidden;

    height: 100%;
  }

  .window-search {
    position: absolute;
    top: 5px;
    right: 50%;
    left: 50%;
    width: 370px;
    transform: translate(-50%, 0);
    -webkit-app-region: no-drag;
  }

  .window-toggle {
    position: absolute;
    top: 4px;
    right: 140px;

    -webkit-app-region: no-drag;
  }

  .window-control {
    display: grid;
    grid-template-columns: repeat(3, 46px);
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    -webkit-app-region: no-drag;

    .button {
      grid-row: 1 / span 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      &:hover {
        background: rgba(199,202,207,0.5);
      }
      &:active {
        background: rgba(199,202,207,0.8);
      }
    }

    .close-button {
      &:hover {
        background: #E81123 !important;
      }
      &:active {
        background: #F1707A !important;
      }
    }
  }
}

</style>
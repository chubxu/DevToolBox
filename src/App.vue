<template>
  <div>
    <el-container style="height: 600px">
      <el-aside width="250px">
        <el-row class="search-input">
          <!-- 搜索框 -->
          <el-input placeholder="Type to Search Tools">
            <template #suffix>
              <el-icon><icon-search /></el-icon>
            </template>
          </el-input>
        </el-row>

        <el-divider style="margin: 0"/>

        <el-row>
          <!-- all tools button -->
          <el-button text style="height: 40px; width: 250px; justify-content: left;">
            <template #icon>
              <el-icon><icon-home-filled /></el-icon>
            </template>
            <span style="margin-left:5px">
              All Tools
            </span>
          </el-button>
        </el-row>

        

        <el-menu>
          <el-sub-menu index="1">
            <template #title>
              <el-icon :size="14"><icon-refresh /></el-icon>
              <span>Converters</span>
            </template>
            <el-menu-item index="1-1">
              <template #title>
                <el-icon><icon-refresh /></el-icon>
                <span>Converters1</span>
              </template>
            </el-menu-item>
            <el-menu-item index="1-2">
              <template #title>
                <el-icon><icon-refresh /></el-icon>
                <span>Converters2</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>Encoders / Decoders</span>
            </template>
            <el-menu-item index="2-1">Encoder</el-menu-item>
            <el-menu-item index="2-2">Decoder</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>Formatter</span>
            </template>
            <el-menu-item index="3-1">Formatter1</el-menu-item>
            <el-menu-item index="3-2">Formatter2</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>


      <el-main style="overflow-y: hidden; padding: 0 20px 20px 20px;">
        <el-card shadow="never" style="height: 100%; background-color: #fffffc ;">
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
} from '@element-plus/icons-vue'
export default {
  name: 'App',
  components: {
    IconMenu,
    IconRefresh,
    IconSearch,
    IconHomeFilled
  }
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
</style>

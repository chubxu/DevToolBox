<template>
  <div>
    <el-row class="title">
      All Tools
    </el-row>
    <el-row>
      <el-card v-for="(tool, index) in toolList" :index="index" :key="index" 
               @click="clickCardToRoute(tool.routerName)"
               class="all-tools-cards"
               :body-style="{ padding: '0px', width: '160px', height: '220px' }" shadow="hover">
        <img class="all-tools-cards-img" :src="globalStore.darkFlag ? require('@/assets/images/' + tool.darkImageName) : require('@/assets/images/' + tool.imageName)"/>
        <div class="all-tools-cards-desc-title">
          <span>{{ tool.title }}</span>
          <div class="all-tools-cards-desc-content">
            <span>{{ tool.content }}</span>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { toolList } from '@/constants'
import { useGlobalStore } from '@/store/GlobalStore.js'
export default {
  name: 'AllTools',

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      toolList: [],
      cardBodyStyle: {

      },
    }
  },

  methods: {
    clickCardToRoute(routerName) {
      this.$router.push({
        name: routerName
      })
    }
  },

  created() {
    this.toolList = toolList.toolList
  }
}
</script>

<style scoped>
.title {
  font-size: var(--el-font-size-extra-large); 
  font-weight: bold;
  margin-bottom: 24px;
}

.all-tools-cards {
  margin-right: 40px;
}

.all-tools-cards-img {
  margin-top: 20px;
  margin-bottom: 20px;
}

.all-tools-cards-desc-title {
  padding: 14px; 
  font-size: smaller; 
  font-weight: 600; 
  text-align: left
}

.all-tools-cards-desc-content {
  margin-top: 10px;
  font-size: xx-small; 
  text-align: left
}
</style>
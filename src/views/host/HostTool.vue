<template>
  <div>
    <!-- title -->
    <el-row class="title">
      Host
    </el-row>

    <!-- main -->
    <el-row :gutter="10">
      <el-col :span="3">
        <el-button type="success" icon="Edit" style="margin-bottom: 30px">
          新增 host
        </el-button>
        <el-form label-width="70">
          <el-form-item v-for="host in hostList" :label="host.name" :key="host.name">
            <el-switch
              v-model="host.switch"
              class="ml-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #dcdfe6"
              inline-prompt
              active-icon="Check"
              inactive-icon="Close"
              :disabled="host.switch"
              @change="switchHandler(host.name)"
            />
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="21">
        <el-input
          v-model="currentHostContent"
          :rows="32"
          type="textarea"
          :readonly="currentActivedHost==='default'"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HostTool',

  components: {
  },

  data() {
    return {
      currentActivedHost: 'default',
      currentHostContent: '',
      hostList: [
        {
          name: 'default',
          switch: true,
          content: '',
        },
        {
          name: 'dev',
          switch: false,
          content: '',
        },
        {
          name: 'test',
          switch: false,
          content: '',
        },
        {
          name: 'pre',
          switch: false,
          content: '',
        },
        {
          name: 'prd',
          switch: false,
          content: '',
        }
      ],
    }
  },

  methods: {
    switchHandler(hostName) {
      this.hostList.forEach(host => {
        if (host.name === this.currentActivedHost) {
          host.switch = false
        } else if (host.name === hostName) {
          this.currentHostContent = host.content
        }
      })

      this.currentActivedHost = hostName
    }
  },

  created() {
    let defaultHostFileContent = window.electronAPI.readFile('default')
    defaultHostFileContent.then(res => {
      this.hostList.forEach(host => {
        if (host.name === 'default') {
          host.content = res
        }
      })
      this.currentHostContent = res
    }).catch(err => {
      console.log(err)
    })
  },

  unmounted() {
    window.electronAPI.writeHostFile(JSON.stringify(this.hostList))
  }
}
</script>

<style scoped>
.title {
  font-size: var(--el-font-size-extra-large); 
  font-weight: bold;
  margin-bottom: 24px;
}

.el-form-item {
  margin-bottom: 5px;
}
</style>
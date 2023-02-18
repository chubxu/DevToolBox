<template>
  <div>
    <!-- title -->
    <el-row class="title">
      Host
    </el-row>

    <!-- main -->
    <el-row>
      <el-col :span="5" class="add-button-and-switch">
        <el-button 
          type="success" 
          icon="Edit" 
          style="margin-bottom: 30px"
          @click="addHostHandler"
        >
          新增 host
        </el-button>
        <el-form label-width="140" label-position="left">
          <el-form-item 
            v-for="host in hostList" 
            :label="host.name" 
            :key="host.name" 
            @mouseover="mouseoverHandler(host)" 
            @mouseleave="mouseleaveHandler(host)"
          >
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
            <el-button 
              v-if="host.deleteButtonVisible && host.name !== 'default'" 
              @click="deleteHostHandler(host.name)"
              type="danger" 
              icon="Delete" 
              link 
              class="delete-host-button"
            />
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="19">
        <el-input
          v-model="currentHostContent"
          :rows="32"
          type="textarea"
          :readonly="currentActivedHost==='default'"
        />
      </el-col>
    </el-row>

    <el-dialog
      v-model="addHostDialogVisible"
      title="新增Host"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-input v-model="addedHostName">
        <template #prepend>name:</template>
      </el-input>
      <div class="validate-font" v-if="addedHostNameValidatedText">{{ addedHostNameValidatedText }}</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addHostDialogVisible = false">取消</el-button>
          <el-button type="success" @click="doAddHostHandler">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
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
          deleteButtonVisible: false,
        },
        {
          name: 'dev',
          switch: false,
          content: '',
          deleteButtonVisible: false,
        },
        {
          name: 'test',
          switch: false,
          content: '',
          deleteButtonVisible: false,
        },
        {
          name: 'pre',
          switch: false,
          content: '',
          deleteButtonVisible: false,
        },
        {
          name: 'prd',
          switch: false,
          content: '',
          deleteButtonVisible: false,
        }
      ],

      addHostDialogVisible: false,
      addedHostName: '',
      addedHostNameValidatedText: '',
    }
  },

  methods: {
    mouseoverHandler(host) {
      host.deleteButtonVisible = true
    },

    mouseleaveHandler(host) {
      host.deleteButtonVisible = false
    },

    switchHandler(hostName) {
      this.hostList.forEach(host => {
        if (host.name === this.currentActivedHost) {
          host.content = this.currentHostContent
          host.switch = false
        }
      })

      this.hostList.forEach(host => {
        if (host.name === hostName) {
          this.currentHostContent = host.content
          window.electronAPI.writeSystemHostFile(host.content)
        }
      })

      this.currentActivedHost = hostName
    },

    addHostHandler() {
      this.addHostDialogVisible = true
    },

    doAddHostHandler() {
      if (!this.addedHostName) {
        this.addedHostNameValidatedText = '请输入有效name'
        return
      }

      let addedHostName = this.addedHostName
      this.addedHostName = ''
      this.addedHostNameValidatedText = ''

      this.hostList.push({
        name: addedHostName,
        switch: false,
        content: '',
      })

      this.addHostDialogVisible = false
    },

    deleteHostHandler(hostName) {
      ElMessageBox.confirm(
        `${hostName} 将被删除, 是否继续?`,
        'Warning',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        this.hostList = this.hostList.filter(host => host.name !== hostName)
        window.electronAPI.deleteHostFile(hostName)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
      
    }
  },

  created() {
    let hostListString = window.electronAPI.readHostFile()
    hostListString.then(res => {
      this.hostList = JSON.parse(res)
      this.currentActivedHost = 'default'
      this.hostList.forEach(host => {
        if (host.name === this.currentActivedHost) {
          this.currentHostContent = host.content
        }
      })
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

.add-button-and-switch {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.el-form-item {
  margin-bottom: 5px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.validate-font {
  margin-bottom: -15px;
  margin-left: 80px;
  font-size: small;
  color: brown;
  text-align: left;
}

.delete-host-button {
  margin-left: 20px;
}
</style>
<template>
  <div>

    <!-- title -->
    <el-row class="title">
      TimeStamp
    </el-row>

    <!-- timestamp -> time -->
    <div class="box">
      <el-row :gutter="25" class="timestamp-to-time">
        <el-col :span="6">
          <span style="font-size: small;">
            Unix时间戳 > 时间
          </span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="inputTimeStamp" @input="inputTimeStampHandler" placeholder="Unix timestamp"/>
          <div class="validate-font" v-if="timestampToTimeValidatedText">{{ timestampToTimeValidatedText }}</div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="timestampToTimeDefaultSelectedUnit"
            @change="timestampToTimeDefaultSelectedUnitChangeHandler">
            <el-option v-for="unit in unitOptions" :key="unit.value" :label="unit.label" :value="unit.value" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="convertedTime" readonly />
        </el-col>

        <el-col :span="3">
          <el-button @click="copy('convertedTime')" size="small">
            <el-icon :size="14">
              <IconCopyDocument />
            </el-icon> &nbsp;Copy
          </el-button>
        </el-col>
      </el-row>

      <!-- time -> timestamp -->
      <el-row :gutter="25" class="time-to-timestamp">
        <el-col :span="6">
          <span style="font-size: small;">
            时间 > 时间戳
          </span>
        </el-col>
        <el-col :span="6">
          <el-input v-model="inputTime" @input="inputTimeHandler" placeholder="yyyy-MM-DD hh:mm:ss"/>
          <div class="validate-font" v-if="timesToTimeStampValidatedText">{{ timesToTimeStampValidatedText }}</div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="timesToTimeStampDefaultSelectedUnit"
            @change="timesToTimeStampDefaultSelectedUnitChangeHandler">
            <el-option v-for="unit in unitOptions" :key="unit.value" :label="unit.label" :value="unit.value" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="convertedTimestamp" readonly />
        </el-col>
        <el-col :span="3">
          <el-button @click="copy('convertedTimestamp')" size="small">
            <el-icon :size="14">
              <IconCopyDocument />
            </el-icon> &nbsp;Copy
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  CopyDocument as IconCopyDocument,
} from '@element-plus/icons-vue'
import moment from 'moment'
export default {
  name: 'TimeStamp',

  components: {
    IconCopyDocument,
  },

  data () {
    return {
      inputTimeStamp: '',
      convertedTime: '',
      inputTime: '',
      convertedTimestamp: '',

      timestampToTimeDefaultSelectedUnit: 'ms',
      timesToTimeStampDefaultSelectedUnit: 'ms',
      timestampToTimeValidatedText: '',
      timesToTimeStampValidatedText: '',
      unitOptions: [
        {
          label: 'ms',
          value: 'ms',
        },
        {
          label: 's',
          value: 's',
        }
      ],

      dateReg: /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(2[0-3]|[0-1]\d):[0-5]\d:[0-5]\d$/
    }
  },

  methods: {
    inputTimeStampHandler () {
      this.timestampToTimeValidatedText = ''
      this.convertedTime = ''

      if (this.inputTimeStamp === '') {
        return
      }

      let timeStamp = Number(this.inputTimeStamp)
      if (!Number.isInteger(timeStamp)) {
        this.timestampToTimeValidatedText = '请输入正确的时间戳格式'
        return
      }

      let date
      if (this.timestampToTimeDefaultSelectedUnit == 'ms') {
        date = moment(timeStamp)
      } else {
        date = moment.unix(timeStamp)
      }
      this.convertedTime = date.format("yyyy-MM-DD HH:mm:ss")
    },

    timestampToTimeDefaultSelectedUnitChangeHandler () {
      this.inputTimeStampHandler()
    },

    inputTimeHandler () {
      this.timesToTimeStampValidatedText = ''
      this.convertedTimestamp = ''

      if (this.inputTime === '') {
        return
      }

      if (!this.inputTime.match(this.dateReg)) {
        this.timesToTimeStampValidatedText = '请输入正确的时间格式 yyyy-MM-DD hh:mm:ss'
        return
      }
      if (this.timesToTimeStampDefaultSelectedUnit == 'ms') {
        this.convertedTimestamp = moment('2020-12-20 20:20:20', 'YYYY-MM-DD HH:mm:ss').valueOf()
      } else {
        this.convertedTimestamp = moment(this.inputTime, 'yyyy-MM-DD hh:mm:ss').unix()
      }
    },

    timesToTimeStampDefaultSelectedUnitChangeHandler () {
      this.inputTimeHandler()
    },

    copy (type) {
      if (type === 'convertedTime') {
        window.electronAPI.copy(this.convertedTime)
        this.$message.success({
          showClose: true,
          message: 'Copy Success',
        })
      } else if (type === 'convertedTimestamp') {
        window.electronAPI.copy(this.convertedTimestamp.toString())
        this.$message.success({
          showClose: true,
          message: 'Copy Success',
        })
      }
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px dashed #E6E8EB;
  padding: 60px 0 60px 0;
}

.title {
  font-size: var(--el-font-size-extra-large);
  font-weight: bold;
  margin-bottom: 24px;
}

.timestamp-to-time {
  padding: 0 180px 0 100px;
  margin-bottom: 40px;
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.validate-font {
  margin-bottom: -15px;
  font-size: small;
  color: brown;
  text-align: left;
}

.time-to-timestamp {
  padding: 0 180px 0 100px;
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
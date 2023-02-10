<template>
  <div>

    <!-- title -->
    <el-row class="title">
      TimeStamp
    </el-row>

    <!-- timestamp -> time -->
    <el-row :gutter="25" class="timestamp-to-time">
      <el-col :span="6">
        <span style="font-size: small;">
          Unix时间戳(Unix timestamp)
        </span>
      </el-col>
      <el-col :span="7">
        <el-input v-model="inputTimeStamp" @input="inputTimeStampHandler"/>
        <div class="validate-font" v-if="timestampToTimeValidatedText">{{ timestampToTimeValidatedText }}</div>
      </el-col>
      <el-col :span="3">
        <el-select v-model="timestampToTimeDefaultSelectedUnit" @change="timestampToTimeDefaultSelectedUnitChangeHandler">
          <el-option v-for="unit in unitOptions"
            :key="unit.value"
            :label="unit.label"
            :value="unit.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input v-model="convertedTime" readonly/>
      </el-col>
    </el-row>

    <!-- time -> timestamp -->
    <el-row :gutter="25" class="time-to-timestamp">
      <el-col :span="6">
        <span style="font-size: small;">
          时间(年/月/日 时:分:秒)
        </span>
      </el-col>
      <el-col :span="8">
        <el-input v-model="inputTime" />
        <div class="validate-font" v-if="timesToTimeStampValidatedText">{{ timesToTimeStampValidatedText }}</div>
      </el-col>
      <el-col :span="3">
        <el-select v-model="timesToTimeStampDefaultSelectedUnit">
          <el-option v-for="unit in unitOptions"
            :key="unit.value"
            :label="unit.label"
            :value="unit.value"
          />
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-input v-model="convertedTimestamp" readonly/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TimeStamp',

  data() {
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
      ]
    }
  },

  methods: {
    inputTimeStampHandler() {
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

    timestampToTimeDefaultSelectedUnitChangeHandler() {
      this.inputTimeStampHandler()
    }
  }
}
</script>

<style scoped>
.title {
  font-size: var(--el-font-size-extra-large); 
  font-weight: bold;
  margin-bottom: 24px;
}

.timestamp-to-time {
  padding: 0 180px 0 100px;
  margin-bottom: 40px;
  display: -webkit-flex; /* Safari */
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
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
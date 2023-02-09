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
        <el-input v-model="inputTimeStamp"/>
      </el-col>
      <el-col :span="3">
        <el-select v-model="timestampToTimeDefaultSelectedUnit">
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

.time-to-timestamp {
  padding: 0 180px 0 100px;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
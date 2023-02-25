<template>
  <div>

    <!-- title -->
    <el-row class="title">
      进制转换
    </el-row>

    <div class="box">
      <el-row class="convertion-row">
        <el-col :span="3">
          <span style="font-size: small;">
            二进制数据: 
          </span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="binData" @input="inputBinDataHandler">
            <template #prepend>0b</template>
          </el-input>
          <div class="validate-font" v-if="inputType === 'bin'">{{ validatedText }}</div>
        </el-col>
        <el-col :span="3">
          <el-button @click="copy('bin')" size="small">
            <el-icon :size="14">
              <IconCopyDocument />
            </el-icon> &nbsp;Copy
          </el-button>
        </el-col>
      </el-row>

      <el-row class="convertion-row">
        <el-col :span="3">
          <span style="font-size: small;">
            八进制数据: 
          </span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="octData" @input="inputOctDataHandler">
            <template #prepend>0</template>
          </el-input>
          <div class="validate-font" v-if="inputType === 'oct'">{{ validatedText }}</div>
        </el-col>
        <el-col :span="3">
          <el-button @click="copy('oct')" size="small">
            <el-icon :size="14">
              <IconCopyDocument />
            </el-icon> &nbsp;Copy
          </el-button>
        </el-col>
      </el-row>

      <el-row class="convertion-row">
        <el-col :span="3">
          <span style="font-size: small;">
            十进制数据: 
          </span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="decData" @input="inputDecDataHandler"/>
          <div class="validate-font" v-if="inputType === 'dec'">{{ validatedText }}</div>
        </el-col>
        <el-col :span="3">
          <el-button @click="copy('dec')" size="small">
            <el-icon :size="14">
              <IconCopyDocument />
            </el-icon> &nbsp;Copy
          </el-button>
        </el-col>
      </el-row>

      <el-row class="convertion-row">
        <el-col :span="3">
          <span style="font-size: small;">
            十六进制数据: 
          </span>
        </el-col>
        <el-col :span="12">
          <el-input v-model="hexData" @input="inputHexDataHandler">
            <template #prepend>0x</template>
          </el-input>
          <div class="validate-font" v-if="inputType === 'hex'">{{ validatedText }}</div>
        </el-col>
        <el-col :span="3">
          <el-button @click="copy('hex')" size="small">
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
export default {
  name: 'BinOctDecHex',

  components: {
    IconCopyDocument,
  },

  data () {
    return {
      inputType: '',
      binData: '',
      octData: '',
      decData: '',
      hexData: '',
      binDataReg: /^[10]*$/,
      octDataReg: /^[0-7]*$/,
      decDataReg: /^[0-9]*$/,
      hexDataReg: /^[A-Fa-f0-9]*/,

      validatedText: ''
    }
  },

  methods: {
    inputBinDataHandler() {
      this.inputType = ''
      this.validatedText = ''

      if (this.binData === '') {
        this.octData = ''
        this.decData = ''
        this.hexData = ''
        return
      }

      if (this.binData && !this.binData.match(this.binDataReg)) {
        this.inputType = 'bin'
        this.validatedText = '请输入正确的二进制格式数据, 仅包含 0 和 1'
      } else {
        let number = parseInt(this.binData, 2)
        this.octData = number.toString(8)
        this.decData = number.toString(10)
        this.hexData = number.toString(16)
      }
    },

    inputOctDataHandler() {
      this.inputType = ''
      this.validatedText = ''

      if (this.octData === '') {
        this.binData = ''
        this.decData = ''
        this.hexData = ''
        return
      }

      if (this.octData && !this.octData.match(this.octDataReg)) {
        this.inputType = 'oct'
        this.validatedText = '请输入正确的八进制格式数据, 仅包含 0~7'
      } else {
        let number = parseInt(this.octData, 8)
        this.binData = number.toString(2)
        this.decData = number.toString(10)
        this.hexData = number.toString(16)
      }
    },

    inputDecDataHandler() {
      this.inputType = ''
      this.validatedText = ''

      if (this.decData === '') {
        this.binData = ''
        this.octData = ''
        this.hexData = ''
        return
      }

      if (this.decData && !this.decData.match(this.decDataReg)) {
        this.inputType = 'dec'
        this.validatedText = '请输入正确的十进制格式数据, 仅包含 0~9'
      } else {
        let number = parseInt(this.decData, 10)
        this.binData = number.toString(2)
        this.octData = number.toString(8)
        this.hexData = number.toString(16)
      }
    },

    inputHexDataHandler() {
      this.inputType = 'hex'
      this.validatedText = ''

      if (this.hexData === '') {
        this.binData = ''
        this.octData = ''
        this.decData = ''
        return
      }

      if (this.hexData && !this.hexData.match(this.hexDataReg)) {
        this.inputType = ''
        this.validatedText = '请输入正确的八进制格式数据, 仅包含 0~9 a-f A-F'
      } else {
        let number = parseInt(this.hexData, 16)
        this.binData = number.toString(2)
        this.octData = number.toString(8)
        this.decData = number.toString(10)
      }
    },

    copy(type) {
      if (type === 'bin') {
        window.electronAPI.copy(this.binData)
      } else if (type === 'oct') {
        window.electronAPI.copy(this.octData)
      } else if (type === 'dec') {
        window.electronAPI.copy(this.decData)
      } else if (type === 'hex') {
        window.electronAPI.copy(this.hexData)
      }
      this.$message.success({
        showClose: true,
        message: 'Copy Success',
      })
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

.convertion-row {
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
</style>
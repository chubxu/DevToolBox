<template>
  <div>
    <!-- title -->
    <el-row class="title">
      ChatGPT
    </el-row>

    <el-row :gutter="10" justify="start" v-loading="chatLoading" element-loading-text="答案正在赶来, 请耐心等待 O(∩_∩)O ...">
      <el-col :span="16">
        <!-- chat -->
        <div class="chat">
          <div :class="globalStore.darkFlag ? 'chat-header-dark' : 'chat-header-light'">
            <span :class="globalStore.darkFlag ? 'chat-header-greetings-dark' : 'chat-header-greetings-light'">
              Chat Room
            </span>
          </div>
          <div :class="globalStore.darkFlag ? 'chat-body-dark' : 'chat-body-light'" id="chat__body">
            <ChatMessage v-for="(message, index) in messageList" :key="index" :message="message" :prev="[index == 0 ? null : messageList[index - 1]]" />
          </div>
          
          <div :class="globalStore.darkFlag ? 'form-dark' : 'form-light'">
            <el-input 
              class="form__input"
              :placeholder="inputPlaceholder" 
              v-model.trim="prompt" 
              @keyup.enter="sendMessage">
              <template #suffix>
                <el-icon><IconPromotion /></el-icon>
              </template>
            </el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <el-form label-width="80px">
          <el-form-item label="ApiKey">
            <el-input v-model="apiKey" class="api-key-input" type="textarea" rows="3" resize="none"/>
          </el-form-item>
          <el-form-item label="Temperature">
            <el-slider v-model="temperature" size="small" :step="0.1" :min="0" :max="2"/>
          </el-form-item>
          <el-form-item label="Top_P">
            <el-slider v-model="topP" size="small" :step="0.1" :min="0" :max="1"/>
          </el-form-item>
          <el-form-item label="Model">
            <el-select v-model="model" placeholder="Select model">
              <el-option
                v-for="item in modelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="FrequencyPenalty">
            <el-slider v-model="frequencyPenalty" size="small" :step="0.1" :min="-2" :max="2"/>
          </el-form-item>
          <el-form-item label="PresencePenalty">
            <el-slider v-model="presencePenalty" size="small" :step="0.1" :min="-2" :max="2"/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChatMessage from "./components/ChatMessage.vue"
import axios from 'axios'
import {
  Promotion as IconPromotion,
} from '@element-plus/icons-vue'
import { useGlobalStore } from '@/store/GlobalStore.js'
export default {
  name: 'ChatGPT',
  
  components: {
    ChatMessage,
    IconPromotion,
  },

  setup() {
    const globalStore = useGlobalStore()
    return { globalStore }
  },

  data() {
    return {
      chatLoading: false,
      messageList: [],
      prompt: "",
      inputPlaceholder: '请输入您的问题...',
      
      apiKey: '',
      temperature: 1,
      topP: 1,
      model: 'text-davinci-003',
      modelOptions: [
        {
          lable: 'text-davinci-003',
          value: 'text-davinci-003',
        }
      ],
      frequencyPenalty: 0,
      presencePenalty: 0,
    };
  },

  methods: {
    sendMessage() {
      this.chatLoading = true
      let userMessage = {
        message: this.prompt,
        user: {
          username: 'user',
          avatar: require('@/assets/images/user-avatar.png'),
        }
      }
      this.messageList.push(userMessage)

      this.prompt = ''
      this.inputPlaceholder = '答案正在赶来, 请耐心等待 O(∩_∩)O '
      setTimeout(() => {
        this.chatLoading = false
        this.inputPlaceholder = "网络异常, 请稍后重试..."
      }, 20000)
    },

    doSendMessageToChatGPT(prompt) {
      this.chapGptOpenApi(prompt)
    },

    async chapGptOpenApi(prompt) {
      let data = {
        prompt: prompt,
        temperature: this.temperature,
        top_p: this.topP,
        model: this.model,
        max_tokens: 1024,
        frequency_penalty: this.frequencyPenalty,
        presence_penalty: this.presencePenalty,
        stop: ["Human", "AI:"],
      }
      axios.post('https://api.openai.com/v1/completions', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + this.apiKey,
        }
      }).then(response => {
        let resText = response.data.choices[0].text
        console.log(resText)
        let chatGptMessage = {
          message: resText,
          user: {
            userName: 'ChatGPT',
            avatar: require('@/assets/images/chatgpt.png'),
          }
        }
        this.messageList.push(chatGptMessage)
        this.inputPlaceholder = '请输入您的问题...'
        this.scrollToBottom()
        this.chatLoading = false
      }).catch(error => {
        console.log(error)
      })
    },

    scrollToBottom() {
      setTimeout(() => {
        const element = document.getElementById("chat__body");
        element.scrollTop = element.scrollHeight;
      }, 0);
    }
  },
}
</script>

<style lang="less" scoped>
@chat-width: 700px;

.title {
  font-size: var(--el-font-size-extra-large); 
  font-weight: bold;
  margin-bottom: 24px;
}

.chat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: left;
}

.chat-header {
  border-radius: 5px 5px 0px 0px;
  padding: 10px 15px 10px 15px;
  width: @chat-width;
  z-index: 2;
}
.chat-header-light {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  .chat-header();
}
.chat-header-dark {
  background: #1d1e1f;
  box-shadow: 0px 3px 10px rgba(167, 163, 163, 0.1);
  .chat-header();
}

.chat-header-greetings {
  font-size: 18px;
  font-weight: 600;
}
.chat-header-greetings-light {
  color: #292929;
  .chat-header-greetings();
}
.chat-header-greetings-dark {
  color: #e5eaf3;
  .chat-header-greetings();
}

.chat-body {
  width: @chat-width;
  height: 550px;
  padding: 15px;
  
  overflow: scroll;
  scroll-behavior: smooth;
}
.chat-body::-webkit-scrollbar {
  display: none;
}
.chat-body-light {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  .chat-body();
}
.chat-body-dark {
  background: #1d1e1f;
  box-shadow: 0px 3px 10px rgba(167, 163, 163, 0.1);
  .chat-body();
}


.form {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px 5px 15px;
  width: @chat-width;
  border-radius: 0px 0px 5px 5px;
  
  z-index: 2;
}
.form-light {
  background: #ffffff;
  box-shadow: 0px -5px 30px rgba(0, 0, 0, 0.1);
  .form();
}
.form-dark {
  background: #1d1e1f;
  box-shadow: 0px -5px 30px rgba(167, 163, 163, 0.1);
  .form();
}

.form__input {
  border: none;
  padding: 0.5rem;
  font-size: 16px;
  width: 100%;
}

.form__input:focus {
  outline: none;
}

.form__submit {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.api-key-input {
  font-size: 13px;
}
</style>
<template>
  <div>
    <!-- title -->
    <el-row class="title">
      ChatGPT
    </el-row>

    <el-row :gutter="10" v-loading="chatLoading" element-loading-text="答案正在赶来, 请耐心等待 O(∩_∩)O ...">
      <el-col :span="14">
        <!-- chat -->
        <div class="chat">
          <div class="chat__header">
            <span class="chat__header__greetings">
              Chat Room
            </span>
          </div>
          <div class="chat__body" id="chat__body">
            <ChatMessage v-for="(message, index) in messageList" :key="index" :message="message" :prev="[index == 0 ? null : messageList[index - 1]]" />
          </div>
          
          <div class="form">
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

      <el-col :span="10">
        <el-row>
          <el-input v-model="apiKey" class="api-key-input">
            <template #prepend>ApiKey</template>
          </el-input>
        </el-row>
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
export default {
  name: 'ChatGPT',
  
  components: {
    ChatMessage,
    IconPromotion,
  },

  data() {
    return {
      chatLoading: false,
      messageList: [],
      prompt: "",
      inputPlaceholder: '请输入您的问题...',
      apiKey: '',
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
        temperature: 1,
        top_p: 1,
        model: 'text-davinci-003',
        max_tokens: 1024,
        frequency_penalty: 0,
        presence_penalty: 0,
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

<style scoped>
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
  align-items: center;
}

.chat__header {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0px 0px;
  padding: 10px 15px 10px 15px;
  width: 600px;
  z-index: 2;
}

.chat__header__greetings {
  font-size: 18px;
  font-weight: 600;
  color: #292929;
}

.chat__body {
  background: #ffffff;
  width: 600px;
  height: 500px;
  padding: 15px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  scroll-behavior: smooth;
}

.chat__body::-webkit-scrollbar {
  display: none;
}

.form {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px 5px 15px;
  width: 600px;
  background: #ffffff;
  border-radius: 0px 0px 8px 8px;
  box-shadow: 0px -5px 30px rgba(0, 0, 0, 0.1);
  z-index: 2;

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
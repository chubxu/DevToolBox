<template>
  <div>
    <!-- title -->
    <el-row class="title">
      ChatGPT
    </el-row>

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
        <input class="form__input" type="text" placeholder="pls input..." v-model.trim="prompt" @keyup.enter="sendMessage" />
        <el-icon :size="14"><IconPromotion /></el-icon>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessage from "./components/ChatMessage.vue"
import axios from 'axios'
import {
  Promotion as IconPromotion,
} from '@element-plus/icons-vue'
// import { Configuration, OpenAIApi } from 'openai'
export default {
  name: 'ChatGPT',
  
  components: {
    ChatMessage,
    IconPromotion,
  },

  data() {
    return {
      messageList: [],
      prompt: "",

    };
  },

  methods: {
    sendMessage() {
      let userMessage = {
        message: this.prompt,
        user: {
          username: 'user',
          avatar: require('@/assets/images/user-avatar.png'),
        }
      }
      this.messageList.push(userMessage)

      let chatGptMessage = {
        message: this.doSendMessageToChatGPT(this.prompt),
        user: {
          userName: 'ChatGPT',
          avatar: require('@/assets/images/chatgpt.png'),
        }
      }
      this.messageList.push(chatGptMessage)

      this.scrollToBottom()
    },

    doSendMessageToChatGPT(prompt) {
      console.log(prompt)
      // TODO openai调用
      this.chapGptOpenApi(prompt)
      return 'ChatGPT'
    },

    async chapGptOpenApi(prompt) {
      console.log(prompt)
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
          'Authorization': `Bearer ` + '',
        }
      }).then(response => {
        this.response = response.data.choices[0].text
        console.log(this.response)
      }).catch(error => {
        console.log(error)
      })
      // const configuration = new Configuration({
      //   apiKey: "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",
      // });
      // const openai = new OpenAIApi(configuration);
      // try {
      //   const response = await openai.createCompletion({
      //     model: "text-davinci-003",
      //     prompt: "Say this is a test",
      //     temperature: 0,
      //     max_tokens: 7,
      //   });
      //   console.log(response.data.choices[0].text)
      // } catch (err) {
      //   console.log(err)
      // }
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
  border-radius: 16px 16px 0px 0px;
  padding: 15px;
  
  width: 700px;
  z-index: 2;
}

.chat__header__greetings {
  font-size: 18px;
  font-weight: 600;
  color: #292929;
}

.chat__body {
  background: #ffffff;
  width: 700px;
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
  padding: 15px;
  width: 700px;
  background: #ffffff;
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0px -5px 30px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.form__input {
  border: none;
  padding: 0.5rem;
  font-size: 16px;
  width: calc(100% - 60px);
}

.form__input:focus {
  outline: none;
}

.form__submit {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
<template>
  <div>
    <div v-if="message.user.username === 'user'" class="chat__mymessage" :class="[isSame ? '' : 'chat__first']">
      <p class="chat__mymessage__paragraph">{{ message.message }}</p>
      <div class="chat__message__avartar">
        <img :src="avatar" alt="" v-if="!isSame" class="chat__yourmessage__img"/>
      </div>
    </div>
    <div v-else class="chat__yourmessage" :class="[isSame ? '' : 'chat__first']">
      <div class="chat__yourmessage__avartar">
        <img :src="avatar" alt="" v-if="!isSame" class="chat__yourmessage__img"/>
      </div>
      <div>
        <p class="chat__yourmessage__user" v-if="!isSame">
          {{ message.user.username }}
        </p>
        <div class="chat__yourmessage__p">
          <p class="chat__yourmessage__paragraph">
            {{ message.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "prev"],
  data() {
    return {
      isSame: false,
      avatar: '',
    };
  },
  methods: {
    isSamePerson(msg, prev) {
      if (prev === null) {
        return false;
      } else if (prev[0]?.user.username == msg?.user.username) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.isSame = this.isSamePerson(this.message, this.prev);
    if (this.message?.user.avatar) {
      this.avatar = this.message?.user.avatar;
    }
  },
};
</script>

<style>
.chat__first {
  margin-top: 20px;
}

.chat__mymessage {
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: flex-end;
  margin: 0;
  min-height: 40px;
  line-break: anywhere;
}

.chat__mymessage__paragraph {
  margin: 0 0 0.4rem 1rem;
  border-radius: 20px 20px 0px 20px;
  max-width: 180px;
  background-color: #bbc4ef;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__message__avartar {
  width: 40px;
  margin-left: 1rem;
}

.chat__yourmessage {
  display: flex;
}

.chat__yourmessage__avartar {
  width: 40px;
  margin-right: 1rem;
}

.chat__yourmessage__img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.chat__yourmessage__user {
  font-size: 14px;
  font-weight: 700;
  color: #292929;
  margin-top: 0;
  margin-block-end: 0rem;
}

.chat__yourmessage__p {
  display: flex;
  align-items: flex-end;
  line-break: anywhere;
}

.chat__yourmessage__paragraph {
  margin: 0.4rem 1rem 0 0;
  border-radius: 0px 20px 20px 20px;
  background-color: #f3f3f3;
  max-width: 180px;
  color: #414141;
  padding: 0.8rem;
  font-size: 14px;
}

.chat__yourmessage__time {
  margin: 0;
  font-size: 12px;
  color: #9c9c9c;
}
</style>

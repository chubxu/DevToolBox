import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('Global', {
  state: () => {
    return {
      darkFlag: false,
    }
  },
  getters: {
    getDarkFlag: (state) => {
        return state.darkFlag
    },
},
})
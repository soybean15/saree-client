import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavStore = defineStore('nav', () => {
  
  
    const drawer = ref(false)
    return { drawer}
  })
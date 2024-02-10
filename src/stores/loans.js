import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoanStore = defineStore('loan', () => {


    const  lenders =ref([])
  
    return { lenders }
  })
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoanStore = defineStore('loan', () => {


    const savedLendersJSON = localStorage.getItem('lenders');
    const  lenders =ref(JSON.parse(savedLendersJSON)?? [])

    const addLender= (lender, closure)=>{
        
          lenders.value.push(lender)
          localStorage.setItem('lenders', JSON.stringify(lenders.value));

         closure()
    }
  
    return { lenders,addLender }
  })
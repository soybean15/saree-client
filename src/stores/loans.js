import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoanStore = defineStore('loan', () => {


    const savedLendersJSON = localStorage.getItem('lenders');
    const  lenders =ref(JSON.parse(savedLendersJSON)?? [])

    const addLender= (lender, closure)=>{
          lender.id=  generateId();
          lenders.value.push(lender)
          localStorage.setItem('lenders', JSON.stringify(lenders.value));
          console.log(lenders.value)

         closure()
    }

    const generateId = () => {
       
        if (lenders.value.length === 0) {
            return 1;
        }
        const lastItemId = lenders.value[lenders.value.length - 1].id;
    
        return lastItemId + 1;
    };

    const addCredit=(lender,items)=>{

        console.log(items)
    }
    
  
    return { lenders,addLender ,addCredit}
  })
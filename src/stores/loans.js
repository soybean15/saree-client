import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoanStore = defineStore('loan', () => {


    const savedLendersJSON = localStorage.getItem('lenders');
    const lenders = ref(JSON.parse(savedLendersJSON) ?? [])

   

    const getLender=(id)=>{
        return lenders.value.find(lender => lender.id == id);
    }

    const addLender = (lender, closure) => {
        lender.id = generateId();
        lender.total_credit  =lender.total_credit?  parseInt(lender.total_credit):0
        lender.total_paid=0 
        lenders.value.push(lender)
        localStorage.setItem('lenders', JSON.stringify(lenders.value));
        console.log(lenders.value)

        closure()
    }

    const removeLender = (id) => {
        if (confirm('Are you sure you want to remove this lender?')) {
            console.log(id)
            const index = lenders.value.findIndex(lender => lender.id === id);


            if (index !== -1) {
                lenders.value.splice(index, 1)
                localStorage.setItem('lenders', JSON.stringify(lenders.value));
            }
        }
    };


    const generateId = () => {


        if (lenders.value.length === 0) {
            return 1;
        }
        const lastItemId = lenders.value[lenders.value.length - 1].id;

        return lastItemId + 1;

    };

    const addCredit = (lender, items) => {

        const index = lenders.value.findIndex(item => item.id === lender.id);

       
        if (index !== -1) {
            lenders.value[index].total_credit = lender.total_credit
            lenders.value[index].credits.push(...items);
           
            localStorage.setItem('lenders', JSON.stringify(lenders.value));
            
        }
    }

    const payCredit=(lender,item)=>{
        const index = lenders.value.findIndex(item => item.id === lender.id);
        if (index !== -1) {
         
            lenders.value[index].total_paid =  parseInt(lender.total_paid) + parseInt(item.payment)

            console.log(lenders.value[index])
           lenders.value[index].payments.push(item);
           
            localStorage.setItem('lenders', JSON.stringify(lenders.value));
            
        }
    }


    return { lenders, addLender, addCredit, removeLender ,getLender,payCredit}
})
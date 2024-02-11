<template>
    <Dialog :title="'Add Payment'">
        <template #button="{ open }">

          <slot name="button" :open="open"></slot>

        </template>

        <template #body="{ closeDialog }">
            <q-form @submit="onSubmit(closeDialog)" class="w-full">

                <div class="row items-center q-gutter-sm">
                    <q-radio class="col-4" v-model="radioOption" val="payAll" label="Pay All" />
                    <q-radio class="col-4" v-model="radioOption" val="custom" label="Pay Amount" />
                    <q-input class="mt-7 col-3 " dense outlined type="number" v-model="payment" :disable="radioOption == 'payAll'" :rules="[
                                        val => (val && val.length > 0) || 'Field is Required'
                                    ]"/>
                </div>

                
             
                <div class="flex justify-end">
                    <q-btn label="Submit" type="submit" class="mb-5" color="green"/>
                </div>
            


            </q-form>
        </template>


    </Dialog>
</template>

<script>
import { useLoanStore } from '@/stores/loans';
import Dialog from './Dialog.vue';
import { ref, watch } from 'vue';
import { date } from 'quasar'
export default {
    props: ['id'],
    components: { Dialog },
    setup(props) {
        const loanStore = useLoanStore()

        const id = props.id
        const lender = ref(loanStore.getLender(id))
        const payment = ref()
        const radioOption =  ref('custom')


        const getBalance=() =>{
            if(lender.value.total_credit > lender.value.total_paid){
                return lender.value.total_credit - lender.value.total_paid
            }else{
                return 0;
            }
               
            }

        watch(radioOption,()=>{

            if(radioOption.value == 'payAll'){
                payment.value= parseInt(getBalance())
                console.log(payment.value)
            }else{
                payment.value= ''
            }

        })



           const generateUniqueId = () => {
            const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
            const randomNumber = Math.random().toString(36).substr(2, 5); // Generate random base-36 string
            return `${timestamp}-${randomNumber}`; // Combine timestamp and random number
        };


        return {
            lender,
            
            radioOption,
            payment,
            onSubmit:(closeDialog)=>{

                

                const timeStamp = Date.now()
                const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
                const uniqueId = generateUniqueId();

                if( payment.value > getBalance()){
                    payment.value = getBalance()
                }

                const item = { id: uniqueId, payment:payment.value, date: formattedString }



                loanStore.payCredit(lender.value, item)
              
                closeDialog()

            }
        }

    }

}
</script>

<style></style>
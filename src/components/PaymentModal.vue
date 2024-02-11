<template>
    <Dialog :title="'Add Payment'">
        <template #button="{ open }">

          <slot name="button" :open="open"></slot>

        </template>

        <template #body="{ closeDialog }">
            <q-form @submit="onSubmit(closeDialog)">

                <div class="q-gutter-sm">
                    <q-radio v-model="radioOption" val="payAll" label="Pay All" />
                    <q-radio v-model="radioOption" val="custom" label="Pay Amount" />

                </div>
                <q-input outlined type="number" v-model="payment" :disable="radioOption == 'payAll'" :rules="[
                                        val => (val && val.length > 0) || 'Field is Required'
                                    ]"/>

                <q-btn label="Submit" type="submit" class="my-5" color="green"/>


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
                const item = { id: uniqueId, payment:payment.value, date: formattedString }

                loanStore.payCredit(lender.value, item)
              
                closeDialog()

            }
        }

    }

}
</script>

<style></style>
<template>
    
    <div class="p-3 md:p-10 max-w-screen-sm rounded border shadow-md p-3 space-y-2 m-2">
        <bread-crumbs/>
        <q-form @submit="onSubmit">
        <div class="flex justify-between">

            <div>
                <div class="text-xl font-bold">Name</div>
                <div class="text-lg text-gray-700">{{ lender.name }}</div>
            </div>
            <q-btn type="submit" class="h-10" color="green" text-color="white" label="Save" />
        </div>

        <q-separator class="my-2" />
        <div class="space-y-3">
            <div class="text-xl font">Item(s)</div>

            <div class="rounded border shadow-md p-3 space-y-2" v-for="item in items" :key="item.id">
                <q-input v-model="item.name" outlined label="Item" :rules="[
                    val => (val && val.length > 0) || 'Name is Required'
                ]" />
                <q-input v-model="item.price" outlined type="number" label="Price" class="w-40" />
            </div>

            <q-btn color="accent" text-color="primary" label="Add Item" @click="addItem()" />
        </div>
    </q-form>
    </div>

</template>

<script>
import { useLoanStore } from '@/stores/loans'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { date } from 'quasar'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
export default {
    components:{BreadCrumbs},
    setup() {
        const route = useRoute()
        const loanStore = useLoanStore()
        const { lenders } = storeToRefs(loanStore)
        const id = route.params.id

        

        const items = ref([])

        const foundLender = lenders.value.find(lender => lender.id == id);

        const lender = ref(foundLender);

        const generateUniqueId = () => {
            const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
            const randomNumber = Math.random().toString(36).substr(2, 5); // Generate random base-36 string
            return `${timestamp}-${randomNumber}`; // Combine timestamp and random number
        };

        return {
            lender,
            items,
            addItem: () => {
                const timeStamp = Date.now()
                const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
                const uniqueId = generateUniqueId();
                const item = { id: uniqueId, name: '', price: 0, date: formattedString }
                items.value.push(item)

                

            },
            onSubmit:()=>{
                loanStore.addCredit(lender,items.value)
            }
        }

    }

}
</script>

<style></style>
<template>
    <div class="q-pa-md"> <bread-crumbs /></div>

    <div class="p-3 md:p-10 max-w-screen-sm rounded border shadow-md p-3 space-y-2 m-2">

        <q-form>
            <div class="flex justify-between">

                <div>
                    <div class="text-xl font-bold">Name</div>
                    <div class="text-lg text-gray-700">{{ lender.name }}</div>
                </div>


                <DialogVue title="Save Credit">

                    <template #button="{ open }">
                        <q-btn type="submit" class="h-10" color="green" text-color="white" label="Save"
                            @click="open('standard')" :disable="(items.length == 0) || !isFormValid()" />
                    </template>
                    <template #body="{ closeDialog }">
                        <div class="flex flex-col justify-between w-full">

                            <div class="text-xl font-bold flex justify-between"><span>Item(s)</span><span><b
                                        class="px-2">Total:</b>P{{ parseFloat(getTotal()) }}</span></div>
                            <div class="flex justify-between py-2">
                                <div class="font-bold">Item</div>

                                <div class="font-bold">Total</div>


                            </div>
                            <div v-for="item in items" :key="item.id" class="flex justify-between">

                                <div>
                                    <span class="font-bold pr-2">{{ item.name }}</span>
                                    <q-badge color="green">
                                        P{{ parseFloat(item.price) }}
                                    </q-badge>
                                    <q-badge color="blue">
                                        x{{ item.qty }}
                                    </q-badge>
                                </div>

                                <div>P{{ item.total }}</div>
                            </div>

                            <div class="flex w-full space-x-1 justify-end my-5">

                                <q-btn dense color="green" label="Confirm" @click="save(closeDialog)" />
                                <q-btn dense color="red" label="Cancel" @click="closeDialog" />
                            </div>


                        </div>


                    </template>
                </DialogVue>

            </div>

            <q-separator class="my-2" />
            <div class="space-y-3">
                <div class="text-xl font">Item(s)</div>

                <div class="rounded border shadow-md p-3 space-y-1" v-for="item in items" :key="item.id">
                    <div class="flex justify-end cursor-pointer">
                        <q-btn flat round dense color="primary" icon="close" @click="removeItem(item.id)" />
                    </div>
                    <q-input v-model="item.name" outlined label="Item" :rules="[
                        val => (val && val.length > 0) || 'Name is Required'
                    ]" />
                    <div class="flex  items-center">
                        <q-input v-model="item.price" outlined type="number" label="Price" class="w-40"
                            @update:model-value="onChange(item)" />


                        <div class="flex items-center">


                            <q-btn flat round dense color="primary" icon="arrow_left" size="30px" :disable="item.price == 0"
                                @click="decrement(item)" />
                            <span class="text-xl font-bold"> {{ item.qty }}</span>
                            <q-btn flat round dense color="primary" icon="arrow_right" size="30px" @click="increment(item)"
                                :disable="item.price == 0" />

                        </div>
                        <div>

                            <div class="text-lg font-bold">Total</div>
                            <div class="text-lg ">P{{ item.total }}</div>
                        </div>

                    </div>

                </div>

                <q-btn color="accent" text-color="primary" label="Add Item" @click="addItem()" />
            </div>
        </q-form>
    </div>
</template>

<script>
import { useLoanStore } from '@/stores/loans'
import { useRoute,useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { date } from 'quasar'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DialogVue from '@/components/Dialog.vue'
export default {
    components: { BreadCrumbs, DialogVue },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const id = route.params.id

        const loanStore = useLoanStore()


        const items = ref([])

        const lender = ref(loanStore.getLender(id));

        const generateUniqueId = () => {
            const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
            const randomNumber = Math.random().toString(36).substr(2, 5); // Generate random base-36 string
            return `${timestamp}-${randomNumber}`; // Combine timestamp and random number
        };


        const getTotal = () => {

            let total = 0
            for (const item of items.value) {
                total = total + item.total
            }


            return total
        }
        return {
            lender,
            items,
            addItem: () => {
                const timeStamp = Date.now()
                const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
                const uniqueId = generateUniqueId();
                const item = { id: uniqueId, name: '', price: 0, date: formattedString, qty: 1, total: 0 }
                items.value.push(item)



            },
            removeItem: (id) => {
                const index = items.value.findIndex(item => item.id === id);

                if (index !== -1) {
                    items.value.splice(index, 1);
                }
            },
            onSubmit: () => {
                loanStore.addCredit(lender, items.value)
            },
            increment: (item) => {
                item.qty++
                item.total = item.price * item.qty

                console.log(item)

            },
            decrement: (item) => {
                if (item.qty > 1) {
                    item.qty--
                    item.total = item.price * item.qty
                }


            },
            onChange: (item) => {
                item.total = item.price * item.qty
            },
            isFormValid: () => {
                for (const item of items.value) {
                    if (!item.name.trim()) {
                        return false; // Return false if name is empty or contains only whitespace
                    }
                }
                return true; // Return true if all names are valid

            },
            getTotal,

            save: (closeDialog) => {
                lender.value.total_credit = lender.value.total_credit + getTotal()
                loanStore.addCredit(lender.value, items.value)
                closeDialog()
                router.push({name:'loans'})
            }
        }

    }

}
</script>

<style></style>
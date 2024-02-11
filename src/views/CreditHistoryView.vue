<template>
    <div class="q-pa-md"> <bread-crumbs />

        <div class="p-3 md:p-10 max-w-screen-sm rounded border shadow-md p-3 space-y-2 m-2">
            <q-tabs v-model="tab" narrow-indicator dense align="left">
                <q-tab class="text-primary" name="credit" icon="receipt_long" label="Credit History" />
                <q-tab class="text-green" name="payment" icon="payments" label="Payment History" />

            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="credit">
                  

                    <q-timeline color="secondary">


                        <q-timeline-entry class="text-lg font-bold" :title="formatDate(date)" color="green" v-for="date in Object.keys(credits)" :key="date">
                            <ul>
                                <li v-for="item in credits[date]" :key="item.id">
                                    <div>{{ item.name }}</div>
                                    <div class="flex justify-between">
                                        <div>
                                            <span class="font-thin">Price: </span>
                                        <q-chip dense color="green" text-color="secondary">P{{ item.price }}</q-chip>
                                        <q-chip dense color="orange" text-color="secondary">x{{ item.qty }}</q-chip>
                                        </div>

                                        <div>
                                            <span class="font-thin">
                                                Total:
                                            </span>
                                            <span>
                                                P{{item.total}}
                                            </span>
                                        </div>
                                       
                                    </div>
                                </li>
                            </ul>
                        </q-timeline-entry>




                    </q-timeline>

                </q-tab-panel>

                <q-tab-panel name="payment">

                    
                   <ul>

                    <li class="flex justify-between" v-for="item in payments" :key="item.id">
                        <span class="text-lg">{{ formatDate(item.date) }}</span>
                        <span class="text-lg font-bold text-green-700">-P{{ item.payment }}</span>
                    </li>
                   </ul>
                  
                </q-tab-panel>

            </q-tab-panels>

        </div>


    </div>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoanStore } from '@/stores/loans';
import { computed, ref } from 'vue';
import { date } from 'quasar'


const groupedDatabyDate = (items) => {
    const grouped = {};
    items.forEach(item => {
        if (!grouped[item.date]) {
            grouped[item.date] = [];
        }
        grouped[item.date].push(item);
    });
    return grouped;
}
export default {
    components: { BreadCrumbs },
    setup() {
        const route = useRoute()
        
        const id = route.params.id

        const loanStore = useLoanStore()

        const lender = ref(loanStore.getLender(id))

        const credits = computed(() => {
            return groupedDatabyDate(lender.value.credits)
        })
        const payments = computed(()=>{
            return lender.value.payments
        })

        return {
            lender,
            credits,
            tab: ref('credit'),
            payments,
            formatDate:( _date)=>{
                return  date.formatDate(_date, 'MMM D, YYYY')
            }
        }

    }

}
</script>

<style></style>
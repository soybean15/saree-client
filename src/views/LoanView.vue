<template>
    <div class="q-pa-md">
        <bread-crumbs/>
        
        <q-table title="Mga Pautang" :rows="lenders" :columns="columns" :grid="$q.screen.xs" row-key="name" :filter="filter">
            <template #top-right>
                <div class="flex space-x-4">
                    <q-input dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>

                    <dialog-vue :title="'Add New Creditor'">
                        <template #button="{ open }">
                            <q-btn round color="primary" icon="add" @click="open($q.screen.xs ? 'bottom' : 'standard')" />
                        </template>

                        <template #body="{ closeDialog }">
                            <q-form @submit="onSubmit(closeDialog)" class="flex flex-col  w-full">
                                <div class="space-y-1">

                                    <q-input outlined v-model="newLender.name" label="Name" class="w-full" :rules="[
                                        val => (val && val.length > 0) || 'Name is Required'
                                    ]" />
                                    <q-input outlined v-model="newLender.total_credit" label="Credits" type="number"
                                        class="w-full" />

                                    <q-btn type="submit" class="my-2" color="primary" label="Add" />

                                </div>

                            </q-form>

                        </template>

                    </dialog-vue>


                </div>

            </template>


            <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                    <q-card flat bordered>
                        <q-card-section class="text-center">
                            <div class="flex justify-between items-center">

                                <strong class="text-xl">{{ props.row.name }}</strong>
                                <q-btn flat round color="primary" icon="history" />
                            </div>



                        </q-card-section>
                        <q-separator />

                        <div class="w-full  px-5 ">
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Credit</span>
                                <q-chip dense color="primary" text-color="white">
                                    P{{ props.row.total_credit }}
                                </q-chip>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Paid</span>
                                <q-chip dense color="accent" text-color="white">
                                    P{{ props.row.total_paid }}
                                </q-chip>

                            </div>
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Balance</span>
                                <q-chip dense color="green" text-color="white">
                                    P{{ props.row.total_credit - props.row.total_paid }}
                                </q-chip>
                            </div>


                            <div class="flex justify-end py-3 ">
                                <q-btn-group>
                                  
                                    <q-btn dense color="green" text-color="white" label="Payment" />
                                    <q-btn dense color="secondary" :to="{name:'addCredit',params:{id:props.row.id}}" text-color="primary" label="Add Credit" />
                                    <q-btn dense color="red" text-color="white" label="Remove"  @click="loanStore.removeLender(props.row.id)" />
                                </q-btn-group>

                            </div>

                        </div>

                    </q-card>
                </div>
            </template>



            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        {{ props.row.name }}
                    </q-td>
                    <q-td key="total_credit" :props="props">
                        <q-chip dense color="primary" text-color="white">
                            P{{ props.row.total_credit }}
                        </q-chip>
                    </q-td>
                    <q-td key="total_paid" :props="props">
                        <q-chip dense color="accent" text-color="white">
                            P{{ props.row.total_paid }}
                        </q-chip>

                    </q-td>
                    <q-td key="balance" :props="props">
                        <q-chip dense color="green" text-color="white">
                            P{{ props.row.total_credit - props.row.total_paid }}
                        </q-chip>
                    </q-td>

                    <q-td>
                        <div class="flex justify-center">
                            <q-btn-dropdown color="primary" label=" Actions">
                                <q-list>
                                    <q-item clickable v-close-popup >
                                        <q-item-section>
                                            <q-item-label>History</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>
                                            <q-item-label>Payment</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup :to="{name:'addCredit',params:{id:props.row.id}}" >
                                        <q-item-section>
                                            <q-item-label>Add Credit</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="loanStore.removeLender(props.row.id)">
                                        <q-item-section>
                                            <q-item-label>Remove</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                </q-list>
                            </q-btn-dropdown>
                        </div>






                    </q-td>
                </q-tr>
            </template>

        </q-table>
        <div class="italic text-gray-600 my-4">Note : Please note that this application saves all data locally in your browser's storage.</div>
    </div>
</template>
  
<script>
import DialogVue from '@/components/Dialog.vue'
import { ref } from 'vue'
import { useLoanStore } from '@/stores/loans';
import { storeToRefs } from 'pinia';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
const columns = [
    {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },

    {
        name: 'total_credit',
        required: true,
        label: 'Credits',
        align: 'left',
        field: row => row.total_credit,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'total_paid',
        required: true,
        label: 'Paid',
        align: 'left',
        field: row => row.total_paid,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'balance',
        required: true,
        label: 'Balance',
        align: 'left',
        field: row => row.balance,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'action',
        required: true,
        label: 'Action',
        align: 'center',

    },

]

const rows = [
    {
        name: 'Marie',
        total_credit: 159,
        total_paid: 100
    },
    {
        name: 'John',
        total_credit: 200,
        total_paid: 150
    },
    {
        name: 'Emily',
        total_credit: 100,
        total_paid: 80
    },
    {
        name: 'Michael',
        total_credit: 300,
        total_paid: 200
    },
    {
        name: 'Sarah',
        total_credit: 250,
        total_paid: 200
    },
    {
        name: 'David',
        total_credit: 180,
        total_paid: 120
    },
    {
        name: 'Anna',
        total_credit: 220,
        total_paid: 180
    },
    {
        name: 'James',
        total_credit: 150,
        total_paid: 100
    },
    {
        name: 'Sophia',
        total_credit: 280,
        total_paid: 250
    },
    {
        name: 'Daniel',
        total_credit: 210,
        total_paid: 180
    }
];


export default {
    components: { DialogVue ,BreadCrumbs},
    setup() {

        const loanStore = useLoanStore()
        const { lenders } = storeToRefs(loanStore)

        const newLender = ref({
          
            name: '',
            total_credit: 0,
            total_paid: 0,
            credits:[]
        })

        return {
            columns,
            rows,
            filter: ref(''),
            lenders,
            loanStore,
            newLender,
            onSubmit:   (closeDialog) => {
                loanStore.addLender({...newLender.value},()=>{
              
                newLender.value.name=''
                closeDialog()
                newLender.value.total_credit=0
                })
               
           
               
            }
        }
    }
}
</script>
  
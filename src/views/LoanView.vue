<template>
    <div class="q-pa-md">
        <q-table title="Creditor" :rows="rows" :columns="columns" :grid="$q.screen.xs" row-key="name" :filter="filter">
            <template #top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>


            <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                    <q-card flat bordered>
                        <q-card-section class="text-center">
                            <div class="flex justify-between items-center">

                                <strong class="text-xl">{{ props.row.name }}</strong>
                                <div>
                                    <q-btn-group>
                                        <q-btn  color="accent" text-color="primary"  label="Payment" />
                                        <q-btn  color="secondary" text-color="primary"  label="Add Loan" />

                                    </q-btn-group>

                                </div>
                            </div>



                        </q-card-section>
                        <q-separator />

                        <div class="w-full  px-5 ">
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Credit</span>
                                <q-chip dense @click="onClick" color="primary" text-color="white">
                                    P{{ props.row.total_credit }}
                                </q-chip>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Paid</span>
                                <q-chip dense @click="onClick" color="accent" text-color="white">
                                    P{{ props.row.total_paid }}
                                </q-chip>

                            </div>
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Balance</span>
                                <q-chip dense @click="onClick" color="green" text-color="white">
                                    P{{ props.row.total_credit - props.row.total_paid }}
                                </q-chip>
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
                        <q-chip dense @click="onClick" color="primary" text-color="white">
                            P{{ props.row.total_credit }}
                        </q-chip>
                    </q-td>
                    <q-td key="total_paid" :props="props">
                        <q-chip dense @click="onClick" color="accent" text-color="white">
                            P{{ props.row.total_paid }}
                        </q-chip>

                    </q-td>
                    <q-td key="balance" :props="props">
                        <q-chip dense @click="onClick" color="green" text-color="white">
                            P{{ props.row.total_credit - props.row.total_paid }}
                        </q-chip>
                    </q-td>

                    <q-td>
                        <div class="flex justify-center">
                            <q-btn-dropdown color="primary" label=" Actions">
                                <q-list>
                                    <q-item clickable v-close-popup @click="onItemClick">
                                        <q-item-section>
                                            <q-item-label>Payment</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <q-item clickable v-close-popup @click="onItemClick">
                                        <q-item-section>
                                            <q-item-label>Add Loan</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                </q-list>
                            </q-btn-dropdown>
                        </div>






                    </q-td>
                </q-tr>
            </template>

        </q-table>
    </div>
</template>
  
<script>
import { ref } from 'vue'
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
    setup() {
        return {
            columns,
            rows,
            filter: ref(''),
        }
    }
}
</script>
  
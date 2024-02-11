<template>
    <div class="q-pa-md">
        <bread-crumbs />


        <div class="flex justify-between font-bold px-3 text-xl mt-5">
            <span>Mga Pautang</span>
            <q-btn color="accent" text-color="primary"  icon-right="archive" label="Export" no-caps @click="exportTable" />
        </div>
        <q-table :rows="lenders" :columns="columns" :grid="$q.screen.xs" row-key="name" :filter="filter">
          
            <template #top>
                <div class="flex space-x-4">
                    <q-input  dense debounce="300" v-model="filter" placeholder="Search">
                        <template v-slot:append>
                            <q-icon  name="search" />
                        </template>
                    </q-input>

                    <dialog-vue :title="'Add New Creditor'">
                        <template #button="{ open }">
                            <q-btn rounded color="primary" icon-right="add" label="Add Lender" @click="open($q.screen.xs ? 'bottom' : 'standard')" />
                        </template>

                        <template #body="{ closeDialog }">
                            <q-form @submit="onSubmit(closeDialog)" class="flex flex-col  w-full">
                                <div class="space-y-1">

                                    <q-input outlined v-model="newLender.name" label="Name" class="w-full" :rules="[
                                        val => (val && val.length > 0) || 'Name is Required'
                                    ]" />
                                    <q-input outlined v-model="newLender.total_credit" label="Credits" type="number"
                                        class="w-full" />

                                    <div class="flex justify-end mb-10">
                                        <q-btn type="submit" class="my-2" color="primary" label="Submit" />
                                    </div>



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

                                <strong class="text-xl">{{ props.row.name }} <q-badge color="green"
                                        v-if="(props.row.total_credit - props.row.total_paid) == 0">Paid</q-badge></strong>
                                <q-btn :to="{ name: 'creditHistory', params: { id: props.row.id } }" flat round color="primary"
                                    icon="history" />
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
                                    P{{ parseInt(props.row.total_paid) }}
                                </q-chip>

                            </div>
                            <div class="flex justify-between items-center">
                                <span class="font-bold">Total Balance</span>
                                <q-chip dense color="green" text-color="white">
                                    P{{ props.row.total_credit - props.row.total_paid }}
                                </q-chip>
                            </div>


                            <div class="flex justify-between py-3 ">


                                <payment-modal :id="props.row.id">
                                    <template #button="{ open }">
                                        <q-btn dense color="green" text-color="white" label="Payment"
                                            @click="open('bottom')"
                                            :disable="(props.row.total_credit - props.row.total_paid) == 0" />

                                    </template>
                                </payment-modal>
                                <div>
                                    <q-btn dense color="accent" :to="{ name: 'addCredit', params: { id: props.row.id } }"
                                        text-color="primary" label="Add Credit" />
                                    <q-btn dense color="red" text-color="white" label="Remove"
                                        @click="loanStore.removeLender(props.row.id)" />
                                </div>



                            </div>

                        </div>

                    </q-card>
                </div>
            </template>



            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="name" :props="props">
                        <span>{{ props.row.name }}</span> <q-badge color="green"
                            v-if="(props.row.total_credit - props.row.total_paid) == 0">Paid</q-badge>
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
                                    <q-item clickable v-close-popup :to="{ name: 'creditHistory', params: { id: props.row.id } }">
                                        <q-item-section>
                                            <q-item-label>History</q-item-label>
                                        </q-item-section>
                                    </q-item>

                                    <payment-modal :id="props.row.id">
                                        <template #button="{ open }">
                                            <q-item clickable @click="open('standard')"
                                                :disable="(props.row.total_credit - props.row.total_paid) == 0">
                                                <q-item-section>
                                                    <q-item-label>Payment</q-item-label>
                                                </q-item-section>

                                            </q-item>
                                        </template>
                                    </payment-modal>

                                    <q-item clickable v-close-popup :to="{ name: 'addCredit', params: { id: props.row.id } }">
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
        <div class="italic text-gray-600 my-4">
  Note: This application saves all data locally in your browser's storage.
  Make sure to export your data for backup if you plan to clear your browser's data.
</div>

    </div>
</template>
  
<script>
import DialogVue from '@/components/Dialog.vue'
import PaymentModal from '@/components/PaymentModal.vue';
import { ref } from 'vue'
import { useLoanStore } from '@/stores/loans';
import { storeToRefs } from 'pinia';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import { exportData } from '@/utils/exportJson'
import { exportFile } from 'quasar'
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
        field: row => row.total_credit - row.total_paid,
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



function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
    components: { DialogVue, BreadCrumbs, PaymentModal },
    setup() {

        const loanStore = useLoanStore()
        const { lenders } = storeToRefs(loanStore)

        const newLender = ref({

            name: '',
            total_credit: null,
            total_paid: null,
            credits: [],
            payments: []
        })

        return {
            columns,
      
            filter: ref(''),
            lenders,
            loanStore,
            newLender,
            exportData,
            onSubmit: (closeDialog) => {
                loanStore.addLender({ ...newLender.value }, () => {

                    newLender.value.name = ''
                    closeDialog()
                    newLender.value.total_credit = 0
                })



            },
            exportTable() {

                if(confirm('Export Data to CSV?')){
                    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                    lenders.value.map(row => columns.map(col => wrapCsvValue(
                        typeof col.field === 'function'
                            ? col.field(row)
                            : row[col.field === void 0 ? col.name : col.field],
                        col.format,
                        row
                    )).join(','))
                ).join('\r\n')

                const status = exportFile(
                    'table-export.csv',
                    content,
                    'text/csv'
                )

                if (status !== true) {
                    $q.notify({
                        message: 'Browser denied file download...',
                        color: 'negative',
                        icon: 'warning'
                    })
                }
                }
               
                
            }
        }
    }
}
</script>
  
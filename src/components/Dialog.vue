<template>
    <div class="">
        <slot name="button" :open="open"></slot>
      <!-- <q-btn label="Top" icon="keyboard_arrow_up" color="primary" @click="open('top')" />
      <q-btn label="Right" icon="keyboard_arrow_right" color="primary" @click="open('right')" />
      <q-btn label="Bottom" icon="keyboard_arrow_down" color="primary" @click="open('bottom')" />
      <q-btn label="Left" icon="keyboard_arrow_left" color="primary" @click="open('left')" />
   -->
      <q-dialog v-model="dialog" :position="position">
        <q-card :style="{'width':$q.screen.xs ? '350px': '600px'}">
          <q-card-section class="row items-center no-wrap">
          <div class="text-xl font-bold">Add New Creditor</div>
          </q-card-section>
          <q-separator/>
         
  
          <q-card-section class="row items-center no-wrap">
            <slot name="body" :closeDialog="closeDialog">

            </slot>
           
            <q-space />
  
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
  
    setup () {
      const dialog = ref(false)
      const position = ref('top')
  
      return {
        dialog,
        position,
  
        open (pos) {
         
          position.value = pos
          dialog.value = true
        },
        closeDialog(){
          dialog.value = false
        }
      }
    }
  }
  </script>
  
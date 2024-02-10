<template>

    <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay

        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-accent' : 'bg-secondary'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <q-item clickable @click="activeNav = item.name" v-ripple :active="item.name == activeNav" v-for="item in navItems" :key="item.key">
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                {{item.label}}
              </q-item-section>
            </q-item>

            
            <q-separator />

          </q-list>
        </q-scroll-area>
      </q-drawer>
</template>

<script>
import { ref } from 'vue'
import { useNavStore } from '@/stores/nav'
import { storeToRefs } from 'pinia'

export default {
  setup () {
    const nav = useNavStore()

    const {drawer ,navItems, activeNav}  = storeToRefs(nav)

    
    return {
      drawer,
      miniState: ref(true),
      navItems,
      activeNav
    }
  }
}
</script>

<style>

</style>
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
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="storefront" />
              </q-item-section>

              <q-item-section>
                Stores
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="shopping_bag" />
              </q-item-section>

              <q-item-section>
                Explore
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

    const {drawer}  = storeToRefs(nav)
    return {
      drawer,
      miniState: ref(true)
    }
  }
}
</script>

<style>

</style>
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavStore = defineStore('nav', () => {
  
  
    const drawer = ref(false)
    const activeNav = ref('home')

    const navItems =ref([
        {
            label: 'Home',
            name: 'home',
            icon: 'home'
        },
        {
            label: 'Stores',
            name: 'stores',
            icon: 'storefront'
        },
        {
            label: 'Explore',
            name: 'explore',
            icon: 'shopping_bag'
        },
    ])
    return { drawer, navItems,activeNav }
  })
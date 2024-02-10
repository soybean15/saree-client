<template>
    <div class="flex justify-between items-center w-full px-1 md:px-10 py-3 ">


        <div class="flex items-center">
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="flex md:hidden q-mr-sm" />
            <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            <span class="px-1 font-bold text-secondary">Sukii</span>
        </div>
        <div class="nav-list ">
            
            <ul class=" flex tw-hidden md:flex space-x-5 items-center">

                <li class="cursor-pointer " @click="navigate(item.name)" :class="{'text-accent':item.name == activeNav}" v-for="item in navItems" :key="item.name">{{item.label}}</li>
                

            </ul>

        </div>
        <div>
            <ul class="flex space-x-3 text-lg">


                <li>Login</li>
                <li>Sign up</li>

            </ul>
        </div>
    </div>
</template>

<script>
import {useNavStore} from '@/stores/nav'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const nav = useNavStore()
        const {drawer, navItems, activeNav} = storeToRefs(nav)

       
        const router = useRouter()
        return {
            drawer,
            navItems,
            activeNav,
         
            navigate:(name)=>{
                activeNav.value = name
                router.push({name:name})

            }
        }
    }

}
</script>

<style scoped>


@media only screen and (max-width: 768px) {
    .nav-list {
        display: none; /* Hide .nav-list on mobile */
    }
}

/* Media query for devices with a minimum width of 769px (typical for desktop screens) */
@media only screen and (min-width: 769px) {
    .nav-list {
        display: block; /* Display .nav-list on desktop */
        /* Additional styles for desktop if needed */
    }
}


</style>
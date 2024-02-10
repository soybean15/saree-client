<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
         <NavBar/>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>


    <drawer/>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import Drawer from './components/Drawer.vue';
import NavBar from './components/NavBar.vue';
export default {
  components:{NavBar,Drawer}

}
</script>

<style scoped>
.bg-main{
  background-color: #092635;
}
</style>
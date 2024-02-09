<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
         <NavBar/>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>
import NavBar from './components/NavBar.vue';
export default {
  components:{NavBar}

}
</script>

<style scoped>
.bg-main{
  background-color: #092635;
}
</style>
<template>
   <q-breadcrumbs >
    <q-breadcrumbs-el to="/" label="Home" />
     
      <q-breadcrumbs-el :to="{name:route.name}" :label="route.label" v-for="route in routes" :key="route.name" />
     
    </q-breadcrumbs>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default {

    setup(){
        const route = useRoute()
        const routes = ref(route.meta.routes)
        return {routes}
    }
}
</script>

<style>

</style>
<template>
    <div class="flex justify-between w-full px-10 py-3 ">


        <div>
            <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            <span class="px-1 font-bold text-secondary">Saree</span>
        </div>
        <div class="nav-list ">
            <ul class=" flex tw-hidden md:flex space-x-5 items-center">

                <li class="cursor-pointer">Home</li>
                <li  class="cursor-pointer">Stores</li>
                <li class="cursor-pointer">Explore</li>


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
export default {

}
</script>

<style scoped>

.nav-list{

}

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
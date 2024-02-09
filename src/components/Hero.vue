<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 bg-primary w-full  px-20  2xl:px-40   pt-32 pb-20">
        <div class=" pt-10 ">

            <!-- <span class="glow-text  bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400  text-4xl inline-block text-transparent bg-clip-text  font-bold" >Hello</span> -->

            <span class="text-5xl lg:text-5xl xl:text-8xl  font-extrabold text-secondary order-last lg:order-first">Discover daily essentials with ease</span>
            <div class="my-5 space-x-3">
                <q-btn   color="accent" text-color="primary" label="Explore" size="20px" />
                <q-btn   outline color="accent" text-color="accent" label="Get Started" size="20px" />
            </div>
        </div>
      

            <div class="flex  lg:px-10 md:px-20 lg:px-20   2xl:px-40 justify-center order-first lg:order-last">
                <div  class="z-10 w-full  bg-secondary rounded-full">
                    <img src="@/assets/img/hero-image.png" />
                </div>
  

                
            
            </div>




      

    </div>
</template>

<script>
export default {

}
</script>

<style>

.z-10{
    z-index: 10 !important;
}
.z-0{
    z-index: 0 !important;
}
</style>
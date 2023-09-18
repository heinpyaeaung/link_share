<template>
    <div v-for="info of props.data" class="p-3 w-11/12 md:w-3/12 border-2 border-secondary shadow-md mt-3 md:mr-3 bg-primary">
       <div class="flex flex-col items-center justify-center">
            <img class="rounded-full border-2 border-main w-28" :src="info.profile" alt="user-profile">
            <h2 class="font-semibold uppercase mt-1">{{ info.name }}</h2>
       </div>
       <div class="mt-3 space-y-3">
           <profileboxLink/>
       </div>
    </div>
    <div v-for="info of props.data" class="p-3 w-11/12 md:w-3/12 border-2 border-secondary shadow-md mt-3 mr-3 bg-primary">
       <div class="flex flex-col items-center justify-center">
            <img class="rounded-full border-2 border-main w-28" :src="info.profile" alt="user-profile">
            <h2 class="font-semibold uppercase mt-1">{{ info.name }}</h2>
       </div>
       <div class="mt-3 space-y-3">
           <profileboxLink/>
       </div>
    </div>
    <div v-for="info of props.data" class="p-3 w-11/12 md:w-3/12 border-2 border-secondary shadow-md mt-3 mr-3 bg-primary">
       <div class="flex flex-col items-center justify-center">
            <img class="rounded-full border-2 border-main w-28" :src="info.profile" alt="user-profile">
            <h2 class="font-semibold uppercase mt-1">{{ info.name }}</h2>
       </div>
       <div class="mt-3 space-y-3">
           <profileboxLink/>
       </div>
    </div>
    <div v-for="info of props.data" class="p-3 w-11/12 md:w-3/12 border-2 border-secondary shadow-md mt-3 mr-3 bg-primary">
       <div class="flex flex-col items-center justify-center">
            <img class="rounded-full border-2 border-main w-28" :src="info.profile" alt="user-profile">
            <h2 class="font-semibold uppercase mt-1">{{ info.name }}</h2>
       </div>
       <div class="mt-3 space-y-3">
           <profileboxLink/>
       </div>
    </div>
    <div v-for="info of props.data" class="p-3 w-11/12 md:w-3/12 border-2 border-secondary shadow-md mt-3 mr-3 bg-primary">
       <div class="flex flex-col items-center justify-center">
            <img class="rounded-full border-2 border-main w-28" :src="info.profile" alt="user-profile">
            <h2 class="font-semibold uppercase mt-1">{{ info.name }}</h2>
       </div>
       <div class="mt-3 space-y-3">
           <profileboxLink/>
       </div>
    </div>
</template>

<script setup>
import profileboxLink from './profileboxLink.vue';
import {defineProps, onMounted} from 'vue'

const props = defineProps(['data']);
onMounted(() => {
    console.log(props.data[0].links)
})
</script>
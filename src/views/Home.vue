<template>
    <div>
        <Alertbox @triggerAlert="alertMessage=''" :error="alertMessage"/>
        <Navbar/>
        <div v-if="infosData" class="flex md:flex-wrap md:flex-row flex-col items-center justify-center">
            <Profilebox :data="infosData"/>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/navbar.vue';
import Alertbox from '../components/alertbox.vue';
import Profilebox from '../components/profilebox.vue';
import Infos from '../../https/infos.js';
import {useRouter} from 'vue-router';
import {ref, onMounted} from 'vue';
let router = useRouter();
let alertMessage = ref('');
let infosData = ref('');

let fetchAllData = async() => {
    let {infos, error} = (await Infos.fetchall()).data;
    if(error){
        // router.push({name: 'register'})  
        return alertMessage.value = error
    };  
    infosData.value = infos
}
fetchAllData();
</script>
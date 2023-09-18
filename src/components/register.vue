<template>
    <AlertBox @triggerAlert="alertMessage=''" :error="alertMessage"/>
    <div class="flex items-center justify-center min-h-screen bg-secondary">
        <form @submit.prevent="login" v-if="formToggle" class="w-11/12 md:w-1/2 lg:w-1/3 bg-primary rounded-md space-y-12 px-8 py-4 shadow-lg mx-auto my-auto flex flex-col">
            <h1 class="text-3xl font-bold text-main text-center">Login</h1>
            <input v-model="email" class="rounded-sm p-1 outline-none border-b-2 bg-primary" type="email" placeholder="Email" required>
            <input v-model="password" class="rounded-sm p-1 outline-none border-b-2 bg-primary" type="password" placeholder="password" required>
            <button type="submit" class="px-12 py-2 bg-main self-center rounded-md hover:scale-105 hover:shadow-md transition-all delay-75">Log In</button>
            <p class="text-center text-sm">Don't you have an account? <span @click="formToggle = !formToggle" class="underline cursor-pointer">register here!</span></p>
        </form>
        <form v-else @submit.prevent="register" class="w-11/12 md:w-1/2 lg:w-1/3 bg-primary rounded-md space-y-12 px-8 py-4 shadow-lg mx-auto my-auto flex flex-col">
            <h1 class="text-3xl font-bold text-main text-center">Sing up</h1>
            <input v-model="username" class="rounded-sm p-1 outline-none border-b-2 bg-primary" type="text" placeholder="Username" required>
            <input v-model="email" class="rounded-sm p-1 outline-none border-b-2 bg-primary" type="email" placeholder="Email" required>
            <input v-model="password" class="rounded-sm p-1 outline-none border-b-2 bg-primary" type="password" placeholder="password" required>
            <button type="submit" class="px-12 py-2 bg-main self-center rounded-md hover:scale-105 hover:shadow-md transition-all delay-75">Register</button>
            <p class="text-center text-sm">Already have an account? <span @click="formToggle = !formToggle" class="underline cursor-pointer">log in here!</span></p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import Auth from '../../https/auth.js';
import AlertBox from './alertbox.vue'
let formToggle = ref(true);
let username = ref('');
let email = ref('');
let password = ref('');
let alertMessage = ref('');
let router = useRouter();
let register = async() => {
    try{
        let payload = {
            username: username.value,
            email: email.value,
            password: password.value
        }
        let {message, error} = (await Auth.register(payload)).data;
        if(error){
            return alertMessage.value = error
        }
        alertMessage.value = message;
        username.value = "";
        email.value = "";
        password.value = "";
    }catch(err){
        alertMessage.value = err.message;
    }
}

let login = async() => {
    try{
        let payload = {
            email: email.value,
            password: password.value
        }
        let {message, error} = (await Auth.logging(payload)).data;
        if(error) return alertMessage.value = error;
        router.push({name: 'home'})
    }catch(err){
        return alertMessage.value = err.message;
    }
}
</script>

<style lang="scss" scoped>

</style>
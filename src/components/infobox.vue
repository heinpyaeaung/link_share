<template>
    <div class="md:w-3/5 bg-primary border-secondary border-2 mt-5 py-6 rounded-md mx-auto drop-shadow-md">
        <div class="flex justify-between px-3 md:px-5 pb-3">
            <div><h2 class="font-bold text-lg text-faint">{{ props.label }}</h2></div>
            <div @click="removeInfoBox(props.label)" class="active:text-danger hover:cursor-pointer text-lg text-faint select-none"><p>Remove</p></div>
        </div>
        <div class="w-full px-5 md:px-10">
            <label for="social-icons">Platform</label>
            <select @change="[addselectedValue($event), handleChange(props.label)]" class="peer h-full w-full rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 placeholder-shown:border mt-2" id="social-icons">
                <!-- <option value="others">Choose one</option> -->
                <option class="flex w-full justify-between" v-for="(option, index) in props.options" :key="index" :value="option.value">     
                    {{ option.label }}
                </option>
            </select>
            <input @input="handleChange(props.label)" v-model="socialLink" placeholder="paste above social media link here" class="w-full mt-6 rounded-[7px] border order-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal" id="link" type="text">
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue';
let socialLink = ref('');
let selectedValue = ref('')
const props = defineProps(['options', 'label']);
const emits = defineEmits(['input', 'removeInfoBox']);
const handleChange = (label) => {
    emits('input', {header: label, icon: selectedValue.value, link: socialLink.value})
};
const addselectedValue = (e) => {
    selectedValue.value = e.target.value;
}
const removeInfoBox = (v) => {
    emits('removeInfoBox', v)
}
</script>
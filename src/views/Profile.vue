<template>
    <div class="min-h-screen">
        <Navbar/>
        <div>
            <section>
                <div class="md:w-3/5 bg-primary px-10 py-6 mt-5 rounded-md mx-auto drop-shadow-md">
                    <div class="flex flex-col justify-center items-center space-y-2 group/img">
                        <div class="overflow-hidden rounded-full border-2 border-main bg-secondary w-24 h-24 flex items-center justify-center">
                            <label for="profile-pic">
                                <img v-if="profilePic" class="h-24 w-24 hover:cursor-cell" :src="profilePic" alt="user-profile">
                                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-14 h-14 hover:cursor-cell ">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </label>
                            <input class="hidden" id="profile-pic" type="file" @input="selectProfilePic" accept=".jpg, .png, .jpeg">
                        </div>
                        <div class="group/editname">
                            <span v-if="!editName" class="space-x-2 text-lg">
                                <p class="text-center font-semibold cursor-pointer">{{ username }}</p>
                                <button class="invisible group-hover/editname:visible text-sm shadow-md absolute p-1 rounded-sm" @click="editName = !editName">Change Name</button>
                            </span>
                            <input @keypress.enter="editName = !editName" v-else class="text-center text-lg font-semibold" type="text" v-model="username">
                        </div>
                    </div>
                </div>
            </section>
            <section class="px-1 md:px-0">
                <div class="space-y-5 md:w-3/5 bg-primary px-10 py-6 mt-5 rounded-md mx-auto drop-shadow-md">
                    <h2 class="text-2xl font-bold">Customize your links</h2>
                    <p class="text-sm">Add/Edit/Remove links below and share all your profiles with the world</p>
                    <div>
                        <label for="image">
                            <div @click="addNewLink" class="w-full space-x-2 flex justify-center items-center text-lg text-main px-4 py-2 rounded-md cursor-crosshair border-main border-2 active:bg-main active:text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <h2>
                                    Add your new link
                                </h2>
                            </div>
                        </label>
                    </div>
                </div>
            </section> 
            <section v-for="(item, index) in countInfoBox" class="space-y-5 px-5 md:px-0">
                <InfoBox :options="selectOptions" :label="item.label" :key="index" @input="handleInput" @removeInfoBox="removeInfoBox"/>       
            </section>  
            <section v-show="countInfoBox.length > 0" class="mt-4">
                <button class="w-10/12 md:w-1/3 mx-auto flex justify-center items-center text-lg text-secondary bg-main px-4 py-2 rounded-md cursor-pointer active:shadow-md" @click="uploadingInfos">Upload</button>
            </section>      
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/navbar.vue';
import InfoBox from '../components/infobox.vue'
import {ref, onMounted, onUnmounted, onUpdated} from 'vue';
import InfosOfHttp from '../../https/infos.js';
import axios from 'axios';
let username = ref('Eddins Smith');
let editName = ref(false);
let profilePic = ref('');
let profileURL = ref('')
const countInfoBox = ref();
const infoBoxData = ref([]);
const selectOptions = ref([
    { label: 'Facebook', value: 'facebook' },
    { label: 'X', value: 'x' },
    { label: 'Instagram', value: 'instagram' },
]);
countInfoBox.value = JSON.parse(sessionStorage.getItem("setStorageOfInfoBox")) || [];

const selectProfilePic = (e) => {
    profilePic.value = URL.createObjectURL(e.target.files[0]);
    profileURL.value = e.target.files[0];
    console.log('selected pic', profileURL.value)
}

const addNewLink = () => {
    countInfoBox.value.push({label: `Link #${countInfoBox.value.length + 1}`, selectedOption: {}, link: ''})
}

const removeInfoBox = (v) => {
    countInfoBox.value = countInfoBox.value.filter(box => box.label !== v)
    .map((box, index) => {      
       return {
            ...box,
            label: `Link #${index + 1}`
       }
    })
    infoBoxData.value = infoBoxData.value.filter(data => data.header !== v)
    .map((data, index) => {return {...data, header: `Link #${index + 1}`}})

    console.log(infoBoxData.value)
}

const handleInput = (v) => {
    if(infoBoxData.value.length == 0) return infoBoxData.value.push(v);
    for(let obj of infoBoxData.value){
        if(obj.header === v.header){
            obj.header = v.header
            obj.link = v.link;
            obj.icon = v.icon || 'facebook';
            return;
        }
    }
    infoBoxData.value.push(v);
}
const uploadingInfos = async () => {
    try{
        if(!profilePic.value) return;
        let formDataOfImage = new FormData();
        formDataOfImage.set('upload_preset', "link_share");
        formDataOfImage.set('file', profileURL.value);
        let bufferCl_img = await axios.post('https://api.cloudinary.com/v1_1/drtoeefis/image/upload', formDataOfImage,{
            headers: {"Content-Type": "multipart/form-data"}
        });
        let payload = {
            profile: bufferCl_img.data.url,
            name: username.value,
            links: infoBoxData.value
        }
        
        await InfosOfHttp.create(payload);
    }catch(err){
        console.log(err.message)
    }
}
onUpdated(() => {
    sessionStorage.setItem("setStorageOfInfoBox", JSON.stringify(countInfoBox.value));
})
onUnmounted(() => {
    sessionStorage.setItem("setStorageOfInfoBox", JSON.stringify(countInfoBox.value));
})
</script>
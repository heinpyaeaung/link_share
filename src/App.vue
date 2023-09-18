<template>
  <RouterView :key='$route.fullPath'/>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

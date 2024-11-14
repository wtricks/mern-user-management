<script setup lang="ts">
import { onBeforeMount } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import { useAuthStore } from './store/useAuthStore';

const authStore = useAuthStore()

onBeforeMount(() => authStore.fetchUser())
</script>

<template>
    <NavigationBar />
    <router-view></router-view>
</template>
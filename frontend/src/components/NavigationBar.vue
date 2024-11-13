<script setup lang="ts">
const isAuthenticated = false;
</script>

<template>
    <nav class="bg-blue-600 p-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="text-white text-2xl font-semibold">MyApp</div>
            <div class="hidden md:flex space-x-4">
                <router-link v-if="!isAuthenticated" to="/auth/signin" class="text-white hover:underline">Sign
                    In</router-link>
                <router-link v-if="!isAuthenticated" to="/auth/signup" class="text-white hover:underline">Sign
                    Up</router-link>
                <router-link v-if="isAuthenticated" to="/profile"
                    class="text-white hover:underline">Profile</router-link>
            </div>
            <div class="md:hidden">
                <!-- Mobile menu (hamburger) can be added here -->
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const getStarted = () => {
    if (authStore.isLoggedIn) {
        router.push("/profile")
    } else {
        router.push("/auth/signin")
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl sm:w-96">
            <h1 class="text-3xl font-semibold text-blue-600 mb-4">Welcome to User Management</h1>
            <p class="text-gray-700 mb-4">This is a simple, easy-to-use platform for managing users. Sign up, sign in,
                manage profiles, and more!</p>
            <div class="mt-6">
                <button @click="getStarted" class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Get Started</button>
            </div>
        </div>
    </div>
</template>
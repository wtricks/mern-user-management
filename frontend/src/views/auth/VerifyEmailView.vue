<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import api from '../../utils/api';

const route = useRoute();
const isVerified = ref(false)

onMounted(() => {
    const token = route.query.token;

    if (token) {
        api.post('/users/verify-token', { token })
            .then(() => {
                isVerified.value = true
            });
    }
})
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
            <h2 class="text-2xl font-semibold mb-4" :class="{'text-gray-800': isVerified, 'text-red-800': !isVerified}">
                {{ isVerified ? 'Email is verified': 'Link expired' }}
            </h2>
            <p class="text-gray-600 mb-4">
                {{ isVerified 
                    ? 'Your email address is verified, You can now signin to your account.' 
                    : 'It looks like your link is expired, try to reset your password.' }}
            </p>
            <div>
                <router-link to="/auth/signin" class="text-blue-500 hover:underline text-lg">Sign In</router-link>
            </div>
        </div>
    </div>
</template>
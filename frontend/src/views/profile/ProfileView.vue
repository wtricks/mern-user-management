<script type="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { useAuthStore } from "../../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore()

const user = ref({
    firstName: authStore.user?.firstName,
    lastName: authStore.user?.lastName,
    email: authStore.user?.email,
    avatar: authStore.user?.avatar || "https://via.placeholder.com/150"
});

const logout = () => {
    authStore.logout();

    toast.success("You have been logged out successfully.");
    router.push("/signin");
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl sm:w-96">
            <h2 class="text-2xl font-semibold mb-6 text-center">User Profile</h2>

            <div class="flex justify-center mb-6">
                <div class="relative">
                    <img class="w-24 h-24 rounded-full object-cover" :src="API_URL + '/' + user.avatar" alt="User Avatar" />
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <span class="font-medium">First Name:</span> {{ user.firstName }}
                </div>
                <div>
                    <span class="font-medium">Last Name:</span> {{ user.lastName }}
                </div>
                <div>
                    <span class="font-medium">Email:</span> {{ user.email }}
                </div>
            </div>

            <div class="mt-6 text-center flex items-center justify-center">
                <router-link to="/profile/edit" class="mr-1 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                    Edit Profile
                </router-link>
                <button @click="logout" class="bg-red-500 ml-1  text-white px-6 py-3 rounded-md hover:bg-red-600">
                    Logout
                </button>
            </div>

        </div>
    </div>
</template>
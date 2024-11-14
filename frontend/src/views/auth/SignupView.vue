<script type="ts" setup>
import { ref, computed } from "vue";
import { useToast } from 'vue-toast-notification'

import api from "../../utils/api";
import { signUp } from "../../services/users";

const toast = useToast();

const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const hasError = ref(false)
const isLoading = ref(false);

const validateForm = () => {
    hasError.value = false;

    if (!form.value.firstName) {
        hasError.value = true;
        toast.error("First name is required");
    }
    else if (!form.value.lastName) {
        hasError.value = true;
        toast.error("Last name is required");
    }
    else if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email)) {
        hasError.value = true;
        toast.error("Email is invalid");
    }
    else if (!form.value.password) {
        hasError.value = true;
        toast.error("Password is required");
    } else if (form.value.password.length < 6) {
        hasError.value = true;
        toast.error("Password must be at least 6 characters");
    }
    else if (form.value.password !== form.value.confirmPassword) {
        hasError.value = true;
        toast.error("Passwords do not match");
    }
};

const handleSubmit = async () => {
    validateForm();

    if (hasError.value) {
        return;
    }

    isLoading.value = true;

    signUp(form.value).then((res) => {
        form.value = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }

        toast.success("Account created successfully, please check your email to activate your account.");
    }).finally(() => isLoading.value = false);
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:w-96">
            <h2 class="text-2xl font-semibold text-center mb-6">Create an Account</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input v-model="form.firstName" type="text" id="firstName"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John"/>
                </div>

                <div class="mb-4">
                    <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input v-model="form.lastName" type="text" id="lastName"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Doe" />
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email" id="email"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@email.com" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" id="password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********" />
                </div>

                <div class="mb-4">
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm
                        Password</label>
                    <input v-model="form.confirmPassword" type="password" id="confirm-password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********" />
                </div>

                <button type="submit" :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                    class="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer active:opacity-70 transition">
                    <span v-if="isLoading">Loading...</span>
                    <span v-else>Sign Up</span>
                </button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-sm">Already have an account? <a href="/auth/signin"
                        class="text-blue-500 hover:underline">Sign In</a></p>
            </div>
        </div>
    </div>
</template>
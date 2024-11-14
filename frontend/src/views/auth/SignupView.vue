<script type="ts" setup>
import { ref, computed } from "vue";
import { useToast } from 'vue-toast-notification'

import api from "../../utils/api";

const toast = useToast();

const form = ref({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const errors = ref({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const isLoading = ref(false);

const isFormValid = computed(() => {
    return (
        form.value.firstname &&
        form.value.lastname &&
        (form.value.email && /\S+@\S+\.\S+/.test(form.value.email)) &&
        form.value.password &&
        form.value.password === form.value.confirmPassword
    );
});

const validateForm = () => {
    if (!form.value.firstname) {
        toast.error("First name is required.") 
    } else if (!form.value.lastname) {
        toast.error("Last name is required.") 
    } else if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email)) {
        toast.error("Valid email is required.") 
    } if (!form.value.password) {
        toast.error("Password is required.") 
    } else if (form.value.password.length < 6) {
        toast.error("Password length should be atleast 6.") 
    } else if (form.value.password != form.value.confirmPassword) {
        toast.error("Passwords do not match.")
    }
};

const handleSubmit = async () => {
    validateForm();

    if (Object.values(errors.value).some((error) => error)) {
        return;
    }

    isLoading.value = true;

    api.post("/users/signup", {
        firstname,
        lastname,
        email,
        password
    }).then((res) => {
        form.value = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }).finally(() => isLoading.value = false);
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:w-96">
            <h2 class="text-2xl font-semibold text-center mb-6">Create an Account</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
                    <input v-model="form.firstname" type="text" id="firstname"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John" :class="{ 'border-red-500': errors.firstname }" />
                    <span v-if="errors.firstname" class="text-red-500 text-sm">{{ errors.firstname }}</span>
                </div>

                <div class="mb-4">
                    <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
                    <input v-model="form.lastname" type="text" id="lastname"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Doe" :class="{ 'border-red-500': errors.lastname }" />
                    <span v-if="errors.lastname" class="text-red-500 text-sm">{{ errors.lastname }}</span>
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="form.email" type="email" id="email"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@email.com" :class="{ 'border-red-500': errors.email }" />
                    <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" id="password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********" :class="{ 'border-red-500': errors.password }" />
                    <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
                </div>

                <div class="mb-4">
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm
                        Password</label>
                    <input v-model="form.confirmPassword" type="password" id="confirm-password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********" :class="{ 'border-red-500': errors.confirmPassword }" />
                    <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
                </div>

                <button type="submit" :disabled="isLoading || !isFormValid" :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
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
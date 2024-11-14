<script type="ts" setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
import { forgetPassword } from "../../services/users";

const toast = useToast();

const form = ref({
    email: "",
});

const hasError = ref(false);
const isLoading = ref(false);

const validateForm = () => {
    hasError.value = false;

    if (!form.value.email || !/\S+@\S+\.\S+/.test(form.value.email)) {
        hasError.value = true;
        toast.error("Please enter a valid email address.");
    }
};

const handleSubmit = async () => {
    validateForm();

    if (hasError.value) {
        return;
    }

    isLoading.value = true;

    forgetPassword(form.value)
        .then((res) => {
            toast.success("Password reset link has been sent to your email.");
            form.value.email = "";
        })
        .finally(() => isLoading.value = false);
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:w-96">
            <h2 class="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Enter your email</label>
                    <input v-model="form.email" type="email" id="email"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@email.com" />
                </div>

                <button type="submit" :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
                    class="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer active:opacity-70 transition">
                    <span v-if="isLoading">Sending...</span>
                    <span v-else>Send Reset Link</span>
                </button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-sm">Remembered your password?
                    <a href="/signin" class="text-blue-500 hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    </div>
</template>

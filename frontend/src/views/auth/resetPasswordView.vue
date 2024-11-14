<script type="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import { resetPassword } from "../../services/users";

const toast = useToast();
const route = useRoute();
const router = useRouter();

const form = ref({
    password: "",
    confirmPassword: "",
});

const hasError = ref(false);
const isLoading = ref(false);
const token = ref("");

onMounted(() => {
    token.value = route.query.token ? String(route.query.token) : "";
});

const validateForm = () => {
    hasError.value = false;

    if (!form.value.password || form.value.password.length < 6) {
        hasError.value = true;
        toast.error("Password must be at least 6 characters.");
    } else if (form.value.password !== form.value.confirmPassword) {
        hasError.value = true;
        toast.error("Passwords do not match.");
    }
};

const handleSubmit = async () => {
    validateForm();

    if (hasError.value || !token.value) {
        return;
    }

    isLoading.value = true;

    resetPassword({ token: token.value, password: form.value.password })
        .then((res) => {
            toast.success("Your password has been reset successfully.");
            router.push("/auth/signin");
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
                    <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
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
                    <span v-if="isLoading">Resetting...</span>
                    <span v-else>Reset Password</span>
                </button>
            </form>
        </div>
    </div>
</template>

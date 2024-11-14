<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getAllUsers, deleteUser } from "../services/users"; // Adjust the import path as needed
import { useToast } from "vue-toast-notification";
import { User } from "../store/types";

const toast = useToast()

const searchQuery = ref("");
const users = ref<User[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchUsers = () => {
    console.log("Fetching users...");
    const params = {
        query: searchQuery.value,
        page: currentPage.value,
        limit: 10, 
        sortBy: '_id',
        sortOrder: 'asc' as 'asc' | 'desc',
    };

    getAllUsers(params).then((response) => {
        users.value = response.data.users;
        totalPages.value = response.data.total;
    })
};

// Handle deleting a user
const handleDelete = (id: string) => {
    deleteUser(id).then(() => {
        fetchUsers()
        toast.success("User deleted successfully.");
    })
};

const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage.value < totalPages.value) {
        currentPage.value++;
    } else if (direction === "prev" && currentPage.value > 1) {
        currentPage.value--;
    }
    fetchUsers();
};

onMounted(() => fetchUsers());

let timeoutId: number = 0;
watch(searchQuery, () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        currentPage.value = 1;
        fetchUsers()
    }, 100)
})
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold mb-4">Users List</h2>
            <div class="mb-4">
                <input type="text" v-model="searchQuery" placeholder="Search users..."
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div class="space-y-4">
                <div v-for="user in users" :key="user._id" class="flex justify-between items-center py-2 border-b">
                    <div>{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="flex space-x-2">
                        <router-link :to="`/users/${user._id}`" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</router-link>
                        <button @click="handleDelete(user._id)"
                            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                    </div>
                </div>
            </div>

            <div class="flex justify-between mt-6">
                <button @click="handlePagination('prev')"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    :disabled="currentPage === 1">Previous</button>
                <button @click="handlePagination('next')"
                    class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>
    </div>
</template>

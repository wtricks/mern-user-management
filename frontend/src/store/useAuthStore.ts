import { defineStore } from "pinia";

import { type User } from "./types";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    return {
        user
    }
})
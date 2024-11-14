import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { type User } from "./types";
import { getMe } from "../services/users";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const isLoggedIn = computed(() => user.value != null)

    const fetchUser = async () => {
        getMe().then((response) => {
            user.value = response.data;
        })
    }

    const signInUser = (newUser: User, accessToken: string) => {
        user.value = newUser;
        localStorage.setItem('authToken', accessToken);
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        user.value = null;
    }

    // Initial user
    // fetchUser();

    return {
        user,
        isLoggedIn,
        signInUser,
        logout
    }
})
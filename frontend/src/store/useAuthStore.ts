import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { type User } from "./types";
import api from "../utils/api";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const isLoggedIn = computed(() => user.value != null)

    const fetchUser = async () => {
        const response = await api.get('/users/me');
        if (response.data) {
            const { user, accessToken } = response.data as { user: User, accessToken: string };
            signupUser(user);

            localStorage.setItem('authToken', accessToken);
        }
    }

    const signupUser = (newUser: User) => {
        user.value = newUser;
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
        signupUser,
        logout
    }
})
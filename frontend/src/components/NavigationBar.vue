<script setup lang="ts">
import { useAuthStore } from '../store/useAuthStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <nav class="bg-blue-600 p-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-semibold">MyApp</div>

      <div class="hidden md:flex space-x-4">
        <template v-if="authStore.isLoggedIn">
          <router-link to="/profile" class="text-white hover:underline">Profile</router-link>
          <router-link to="/dashboard" class="text-white hover:underline">Dashboard</router-link>
        </template>
        <template v-else>
          <router-link to="/auth/signin" class="text-white hover:underline">Sign In</router-link>
          <router-link to="/auth/signup" class="text-white hover:underline">Sign Up</router-link>
        </template>
      </div>

      <div class="md:hidden">
        <button @click="toggleMobileMenu" class="text-white focus:outline-none">
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden bg-blue-600 text-white p-4 space-y-4 mt-4"
      >
        <template v-if="authStore.isLoggedIn">
          <router-link to="/profile" class="block hover:underline">Profile</router-link>
          <router-link to="/dashboard" class="block hover:underline">Dashboard</router-link>
        </template>
        <template v-else>
          <router-link to="/auth/signin" class="block hover:underline">Sign In</router-link>
          <router-link to="/auth/signup" class="block hover:underline">Sign Up</router-link>
        </template>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

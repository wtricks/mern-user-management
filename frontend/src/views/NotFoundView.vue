<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96">
            <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p class="text-gray-600 mb-4">Oops! The page you're looking for doesn't exist or has been moved.</p>
            <div>
                <router-link to="/" class="text-blue-500 hover:underline text-lg">Go Back to Home</router-link>
            </div>
        </div>
    </div>
</template>
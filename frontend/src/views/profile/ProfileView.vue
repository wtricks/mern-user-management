<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl sm:w-96">
            <h2 class="text-2xl font-semibold mb-6 text-center">User Profile</h2>

            <div class="flex justify-center mb-6">
                <div class="relative">
                    <img class="w-24 h-24 rounded-full object-cover" src="https://via.placeholder.com/150"
                    alt="User Avatar"
                    />
                    <button class="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m7 7h7m-7-7V5m0 7v7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <span class="font-medium">First Name:</span> John
                </div>
                <div>
                    <span class="font-medium">Last Name:</span> Doe
                </div>
                <div>
                    <span class="font-medium">Email:</span> example@email.com
                </div>
            </div>

            <div class="mt-6 text-center">
                <router-link to="/profile/edit" class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                    Edit Profile
                </router-link>
            </div>
        </div>
    </div>
</template>
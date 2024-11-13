<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold mb-4">Users List</h2>
            <div class="mb-4">
                <input type="text" placeholder="Search users..."
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div class="space-y-4">
                <div class="flex justify-between items-center py-2 border-b">
                    <div>John Doe</div>
                    <div class="flex space-x-2">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
                    </div>
                </div>
                <!-- Repeat above structure for each user -->
            </div>

            <div class="flex justify-between mt-6">
                <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Previous</button>
                <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Next</button>
            </div>
        </div>
    </div>
</template>
<template>
    <div class="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:w-96">
            <h2 class="text-2xl font-semibold text-center mb-6">Sign In</h2>
            <form>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="example@email.com" />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password"
                        class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="********" />
                </div>

                <button type="submit" class="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Sign
                    In</button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-sm">Forgot password? <a href="/auth/forget-password"
                        class="text-blue-500 hover:underline">Click here</a></p>
            </div>
        </div>
    </div>
</template>
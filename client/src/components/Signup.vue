<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSignup = async () => {
    // Reset error
    error.value = ''

    // Validate passwords match
    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
    }

    try {
        isLoading.value = true
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            fullName: fullName.value,
            email: email.value,
            password: password.value
        })

        // Store token in localStorage
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        // Redirect to home page
        router.push('/')
    } catch (err) {
        error.value = err.response?.data?.message || 'An error occurred during signup'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-9">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
            <!-- Header -->
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Create an account</h2>
                <p class="mt-2 text-sm text-gray-600">Start generating documents today</p>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert">
                <span class="block sm:inline">{{ error }}</span>
            </div>

            <!-- Form -->
            <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
                <div class="rounded-md shadow-sm space-y-4">
                    <!-- Full Name Input -->
                    <div>
                        <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
                        <div class="mt-1">
                            <input v-model="fullName" id="fullName" name="fullName" type="text" required
                                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your full name" />
                        </div>
                    </div>

                    <!-- Email Input -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input v-model="email" id="email" name="email" type="email" required
                                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email" />
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input v-model="password" id="password" name="password" type="password" required
                                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password" />
                        </div>
                    </div>

                    <!-- Confirm Password Input -->
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm
                            Password</label>
                        <div class="mt-1">
                            <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password"
                                required
                                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm your password" />
                        </div>
                    </div>
                </div>

                <!-- Submit Button -->
                <div>
                    <button type="submit" :disabled="isLoading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="isLoading">Signing up...</span>
                        <span v-else>Sign up</span>
                    </button>
                </div>

                <!-- Login Link -->
                <div class="text-center text-sm">
                    Already have an account?
                    <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
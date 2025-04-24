<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  error.value = ''
  try {
    isLoading.value = true
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      email: email.value,
      password: password.value
    })

    // Debug logs to see exact response structure
    console.log('Full response:', response)
    console.log('Response data:', response.data)
    console.log('User object:', response.data.user)
    console.log('User role:', response.data.user.role)

    // Store auth data
    authStore.setAuthData({
      user: response.data.user,
      token: response.data.token
    })

    const userRole = response.data.user.role.toLowerCase() // normalize the role to lowercase

    console.log('Normalized user role:', userRole)

    // Clear routing logic with logs
    if (userRole === 'superadmin') {
      console.log('Role is superadmin, redirecting to /superadmin')
      await router.push('/superadmin')
    } else if (userRole === 'admin' || userRole === 'user') {
      console.log('Role is admin/user, redirecting to /admin')
      await router.push('/admin')
    } else {
      console.error('Unknown role detected:', userRole)
      error.value = 'Unknown user role'
      return
    }

  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || 'An error occurred during login'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <!-- Header -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Welcome back</h2>
        <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
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
        </div>

        <!-- Remember Me and Forgot Password -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <!-- <input id="remember-me" name="remember-me" type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /> -->
            <!-- <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label> -->
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit" :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <!-- Sign up Link -->
        <div class="text-center text-sm">
          Don't have an account?
          <router-link to="/signup" class="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Any additional custom styles can go here */
</style>

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));

  const isAuthenticated = computed(() => !!token.value);

  function setAuthData(data) {
    console.log("Setting auth data:", data);
    user.value = data.user;
    token.value = data.token;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  function clearAuthData() {
    console.log("Clearing auth data");
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  function initializeAuth() {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      console.log("Initializing auth from storage");
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    setAuthData,
    clearAuthData,
    initializeAuth,
  };
});

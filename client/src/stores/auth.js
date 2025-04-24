import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    setAuthData(data) {
      this.user = data.user;
      this.token = data.token;
      // Save to localStorage
      localStorage.setItem("authData", JSON.stringify(data));
    },

    clearAuthData() {
      this.user = null;
      this.token = null;
      // Clear from localStorage
      localStorage.removeItem("authData");
    },

    initializeAuth() {
      // Get auth data from localStorage
      const authData = localStorage.getItem("authData");
      if (authData) {
        try {
          const data = JSON.parse(authData);
          this.user = data.user;
          this.token = data.token;
        } catch (error) {
          console.error("Failed to parse auth data:", error);
          this.clearAuthData();
        }
      }
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role?.toLowerCase(),
  },
});

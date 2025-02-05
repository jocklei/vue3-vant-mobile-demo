import { ref } from 'vue'
import type { Ref } from 'vue'

import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
  const token: Ref<string | null> = ref<string | null>(null)

  // Is login
  const isLogin = (): boolean => {
    return !!token.value
  }

  // Set token information
  const setToken = (tokenStr: string): void => {
    token.value = tokenStr
  }

  // Get token information
  const getToken = (): string | null => {
    return token.value
  }

  // Clear token information
  const clearToken = (): void => {
    token.value = null
  }

  return {
    token,
    isLogin,
    setToken,
    getToken,
    clearToken
  }
}, {
  persist: true
})
export default useAuthStore


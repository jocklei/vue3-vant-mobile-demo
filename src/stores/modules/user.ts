import { ref } from 'vue'
import type { Ref } from 'vue'

import { defineStore } from 'pinia'
import type { LoginData, UserState } from '@/api/user'

import {
  getEmailCode,
  getUserInfo,
  resetPassword,
  login as userLogin,
  logout as userLogout,
  register as userRegister,
} from '@/api/user'

const useUserStore = defineStore('user', () => {
  const userInfo: Ref<UserState | null> = ref<UserState | null>(null)

  // Set user's information
  const setInfo = (partial: Partial<UserState>): void => {
    userInfo.value = { ...partial }
  }

  // Clear user's information
  const clearInfo = (): void => {
    userInfo.value = null
  }

  const login = async (loginForm: LoginData) => {
    const { data } = await userLogin(loginForm)
    return data
  }

  const info = async (): Promise<void> => {
    const { data } = await getUserInfo()
    setInfo(data)
  }

  const logout = async (): Promise<void> => {
    try {
      await userLogout()
    }
    finally {
      clearInfo()
    }
  }

  const getCode = async () => {
    const data = await getEmailCode()
    return data
  }

  const reset = async () => {
    const data = await resetPassword()
    return data
  }

  const register = async () => {
    const data = await userRegister()
    return data
  }

  return {
    userInfo,
    info,
    login,
    logout,
    reset,
    getCode,
    register,
  }
}, {
  persist: true,
})

export default useUserStore

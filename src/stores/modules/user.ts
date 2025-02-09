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

  /**
   * @description Set user's information
   * @author jocklei
   * @date 2025/02/09
   * @param {Partial<UserState>} partial Partial<UserState>
   */
  const setInfo = (partial: Partial<UserState>): void => {
    userInfo.value = { ...partial }
  }

  /**
   * @description Clear user's information
   * @author jocklei
   * @date 2025/02/09
   */
  const clearInfo = (): void => {
    userInfo.value = null
  }

  /**
   * @description User login
   * @author jocklei
   * @date 2025/02/09
   * @param {LoginData} loginForm LoginData
   * @return {*}
   */
  const login = async (loginForm: LoginData) => {
    const { data } = await userLogin(loginForm)
    return data
  }

  /**
   * @description Get user's information from the server and set it to the store
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Promise<void>}
   */
  const info = async (): Promise<void> => {
    const { data } = await getUserInfo()
    setInfo(data)
  }

  /**
   * @description User logout and clear user's information in the store
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Promise<void>}
   */
  const logout = async (): Promise<void> => {
    try {
      await userLogout()
    }
    finally {
      clearInfo()
    }
  }

  /**
   * @description Get email verification code from the server
   * @author jocklei
   * @date 2025/02/09
   * @return {*}
   */
  const getCode = async () => {
    const data = await getEmailCode()
    return data
  }

  /**
   * @description Reset user's password from the server
   * @author jocklei
   * @date 2025/02/09
   * @return {*}
   */
  const reset = async () => {
    const data = await resetPassword()
    return data
  }

  /**
   * @description User register from the server
   * @author jocklei
   * @date 2025/02/09
   * @return {*}
   */
  const register = async () => {
    const data = await userRegister()
    return data
  }

  return {
    info,
    login,
    logout,
    reset,
    getCode,
    register,
    userInfo
  }
}, {
  persist: true,
})

export default useUserStore

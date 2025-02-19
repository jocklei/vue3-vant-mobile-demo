import { ref } from 'vue'
import type { Ref } from 'vue'

import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
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
   * @date 2025/02/18
   */
  const clearInfo = (): void => {
    userInfo.value = null
  }

  /**
   * @description User login
   * @author jocklei
   * @date 2025/02/12
   * @param {LoginData} loginForm
   * @return {*}  {Promise<AxiosResponse>}
   */
  const login = async (loginForm: LoginData): Promise<AxiosResponse> => {
    return await userLogin(loginForm)
  }

  /**
   * @description Get user's information
   * @author jocklei
   * @date 2025/02/12
   * @return {*}  {Promise<void>}
   */
  const info = async (): Promise<void> => {
    const { data } = await getUserInfo()
    setInfo(data)
  }

  /**
   * @description User logout
   * @author jocklei
   * @date 2025/02/12
   * @return {*}  {(Promise<AxiosResponse | void>)}
   */
  const logout = async (): Promise<AxiosResponse | void> => {
    try {
      await userLogout()
    }
    finally {
      clearInfo()
    }
  }

  /**
   * @description Get email verification code
   * @author jocklei
   * @date 2025/02/12
   * @return {*}  {Promise<AxiosResponse>}
   */
  const getCode = async (): Promise<AxiosResponse> => {
    return await getEmailCode()
  }

  /**
   * @description Reset user's password
   * @author jocklei
   * @date 2025/02/12
   * @return {*}  {Promise<AxiosResponse>}
   */
  const reset = async (): Promise<AxiosResponse> => {
    return await resetPassword()
  }

  /**
   * @description Register user
   * @author jocklei
   * @date 2025/02/12
   * @return {*}  {Promise<AxiosResponse>}
   */
  const register = async (): Promise<AxiosResponse> => {
    return await userRegister()
  }

  return {
    info,
    login,
    logout,
    reset,
    getCode,
    register,
    userInfo,
  }
}, {
  persist: true,
})

export default useUserStore

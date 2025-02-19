import { ref } from 'vue'
import type { Ref } from 'vue'

import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', () => {
  const token: Ref<string | null> = ref<string | null>(null)

  /**
   * @description Is login
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {boolean}
   */
  const isLogin = (): boolean => {
    return !!token.value
  }

  /**
   * @description Set token information
   * @author jocklei
   * @date 2025/02/09
   * @param {string} tokenStr Token string
   */
  const setToken = (tokenStr: string): void => {
    token.value = tokenStr
  }

  /**
   * @description Get token information
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {(string | null)}
   */
  const getToken = (): string | null => {
    return token.value
  }

  /**
   * @description Clear token information
   * @author jocklei
   * @date 2025/02/09
   */
  const clearToken = (): void => {
    token.value = null
  }

  return {
    token,
    isLogin,
    setToken,
    getToken,
    clearToken,
  }
}, {
  persist: true,
})
export default useAuthStore

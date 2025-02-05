import axios from 'axios'
import axiosRetry from 'axios-retry'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { showNotify } from 'vant'
import useAuthStore from '@/stores/modules/auth'

// 可以根据自己的需要修改，常见的如 Access-Token，Authorization
// 需要注意的是，请尽量保证使用中横线`-` 来作为分隔符，
// 避免被 nginx 等负载均衡器丢弃了自定义的请求头
export const REQUEST_TOKEN_KEY = 'Authorization'

// 获取当前语言
const getLocale = () => locale.value || 'zh-CN' // 默认值设置为中文

// 创建 axios 实例
const http = axios.create({
  timeout: 6000, // 请求超时时间
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // API 请求的默认前缀
  headers: { 'Content-Type': 'application/json', 'language': getLocale(), 'platform': 'mobile' },
})

export type RequestError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// 通用通知函数
function notifyError(type: 'danger', message: string) {
  showNotify({ type, message })
}

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  const authStore = useAuthStore()

  if (authStore.isLogin) {
    config.headers.set(`${REQUEST_TOKEN_KEY}`, authStore.token)
  }

  return config
}

// 401错误请求处理
function handle401Error(_data: any) {
  notifyError('danger', 'Authorization verification failed')

  // 如果需要跳转到登录页
  // location.replace(loginRoutePath)
}

// 403错误请求处理
function handle403Error(_data: any, statusText: string) {
  notifyError('danger', (_data && _data.message) || statusText)
}

// 异常拦截处理器
function errorHandler(error: RequestError): Promise<any> {
  if (error.response) {
    const { data = {}, status, statusText } = error.response

    // 401 未登录/未授权
    if (status === 401) {
      handle401Error(data)
    }

    // 403 无权限
    if (status === 403) {
      handle403Error(data, statusText)
    }
  }
  return Promise.reject(error)
}

// Add a request interceptor
http.interceptors.request.use(requestHandler, errorHandler)

// 响应拦截器
function responseHandler(response: { data: any }) {
  return response.data
}

// Add a response interceptor
http.interceptors.response.use(responseHandler, errorHandler)

axiosRetry(http, { retries: 3 })

export default http

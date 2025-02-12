import http from '@/utils/http'
import type { AxiosResponse } from 'axios'

export interface LoginData {
  email: string
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserState {
  uid?: number
  name?: string
  avatar?: string
}

/**
 * @description User login
 * @author jocklei
 * @date 2025/02/12
 * @param {LoginData} data
 * @return {*}  {Promise<AxiosResponse>}
 */
export function login(data: LoginData): Promise<AxiosResponse> {
  return http.post<LoginRes>('/auth/login', data)
}

/**
 * @description User logout
 * @author jocklei
 * @date 2025/02/12
 * @return {*}  {Promise<AxiosResponse>}
 */
export function logout(): Promise<AxiosResponse> {
  return http.post('/user/logout')
}

/**
 * @description Get user's information
 * @author jocklei
 * @date 2025/02/12
 * @return {*}  {Promise<AxiosResponse>}
 */
export function getUserInfo(): Promise<AxiosResponse> {
  return http.get<UserState>('/user/me')
}

/**
 * @description Get email verification code
 * @author jocklei
 * @date 2025/02/12
 * @return {*}  {Promise<AxiosResponse>}
 */
export function getEmailCode(): Promise<AxiosResponse> {
  return http.get('/user/email-code')
}

/**
 * @description Reset user's password
 * @author jocklei
 * @date 2025/02/12
 * @return {*}  {Promise<AxiosResponse>}
 */
export function resetPassword(): Promise<AxiosResponse> {
  return http.post('/user/reset-password')
}

/**
 * @description Register user
 * @author jocklei
 * @date 2025/02/12
 * @return {*}  {Promise<AxiosResponse>}
 */
export function register(): Promise<AxiosResponse> {
  return http.post('/user/register')
}

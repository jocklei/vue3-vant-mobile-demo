import http from '@/utils/http'

export interface LoginData {
  email : string
  password : string
}

export interface LoginRes {
  token : string
}

export interface UserState {
  uid ?: number
  name ?: string
  avatar ?: string
}

export function login(data : LoginData) : Promise<any> {
  return http.post<LoginRes>('/auth/login', data)
}

export function logout() {
  return http.post('/user/logout')
}

export function getUserInfo() : Promise<any> {
  return http.get<UserState>('/user/me')
}

export function getEmailCode() : Promise<any> {
  return http.get('/user/email-code')
}

export function resetPassword() : Promise<any> {
  return http.post('/user/reset-password')
}

export function register() : Promise<any> {
  return http.post('/user/register')
}

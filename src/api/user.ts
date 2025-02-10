import http from '@/utils/http'

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
 * @date 2025/02/10
 * @export
 * @param {LoginData} data
 * @return {*}  {Promise<any>}
 */
export function login(data: LoginData): Promise<any> {
  return http.post<LoginRes>('/auth/login', data)
}

/**
 * @description User logout
 * @author jocklei
 * @date 2025/02/10
 * @export
 * @return {*}
 */
export function logout(): Promise<any> {
  return http.post('/user/logout')
}

/**
 * @description Get user information
 * @author jocklei
 * @date 2025/02/10
 * @export
 * @return {*}  {Promise<any>}
 */
export function getUserInfo(): Promise<any> {
  return http.get<UserState>('/user/me')
}

/**
 * @description Get user email code
 * @author jocklei
 * @date 2025/02/10
 * @export
 * @return {*}  {Promise<any>}
 */
export function getEmailCode(): Promise<any> {
  return http.get('/user/email-code')
}

/**
 * @description Reset password.
 * @author jocklei
 * @date 2025/02/10
 * @export
 * @return {*}  {Promise<any>}
 */
export function resetPassword(): Promise<any> {
  return http.post('/user/reset-password')
}

/**
 * @description Register.
 * @author jocklei
 * @date 2025/02/10
 * @export
 * @return {*}  {Promise<any>}
 */
export function register(): Promise<any> {
  return http.post('/user/register')
}

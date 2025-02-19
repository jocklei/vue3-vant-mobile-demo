import { uuid } from 'vue-uuid'
import { defineMock } from 'vite-plugin-mock-dev-server'

import { builder } from '../util'
import { randomString } from '../../src/utils/random'

export default defineMock([
  {
    url: '/api/auth/login',
    delay: 100,
    body: () => {
      return {
        code: 0,
        data: {
          token: `${randomString(100)}`,
        },
        msg: 'success',
      }
    },
  },
  {
    url: '/api/user/me',
    delay: 100,
    body: () => {
      return {
        code: 0,
        data: {
          uid: uuid.v4(),
          name: 'Admin',
          avatar: 'https://img1.baidu.com/it/u=3598104138,3632108415&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
        },
        msg: 'success',
      }
    },
  },
  {
    url: '/api/user/logout',
    delay: 200,
    body: () => {
      return {
        code: 0,
        msg: 'success',
      }
    },
  },
  {
    url: '/api/user/email-code',
    delay: 1000,
    body: () => {
      const code = '123456'
      return builder(code)
    },
  },
  {
    url: '/api/user/reset-password',
    delay: 1000,
    body: () => {
      const res = true
      return builder(res)
    },
  },
  {
    url: '/api/user/register',
    delay: 1000,
    body: () => {
      const res = true
      return builder(res)
    },
  },
])

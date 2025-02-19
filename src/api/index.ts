import http from '@/utils/http'

export async function queryProse(): Promise<any> {
  return http('/prose')
}

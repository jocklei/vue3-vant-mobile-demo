/**
 * @description 生成指定长度的随机字符串，默认长度18
 * @author jocklei
 * @date 2023-09-14 14:50
 * @param {number} [length]
 * @returns {string} 返回随机字符串
 */
export const randomString = (length: number = 18): string => {
  const arr = [...Array.from({ length: 62 })].map((_item, i) => {
    return String.fromCharCode(i + (i < 10 ? 0 : i < 36 ? 7 : 13) + 48)
  })
  return [...new Array(length)].map(() => arr[Math.floor(Math.random() * arr.length)]).join('')
}

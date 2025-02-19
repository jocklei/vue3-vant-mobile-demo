import { computed } from 'vue'

export default function useComputed<T>(fn: (...args: any[]) => T, maxCacheSize: number = 50) {
  const map = new Map()

  return function (...args: any) {
    const key = JSON.stringify(args)

    if (map.has(key)) {
      return map.get(key)
    }

    const result = computed(() => fn(...args))
    map.set(key, result)

    // 如果缓存大小超过限制，删除最早的缓存项，防止map过大，避免内存溢出
    if (map.size > maxCacheSize) {
      const firstKey = map.keys().next().value
      map.delete(firstKey)
    }

    return result
  }
}

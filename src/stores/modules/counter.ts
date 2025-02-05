import { defineStore } from 'pinia'

import { randomString } from '@/utils/random'

const useCounterStore = defineStore('counter', () => {
  const counter = ref<string>(randomString(200))

  const increment = () => {
    counter.value = randomString(200)
  }

  return {
    counter,
    increment,
  }
}, {
  persist: true,
})

export default useCounterStore

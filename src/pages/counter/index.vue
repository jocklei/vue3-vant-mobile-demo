<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

import { storeToRefs } from 'pinia'
import useCounterStore from '@/stores/modules/counter'

const counterStore = useCounterStore()
const { counter } = storeToRefs(counterStore)

const showText: Ref<string> = ref<string>()
const generateState: Ref<boolean> = ref(false)

onMounted(() => {
  showTextEventer(counter.value)
})

watch(counter, (newValue, _oldValue) => {
  if (generateState.value) {
    return
  }

  showTextEventer(newValue)
})

function add() {
  counterStore.increment()
}

function showTextEventer(newValue: string) {
  showText.value = ''
  generateState.value = true
  const newValueLength = newValue.length

  let index = 0
  const intervalId = setInterval(() => {
    if (index < newValueLength) {
      showText.value += newValue.charAt(index)
      index++
    }
    else {
      generateState.value = false
      clearInterval(intervalId)
    }
  }, 40)
}
</script>

<template>
  <van-row :gutter="[20, 2]">
    <van-col span="24">
      <h1 class="text-6xl color-pink font-semibold">
        Hello, Pinia!
      </h1>
    </van-col>
    <van-col span="24">
      <p class="mt-4 text-gray-700 dark:text-white">
        This is a simple example of persisting Pinia state.
        To verify its effectiveness, you can refresh the interface and observe it.
      </p>
    </van-col>
    <van-col span="24">
      <span>RandomString：</span>
    </van-col>
    <van-col span="24">
      <p class="mt-4 h-126 break-words">
        <strong class="text-blue-500"> {{ showText }} </strong>
      </p>
    </van-col>
    <van-col span="24">
      <van-button
        type="success" loading-type="spinner" loading-text="生成中..." size="small" :loading="generateState"
        @click="add"
      >
        Generate
      </van-button>
    </van-col>
  </van-row>
</template>

<route lang="json5">
  {
  name: 'counter',
  meta: {
  title: '🍍 持久化 Pinia 状态',
  i18n: 'menus.persistPiniaState'
  },
  }
</route>

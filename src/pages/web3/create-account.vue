<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useWeb3Store } from '@/stores'

const useWeb3 = useWeb3Store()
const newAccount: Ref<string> = ref('')

// 创建账户
function createAccount() {
  newAccount.value = JSON.stringify(useWeb3.createAccount())
}
</script>

<template>
  <VanCellGroup :inset="true" class="!mt-16">
    <van-cell>
      <van-button type="primary" size="small" @click="createAccount">
        创建账号
      </van-button>
    </van-cell>
    <template v-if="newAccount">
      <van-cell>
        新账户信息：
      </van-cell>
      <van-cell>
        {{ newAccount }}
      </van-cell>
    </template>
  </VanCellGroup>
</template>

<style lang="less" scoped>
:deep(.van-cell__value) {
  text-align: left;
}
</style>

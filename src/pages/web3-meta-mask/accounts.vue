<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import { useWeb3MetaMaskStore } from '@/stores'

const accounts: Ref<string[]> = ref([])
const useWeb3MetaMask = useWeb3MetaMaskStore()

// 余额
const balance: Ref<string> = ref('')

onMounted(async () => {
  // 获取账户
  accounts.value = await useWeb3MetaMask.getAccounts()

  // 获取账户余额
  const newAccount = accounts.value[0]
  const _balance = await useWeb3MetaMask.getBalance(newAccount)
  balance.value = useWeb3MetaMask.toEth(_balance)
})
</script>

<template>
  <div>
    <VanCellGroup :inset="true" class="!mt-16">
      <van-cell>
        账户列表
      </van-cell>
      <van-cell>
        <van-row :gutter="[16, 4]">
          <van-col v-for="account in accounts" :key="account" span="24">
            {{ account }}
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        账户余额：{{ balance }} ETH
      </van-cell>
    </VanCellGroup>
  </div>
</template>

<style lang="less" scoped>
:deep(.van-cell__value) {
  text-align: left;
}
</style>

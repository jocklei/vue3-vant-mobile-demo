<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import BigNumber from 'bignumber.js'
import { showFailToast, showLoadingToast } from 'vant'

import { useWeb3MetaMaskStore } from '@/stores'

const useWeb3MetaMask = useWeb3MetaMaskStore()

const from: Ref<string> = ref('')
const to: Ref<string> = ref('')
const value: Ref<string> = ref('')

// 发起交易
function sendTranstation() {
  if (!from.value || !to.value || !value.value) {
    showFailToast('转出账户、转入账户、转出金额不能为空')
    return
  }

  const showLoading = showLoadingToast({
    message: '交易中...',
    forbidClick: true,
  })

  const rate = new BigNumber('1000000000000000000')
  const _valueEth = rate.times(value.value).toString()

  useWeb3MetaMask.sendTransaction(from.value, to.value, _valueEth)
    .then((result) => {
      setTimeout(() => {
        showLoading.close()
        showSuccessToast('交易成功')
        console.log(result)
      }, 800)
    })
    .catch(() => {
      showFailToast('交易失败,请检查参数后再重试')
      console.warn('交易失败')
    })
}
</script>

<template>
  <VanCellGroup :inset="true" class="!mt-16">
    <van-cell>无签名交易</van-cell>
    <van-cell>
      <van-field v-model="from" label="From" placeholder="请输入转出账户" />
    </van-cell>
    <van-cell>
      <van-field v-model="to" label="To" placeholder="请输入转入账户" />
    </van-cell>
    <van-cell>
      <van-field v-model="value" label="转出金额" placeholder="请输入转出金额" />
    </van-cell>
    <van-cell>
      <van-button type="success" size="small" @click="sendTranstation">
        发起转账
      </van-button>
    </van-cell>
  </VanCellGroup>
</template>

<style lang="less" scoped>
:deep(.van-field) {
  padding-left: 0;
}

:deep(.van-cell__value) {
  text-align: left;
}
</style>

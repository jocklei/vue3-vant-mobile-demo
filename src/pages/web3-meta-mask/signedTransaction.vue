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
const privateKey: Ref<string> = ref('')

// 发起交易
async function sendSignedTransaction() {
  if (!from.value || !to.value || !value.value || !privateKey.value) {
    showFailToast('转出账户、转出账户privateKey、转入账户、转出金额不能为空')
    return
  }

  const rate = new BigNumber('1000000000000000000')
  const _valueEth = rate.times(value.value).toString()

  const txData = {
    from: from.value,
    to: to.value,
    value: useWeb3MetaMask.toWei(_valueEth),
    gasPrice: await useWeb3MetaMask.getGasPrice(),
    nonce: await useWeb3MetaMask.getTransactionCount(from.value),
  }

  // 估算gas费用
  txData.gas = await useWeb3MetaMask.estimateGas(txData)

  // 签名
  const tx = await useWeb3MetaMask.signTransaction(txData, privateKey.value)

  // 获取签名
  const raw = tx.rawTransaction

  const showLoading = showLoadingToast({
    message: '交易中...',
    forbidClick: true,
  })

  // 发送交易
  const receipt = await useWeb3MetaMask.sendSignedTransaction(raw)
  console.log('receipt:', receipt)

  if (receipt.transactionHash) {
    setTimeout(() => {
      showLoading.close()
      showSuccessToast('交易成功')
      console.log(receipt)
    }, 800)
  }
  else {
    showFailToast('交易失败,请检查参数后再重试')
  }
}
</script>

<template>
  <VanCellGroup :inset="true" class="!mt-16">
    <van-cell>签名交易</van-cell>
    <van-cell>
      <van-field v-model="from" label="From" placeholder="请输入转出账户" />
    </van-cell>
    <van-cell>
      <van-field v-model="privateKey" label="PrivateKey" placeholder="请输入转出账户privateKey" />
    </van-cell>
    <van-cell>
      <van-field v-model="to" label="To" placeholder="请输入转入账户" />
    </van-cell>
    <van-cell>
      <van-field v-model="value" label="转出金额" placeholder="请输入转出金额" />
    </van-cell>
    <van-cell>
      <van-button type="success" size="small" @click="sendSignedTransaction">
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

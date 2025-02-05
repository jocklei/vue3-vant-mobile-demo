<script setup lang="ts">
  import { useWeb3MetaMaskStore } from '@/stores'

  import Accounts from './accounts.vue'
  import Transaction from './transaction.vue'
  import CreateAccount from './create-account.vue'
  import SignedTransaction from './signedTransaction.vue'

  const useWeb3MetaMask = useWeb3MetaMaskStore()
</script>

<template>
  <div>
    <Accounts></Accounts>
    <CreateAccount></CreateAccount>
    <Transaction></Transaction>
    <SignedTransaction></SignedTransaction>
  </div>
</template>

<style lang="less" scoped></style>

<route lang="json5">
  {
  name: 'web3-meta-mask',
  meta: {
  title: 'web3-meta-mask',
  i18n: 'menus.web3-meta-mask'
  },
  }
</route>

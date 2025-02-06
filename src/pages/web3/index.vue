<script setup lang="ts">
import Accounts from './accounts.vue'
import Transaction from './transaction.vue'
import CreateAccount from './create-account.vue'
import SignedTransaction from './signedTransaction.vue'

import { useEthersStore } from '@/stores'

const useEthers = useEthersStore()

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
  name: 'web3',
  meta: {
    title: 'web3',
    i18n: 'menus.web3'
  },
  }
</route>

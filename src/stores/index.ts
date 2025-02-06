import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useAppStore from './modules/app'
import useUserStore from './modules/user'
import useAuthStore from './modules/auth'
import useWeb3Store from './modules/web3'
import useEthersStore from './modules/ethers'
import useWeb3MetaMaskStore from './modules/web3MetaMask'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { useAppStore, useUserStore, useAuthStore, useWeb3Store, useWeb3MetaMaskStore, useEthersStore }
export default pinia

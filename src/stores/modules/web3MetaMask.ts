import { showToast } from 'vant'
import { defineStore } from 'pinia'
import { type Transaction, Web3, type Web3Account } from 'web3'

declare global {
  interface Window {
    ethereum: any
  }
}

export interface TransactionParams {
  from: string
  to: string
  nonce: number
  value: number | string
  gas: number
  gasPrice: number
  privateKey: string
}

const useWeb3Store = defineStore('web3-meta-mask', () => {
  // Web3 实例
  let web3: Web3

  connectMetaMask()

  onMounted(() => {
  })

  /**
   * @description 连接到MetaMask钱包，创建web3实例。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Promise<void>}
   */
  async function connectMetaMask(): Promise<void> {
    if (!window.ethereum) {
      showToast('Please install MetaMask first!')
      return
    }

    const web3Providers = await window.ethereum.request({ method: 'eth_requestAccounts' })

    if (web3Providers?.length > 0) {
      web3 = new Web3(window.ethereum)
    }
  }

  /**
   * @description 创建一个新的 Web3 账户。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Promise<Web3Account>}
   */
  async function createAccount(): Promise<Web3Account> {
    return web3.eth.accounts.create()
  }

  /**
   * @description 获取所有已连接的 Web3 账户。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Promise<string[]>}
   */
  async function getAccounts(): Promise<string[]> {
    return await web3.eth.getAccounts()
  }

  /**
   * @description 获取指定地址的账户余额。
   * @author jocklei
   * @date 2025/02/09
   * @param {string} address - 要查询余额的地址
   * @return {*}  {Promise<bigint>}
   */
  async function getBalance(address: string): Promise<bigint> {
    return web3.eth.getBalance(address)
  }

  /**
   * @description 创建一个新的 Web3 批量请求实例。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}
   */
  async function batchRequest() {
    return new web3.BatchRequest()
  }

  /**
   * @description 根据提供的 ABI 和地址创建一个新的 Web3 合约实例。
   * @author jocklei
   * @date 2025/02/09
   * @param {*} abi - 合约 ABI
   * @param {string} address - 合约地址
   * @return {*}
   */
  async function createContract(abi: any, address: string) {
    return new web3.eth.Contract(abi, address)
  }

  /**
   * @description 获取指定地址的待处理交易数量。
   * @author jocklei
   * @date 2025/02/09
   * @param {string} address - 地址
   * @return {*}  {Promise<bigint>}
   */
  async function getTransactionCount(address: string): Promise<bigint> {
    return await web3.eth.getTransactionCount(address, 'pending')
  }

  /**
   * @description 获取当前网络的Gas价格。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Promise<bigint>}
   */
  async function getGasPrice(): Promise<bigint> {
    return await web3.eth.getGasPrice()
  }

  /**
   * @description 估算执行指定交易所需的Gas量。
   * @author jocklei
   * @date 2025/02/09
   * @param {Transaction} txData - 交易数据
   * @return {*}  {Promise<bigint>}
   */
  async function estimateGas(txData: Transaction): Promise<bigint> {
    return await web3.eth.estimateGas(txData)
  }

  /**
   * @description 将指定的金额从 ETH 单位转换为 wei 单位。
   * @author jocklei
   * @date 2025/02/09
   * @param {(bigint | string)} value - 金额
   * @return {*}  {string}
   */
  function toWei(value: bigint | string): string {
    return web3.utils.toWei(value, 'wei')
  }

  /**
   * @description 将指定的金额从 wei 单位转换为 ETH 单位。
   * @author jocklei
   * @date 2025/02/09
   * @param {(bigint | string)} value - 金额
   * @return {*}  {string}
   */
  function toEth(value: bigint | string): string {
    return web3.utils.fromWei(value, 'ether')
  }

  /**
   * @description 将给定的数值转换为十六进制字符串。
   * @author jocklei
   * @date 2025/02/09
   * @param {number} nonce - 数值
   * @return {*}  {string}
   */
  function toHex(nonce: number): string {
    return web3.utils.toHex(nonce)
  }

  /**
   * @description 签署交易
   * @author jocklei
   * @date 2025/02/09
   * @param {Transaction} txData - 交易数据
   * @param {string} privateKey - 私钥
   * @return {*}  {Promise<object>}
   */
  async function signTransaction(txData: Transaction, privateKey: string): Promise<object> {
    return await web3.eth.accounts.signTransaction(txData, privateKey)
  }

  /**
   * @description 发送一个未签名的交易。
   * @author jocklei
   * @date 2025/02/09
   * @param {string} from - 发送者地址
   * @param {string} to - 接收者地址
   * @param {string} value - 金额
   * @return {*}  {Promise<any>}
   */
  async function sendTransaction(from: string, to: string, value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        from,
        to,
        value: toWei(value),
      }
      web3.eth.sendTransaction(params)
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * @description 发送一个已签名的交易。
   * @author jocklei
   * @date 2025/02/09
   * @param {string} raw - 已签名的交易数据
   * @return {*}  {Promise<any>}
   */
  async function sendSignedTransaction(raw: string): Promise<any> {
    return web3.eth.sendSignedTransaction(raw)
  }

  return {
    web3,
    toWei,
    toEth,
    toHex,
    getAccounts,
    getBalance,
    batchRequest,
    getGasPrice,
    estimateGas,
    createAccount,
    createContract,
    connectMetaMask,
    signTransaction,
    sendTransaction,
    getTransactionCount,
    sendSignedTransaction,
  }
})
export default useWeb3Store

import { defineStore } from 'pinia'

import Web3 from 'web3'
import type { Contract, Transaction, Web3Account } from 'web3'

export interface TransactionParams {
  from: string
  to: string
  nonce: number
  value: number | string
  gas: number
  gasPrice: number
  privateKey: string
}

const useWeb3Store = defineStore('web3', () => {
  // 创建 Web3 实例
  const web3: Web3 = new Web3(`${import.meta.env.VITE_APP_WEB3_PROVIDER}`)

  web3.eth.net.isListening()
    .then(() => {
      console.log('Connected to the Ethereum network')
    })
    .catch((error) => {
      console.error('Failed to connect to the Ethereum network:', error)
    })

  /**
   * @description 创建一个新的 Web3 账户。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}  {Web3Account}
   */
  function createAccount(): Web3Account {
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
  function getBalance(address: string): Promise<bigint> {
    return web3.eth.getBalance(address)
  }

  /**
   * @description 创建一个新的 Web3 批量请求实例。
   * @author jocklei
   * @date 2025/02/09
   * @return {*}
   */
  function batchRequest() {
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
  function createContract(abi: any, address: string): Contract<any> {
    return new web3.eth.Contract(abi, address)
  }

  /**
   * @description 获取指定地址的待处理交易数量。
   * @author jocklei
   * @date 2025/02/09
   * @param {string} address - 要查询的地址
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
   * @description 将指定的金额从 wei 单位转换为 ETH 单位。
   * @author jocklei
   * @date 2025/02/09
   * @param {bigint} value - 要转换的金额，以 wei 为单位。
   * @return {*}  {string}
   */
  function toEth(value: bigint): string {
    return web3.utils.fromWei(value, 'ether')
  }

  /**
   * @description 将指定的金额从 ETH 单位转换为 wei 单位。
   * @author jocklei
   * @date 2025/02/09
   * @param {(number | string)} value - 要转换的金额，以 ETH 为单位。
   * @return {*}  {string}
   */
  function toWei(value: number | string): string {
    return web3.utils.toWei(value, 'ether')
  }

  /**
   * @description 将给定的数值转换为十六进制字符串。
   * @author jocklei
   * @date 2025/02/09
   * @param {number} nonce - 要转换的数值
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
    getGasPrice,
    estimateGas,
    batchRequest,
    createAccount,
    createContract,
    signTransaction,
    sendTransaction,
    getTransactionCount,
    sendSignedTransaction,
  }
})
export default useWeb3Store

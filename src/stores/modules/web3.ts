import { defineStore } from 'pinia'

import { differenceInSeconds } from 'date-fns';
import { Web3, type Transaction, type Web3Account } from 'web3'

export interface TransactionParams {
  from: string; to: string;
  nonce: number;
  value: number | string;
  gas: number;
  gasPrice: number
  privateKey: string
}

const useWeb3Store = defineStore('web3', () => {
  // 创建 Web3 实例
  const web3: Web3 = new Web3(`${import.meta.env.VITE_APP_WEB3_PROVIDER}`)


  web3.eth.net.isListening()
    .then(() => {
      console.log('Connected to the Ethereum network');

      web3.eth.subscribe('pendingTransactions', (error, result) => {
        console.log('result: ', result)
        console.log('error: ', error)
      });
    })

  /**
   * 检查web3实例是否准备好。
   *
   * @returns {Promise<void>} 一个Promise，解析为web3实例是否创建完成。
   */
  function onReady(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const _isConnect = async () => {
        return await web3.eth.net.isListening()
      }

      if (!web3) {
        const startTime = new Date()

        const _timer = setInterval(async () => {
          if (web3) {
            clearInterval(_timer)
            const isConnect = await _isConnect()
            isConnect ? resolve(true) : reject(false)
          } else {
            const endTime = new Date()
            const duration = differenceInSeconds(endTime, startTime)
            if (duration > 10) {
              clearInterval(_timer)
              reject(false)
            }
          }
        }, 200)
      } else {
        const isConnect = await _isConnect()
        isConnect ? resolve(true) : reject(false)
      }
    })
  }

  /**
   * 创建一个新的 Web3 账户。
   *
   * @returns {Web3Account} 新创建的 Web3 账户对象。
   */
  function createAccount(): Web3Account {
    return web3.eth.accounts.create()
  }

  /**
   * 获取所有已连接的 Web3 账户。
   *
   * @returns {Promise<string[]>} 一个包含所有账户地址的字符串数组。
   */
  async function getAccounts(): Promise<string[]> {
    await onReady()
    return await web3.eth.getAccounts()
  };

  /**
   * 获取指定地址的账户余额。
   *
   * @param {string} address - 要查询余额的账户地址。
   * @returns {Promise<bigint>} 一个 Promise，解析为账户的余额（以 wei 为单位）。
   */
  function getBalance(address: string): Promise<bigint> {
    return web3.eth.getBalance(address)
  }

  /**
   * 创建一个新的 Web3 批量请求实例。
   *
   * @returns {BatchRequest} 一个新的 Web3 批量请求实例。
   */
  function batchRequest() {
    return new web3.BatchRequest()
  }

  /**
   * 根据提供的 ABI 和地址创建一个新的 Web3 合约实例。
   *
   * @param {any} abi - 合约的 ABI（应用二进制接口）。
   * @param {string} address - 合约部署的地址。
   * @returns {Contract} 一个新的 Web3 合约实例。
   */
  function createContract(abi: any, address: string) {
    return new web3.eth.Contract(abi, address)
  }

  /**
    * 获取指定地址的待处理交易数量。
    *
    * @param {string} address - 要查询交易数量的账户地址。
    * @returns {Promise<bigint>} 一个 Promise，解析为待处理交易的数量。
    */
  async function getTransactionCount(address: string): Promise<bigint> {
    await onReady()
    return await web3.eth.getTransactionCount(address, 'pending')
  }

  /**
   * 获取当前网络的Gas价格。
   *
   * @returns {Promise<bigint>} 一个Promise，解析为当前网络的Gas价格（以wei为单位）。
   */
  async function getGasPrice(): Promise<bigint> {
    await onReady()
    return await web3.eth.getGasPrice()
  }

  /**
   * 估算执行指定交易所需的Gas量。
   *
   * @param {Transaction} txData - 包含交易数据的对象。
   * @returns {Promise<bigint>} 一个Promise，解析为执行交易所需的Gas量（以wei为单位）。
   */
  async function estimateGas(txData: Transaction): Promise<bigint> {
    await onReady()
    return await web3.eth.estimateGas(txData)
  }

  /**
   * 将指定的金额从 wei 单位转换为 ETH 单位。
   *
   * @param {number | string} value - 要转换的金额，以 wei 为单位。
   * @returns {string} 转换后的金额，以 ETH 为单位。
   */
  function toEth(value: number | string) {
    return web3.utils.fromWei(value, "wei")
  }

  /**
   * 将指定的金额从 ETH 单位转换为 wei 单位。
   *
   * @param {number | string} value - 要转换的金额，以 ETH 为单位。
   * @returns {string} 转换后的金额，以 wei 为单位。
   */
  function toWei(value: number | string): string {
    return web3.utils.toWei(value, "ether")
  }

  /**
   * 将给定的数值转换为十六进制字符串。
   *
   * @param {number} nonce - 要转换的数值。
   * @returns {string} 转换后的十六进制字符串。
   */
  function toHex(nonce: number): string {
    return web3.utils.toHex(nonce)
  }

  /**
   * 签署交易
   *
   * @param {Transaction} transaction - 需要签署的交易对象
   * @param {string} privateKey - 用于签署交易的私钥
   * @returns {Promise<object>} - 返回一个包含签名交易的 Promise
   */
  async function signTransaction(txData: Transaction, privateKey: string): Promise<object> {
    await onReady()
    return await web3.eth.accounts.signTransaction(txData, privateKey)
  }

  /**
   * 发送一个未签名的交易。
   *
   * @param {string} from - 发送交易的账户地址。
   * @param {string} to - 接收交易的账户地址。
   * @param {string} value - 要发送的金额（以ETH为单位）。
   * @returns {Promise<any>} 一个Promise，解析为交易的收据或错误信息。
   */
  async function sendTransaction(from: string, to: string, value: string): Promise<any> {
    await onReady()
    return new Promise((resolve, reject) => {
      const params = {
        from,
        to,
        value: toWei(value)
      }
      web3.eth.sendTransaction(params)
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * 发送一个已签名的交易。
   *
   * @param {string} raw - 已签名的交易数据的原始字符串表示。
   * @returns {Promise<any>} 一个Promise，解析为交易的收据或错误信息。
   */
  async function sendSignedTransaction(raw: string): Promise<any> {
    await onReady()
    return web3.eth.sendSignedTransaction(raw)
  }

  return {
    web3,
    createAccount,
    getAccounts,
    getBalance,
    batchRequest,
    createContract,
    getGasPrice,
    estimateGas,
    toWei,
    toEth,
    toHex,
    signTransaction,
    sendTransaction,
    sendSignedTransaction,
    getTransactionCount,
  }
})
export default useWeb3Store

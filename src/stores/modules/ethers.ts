import { defineStore } from 'pinia'

import { ethers } from "ethers";

const useEthersStore = defineStore('ethers', () => {
  const provider = new ethers.JsonRpcProvider(`${import.meta.env.VITE_APP_WEB3_PROVIDER}`);

  // 获取当前网络信息
  provider.getNetwork().then((network) => {
    console.log('Connected to network, chainId:', network.chainId);
  });

  /**
   * 获取指定地址的以太坊余额
   * @param address - 要查询余额的以太坊地址
   * @returns 一个Promise，解析后返回指定地址的余额（以wei为单位）
   */
  async function getBalance(address: string) {
    return await provider.getBalance(address);
  }

  /**
   * 将指定的金额从 wei 单位转换为 ETH 单位。
   *
   * @param {bigint} balance - 要转换的金额，以 wei 为单位。
   * @returns {string} 转换后的金额，以 ETH 为单位。
   */
  function toEth(balance: bigint): string {
    return ethers.formatEther(balance);
  }

  /**
   * 使用私钥和提供者创建一个新的以太坊钱包实例
   * @param privateKey - 用于创建钱包的私钥
   * @param provider - 用于与以太坊网络交互的提供者
   * @returns 一个新的以太坊钱包实例
   */
  function wallet(privateKey: string, provider: ethers.JsonRpcProvider) {
    return new ethers.Wallet(privateKey, provider);
  }

  return {
    getBalance,
    toEth,
    wallet
  };
});
export default useEthersStore

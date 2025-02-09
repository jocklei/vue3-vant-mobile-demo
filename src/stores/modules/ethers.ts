import { defineStore } from 'pinia'

import { ethers } from "ethers";

const useEthersStore = defineStore('ethers', () => {
  const provider = new ethers.JsonRpcProvider(`${import.meta.env.VITE_APP_WEB3_PROVIDER}`);

  // 获取当前网络信息
  provider.getNetwork().then((network) => {
    console.log('Connected to network, chainId:', network.chainId);
  });

  /**
   * @description 获取指定地址的以太坊余额
   * @author jocklei
   * @date 2025/02/09
   * @param {string} address - 要查询余额的地址
   * @return {*}
   */
  async function getBalance(address: string) {
    return await provider.getBalance(address);
  }

  /**
   * @description 将指定的金额从 wei 单位转换为 ETH 单位。
   * @author jocklei
   * @date 2025/02/09
   * @param {bigint} balance - 要转换的金额，以 wei 为单位。
   * @return {*}  {string}
   */
  function toEth(balance: bigint): string {
    return ethers.formatEther(balance);
  }

  /**
   * @description 使用私钥和提供者创建一个新的以太坊钱包实例
   * @author jocklei
   * @date 2025/02/09
   * @param {string} privateKey - 以太坊钱包的私钥
   * @param {ethers.JsonRpcProvider} provider - 以太坊提供者
   * @return {*}
   */
  function wallet(privateKey: string, provider: ethers.JsonRpcProvider) {
    return new ethers.Wallet(privateKey, provider);
  }

  return {
    toEth,
    wallet,
    getBalance
  };
});
export default useEthersStore

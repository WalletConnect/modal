import type { WalletConnectModalSignOptions } from '@walletconnect/sign-html'
import { WalletConnectModalSign } from '@walletconnect/sign-html'
import mitt from 'mitt'

export const emitter = mitt()

let walletConnectModalSignClient: WalletConnectModalSign | undefined = undefined

export type WalletConnectModalSignInstance = InstanceType<typeof WalletConnectModalSign>

export function setWalletConnectModalSignClient(options: WalletConnectModalSignOptions) {
  walletConnectModalSignClient = new WalletConnectModalSign(options)
}

export async function getWalletConnectModalSignClient(): Promise<WalletConnectModalSign> {
  return new Promise(resolve => {
    if (walletConnectModalSignClient) {
      resolve(walletConnectModalSignClient)
    } else {
      const interval = setInterval(() => {
        if (walletConnectModalSignClient) {
          clearInterval(interval)
          resolve(walletConnectModalSignClient)
        }
      }, 200)
    }
  })
}

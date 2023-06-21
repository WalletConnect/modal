import type { WalletConnectModalEventCallback } from '@walletconnect/modal-sign-html'
import { useEffect } from 'react'
import { getWalletConnectModalSignClient } from '../client'

export function useOnSessionEvent(callback: WalletConnectModalEventCallback) {
  useEffect(() => {
    getWalletConnectModalSignClient().then(client => {
      client.onSessionEvent(callback)
    })

    return () => {
      getWalletConnectModalSignClient().then(client => {
        client.offSessionEvent(callback)
      })
    }
  }, [callback])
}

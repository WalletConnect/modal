import type { WalletConnectModalSignOptions } from '@walletconnect/modal-sign-html'
import { memo, useEffect } from 'react'
import { setWalletConnectModalSignClient } from '../client'

// -- Types --------------------------------------------------------------------
export type WalletConnectModalSignProps = WalletConnectModalSignOptions

function WalletConnectModalSignComp(props: WalletConnectModalSignProps) {
  useEffect(() => {
    setWalletConnectModalSignClient(props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export const WalletConnectModalSign = memo(WalletConnectModalSignComp)

import type { WalletConnectModalSignDisconnectArguments } from '@walletconnect/sign-html'
import { emitter, getWalletConnectModalSignClient } from '../client'
import { useAsyncAction } from './_useAsyncAction'

export function useDisconnect(params: WalletConnectModalSignDisconnectArguments) {
  const { error, loading, setError, setLoading } = useAsyncAction()

  async function disconnect(paramsOverride?: WalletConnectModalSignDisconnectArguments) {
    try {
      setLoading(true)
      setError(undefined)
      const client = await getWalletConnectModalSignClient()
      await client.disconnect(paramsOverride ?? params)
      emitter.emit('session_change')
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { error, loading, disconnect }
}

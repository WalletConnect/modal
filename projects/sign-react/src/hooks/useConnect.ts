import type { WalletConnectModalSignConnectArguments } from '@walletconnect/sign-html'
import type { WalletConnectModalSignInstance } from '../client'
import { emitter, getWalletConnectModalSignClient } from '../client'
import { useAsyncAction } from './_useAsyncAction'

type Data = Awaited<ReturnType<WalletConnectModalSignInstance['connect']>>

export function useConnect(params: WalletConnectModalSignConnectArguments) {
  const { data, error, loading, setData, setError, setLoading } = useAsyncAction<Data>()

  async function connect(paramsOverride?: WalletConnectModalSignConnectArguments) {
    try {
      setLoading(true)
      setError(undefined)
      const client = await getWalletConnectModalSignClient()
      const response = await client.connect(paramsOverride ?? params)
      setData(response)
      emitter.emit('session_change')

      return response
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, connect }
}

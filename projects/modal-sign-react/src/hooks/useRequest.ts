import type { WalletConnectModalSignRequestArguments } from '@walletconnect/modal-sign-html'
import { getWalletConnectModalSignClient } from '../client'
import { useAsyncAction } from './_useAsyncAction'

export function useRequest<Result>(params: WalletConnectModalSignRequestArguments) {
  const { data, error, loading, setData, setError, setLoading } = useAsyncAction<Result>()

  async function request(paramsOverride?: WalletConnectModalSignRequestArguments) {
    try {
      setLoading(true)
      setError(undefined)
      const client = await getWalletConnectModalSignClient()
      const response = await client.request<Result>(paramsOverride ?? params)
      setData(response)

      return response
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, request }
}

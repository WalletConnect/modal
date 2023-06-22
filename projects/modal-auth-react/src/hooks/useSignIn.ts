import type { WalletConnectModalAuthSignInArguments } from '@walletconnect/modal-auth-html'
import type { WalletConnectModalAuthInstance } from '../client'
import { getWalletConnectModalAuthClient } from '../client'
import { useAsyncAction } from './_useAsyncAction'

type Data = Awaited<ReturnType<WalletConnectModalAuthInstance['signIn']>>

export function useSignIn(params: WalletConnectModalAuthSignInArguments) {
  const { data, error, loading, setData, setError, setLoading } = useAsyncAction<Data>()

  async function signIn(paramsOverride?: WalletConnectModalAuthSignInArguments) {
    try {
      setLoading(true)
      setError(undefined)
      const client = await getWalletConnectModalAuthClient()
      const response = await client.signIn(paramsOverride ?? params)
      setData(response)

      return response
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { signIn, data, error, loading }
}

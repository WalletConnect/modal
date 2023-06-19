import { EthereumProvider } from '@walletconnect/ethereum-provider'
import type { EthereumProvider as IEthereumProvider } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import { useEffect, useState } from 'react'

export default function WithEthereumProvider() {
  const [providerClient, setProviderClient] = useState<IEthereumProvider | undefined>(undefined)

  async function onInitializeProviderClient() {
    const client = await EthereumProvider.init({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
      showQrModal: true,
      chains: [1],
      methods: ['eth_sendTransaction', 'personal_sign'],
      events: ['connect', 'disconnect']
    })
    setProviderClient(client)
  }

  async function onConnect() {
    if (providerClient) {
      await providerClient.connect()
    } else {
      throw new Error('providerClient is not initialized')
    }
  }

  async function onDisconnect() {
    if (providerClient) {
      await providerClient.disconnect()
    } else {
      throw new Error('providerClient is not initialized')
    }
  }

  useEffect(() => {
    onInitializeProviderClient()
  }, [])

  return (
    <>
      {providerClient && (
        <>
          <button onClick={onDisconnect}>Disconnect</button>
          <button onClick={onConnect}>Connect</button>
        </>
      )}
    </>
  )
}

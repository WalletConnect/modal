import { useEffect, useState } from 'react'
import type { WalletConnectModalSignInstance } from '../client'
import { getWalletConnectModalSignClient } from '../client'

type Data = Awaited<ReturnType<WalletConnectModalSignInstance['getSessions']>>

export function useSessions() {
  const [sessions, setSessions] = useState<Data | undefined>(undefined)

  useEffect(() => {
    async function getAllSessions() {
      const client = await getWalletConnectModalSignClient()
      const response = await client.getSessions()
      setSessions(response)
    }

    getAllSessions()
  }, [])

  return sessions
}

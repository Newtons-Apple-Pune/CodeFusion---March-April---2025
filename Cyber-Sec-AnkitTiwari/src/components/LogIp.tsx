'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function LogIP() {
  const { data: session } = useSession()

  useEffect(() => {
    const logIP = async () => {
      try {
        await fetch('/api/log-ip', {
          method: 'POST',
        })
      } catch (error) {
        console.error('Failed to log IP:', error)
      }
    }

    if (session?.user) {
      logIP()
    }
  }, [session?.user])

  return null // This component doesn't render anything
}

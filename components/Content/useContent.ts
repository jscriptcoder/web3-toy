import { useEffect } from 'react'
import type { EventData } from 'web3-eth-contract'
import { useAppContext } from '../../context/appStore'
import emitter from '../../utils/emitter'

export default function useContent() {
  const [appState] = useAppContext()
  const { address, balance, balanceUSD, isConnected, activity, receipts } =
    appState

  useEffect(() => {
    const onErrorClaimingTokens = (error: Error) => {
      console.log('[onErrorClaimingTokens] Error:', error)
      // TODO: implement
    }

    const onTokensClaimed = (event: EventData) => {
      console.log('[onTokensClaimed] Event data:', event)

      const { returnValues } = event
      // TODO: implement
    }

    emitter.on('error-claiming-tokens', onErrorClaimingTokens)
    emitter.on('tokens-claimed', onTokensClaimed)

    return () => {
      emitter.off('error-claiming-tokens', onErrorClaimingTokens)
      emitter.off('tokens-claimed', onTokensClaimed)
    }
  }, [])

  return { address, balance, balanceUSD, isConnected }
}

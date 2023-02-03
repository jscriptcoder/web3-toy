import { notification } from 'antd'
import { useEffect } from 'react'
import type { EventData } from 'web3-eth-contract'
import { useAppContext } from '../../context/appStore'
import emitter from '../../utils/emitter'
import { notifyError } from '../../utils/notify'

type ReturnValues = {
  receiver_: Address
  tokensClaimed_: number
  destination_: Address
}

function notifySuccessTransaction({
  tokensClaimed_,
  destination_,
}: ReturnValues): void {
  notification.success({
    message: 'Tokens successfully claimed.',
    description: (
      <div>
        Your have successfully claimed <strong>{tokensClaimed_}</strong> tokens
        into the account <strong>{destination_}</strong>
      </div>
    ),
  })
}

export default function useContent() {
  const [appState] = useAppContext()
  const { address, balance, balanceUSD, isConnected, activity, receipts } =
    appState

  useEffect(() => {
    const onErrorClaimingTokens = (error: Error) => {
      console.log('[onErrorClaimingTokens] Error:', error)
      notifyError('There was a problem claiming tokens', error)
    }

    const onTokensClaimed = (event: EventData) => {
      console.log('[onTokensClaimed] Event data:', event)

      const { returnValues } = event
      notifySuccessTransaction(returnValues as ReturnValues)
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

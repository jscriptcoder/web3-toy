import { message, notification } from 'antd'
import { useCallback, useState } from 'react'
import { useAppContext } from '../../context/appStore'
import { getPrice } from '../../utils/api'
import { notifyError } from '../../utils/notify'
import { toLocalePrice } from '../../utils/numeral'
import {
  getBalance,
  getLatestTransactions,
  requestAccounts,
} from '../../utils/web3'

/**
 * Helper function to notify the user of successful connection
 * showing the current balanace
 */
function notifySuccessfulConnection(balance: Amount): void {
  notification.success({
    message: 'Successful connection.',
    description: (
      <div>
        Your wallet, with balance <strong>{balance} ETH</strong>, is now
        connected.
      </div>
    ),
  })
}

export default function useConnectButton() {
  const [messageApi, messageHolder] = message.useMessage()
  const [connecting, setConnecting] = useState(false)
  const [appState, appDispatch] = useAppContext()

  const { isConnected } = appState

  const onConnectClick = useCallback(async () => {
    if (!isConnected) {
      setConnecting(true)

      try {
        // This will prompt the user for wallet connection...
        const [address] = await requestAccounts()

        // ... then we gather information to add to our global state
        const balance = await getBalance(address)
        const data = await getPrice('ethereum', 'usd')

        if ('error' in data) {
          // data: ErrorData
          throw Error(data.error)
        }

        const balanceUSD = toLocalePrice(parseFloat(balance) * data.price)
        const activity = await getLatestTransactions(address, 5)

        appDispatch({
          address,
          balance,
          balanceUSD,
          activity,
          isConnected: true,
        })

        notifySuccessfulConnection(balance)
      } catch (err) {
        console.error(err)
        notifyError('Error connecting', err)
      } finally {
        setConnecting(false)
      }
    }
  }, [isConnected])

  const onDisconnectClick = useCallback(async () => {
    // TODO: Implement
    messageApi.warning('Not yet implemented')
  }, [])

  return {
    appState,
    connecting,
    messageHolder,
    onConnectClick,
    onDisconnectClick,
  }
}

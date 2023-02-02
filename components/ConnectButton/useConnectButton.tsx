import { Modal, notification } from 'antd'
import { useCallback, useState } from 'react'
import { useAppContext } from '../../context/appStore'
import { getPrice } from '../../utils/api'
import { toLocalePrice } from '../../utils/numeral'
import {
  getBalance,
  getLatestTransactions,
  requestAccounts,
} from '../../utils/web3'

function notifySuccessfulConnection(balance: string): void {
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

function notifySomethingWentWrong(error: unknown): void {
  notification.error({
    message: 'Something went wrong',
    description: `${error}`,
  })
}

export default function useConnectButton() {
  const [connecting, setConnecting] = useState(false)
  const [appState, appDispatch] = useAppContext()

  const clickConnect = useCallback(async () => {
    if (!appState.address) {
      setConnecting(true)

      try {
        // This will prompt the user for wallet connection
        const [address] = await requestAccounts()

        // Then we gather information to add to our global state
        const balance = await getBalance(address)
        const data = await getPrice('ethereum', 'usd')

        if ('error' in data) {
          throw Error(data.error)
        }

        const balanceUSD = toLocalePrice(parseFloat(balance) * data.price)
        const activity = await getLatestTransactions(address, 5)

        appDispatch({ address, balance, balanceUSD, activity })

        notifySuccessfulConnection(balance)
      } catch (err) {
        console.error(err)

        notifySomethingWentWrong(err)
      } finally {
        setConnecting(false)
      }
    }
  }, [appState.address])

  const clickDisconnect = useCallback(async () => {
    Modal.info({
      content: 'Not yet implemented',
      footer: null,
      closable: true,
      maskClosable: true,
    })
  }, [])

  return {
    appState,
    connecting,
    clickConnect,
    clickDisconnect,
  }
}

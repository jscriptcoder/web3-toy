import {
  LoginOutlined,
  LogoutOutlined,
  SelectOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Modal, notification } from 'antd'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEventHandler,
} from 'react'
import type { Transaction } from 'web3-core'
import { useAppContext } from '../../context/appStore'
import { getPrice } from '../../utils/api'
import { toLocalePrice } from '../../utils/numeral'

export function getListItemMeta(address: Address, tx: Transaction) {
  return address === tx.from
    ? {
        avatar: <UploadOutlined />,
        title: `Sent to`,
        description: <small>{tx.to}</small>,
      }
    : {
        avatar: <SelectOutlined />,
        title: `Received from`,
        description: <small>{tx.from}</small>,
      }
}

export default function useContent() {
  const [loading, setLoading] = useState(false)
  const [appState, appDispatch] = useAppContext()

  const isConnected = useMemo(
    () => Boolean(appState.address),
    [appState.address],
  )

  useEffect(() => {
    if (appState.balance) {
      getPrice('ethereum', 'usd').then((data) => {
        if ('price' in data) {
          appDispatch({
            balanceUSD: toLocalePrice(
              parseFloat(appState.balance) * data.price,
            ),
          })
        }
      })
    }
  }, [appState.balance])

  return {
    loading,
    appState,
    isConnected,
  }
}

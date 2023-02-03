import {
  CloseCircleOutlined,
  SelectOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Empty, List, Modal, Spin } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Transaction } from 'web3-core'
import { useAppContext } from '../../context/appStore'
import { notifyError } from '../../utils/notify'
import { truncateAddress } from '../../utils/strings'
import { getLatestTransactions, toEther } from '../../utils/web3'
import TransactionDetails from './TransactionDetails'

interface MetaTitleProps {
  title: string
  amount: string
}

const ItemMetaTitle = ({ title, amount }: MetaTitleProps): JSX.Element => (
  <div className="flex justify-between">
    <span>{title}</span>
    <span className="text-right">{amount}</span>
  </div>
)

const { Item } = List
const { Meta } = Item

/**
 * This function generates the meta information for the item
 * @param address User's account
 * @param tx Information about the transaction that took place
 * @param receipt Receipt of the transaction
 * @returns Object with the meta information
 */
function getListItemMeta(
  address: Address,
  tx: Transaction,
  receipt: TransactionReceipt,
) {
  const amountEth = `${toEther(tx.value)} ETH`
  const addressFrom =
    address.toLocaleLowerCase() === tx.from.toLocaleLowerCase()
  const succeeded = receipt.status

  return addressFrom
    ? {
        avatar: succeeded ? <UploadOutlined /> : <CloseCircleOutlined />,
        title: (
          <ItemMetaTitle
            title={succeeded ? 'Sent' : 'Failed'}
            amount={amountEth}
          />
        ),
        description: (
          <small title={tx.to ?? ''}>{truncateAddress(tx.to, 22)}</small>
        ),
      }
    : {
        avatar: succeeded ? <SelectOutlined /> : <CloseCircleOutlined />,
        title: (
          <ItemMetaTitle
            title={succeeded ? 'Received' : 'Failed'}
            amount={amountEth}
          />
        ),
        description: (
          <small title={tx.from}>{truncateAddress(tx.from, 22)}</small>
        ),
      }
}

// activity: Transaction[]
// receipts: TransactionReceipt[]

export default function useActivity(address: Address) {
  const [loading, setLoading] = useState(false)
  const [appState, appDispatch] = useAppContext()
  const { activity, receipts } = appState

  const showTransactionDetails = useCallback((tx: Transaction) => {
    console.log('[showTransactionDetails] Transaction:', tx)

    Modal.info({
      content: <TransactionDetails tx={tx} />,
      footer: null,
      closable: true,
      maskClosable: true,
      width: 500,
      icon: null,
    })
  }, [])

  const items = useMemo(
    () => [
      {
        key: 'activity',
        label: 'Activity',
        children: (
          <div>
            {loading && (
              <div className="p-4 text-center">
                <Spin size="large" tip="Quering activities..." />
              </div>
            )}

            {!loading && activity.length > 0 && (
              <List>
                {activity.map((tx, i) => (
                  <Item
                    className="cursor-pointer"
                    key={tx.blockHash}
                    onClick={() => showTransactionDetails(tx)}
                  >
                    <Meta {...getListItemMeta(address, tx, receipts[i])} />
                  </Item>
                ))}
              </List>
            )}

            {!loading && activity.length === 0 && (
              <div className="p-4 text-center">
                <Empty
                  description="No activities found"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'assets',
        label: 'Assets',
        children: 'Assets',
        disabled: true,
      },
    ],
    [activity, receipts, loading],
  )

  useEffect(() => {
    setLoading(true)

    // Finds the latest 5 transactions within the last 10 blocks
    getLatestTransactions(address, 5, 10)
      .then(({ activity, receipts }) => {
        appDispatch({ activity, receipts })
      })
      .catch((err) => {
        console.error('[getLatestTransactions] Error:', err)
        notifyError('Error querying the latest transactions', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { items }
}

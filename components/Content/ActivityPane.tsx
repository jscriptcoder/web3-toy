import {
  CloseCircleOutlined,
  SelectOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { List, Modal, Tabs } from 'antd'
import { useCallback, useMemo } from 'react'
import type { Transaction } from 'web3-core'
import { truncateAddress } from '../../utils/strings'
import { toEther } from '../../utils/web3'
import TransactionDetails from './TransactionDetails'

interface ActivityPaneProps {
  address: Address
  activity: Transaction[]
  receipts: TransactionReceipt[]
}

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

const { Item } = List
const { Meta } = Item

export default function ActivityPane({
  address,
  activity,
  receipts,
}: ActivityPaneProps) {
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
        ),
      },
      {
        key: 'assets',
        label: 'Assets',
        children: 'Assets',
        disabled: true,
      },
    ],
    [activity],
  )

  return (
    <div className="p-4">
      <Tabs size="large" defaultActiveKey="1" type="card" items={items} />
    </div>
  )
}

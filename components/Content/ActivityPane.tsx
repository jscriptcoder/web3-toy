import {
  CloseCircleOutlined,
  SelectOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { List, Tabs } from 'antd'
import { useMemo } from 'react'
import type { Transaction } from 'web3-core'
import { truncateAddress } from '../../utils/strings'
import { toEther } from '../../utils/web3'

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
        description: <small className="text-xs">{tx.to}</small>,
      }
    : {
        avatar: succeeded ? <SelectOutlined /> : <CloseCircleOutlined />,
        title: (
          <ItemMetaTitle
            title={succeeded ? 'Received' : 'Failed'}
            amount={amountEth}
          />
        ),
        description: <small className="text-xs">{tx.from}</small>,
      }
}

const { Item } = List
const { Meta } = Item

export default function ActivityPane({
  address,
  activity,
  receipts,
}: ActivityPaneProps) {
  const items = useMemo(
    () => [
      {
        key: 'activity',
        label: 'Activity',
        children: (
          <List>
            {activity.map((tx, i) => (
              <Item key={tx.blockHash}>
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

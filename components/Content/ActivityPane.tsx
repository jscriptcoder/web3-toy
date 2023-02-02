import { SelectOutlined, UploadOutlined } from '@ant-design/icons'
import { List, Tabs } from 'antd'
import { useMemo } from 'react'
import type { Transaction } from 'web3-core'

interface ActivityPaneProps {
  address: Address
  activity: Transaction[]
}

function getListItemMeta(address: Address, tx: Transaction) {
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

const { Item } = List
const { Meta } = Item

export default function ActivityPane({ address, activity }: ActivityPaneProps) {
  const items = useMemo(
    () => [
      {
        key: 'activity',
        label: 'Activity',
        children: (
          <List>
            {activity.map((tx) => (
              <Item key={tx.blockHash}>
                <Meta {...getListItemMeta(address, tx)} />
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

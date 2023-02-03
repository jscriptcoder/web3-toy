import {
  CloseCircleOutlined,
  SelectOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { List, Tabs } from 'antd'
import type { Transaction } from 'web3-core'
import { truncateAddress } from '../../utils/strings'
import { toEther } from '../../utils/web3'
import useActivity from './useActivity'

interface ActivityPaneProps {
  address: Address
}

export default function ActivityPane({ address }: ActivityPaneProps) {
  const { items } = useActivity(address)

  return (
    <div className="p-4">
      <Tabs size="large" defaultActiveKey="1" type="card" items={items} />
    </div>
  )
}

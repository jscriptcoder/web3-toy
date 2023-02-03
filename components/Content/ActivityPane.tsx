import { Tabs } from 'antd'
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

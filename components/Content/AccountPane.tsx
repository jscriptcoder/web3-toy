import { Alert, Popover, Typography } from 'antd'
import { truncateAddress } from '../../utils/strings'

interface AccountPaneProps {
  address: Address
  isConnected: boolean
}

const { Title, Text } = Typography

export default function AccountPane({
  address,
  isConnected,
}: AccountPaneProps) {
  const content = isConnected ? (
    <Popover placement="bottom" content={address}>
      <Text>{truncateAddress(address, 12)}</Text>
    </Popover>
  ) : (
    <Alert
      className="rounded-md"
      message="Not yet connected"
      description="Please, connect to your wallet"
      type="warning"
      banner
    />
  )

  return (
    <div className="p-4 text-center">
      <Title level={2} className="text-shadow">
        Account
      </Title>
      {content}
    </div>
  )
}

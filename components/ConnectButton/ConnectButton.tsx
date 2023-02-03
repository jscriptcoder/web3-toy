import { CheckCircleFilled, LogoutOutlined } from '@ant-design/icons'
import { Button, Divider, Popover } from 'antd'
import { truncateAddress } from '../../utils/strings'
import Loading from '../Loading'
import useConnectButton from './useConnectButton'

interface ConnectButtonProps {
  label: string
}

export default function ConnectButton({ label }: ConnectButtonProps) {
  const {
    appState,
    connecting,
    messageHolder,
    onConnectClick,
    onDisconnectClick,
  } = useConnectButton()

  const { address, balance } = appState

  // If we have address means the user is connected.
  // We'll had a small popover displaying some more
  // details of that address, plus a disconnect button.
  const ButtonContent = address ? (
    <Popover
      placement="bottom"
      content={
        <div>
          <div className="flex flex-col">
            <strong>Wallet address:</strong>
            <span className="text-xs">{address}</span>
          </div>

          <Divider className="my-2" />

          <div className="flex space-x-1 items-center">
            <strong>Balance:</strong>
            <span className="text-xs">{balance} ETH</span>
          </div>

          <Divider className="my-2" />

          <div className="flex justify-center">
            <Button
              className="flex items-center"
              type="dashed"
              onClick={onDisconnectClick}
            >
              <span>Disconnect</span>
              <LogoutOutlined />
            </Button>
          </div>
        </div>
      }
    >
      <span className="w-full space-x-2 flex items-center">
        <CheckCircleFilled />
        <strong>Connected to: </strong>
        <span>{truncateAddress(address, 6)}</span>
      </span>
    </Popover>
  ) : (
    <span>{label}</span>
  )

  return (
    <div className="ConnectButton">
      {messageHolder}
      <Button onClick={onConnectClick}>{ButtonContent}</Button>
      <Loading
        show={connecting}
        title="Connecting to a wallet..."
        tip="Please wait"
      />
    </div>
  )
}

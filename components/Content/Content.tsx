import Image from 'next/image'
import { Avatar, Divider, Layout, List, Popover, Tabs, Typography } from 'antd'
import useContent, { getListItemMeta } from './useContent'
import { truncateAddress } from '../../utils/strings'

const { Title, Text } = Typography

export default function Content() {
  const { loading, appState, isConnected } = useContent()
  const { address, balance, balanceUSD, activity } = appState

  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box w-[400px] overflow-auto">
          <div className="p-4 text-center">
            <Title level={2} className="text-shadow">
              Account
            </Title>
            <Popover placement="bottom" content={address}>
              <Text>{truncateAddress(address, 12)}</Text>
            </Popover>
          </div>

          <Divider />
          <div className="flex flex-col items-center">
            <Image
              alt="Ethereum logo"
              src="/ethereum-diamond-logo.svg"
              width={32}
              height={0}
            />
            <Title level={2} className="text-shadow">
              {balance} <small>ETH</small>
            </Title>
            <Text>{balanceUSD} USD</Text>
          </div>
          <Divider />
          <div className="p-4">
            <Tabs
              size="large"
              defaultActiveKey="1"
              type="card"
              items={[
                {
                  key: 'activity',
                  label: 'Activity',
                  children: (
                    <List>
                      {activity.map((tx) => (
                        <List.Item key={tx.blockHash}>
                          <List.Item.Meta {...getListItemMeta(address, tx)} />
                        </List.Item>
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
              ]}
            />
          </div>
        </div>
      </div>
    </Layout.Content>
  )
}

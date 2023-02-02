import { useMemo } from 'react'
import { Divider, Layout } from 'antd'
import AmountPane from './AmountPane'
import ActivityPane from './ActivityPane'
import AccountPane from './AccountPane'
import AccountMenu from './AccountMenu'
import { useAppContext } from '../../context/appStore'

export default function Content() {
  const [appState] = useAppContext()
  const { address, balance, balanceUSD, activity } = appState
  const isConnected = useMemo(() => Boolean(address), [address])

  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box w-[400px] overflow-auto">
          {isConnected && <AccountMenu />}

          <AccountPane address={address} isConnected={isConnected} />

          {isConnected && (
            <>
              <Divider />
              <AmountPane balance={balance} balanceUSD={balanceUSD} />
              <Divider />
              <ActivityPane address={address} activity={activity} />
            </>
          )}
        </div>
      </div>
    </Layout.Content>
  )
}

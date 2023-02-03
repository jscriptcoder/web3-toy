import { useMemo } from 'react'
import { Divider, Layout } from 'antd'
import AmountPane from './AmountPane'
import ActivityPane from './ActivityPane'
import AccountPane from './AccountPane'
import AccountMenu from './AccountMenu'
import { useAppContext } from '../../context/appStore'

export default function Content() {
  const [appState] = useAppContext()
  const { address, balance, balanceUSD, isConnected, activity, receipts } =
    appState

  return (
    <Layout.Content>
      <div className="bg-[url('/ethereum-bg6.png')] h-full bg-cover flex gap-12 justify-center p-12">
        <div className="glass-box w-[400px] overflow-auto">
          {/*
            We always show this pane, but the content depends on
            whether or not the user is connected
          */}
          <AccountPane address={address} isConnected={isConnected} />

          {isConnected && (
            <>
              <AccountMenu address={address} />
              <Divider />
              <AmountPane balance={balance} balanceUSD={balanceUSD} />
              <Divider />
              <ActivityPane
                address={address}
                activity={activity}
                receipts={receipts}
              />
            </>
          )}
        </div>
      </div>
    </Layout.Content>
  )
}

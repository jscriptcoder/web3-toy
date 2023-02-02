import { Typography } from 'antd'
import Image from 'next/image'

interface AmountPaneProps {
  balance: Amount
  balanceUSD: Amount
}

export default function AmountPane({ balance, balanceUSD }: AmountPaneProps) {
  return (
    <div className="flex flex-col items-center p-4">
      <Image
        alt="Ethereum logo"
        src="/ethereum-diamond-logo.svg"
        width={32}
        height={0}
      />
      <Typography.Title level={2} className="text-shadow">
        {balance} <small>ETH</small>
      </Typography.Title>
      <Typography.Text>
        {balanceUSD} <small>USD</small>
      </Typography.Text>
    </div>
  )
}

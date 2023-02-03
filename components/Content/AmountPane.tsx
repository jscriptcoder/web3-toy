import { Typography } from 'antd'
import Image from 'next/image'

interface AmountPaneProps {
  balance: Amount
  balanceUSD: Amount
}

const { Title, Text } = Typography

export default function AmountPane({ balance, balanceUSD }: AmountPaneProps) {
  return (
    <div className="flex flex-col items-center p-4">
      <Image
        alt="Ethereum logo"
        src="/ethereum-diamond-logo.svg"
        width={32}
        height={0}
      />
      <Title level={3} className="text-shadow">
        {balance} <small>ETH</small>
      </Title>
      <Text>
        {balanceUSD} <small>USD</small>
      </Text>
    </div>
  )
}

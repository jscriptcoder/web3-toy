import { List } from 'antd'
import type { Transaction } from 'web3-core'
import { truncateAddress } from '../../utils/strings'
import { toEther, toGwei } from '../../utils/web3'

interface TransactionDetailsProps {
  tx: Transaction
}

const { Item } = List
const { Meta } = Item

export default function TransactionDetails({ tx }: TransactionDetailsProps) {
  // TODO: use a Table component instead
  return (
    <List className="w-[400px]">
      <Item className="flex justify-evenly">
        <strong>Hash:</strong>
        <small title={tx.hash} className="text-right">
          {truncateAddress(tx.hash, 37)}
        </small>
      </Item>
      <Item className="flex justify-between">
        <strong>From:</strong>
        <small className="text-right">{tx.from}</small>
      </Item>
      <Item className="flex justify-between">
        <strong>To:</strong>
        <small className="text-right">{tx.to}</small>
      </Item>
      <Item className="flex justify-between">
        <strong>Value:</strong>
        <small className="text-right">{toEther(tx.value)} ETH</small>
      </Item>
      <Item className="flex justify-between">
        <strong>Gas Price:</strong>
        <small className="text-right">{toGwei(tx.gasPrice)} gwei</small>
      </Item>
      <Item className="flex justify-between">
        <strong>Gas:</strong>
        <small className="text-right">{tx.gas} wei</small>
      </Item>
      <Item className="flex justify-between">
        <strong>Block No:</strong>
        <small className="text-right">{tx.blockNumber}</small>
      </Item>
    </List>
  )
}

import Web3 from 'web3'
import type { Transaction } from 'web3-core'
import tokenVestingJson from '../artifacts/TokenVesting.json'
import emitter from './emitter'

// Network settings have more properties, but we're only interested in the `address`
type NetworkSettings = Record<string, { address: Address }>

const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

const networkSettings = tokenVestingJson.networks as NetworkSettings

const contractAbi = tokenVestingJson.abi as unknown as AbiItem
const contractAddress = networkSettings[networkId ?? 5777].address as Address

export const web3 = new Web3(Web3.givenProvider ?? projectUrl)

export const contract = new web3.eth.Contract(contractAbi, contractAddress)

export async function requestAccounts(): Promise<Address[]> {
  return web3.eth.requestAccounts()
}

export async function getBalance(address: Address): Promise<Amount> {
  const balanceWei = await web3.eth.getBalance(address)
  return web3.utils.fromWei(balanceWei)
}

async function gatherActivity(
  address: string,
  activity: Transaction[],
  blockHash = 'latest',
  limit = 5,
): Promise<void> {
  // Exit condition
  if (
    activity.length === limit ||
    (blockHash !== 'latest' && !Number(blockHash))
  ) {
    return
  }

  const block = await web3.eth.getBlock(blockHash)

  const { parentHash, transactions } = block

  const promises = transactions.map((transactionHash) =>
    web3.eth.getTransaction(transactionHash),
  )
  const txs = await Promise.all(promises)

  // Gather any transaction where the address was involved
  txs.forEach((tx) => {
    const { from, to } = tx
    if (from === address || to === address) {
      activity.push(tx)
    }
  })

  return gatherActivity(address, activity, parentHash, limit)
}

export async function getLatestTransactions(
  address: Address,
  howMany: number,
): Promise<Transaction[]> {
  const activity: Transaction[] = []
  await gatherActivity(address, activity, 'latest', howMany)

  return activity
}

export async function getTotalVested(from: Address): Promise<Amount> {
  if (from) {
    return contract.methods.totalVestingsTokens().call({ from })
  }

  throw Error('[getTotalVested] Missing "from" argument')
}

export async function claimTokens(address: Address): Promise<void> {
  if (address) {
    return contract.methods.claimTokens(address).send({ from: address })
  }

  throw Error('[claimTokens] Missing "address" argument')
}

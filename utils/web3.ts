/**
 * This module will wrap around web3.js library and create the methods
 * the application needs to communicate with the wallet extension and our
 * TokenPrivider smart contract.
 */

import Web3 from 'web3'
import type { Transaction } from 'web3-core'
import tokenVestingJson from '../artifacts/TokenVesting.json'
import { assert } from './check'

// Network settings have more properties, but we're only interested in the `address`
type NetworkSettings = Record<string, { address: Address }>

// See .env.example
const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

const networkSettings = tokenVestingJson.networks as NetworkSettings

// We can find the ABI in the contract artifact generated on compilation
const contractAbi = tokenVestingJson.abi as unknown as AbiItem
const contractAddress = networkSettings[networkId ?? 5777].address as Address

export const web3 = new Web3(Web3.givenProvider ?? projectUrl)

// Will help us to interact with the contract
export const contract = new web3.eth.Contract(contractAbi, contractAddress)

/**
 * This function will prompt the user for permission to connect their wallet
 * @returns List of connected wallet's accounts
 */
export async function requestAccounts(): Promise<Address[]> {
  return web3.eth.requestAccounts()
}

/**
 * Gets the balance of an account
 * @param address Address we want to get the balance from
 * @returns The amount held in that address
 */
export async function getBalance(address: Address): Promise<Amount> {
  assert(!address, '[getBalance] Missing "address" argument')

  const balanceWei = await web3.eth.getBalance(address)
  return web3.utils.fromWei(balanceWei)
}

/**
 * Internal recursive function used by getLatestTransactions
 * @param address Address we're trying to get the activity from
 * @param activity List of transactions. Will be mutated
 * @param blockHash Hash of the current block
 * @param limit How many transactions we want to gather
 */
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

  // Collect any transaction where the address was involved,
  // this means any transaction from or to
  txs.forEach((tx) => {
    const { from, to } = tx
    if (from === address || to === address) {
      activity.push(tx)
    }
  })

  return gatherActivity(address, activity, parentHash, limit)
}

/**
 * Gathers the activity of an account
 * @param address
 * @param howMany Amount to transactions we want to return
 * @returns The latest transactions
 */
export async function getLatestTransactions(
  address: Address,
  howMany: number,
): Promise<Transaction[]> {
  assert(!address, '[getLatestTransactions] Missing "address" argument')

  const activity: Transaction[] = []
  await gatherActivity(address, activity, 'latest', howMany)

  return activity
}

/**
 * How many tokens can be vested
 * @param from Address calling this function
 * @returns Total vesting tokens
 */
export async function getTotalVesting(from: Address): Promise<Amount> {
  assert(!from, '[getTotalVesting] Missing "from" argument')
  return contract.methods.totalVestingsTokens().call({ from })
}

/**
 * Claims tokens
 * @param address Address that wants to claim the tokens
 * @returns A promise with the transaction
 */
export async function claimTokens(address: Address): Promise<void> {
  assert(!address, '[claimTokens] Missing "address" argument')
  return contract.methods.claimTokens(address).send({ from: address })
}

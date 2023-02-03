/**
 * This module will wrap around web3.js library and create the methods
 * the application needs to communicate with the wallet extension and our
 * TokenPrivider smart contract.
 */

import type { Transaction, TransactionReceipt } from 'web3-core'
import type { EventData } from 'web3-eth-contract'
import { assert } from './check'
import emitter from './emitter'
import { web3, contract } from './_web3-helper'

/**
 * This function will prompt the user for permission to connect their wallet
 * @returns List of connected wallet's accounts
 */
export async function requestAccounts(): Promise<Address[]> {
  const accounts = await web3.eth.requestAccounts()
  console.log('[requestAccounts] Accounts:', accounts)
  return accounts
}

/**
 * Gets the balance of an account
 * @param address Address we want to get the balance from
 * @returns The amount held in that address in Ether
 */
export async function getBalance(address: Address): Promise<Amount> {
  assert(!address, '[getBalance] Missing "address" argument')

  const balanceWei = await web3.eth.getBalance(address)
  const balance = web3.utils.fromWei(balanceWei)
  console.log(`[getBalance] Balance: ${balance} ETH`)

  return balance
}

/**
 * Internal recursive function used by getLatestTransactions
 * @param address Address we're trying to get the activity from
 * @param activity List of transactions. Will be mutated
 * @param blockHash Hash of the current block
 * @param limit How many transactions we want to gather
 * @param depth How many blocks we want to check
 * @param recursion Counts how many times the function has been called
 */
async function gatherActivity(
  address: string,
  activity: Transaction[],
  blockHash = 'latest',
  limit = 5,
  depth = 5,
  recursion = 0,
): Promise<void> {
  // Exit condition
  if (
    activity.length === limit ||
    (blockHash !== 'latest' && !Number(blockHash)) ||
    recursion === depth // otherwise we might end up going through the entire chain
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
    if (
      from.toLocaleLowerCase() === address.toLocaleLowerCase() ||
      to?.toLocaleLowerCase() === address.toLocaleLowerCase()
    ) {
      activity.push(tx)
    }
  })

  return gatherActivity(
    address,
    activity,
    parentHash,
    limit,
    depth,
    (recursion += 1),
  )
}

/**
 * Gathers the activity of an account
 * @param address
 * @param transactions Amount to transactions we want to return
 * @param blocks Amount to blocks to go through
 * @returns The latest transactions and their receipts
 */
export async function getLatestTransactions(
  address: Address,
  transactions?: number,
  blocks?: number,
): Promise<{ activity: Transaction[]; receipts: TransactionReceipt[] }> {
  assert(!address, '[getLatestTransactions] Missing "address" argument')

  const activity: Transaction[] = []
  await gatherActivity(address, activity, 'latest', transactions, blocks)

  console.log('[getLatestTransactions] Activity:', activity)

  // Following we're gonna get the transaction receipt
  // in order to see the status
  const promises = activity.map((tx) => web3.eth.getTransactionReceipt(tx.hash))
  const receipts = await Promise.all(promises)

  console.log('[getLatestTransactions] Receipts:', receipts)

  return { activity, receipts }
}

/**
 * How many tokens can be vested
 * @param from Address calling this function
 * @returns Total vesting tokens
 */
export async function getTotalVesting(from: Address): Promise<Amount> {
  assert(!from, '[getTotalVesting] Missing "from" argument')

  const total = await contract.methods.totalVestingsTokens().call({ from })
  console.log('[getTotalVesting] Total vesting tokens:', total)

  return total
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

/**
 * Converts wei to ether
 * @param amount in wei units
 * @returns Amount in ether units
 */
export function toEther(amount: Amount): Amount {
  return web3.utils.fromWei(amount.toString(), 'ether')
}

/**
 * Converts wei to gwei
 * @param amount in wei units
 * @returns Amount in gwei units
 */
export function toGwei(amount: Amount): Amount {
  return web3.utils.fromWei(amount.toString(), 'gwei')
}

// We want to inform to the Frontend when the contract emits TokensClaimed event
// passing the event object, which contains all the details sent in the event.
contract.events.TokensClaimed((error: Error, event: EventData) => {
  if (error) {
    emitter.emit('error-claiming-tokens', error)
  } else {
    emitter.emit('tokens-claimed', event)
  }
})

import Web3 from 'web3'
import { EventData } from 'web3-eth-contract'
import tokenVestingJson from '../artifacts/TokenVesting.json'
import emitter from './emitter'

type Address = string
type Amount = string // amounts are always presented as strings

// Network settings have more properties, but we're only interested in the `address`
type NetworkSettings = Record<string, { address: Address }>

const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

const networkSettings = tokenVestingJson.networks as NetworkSettings

const contractAbi = tokenVestingJson.abi as unknown as AbiItem
const contractAddress = networkSettings[networkId ?? 5777].address as Address

export const web3 = new Web3(Web3.givenProvider ?? projectUrl)

export const contract = new web3.eth.Contract(contractAbi, contractAddress)

/**
 * This function will prompt the user for permission to connect their wallet
 * @returns list of connected wallet's accounts
 */
export async function requestAccounts(): Promise<Address[]> {
  return web3.eth.requestAccounts()
}

/**
 * @param address we want to get the balance from
 * @returns the amount in that address
 */
export async function getBalance(address: Address): Promise<Amount> {
  const balanceWei = await web3.eth.getBalance(address)
  return web3.utils.fromWei(balanceWei)
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

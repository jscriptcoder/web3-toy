import Web3 from 'web3'
import { EventData } from 'web3-eth-contract'
import toyJson from './contract.json'
import emitter from '../emitter'

type Address = string
type Amount = string // amounts are always presented as strings

type ContractDetails = {
  owner: Address
  balance: Amount
  contractBalance: Amount
}

// Network settings have more properties, but we're only interested in the `address`
type NetworkSettings = Record<string, { address: Address }>

const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

const networkSettings = toyJson.networks as NetworkSettings

const CONTRACT_ABI = toyJson.abi as unknown as AbiItem
const CONTRACT_ADDRESS = networkSettings[networkId ?? 5777].address as Address

export const web3 = new Web3(Web3.givenProvider ?? projectUrl)

export const toyContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

/**
 * @returns contract's deployed address
 */
export function getContractAddress(): Address {
  return CONTRACT_ADDRESS
}

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

/**
 * @returns the amount locked in the contract
 */
export async function getContractBalance(): Promise<Amount> {
  return getBalance(CONTRACT_ADDRESS)
}

/**
 * @returns address of the contract's owner
 */
export async function getContractOwner(): Promise<Address> {
  return toyContract.methods.owner().call()
}

/**
 * @param address address querying the contract's detail
 * @returns a promise with details about the contract
 */
export async function getContractDetails(
  address: Address,
): Promise<ContractDetails> {
  const [balance, owner, contractBalance] = await Promise.all([
    getBalance(address),
    getContractOwner(),
    getContractBalance(),
  ])

  return {
    owner,
    balance,
    contractBalance,
  }
}

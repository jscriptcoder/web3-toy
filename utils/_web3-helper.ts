import Web3 from 'web3'
import tokenVestingJson from '../artifacts/TokenVesting.json'
import tokenVestingLiveJson from '../artifacts/TokenVesting.live.json'

function getAbi(neckworkId?: string) {
  return (neckworkId === '1'
    ? tokenVestingLiveJson.abi
    : tokenVestingJson.abi) as unknown as AbiItem
}

function getNetworkSettings(neckworkId?: string) {
  return (
    neckworkId === '1'
      ? tokenVestingLiveJson.networks
      : tokenVestingJson.networks
  ) as NetworkSettings
}

// Network settings have more properties, but we're only interested in the `address`
type NetworkSettings = Record<string, { address: Address }>

// See .env.example
const projectUrl = process.env['NEXT_PUBLIC_PROJECT_URL']
const networkId = process.env['NEXT_PUBLIC_NETWORK_ID']

const networkSettings = getNetworkSettings(networkId)

// We can find the ABI in the contract artifact generated on compilation
const contractAbi = getAbi(networkId)
const contractAddress = networkSettings[networkId ?? 5777].address as Address

console.log('[web3.ts] Contract address:', contractAddress)

export const web3 = new Web3(Web3.givenProvider ?? projectUrl)

// Will help us to interact with the contract
export const contract = new web3.eth.Contract(contractAbi, contractAddress)

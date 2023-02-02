const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')

require('dotenv').config()

const { MNEMONIC, NEXT_PUBLIC_PROJECT_URL, NEXT_PUBLIC_NETWORK_ID } =
  process.env

const provider = new HDWalletProvider(MNEMONIC, NEXT_PUBLIC_PROJECT_URL)
const web3 = new Web3(provider)

module.exports = {
  web3,
  getContract(contractJs) {
    const { networks, abi } = contractJs
    const address = networks[NEXT_PUBLIC_NETWORK_ID].address
    return new web3.eth.Contract(abi, address)
  },
  NEXT_PUBLIC_NETWORK_ID,
}

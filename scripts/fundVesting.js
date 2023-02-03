/**
 * This script will help us to fund our TokenVesting contract.
 */

const { web3, getContract } = require('./web3-helper')
const tokenVestingJson = require('../artifacts/TokenVesting.json')

const contract = getContract(tokenVestingJson)

async function fundVesting(totalTokens) {
  // Grab the main account...
  const [account] = await web3.eth.getAccounts()

  // ... fund the contract. It's important that our TokenVesting contract
  // has been allowed to spend that amount.
  await contract.methods.fundVesting(totalTokens).send({ from: account })
}

// ================================= //

const defaultTokens = 1000
const argTokens = Number(process.argv[2])
const tokens = Number.isNaN(argTokens) ? defaultTokens : argTokens

fundVesting(tokens).then(() => {
  console.log(`Contract has been funded with ${tokens} tokens`)
  process.exit()
})

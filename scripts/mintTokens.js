/**
 * This script will help us to mint tokens and allow our
 * TokenVesting contract to spend it.
 */

const { web3, getContract, NEXT_PUBLIC_NETWORK_ID } = require('./web3-helper')
const mockTockenJson = require('../artifacts/MockERC20.json')
const tokenVestingJson = require('../artifacts/TokenVesting.json')

const contract = getContract(mockTockenJson)
const tokenVestingAddress =
  tokenVestingJson.networks[NEXT_PUBLIC_NETWORK_ID].address

async function mintToken(amount) {
  // Grab the main account...
  const [account] = await web3.eth.getAccounts()

  // ... and mint tokens for this recipient
  await contract.methods.mint(account, amount).send({ from: account })

  // Next, set amount as the allowance of spender, in this case
  // our TokenVesting contract, over the caller's tokens.
  await contract.methods
    .approve(tokenVestingAddress, amount)
    .send({ from: account })
}

// ================================= //

const defaultAmount = 1e6
const argAmount = Number(process.argv[2])
const amount = Number.isNaN(argAmount) ? defaultAmount : argAmount

mintToken(amount).then(() => process.exit())

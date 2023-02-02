const { web3, getContract } = require('./web3')
const tokenVestingJson = require('../artifacts/TokenVesting.json')

const contract = getContract(tokenVestingJson)

async function fundVesting(totalTokens) {
  const [account] = await web3.eth.getAccounts()
  await contract.methods.fundVesting(totalTokens).send({ from: account })
}

fundVesting(1000).then(() => process.exit())

const { web3, getContract, NEXT_PUBLIC_NETWORK_ID } = require('./web3')
const mockTockenJson = require('../artifacts/MockERC20.json')
const tokenVestingJson = require('../artifacts/TokenVesting.json')

const contract = getContract(mockTockenJson)
const tokenVestingAddress =
  tokenVestingJson.networks[NEXT_PUBLIC_NETWORK_ID].address

async function mintToken(amount) {
  const [account] = await web3.eth.getAccounts()

  await contract.methods.mint(account, amount).send({ from: account })

  await contract.methods
    .approve(tokenVestingAddress, amount)
    .send({ from: account })
}

mintToken(1e6).then(() => process.exit())

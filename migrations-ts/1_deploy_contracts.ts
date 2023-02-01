const TokenVesting = artifacts.require('TokenVesting')
const MockERC20 = artifacts.require('MockERC20')

const migration: Truffle.Migration = async (deployer) => {
  await deployer.deploy(MockERC20, 'MockToken', 'MT', 2)
  await deployer.deploy(TokenVesting, MockERC20.address)
}

module.exports = migration

// because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {}

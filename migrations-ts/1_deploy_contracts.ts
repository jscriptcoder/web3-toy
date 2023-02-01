const Toy = artifacts.require('Toy')

const migration: Truffle.Migration = (deployer) => {
  deployer.deploy(Toy)
}

module.exports = migration

// because of https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {}

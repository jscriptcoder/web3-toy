const { web3, getContract } = require('./web3-helper')
const tokenVestingJson = require('../artifacts/TokenVesting.json')

const contract = getContract(tokenVestingJson)

async function setVestingSchedule(receivers, vestingSchedules) {
  const [account] = await web3.eth.getAccounts()
  await contract.methods
    .setVestingSchedules(receivers, vestingSchedules)
    .send({ from: account })
}

// ================================= //

const account = '0xFeEC856534DB03a81b70Afe4edcA9C976C818291'
const schedule = {
  startTime: 1675379777,
  cliff: 0,
  totalPeriods: 10,
  timePerPeriod: 1,
  totalTokens: 100,
  tokensClaimed: 0,
}

setVestingSchedule([account], [schedule]).then(() => {
  console.log(`Set vesting schedule for account ${account}:`, schedule)
  process.exit()
})

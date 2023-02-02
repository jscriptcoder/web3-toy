const { web3, getContract } = require('./web3')
const tokenVestingJson = require('../artifacts/TokenVesting.json')

const contract = getContract(tokenVestingJson)

async function setVestingSchedule(receivers, vestingSchedules) {
  const [account] = await web3.eth.getAccounts()
  await contract.methods
    .setVestingSchedules(receivers, vestingSchedules)
    .send({ from: account })
}

setVestingSchedule(
  ['0xFeEC856534DB03a81b70Afe4edcA9C976C818291'],
  [
    {
      startTime: 1675379777337,
      cliff: 60000,
      totalPeriods: 10,
      timePerPeriod: 60000,
      totalTokens: 100,
      tokensClaimed: 0,
    },
  ],
).then(() => process.exit())

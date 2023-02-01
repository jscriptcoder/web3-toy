// @ts-ignore
const Toy = artifacts.require('Toy')

contract('Toy', (accounts) => {
  it('tests', async () => {
    const toy = await Toy.new()
    assert.ok(toy)
  })

})

import assert from 'assert'
import { truncateAddress } from '../utils/strings'

const address = '0x7Ec4b9c4DF8E651E92C5BA5dc5Cc97dC3593027B'

describe('utils/strings.ts', () => {
  it('should truncates an address inserting ellipsis in the middle', () => {
    // Default parameters
    assert.equal(truncateAddress(address), '0x7Ec4...027B')

    // Other parameters
    assert.equal(truncateAddress(address, 12, 6), '0x7Ec4b9c4DF...93027B')
  })
})

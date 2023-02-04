import assert from 'assert'
import { toLocalePrice } from '../utils/numeral'

describe('utils/numeral.ts', () => {
  it('should convert an amount into a "human readable" figure', () => {
    assert.equal(toLocalePrice(1000), '1,000')
    assert.equal(toLocalePrice(1000.1234), '1,000.12')
    assert.equal(toLocalePrice(1000000, 0), '1,000,000')
    assert.equal(toLocalePrice(1000000, 0, 'es'), '1.000.000')
  })
})

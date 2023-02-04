import assert from 'assert'
import { assert as utilAssert } from '../utils/check'

describe('utils/check.ts', () => {
  it('should throw when condition is false', () => {
    assert.throws(() => utilAssert(true, 'throws'))
    assert.doesNotThrow(() => utilAssert(false, 'not throw'))
  })
})

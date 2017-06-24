import PinAPI from '../lib'
import { key } from '../lib/key'

const live = false
const api = new PinAPI({key, live})

describe('API Core', () => {
  test('api setup returns expected values', () => {
    expect(api).toBeDefined()
    expect(api.key).toBe(key)
    expect(api.live).toBeFalsy()
  })
})

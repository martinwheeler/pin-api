import PinAPI from '../lib'
import {
  key
} from '../lib/key'

const live = false
const api = new PinAPI({
  key,
  live
})

describe('Charges Endpoints', () => {
  test('creating a charge with a complete card object', () => {
    const actual = api.createCharge(testCharge)
    const expected = {
      "amount": 6000,
      "amount_refunded": 0,
      "authorisation_expired": false,
      "captured": true,
      "card": {
        "address_city": "Brisbane",
        "address_country": "AU",
        "address_line1": "100 Edward Street",
        "address_line2": null,
        "address_postcode": "4000",
        "address_state": "QLD",
        "customer_token": null,
        "display_number": "XXXX-XXXX-XXXX-0000",
        "expiry_month": 12,
        "expiry_year": 2018,
        "name": "Mr Robot",
        "primary": null,
        "scheme": "master",
        "token": expect.any(String)
      },
      "created_at": expect.any(String),
      "currency": "AUD",
      "description": "400 fidget spinners",
      "email": "roland@pint.net.au",
      "error_message": null,
      "ip_address": testIPAddress,
      "merchant_entitlement": 5865,
      "metadata": {},
      "refund_pending": false,
      "settlement_currency": "AUD",
      "status_message": "Success",
      "success": true,
      "token": expect.any(String),
      "total_fees": 135,
      "transfer": []
    }

    expect.assertions(1)

    return actual.then((response) => {
      expect(response).toEqual(expected)
    })
  })
})

import PinAPI from '../lib'
import {
  key
} from '../lib/key'

const live = false
const api = new PinAPI({
  key,
  live
})

describe('Customer Endpoints', () => {
  test('create a customer returns the customer', () => {
    const expected = testCard.name

    expect.assertions(1)

    return api.createCustomer(testCustomer)
      .then((response) => {
        testCustomerToken = response.token
        expect(response.card.name).toEqual(expected)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  test('fetch all customers from page 1', () => {
    const expected = 'object'

    expect.assertions(2)

    return api.fetchAllCustomers({
        page: 1
      })
      .then((data) => {
        expect(typeof data).toBe('object')
        expect(data.response.length).toBeGreaterThanOrEqual(25)
      })
  })

  test('fetching a created customer', () => {
    expect.assertions(2)
    return api.fetchCustomer(testCustomerToken)
      .then((response) => {
        expect(response.token).toEqual(testCustomerToken)
        expect(response).toBeDefined()
      })
      .catch((error) => {
        console.log(error)
      })
  })

  test('updating a customer returns changed value', () => {
    expect.assertions(1)
    return api.updateCustomer(testCustomerToken, {
        card: {
          ...testCard,
          name: 'Mrs Robot'
        }
      })
      .then((response) => {
        expect(response.card.name).toEqual('Mrs Robot')
      })
  });

  test('can retrieve a page from customers charges', () => {
    const actual = api.customerCharges(testCustomerToken)
    const expected = {
      "response": [],
      "count": 0,
      "pagination": {
        "current": 1,
        "previous": null,
        "next": null,
        "per_page": 25,
        "pages": 0,
        "count": 0
      }
    }

    expect.assertions(1)

    return actual.then((response) => {
      expect(response).toEqual(expected)
    });
  })

  test('can get a list of customers cards', () => {
    const actual = api.customerCards(testCustomerToken)
    const expected = {
      "count": 1,
      "pagination": {
        "count": 1,
        "current": 1,
        "next": null,
        "pages": 1,
        "per_page": 25,
        "previous": null
      },
      "response": [{
        "address_city": "Brisbane",
        "address_country": "AU",
        "address_line1": "100 Edward Street",
        "address_line2": null,
        "address_postcode": "4000",
        "address_state": "QLD",
        "customer_token": testCustomerToken,
        "display_number": "XXXX-XXXX-XXXX-0000",
        "expiry_month": 12,
        "expiry_year": 2018,
        "name": "Mrs Robot",
        "primary": true,
        "scheme": "master",
        "token": expect.any(String)
      }]
    }

    expect.assertions(1)

    return actual.then((response) => {
      expect(response).toEqual(expected)
    })
  })

  test('can create additional cards for a customer', () => {
    const actual = api.createCustomerCard({ ...testCard,
      name: 'Fake Card Name',
      number: 4200000000000000
    }, testCustomerToken)
    const expected = {
      address_city: "Brisbane",
      address_country: "AU",
      address_line1: "100 Edward Street",
      address_line2: null,
      address_postcode: "4000",
      address_state: "QLD",
      customer_token: testCustomerToken,
      display_number: "XXXX-XXXX-XXXX-0000",
      expiry_month: 12,
      expiry_year: 2018,
      name: "Fake Card Name",
      primary: false,
      scheme: "visa",
      token: expect.any(String)
    }

    expect.assertions(1)

    return actual.then((response) => {
      testCardToken = response.token
      expect(response).toEqual(expected)
    })
  })

  test('can delete cards for a customer', () => {
    const actual = api.deleteCustomerCard(testCustomerToken, testCardToken)
    const expected = { success: true}

    expect.assertions(1)

    return actual.then((response) => {
      expect(response).toEqual(expected)
    })
  })

  test('delete a customer returns 204', () => {
    expect.assertions(1)
    return api.deleteCustomer(testCustomerToken)
      .then((response) => {
        expect(response.success).toBeTruthy()
      })
  })
})

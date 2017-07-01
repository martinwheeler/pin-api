import PinAPI from '../lib'
import { key } from '../lib/key'

const live = false
const api = new PinAPI({key, live})

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
    const actual = api.customerCharges(testCustomerToken);
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

    console.log(testCustomerToken)

    expect.assertions(1)

    return actual.then((response) => {
      expect(response).toEqual(expected)
    });
  })

  test('delete a customer returns 204', () => {
    expect.assertions(1)
    return api.deleteCustomer(testCustomerToken)
      .then((response) => {
        expect(response.success).toBeTruthy()
      })
  })
})

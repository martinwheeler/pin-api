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
				testCusomterToken = response.token
				expect(response.card.name).toEqual(expected)
			})
			.catch((error) => {
				console.log(error)
			})
	})

	test('fetch all customers from page 69', () => {
		const expected = 'object'

		expect.assertions(3)

		return api.fetchAllCustomers({
			page: 69
		})
			.then((response) => {
				let pagination = response.pagination
				response = response.response
				
				expect(typeof response).toBe('object')
				expect(response.length).toBeGreaterThanOrEqual(0)
				expect(pagination).toBeDefined()
			})
	})

	test('fetching a created customer', () => {
		expect.assertions(2)
		return api.fetchCustomer(testCusomterToken)
			.then((response) => {
				expect(response.token).toEqual(testCusomterToken)
				expect(response).toBeDefined()
			})
			.catch((error) => {
				console.log(error)
			})
	})

	test('updating a customer returns changed value', () => {
		expect.assertions(1)
		return api.updateCustomer(testCusomterToken, {
			card: {
				...testCard,
				name: 'Mrs Robot'
			}
		})
			.then((response) => {
				expect(response.card.name).toEqual('Mrs Robot')
			})
	});

	test('delete a customer returns 204', () => {
		expect.assertions(1)
		return api.deleteCustomer(testCusomterToken)
			.then((response) => {
				expect(response).toBeTruthy()
			})
	})
})

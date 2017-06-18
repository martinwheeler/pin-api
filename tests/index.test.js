import PinAPI from '../lib'
import { key } from '../lib/key'
import moment from 'moment'

const live = false
const api = new PinAPI({key, live})

const plusOneYear = moment().add(1, "year").format("YYYY")
const testCard = {
	number: 5520000000000000,
	expiry_month: '12',
	expiry_year: plusOneYear,
	cvc: 123,
	name: 'Mr Robot',
	address_line1: '100 Edward Street',
	address_city: 'Brisbane',
	address_postcode: 4000,
	address_state: 'QLD',
	address_country: 'AU'
}
const testCustomer = {
	email: 'roland@pin.net.au',
	card: testCard
}
let testCusomterToken = undefined;

test('api setup returns expected values', () => {
	expect(api).toBeDefined()
	expect(api.key).toBe(key)
	expect(api.live).toBeFalsy()
})

test('create a customer returns the customer', () => {
	expect.assertions(1)
	return api.createCustomer(testCustomer)
		.then((response) => {
			testCusomterToken = response.token
			expect(testCusomterToken).toBeDefined()
		})
		.catch((error) => {
			console.log(error)
		})
})

test('fetch all customers from page 69', () => {
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

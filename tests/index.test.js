import PinAPI from '../lib'
import moment from 'moment'

const key = ''
const live = false
const api = new PinAPI({key, live})

const plusOneYear = moment().add(1, "year").format("YYYY")

test('expect to exist', () => {
	expect(api).toBeDefined()
	expect(api.key).toBe(key)
	expect(api.live).toBeFalsy()
});

test('create a customer returns the customer', () => {
	expect.assertions(1);
	return api.createCustomer({
		email: 'roland@pin.net.au',
		card: {
			number: 5520000000000000,
			expiry_month: '05',
			expiry_year: plusOneYear,
			cvc: 123,
			name: 'Roland Robot',
			address_line1: '42 Sevenoaks St',
			address_city: 'Lathlain',
			address_postcode: 6454,
			address_state: 'WA',
			address_country: 'AU'
		}
	})
	.then((response) => {
		expect(response.token).toBeDefined()
	})
	.catch((error) => {
		console.log(error)
	})
});

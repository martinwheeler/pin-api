var moment = require('moment')

var plusOneYear = moment().add(1, "year").format("YYYY")

global.testCard = {
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

global.testCustomer = {
	email: 'roland@pin.net.au',
	card: testCard
}

global.testCustomerToken = undefined;

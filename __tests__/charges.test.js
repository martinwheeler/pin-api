import PinAPI from "../lib";
import { key } from "../lib/key";

const live = false;
const api = new PinAPI({
  key,
  live
});

const expectedCharge = {
  amount: 6000,
  amount_refunded: 0,
  authorisation_expired: false,
  captured: true,
  card: {
    address_city: "Brisbane",
    address_country: "AU",
    address_line1: "100 Edward Street",
    address_line2: null,
    address_postcode: "4000",
    address_state: "QLD",
    customer_token: null,
    display_number: "XXXX-XXXX-XXXX-0000",
    expiry_month: 12,
    expiry_year: 2018,
    name: "Mr Robot",
    primary: null,
    scheme: "master",
    token: expect.any(String)
  },
  created_at: expect.any(String),
  currency: "AUD",
  description: "400 fidget spinners",
  email: "roland@pin.net.au",
  error_message: null,
  ip_address: testIPAddress,
  merchant_entitlement: 5865,
  metadata: {},
  refund_pending: false,
  settlement_currency: "AUD",
  status_message: "Success",
  success: true,
  token: expect.any(String),
  total_fees: 135,
  transfer: []
};

describe.skip("Charges Endpoints", () => {
  test("creating a charge with a complete card object", () => {
    const actual = api.createCharge(testChargeWithCard);

    expect.assertions(1);

    return actual.then(response => {
      expect(response).toEqual(expectedCharge);
    });
  });

  test("create a charge with a card token", () => {
    const actual = api.createCharge;

    expect.assertions(1);

    return api.createCard(testCard).then(cardResponse =>
      actual({
        ...testCharge,
        card_token: cardResponse.token
      }).then(chargeResponse => expect(chargeResponse).toEqual(expectedCharge))
    );
  });

  test("create charge with a customers token", () => {
    const actual = api.createCharge;
    const { card } = expectedCharge;
    const expectedChargeWithCustomer = {
      ...expectedCharge,
      card: { ...card, customer_token: expect.any(String), primary: true }
    };

    expect.assertions(1);

    return api.createCustomer(testCustomer).then(customerResponse =>
      actual({
        ...testCharge,
        customer_token: customerResponse.token
      }).then(chargeResponse =>
        expect(chargeResponse).toEqual(expectedChargeWithCustomer)
      )
    );
  });
});

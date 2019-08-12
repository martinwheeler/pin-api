import { makeRequest, ENDPOINT, MODE } from "../utils/api";

/**
 *
 * @param {Customer} body - The customers details including card details.
 */
const create = body => {
  return makeRequest({
    body,
    endpoint: {
      primary: ENDPOINT.CUSTOMER
    },
    mode: MODE.POST
  });
};

export { create };

/**
 * A customer inside Pin Payments.
 *
 * @typedef {Object} Customer
 * @property {string} email - The email of the customer
 * @property {Card} card - The card details
 */

/**
 * A card.
 *
 * @typedef {Object} Card
 * @property {number} number - The card number
 * @property {number} expiry_month - The expiry month of the card
 * @property {number} expiry_year - The expiry year of the card
 * @property {number} cvc - The CVC security code for the card
 * @property {number} name - The name for the owner of the card
 * @property {number} address_line1 - The first address line for the owner of the card
 * @property {number} address_line2 - The second address line for the owner of the card
 * @property {number} address_city - The city for the owner of the card
 * @property {number} address_postcode - The postcode for the owner of the card
 * @property {string} address_state - The state for the owner of the card
 * @property {string} address_country - The country for the owner of the card
 *
 */

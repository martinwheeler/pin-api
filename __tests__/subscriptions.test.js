import PinAPI from "../lib";
import { key } from "../lib/key";

const live = false;
const api = new PinAPI({
  key,
  live
});

const planToken = "plan_JHWw5PvsUcxAPuO0hHAn3w";
const customerToken = "cus_lGgl5AXOd-9BRElkPn18dw";

let newSubscription = null;

describe("Subscription Enpoints", () => {
  describe("createSubscription", () => {
    it("returns the newly created subscription", () => {
      const expected = {
        plan_token: "plan_JHWw5PvsUcxAPuO0hHAn3w",
        token: expect.any(String),
        customer_token: "cus_lGgl5AXOd-9BRElkPn18dw",
        card_token: null,
        state: "trial",
        current_period_started_at: expect.any(String),
        current_period_ends_at: expect.any(String),
        active_interval_started_at: expect.any(String),
        active_interval_finishes_at: expect.any(String),
        cancelled_at: null,
        next_billing_date: expect.any(String),
        created_at: expect.any(String)
      };

      expect.assertions(1);

      return api
        .createSubscription({
          planToken,
          customerToken
        })
        .then(response => {
          newSubscription = response;
          expect(response).toMatchObject(expected);
        })
        .catch(error => {
          console.log(error);
        });
    });
  });

  describe("fetchSubscription", () => {
    it("returns expected subscription", () => {
      return api
        .fetchSubscription({ token: newSubscription.token })
        .then(response => {
          expect(response).toEqual(newSubscription);
        });
    });
  });
});

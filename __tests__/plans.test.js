import PinAPI from "../lib";
import { key } from "../lib/key";

const live = false;
const api = new PinAPI({
  key,
  live
});

describe("Plans Enpoints", () => {
  describe("fetchAllPlans", () => {
    it("returns some plans", () => {
      const expected = 1;

      expect.assertions(1);

      return api
        .fetchAllPlans()
        .then(response => {
          expect(response.response.length).toBeGreaterThanOrEqual(expected);
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
});

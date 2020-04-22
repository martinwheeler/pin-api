import request from "request";
import undefsafe from "undefsafe";

// const liveUrl = "https://api.pin.net.au";
const apiVersion = 1; // TODO: Fetch this from a more generic location
const apiUrl = "https://test-api.pin.net.au"; // TODO: Replace with legit URL
const apiKey = "someApiKeyHere";

const MODE = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete"
};

const ENDPOINT = {
  CUSTOMER: "customers",
  CHARGES: "charges",
  CARDS: "cards",
  SUBSCRIPTIONS: "subscriptions",
  PLANS: "plans"
};

/**
 * Handles making the API request that is sent to Pin.
 *
 * @param {Object} param0
 */
const makeRequest = ({ token, body, endpoint, mode, debug }) => {
  const primaryEndpoint = undefsafe(endpoint, "primary");
  const secondaryEndpoint = undefsafe(endpoint, "secondary");

  const primaryToken = undefsafe(token, "primary");
  const secondaryToken = undefsafe(token, "secondary");

  let requestUrl = `${apiUrl}/${apiVersion}/${primaryEndpoint}`;

  // TODO: Refactor later on
  if (primaryToken) {
    requestUrl += `/${primaryToken}`;
  }

  if (secondaryEndpoint) {
    requestUrl += `/${secondaryEndpoint}`;
  }

  if (secondaryToken) {
    requestUrl += `/${secondaryToken}`;
  }

  return new Promise((resolve, reject) => {
    let newRequest = request[mode](
      {
        url: requestUrl,
        json: true,
        body,
        auth: {
          user: apiKey,
          pass: ""
        }
      },
      (error, response, body) => {
        if (error) this.handleErrorResponse(error, reject);
        else {
          if (debug) resolve({ url: requestUrl, body });
          else this.handleSuccessResponse(response, body, resolve);
        }
      }
    );
  });
};

export { MODE, ENDPOINT, makeRequest };

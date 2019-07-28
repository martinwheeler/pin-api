import request from "request";
import undefsafe from "undefsafe";

const apiVersion = "1";
const liveUrl = "https://api.pin.net.au";
const testUrl = "https://test-api.pin.net.au";

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

const DELETE = 204;

class PinAPI {
  constructor(options) {
    this.key = options.key;
    this.live = options.live;
    this.setApiUrl();
  }

  setApiUrl = live => {
    this.apiUrl = live ? liveUrl : testUrl;
  };

  formatResponse = () => {};

  handleAuthentication = request => {
    request.auth(this.key, "");
  };

  handleErrorResponse = (error, reject) => {
    console.log(error);
    reject(error);
  };

  handleSuccessResponse = (response, body, resolve) => {
    let newResponse = body;

    if (
      undefsafe(body, "response") &&
      undefsafe(body, "pagination") === undefined
    ) {
      newResponse = body.response;
    }

    if (response.statusCode === DELETE) {
      newResponse = { success: true };
    }

    resolve(newResponse);
  };

  makeRequest = ({ token, body, endpoint, mode, debug }) => {
    let url = `${this.apiUrl}/${apiVersion}/${endpoint.primary}`,
      json = true;

    if (undefsafe(token, "primary")) {
      url += `/${token.primary}`;
    }

    if (undefsafe(endpoint, "secondary")) {
      url += `/${endpoint.secondary}`;
    }

    if (undefsafe(token, "secondary")) {
      url += `/${token.secondary}`;
    }

    return new Promise((resolve, reject) => {
      let newRequest = request[mode](
        {
          url,
          json,
          body
        },
        (error, response, body) => {
          if (error) this.handleErrorResponse(error, reject);
          else {
            if (debug) resolve({ url, body });
            else this.handleSuccessResponse(response, body, resolve);
          }
        }
      );

      this.handleAuthentication(newRequest);
    });
  };

  createCustomer = body => {
    return this.makeRequest({
      body,
      endpoint: {
        primary: ENDPOINT.CUSTOMER
      },
      mode: MODE.POST
    });
  };

  fetchAllCustomers = body => {
    return this.makeRequest({
      body,
      endpoint: {
        primary: ENDPOINT.CUSTOMER
      },
      mode: MODE.GET
    });
  };

  fetchCustomer = token => {
    return this.makeRequest({
      token: {
        primary: token
      },
      endpoint: {
        primary: ENDPOINT.CUSTOMER
      },
      mode: MODE.GET
    });
  };

  updateCustomer = (token, body) => {
    return this.makeRequest({
      token: {
        primary: token
      },
      body,
      endpoint: {
        primary: ENDPOINT.CUSTOMER
      },
      mode: MODE.PUT
    });
  };

  deleteCustomer = token => {
    return this.makeRequest({
      token: {
        primary: token
      },
      endpoint: {
        primary: ENDPOINT.CUSTOMER
      },
      mode: MODE.DELETE
    });
  };

  customerCharges = token => {
    return this.makeRequest({
      token: {
        primary: token
      },
      endpoint: {
        primary: ENDPOINT.CUSTOMER,
        secondary: ENDPOINT.CHARGES
      },
      mode: MODE.GET
    });
  };

  customerCards = token => {
    return this.makeRequest({
      token: {
        primary: token
      },
      endpoint: {
        primary: ENDPOINT.CUSTOMER,
        secondary: ENDPOINT.CARDS
      },
      mode: MODE.GET
    });
  };

  createCustomerCard = (body, token) => {
    return this.makeRequest({
      body,
      token: {
        primary: token
      },
      endpoint: {
        primary: ENDPOINT.CUSTOMER,
        secondary: ENDPOINT.CARDS
      },
      mode: MODE.POST
    });
  };

  deleteCustomerCard = (token, tokenTwo) => {
    return this.makeRequest({
      token: {
        primary: token,
        secondary: tokenTwo
      },
      endpoint: {
        primary: ENDPOINT.CUSTOMER,
        secondary: ENDPOINT.CARDS
      },
      mode: MODE.DELETE
    });
  };

  createCharge = body => {
    return this.makeRequest({
      body,
      endpoint: {
        primary: ENDPOINT.CHARGES
      },
      mode: MODE.POST
    });
  };

  createCard = body => {
    return this.makeRequest({
      body,
      endpoint: {
        primary: ENDPOINT.CARDS
      },
      mode: MODE.POST
    });
  };

  fetchAllPlans = body => {
    return this.makeRequest({
      body,
      endpoint: {
        primary: ENDPOINT.PLANS
      },
      mode: MODE.GET
    });
  };

  createSubscription = body => {
    const { customerToken, planToken, ...rest } = body;
    return this.makeRequest({
      body: {
        customer_token: customerToken,
        plan_token: planToken,
        ...rest
      },
      endpoint: {
        primary: ENDPOINT.SUBSCRIPTIONS
      },
      mode: MODE.POST
    });
  };

  fetchSubscription = body => {
    const { token, ...rest } = body;
    return this.makeRequest({
      token: {
        primary: token
      },
      body: rest,
      endpoint: {
        primary: ENDPOINT.SUBSCRIPTIONS
      },
      mode: MODE.GET
    });
  };
}

export default PinAPI;

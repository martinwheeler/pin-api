import request from 'request';

const apiVersion = '1';
const liveUrl = 'https://api.pin.net.au';
const testUrl = 'https://test-api.pin.net.au';

const MODE = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete'
}

const ENDPOINT = {
  CUSTOMER: 'customers',
}

class PinAPI {
  constructor (options) {
    this.key = options.key
    this.live = options.live
    this.setApiUrl()
  }

  setApiUrl = (live) => {
    this.apiUrl = (live)
      ? liveUrl
      : testUrl
  }

  formatResponse = () => {

  }

  handleAuthentication = (request) => {
    request.auth(this.key, '')
  }

  handleErrorResponse = (error, reject) => {
    console.log(error);
    reject(error)
  }

  handleSuccessResponse = (response, body, resolve) => {
    let newResponse = body

    if (body.response) {
      newResponse = body.response
    }

    resolve(newResponse);
  }

  makeRequest = ({token, body, endpoint, mode}) => {
    let url = `${this.apiUrl}/${apiVersion}/${endpoint}`,
      json = true;

    if (token) {
      url += `/${token}`;
    }

    return new Promise((resolve, reject) => {
      let newRequest = request[mode]({
        url,
        json,
        body
      }, (error, response, body) => {
        if (error)
          this.handleErrorResponse(error, reject)
        else
          this.handleSuccessResponse(response, body, resolve)
      })

      this.handleAuthentication(newRequest)
    })
  }

  createCustomer = (body) => {
    return this.makeRequest({
      body,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.POST
    })
  }

  fetchAllCustomers = (body) => {
    return this.makeRequest({
      body,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.GET
    })
  }

  fetchCustomer = (token) => {
    return this.makeRequest({
      token,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.GET
    })
  }

  updateCustomer = (token, body) => {
    return this.makeRequest({
      token,
      body,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.PUT
    })
  }

  deleteCustomer = (token) => {
    return this.makeRequest({
      token,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.DELETE
    })
  }  
}

export default PinAPI;

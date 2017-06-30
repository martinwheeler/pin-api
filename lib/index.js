import request from 'request';

const apiVersion = '1';
const liveUrl = 'https://api.pin.net.au';
const testUrl = 'https://test-api.pin.net.au';

const MODE = {
  POST: 'post',
  GET: 'get'
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
          resolve(body.response)
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
    return new Promise((resolve, reject) => {
      let req = request.put({
        url: `${this.apiUrl}/${apiVersion}/customers/${token}`,
        body: body,
        json: true
      }, (error, response, body) => {
        if (error)
          this.handleErrorResponse(error, reject)
        else
          resolve(body.response)
      })

      this.handleAuthentication(req)
    })
  }

  deleteCustomer = (token) => {
    return new Promise((resolve, reject) => {
      let req = request.delete({
        url: `${this.apiUrl}/${apiVersion}/customers/${token}`,
        json: true
      }, (error, response, body) => {
        if (error) {
          this.handleErrorResponse(error, reject)
        } else {
          if (response.statusCode === 204) resolve(true)
          else reject(false)
        }
      })

      this.handleAuthentication(req)
    })
  }

  
}

export default PinAPI;

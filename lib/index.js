import request from 'request';

const apiVersion = '1';
const liveUrl = 'https://api.pin.net.au';
const testUrl = 'https://test-api.pin.net.au';

class PinAPI {
    
  constructor (options) {
    this.key = options.key
    this.live = options.live
    this.setApiUrl()
  }

  setApiUrl = (live) => {
    this.apiUrl = (live) ? liveUrl : testUrl
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

  createCustomer = (body, cb) => {
    return new Promise((resolve, reject) => {
      let req = request.post({
        url: `${this.apiUrl}/${apiVersion}/customers`,
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

  fetchAllCustomers = (pageIndex) => {
    return new Promise((resolve, reject) => {
      let req = request.get({
        url: `${this.apiUrl}/${apiVersion}/customers`,
        body: pageIndex,
        json: true
      }, (error, response, body) => {
        if (error)
          this.handleErrorResponse(error, reject)
        else
          resolve(body)
      })

      this.handleAuthentication(req)
    })
  }

  fetchCustomer = (token) => {
    return new Promise((resolve, reject) => {
      let req = request.get({
        url: `${this.apiUrl}/${apiVersion}/customers/${token}`,
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

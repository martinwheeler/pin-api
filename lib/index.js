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
}

export default PinAPI;

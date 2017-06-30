'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiVersion = '1';
var liveUrl = 'https://api.pin.net.au';
var testUrl = 'https://test-api.pin.net.au';

var MODE = {
  POST: 'post',
  GET: 'get'
};

var ENDPOINT = {
  CUSTOMER: 'customers'

};

var PinAPI = function PinAPI(options) {
  var _this = this;

  _classCallCheck(this, PinAPI);

  this.setApiUrl = function (live) {
    _this.apiUrl = live ? liveUrl : testUrl;
  };

  this.formatResponse = function () {};

  this.handleAuthentication = function (request) {
    request.auth(_this.key, '');
  };

  this.handleErrorResponse = function (error, reject) {
    console.log(error);
    reject(error);
  };

  this.makeRequest = function (_ref) {
    var token = _ref.token,
        body = _ref.body,
        endpoint = _ref.endpoint,
        mode = _ref.mode;

    var url = _this.apiUrl + '/' + apiVersion + '/' + endpoint,
        json = true;

    if (token) {
      url += '/' + token;
    }

    return new Promise(function (resolve, reject) {
      var newRequest = _request2.default[mode]({
        url: url,
        json: json,
        body: body
      }, function (error, response, body) {
        if (error) _this.handleErrorResponse(error, reject);else resolve(body.response);
      });

      _this.handleAuthentication(newRequest);
    });
  };

  this.createCustomer = function (body) {
    return _this.makeRequest({
      body: body,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.POST
    });
  };

  this.fetchAllCustomers = function (body) {
    return _this.makeRequest({
      body: body,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.GET
    });
  };

  this.fetchCustomer = function (token) {
    return _this.makeRequest({
      token: token,
      endpoint: ENDPOINT.CUSTOMER,
      mode: MODE.GET
    });
  };

  this.updateCustomer = function (token, body) {
    return new Promise(function (resolve, reject) {
      var req = _request2.default.put({
        url: _this.apiUrl + '/' + apiVersion + '/customers/' + token,
        body: body,
        json: true
      }, function (error, response, body) {
        if (error) _this.handleErrorResponse(error, reject);else resolve(body.response);
      });

      _this.handleAuthentication(req);
    });
  };

  this.deleteCustomer = function (token) {
    return new Promise(function (resolve, reject) {
      var req = _request2.default.delete({
        url: _this.apiUrl + '/' + apiVersion + '/customers/' + token,
        json: true
      }, function (error, response, body) {
        if (error) {
          _this.handleErrorResponse(error, reject);
        } else {
          if (response.statusCode === 204) resolve(true);else reject(false);
        }
      });

      _this.handleAuthentication(req);
    });
  };

  this.key = options.key;
  this.live = options.live;
  this.setApiUrl();
};

exports.default = PinAPI;

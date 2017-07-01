'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _undefsafe = require('undefsafe');

var _undefsafe2 = _interopRequireDefault(_undefsafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiVersion = '1';
var liveUrl = 'https://api.pin.net.au';
var testUrl = 'https://test-api.pin.net.au';

var MODE = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete'
};

var ENDPOINT = {
  CUSTOMER: 'customers',
  CHARGES: 'charges'
};

var DELETE = 204;

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

  this.handleSuccessResponse = function (response, body, resolve) {
    var newResponse = body;

    if ((0, _undefsafe2.default)(body, 'response')) {
      newResponse = body.response;
    }

    if (response.statusCode === DELETE) {
      newResponse = { success: true };
    }

    resolve(newResponse);
  };

  this.makeRequest = function (_ref) {
    var token = _ref.token,
        body = _ref.body,
        endpoint = _ref.endpoint,
        mode = _ref.mode;

    var url = _this.apiUrl + '/' + apiVersion + '/' + endpoint.main,
        json = true;

    if (token) {
      url += '/' + token;
    }

    if ((0, _undefsafe2.default)(endpoint, 'secondary')) {
      url += '/' + endpoint.secondary;
    }

    return new Promise(function (resolve, reject) {
      var newRequest = _request2.default[mode]({
        url: url,
        json: json,
        body: body
      }, function (error, response, body) {
        if (error) _this.handleErrorResponse(error, reject);else _this.handleSuccessResponse(response, body, resolve);
      });

      _this.handleAuthentication(newRequest);
    });
  };

  this.createCustomer = function (body) {
    return _this.makeRequest({
      body: body,
      endpoint: {
        main: ENDPOINT.CUSTOMER
      },
      mode: MODE.POST
    });
  };

  this.fetchAllCustomers = function (body) {
    return _this.makeRequest({
      body: body,
      endpoint: {
        main: ENDPOINT.CUSTOMER
      },
      mode: MODE.GET
    });
  };

  this.fetchCustomer = function (token) {
    return _this.makeRequest({
      token: token,
      endpoint: {
        main: ENDPOINT.CUSTOMER
      },
      mode: MODE.GET
    });
  };

  this.updateCustomer = function (token, body) {
    return _this.makeRequest({
      token: token,
      body: body,
      endpoint: {
        main: ENDPOINT.CUSTOMER
      },
      mode: MODE.PUT
    });
  };

  this.deleteCustomer = function (token) {
    return _this.makeRequest({
      token: token,
      endpoint: {
        main: ENDPOINT.CUSTOMER
      },
      mode: MODE.DELETE
    });
  };

  this.customerCharges = function (token) {
    return _this.makeRequest({
      token: token,
      endpoint: {
        main: ENDPOINT.CUSTOMER,
        secondary: ENDPOINT.CHARGES
      },
      mode: MODE.GET
    });
  };

  this.key = options.key;
  this.live = options.live;
  this.setApiUrl();
};

exports.default = PinAPI;

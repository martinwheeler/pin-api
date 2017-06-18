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

  this.createCustomer = function (body, cb) {
    return new Promise(function (resolve, reject) {
      var req = _request2.default.post({
        url: _this.apiUrl + '/' + apiVersion + '/customers',
        body: body,
        json: true
      }, function (error, response, body) {
        if (error) _this.handleErrorResponse(error, reject);else resolve(body.response);
      });

      _this.handleAuthentication(req);
    });
  };

  this.fetchAllCustomers = function (pageIndex) {
    return new Promise(function (resolve, reject) {
      var req = _request2.default.get({
        url: _this.apiUrl + '/' + apiVersion + '/customers',
        body: pageIndex,
        json: true
      }, function (error, response, body) {
        if (error) _this.handleErrorResponse(error, reject);else resolve(body);
      });

      _this.handleAuthentication(req);
    });
  };

  this.fetchCustomer = function (token) {
    return new Promise(function (resolve, reject) {
      var req = _request2.default.get({
        url: _this.apiUrl + '/' + apiVersion + '/customers/' + token,
        json: true
      }, function (error, response, body) {
        if (error) _this.handleErrorResponse(error, reject);else resolve(body.response);
      });

      _this.handleAuthentication(req);
    });
  };

  this.key = options.key;
  this.live = options.live;
  this.setApiUrl();
};

exports.default = PinAPI;

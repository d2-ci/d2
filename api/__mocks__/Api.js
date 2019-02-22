"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Api;
var apiMock;

function mockInit() {
  apiMock = {
    get: jest.fn(),
    post: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    request: jest.fn(),
    setDefaultHeaders: jest.fn()
  };
}

function values(object) {
  return Object.keys(object).map(function (key) {
    return object[key];
  });
}

function mockClear() {
  values(apiMock).filter(function (property) {
    return typeof property === 'function';
  }).forEach(function (spyFn) {
    return spyFn.mockClear();
  });
}

function Api() {
  return apiMock;
}

Api.getApi = jest.fn(function () {
  return new Api();
});
Api.mockReset = mockInit;
Api.mockClear = mockClear;
mockInit();
//# sourceMappingURL=Api.js.map
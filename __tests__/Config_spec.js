"use strict";

var _config = _interopRequireDefault(require("../../src/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Config', function () {
  var mockD2;
  var mockApi;
  beforeEach(function () {
    mockApi = {
      setBaseUrl: jest.fn(),
      setUnauthorizedCallback: jest.fn(),
      setDefaultHeaders: jest.fn()
    };
    mockD2 = {
      model: {
        ModelDefinition: function ModelDefinition() {},
        ModelDefinitions: {
          getModelDefinitions: jest.fn()
        }
      },
      Api: {
        getApi: jest.fn().mockReturnValue(mockApi)
      }
    };
  });
  it('should not be allowed to call as function', function () {
    expect(function () {
      return (0, _config.default)();
    }).toThrowError();
  });
  describe('processConfigForD2', function () {
    it('should set the baseUrl on the api object', function () {
      _config.default.processConfigForD2({
        baseUrl: '/api/dhis2'
      }, mockD2);

      expect(mockApi.setBaseUrl).toBeCalledWith('/api/dhis2');
    });
    it('should call setBaseUrl with the default api location', function () {
      _config.default.processConfigForD2({}, mockD2);

      expect(mockApi.setBaseUrl).toBeCalledWith('/api');
    });
    it('should set the unauthorized function if provided', function () {
      var unauthorizedCb = function unauthorizedCb() {};

      _config.default.processConfigForD2({
        unauthorizedCb: unauthorizedCb
      }, mockD2);

      expect(mockApi.setUnauthorizedCallback).toBeCalledWith(unauthorizedCb);
    });
  });
  describe('processPreInitConfig', function () {
    it('should set headers', function () {
      var headers = {
        'x-requested-with': 'XMLHttpRequest'
      };

      _config.default.processPreInitConfig({
        headers: headers
      }, mockApi);

      expect(mockApi.setDefaultHeaders).toBeCalledWith(headers);
    });
    it('should set baseurl', function () {
      _config.default.processPreInitConfig({
        baseUrl: '/api/dhis2'
      }, mockApi);

      expect(mockApi.setBaseUrl).toBeCalledWith('/api/dhis2');
    });
  });
});
//# sourceMappingURL=Config_spec.js.map
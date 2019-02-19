"use strict";

var _Api = _interopRequireDefault(require("../../api/Api"));

var _SystemSettings = _interopRequireDefault(require("../SystemSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../api/Api');
var settingsFixture = {
  keyLastSuccessfulResourceTablesUpdate: 'Tue Mar 10 12:24:00 CET 2015'
};
describe('settings.System', function () {
  var systemSettings;
  var mockApi;
  beforeEach(function () {
    _Api.default.mockReset();

    mockApi = _Api.default.getApi();
    systemSettings = new _SystemSettings.default(new _Api.default());
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _SystemSettings.default)();
    }).toThrowErrorMatchingSnapshot(); // eslint-disable-line
  });
  it('should set an instance of Api onto the SystemSettings instance', function () {
    expect(systemSettings.api).toBe(mockApi);
  });
  describe('all', function () {
    beforeEach(function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture));
    });
    it('should be a function', function () {
      expect(systemSettings.all).toBeInstanceOf(Function);
    });
    it('should call the api to get all the systemSettings', function () {
      return systemSettings.all().then(function () {
        expect(mockApi.get).toHaveBeenCalledTimes(1);
        expect(mockApi.get.mock.calls[0][0]).toEqual('systemSettings');
      });
    });
    it('should resolve the promise with the settings', function () {
      return systemSettings.all().then(function (settings) {
        expect(settings.keyLastSuccessfulResourceTablesUpdate).toBe('Tue Mar 10 12:24:00 CET 2015');
      });
    });
    it('should only call the API once', function () {
      return systemSettings.all().then(function () {
        return systemSettings.all();
      }).then(function () {
        expect(systemSettings.settings).toEqual(settingsFixture);
        expect(mockApi.get).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('get', function () {
    beforeEach(function () {
      systemSettings = new _SystemSettings.default(_Api.default.getApi());
    });
    it('should be a function', function () {
      expect(systemSettings.get).toBeInstanceOf(Function);
    });
    it('should return a Promise', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture.keyLastSuccessfulResourceTablesUpdate));
      var result = systemSettings.get('keyLastSuccessfulResourceTablesUpdate');
      expect(result).toBeInstanceOf(Promise);
    });
    it('should reject the promise with an error if no key has been specified', function (done) {
      systemSettings.get().catch(function (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('A "key" parameter should be specified when calling get() on systemSettings');
      }).then(done);
    });
    it('should call the api to get the value', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture.keyLastSuccessfulResourceTablesUpdate));
      systemSettings.get('keyLastSuccessfulResourceTablesUpdate');
      expect(systemSettings.api.get.mock.calls[0][0]).toBe('systemSettings/keyLastSuccessfulResourceTablesUpdate');
    });
    it('should return the value from the promise', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture.keyLastSuccessfulResourceTablesUpdate));
      return systemSettings.get('keyLastSuccessfulResourceTablesUpdate').then(function (value) {
        expect(value).toBe('Tue Mar 10 12:24:00 CET 2015');
      });
    });
    it('should try to transform the response to json if possible', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve('{"mydataKey": "myDataValue"}'));
      return systemSettings.get('keyLastSuccessfulResourceTablesUpdate').then(function (value) {
        expect(value).toEqual({
          mydataKey: 'myDataValue'
        });
      });
    });
    it('should reject the promise if the value is empty', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve());
      return systemSettings.get('keyThatDefinitelyDoesNotExist').then(function () {
        return Promise.reject('Promise resolved');
      }, function (error) {
        expect(error.message).toBe('The requested systemSetting has no value or does not exist.');
      });
    });
    it('should call the API for every operation when there\'s no cache', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture.keyLastSuccessfulResourceTablesUpdate)).mockReturnValueOnce(Promise.resolve(settingsFixture.keyLastSuccessfulResourceTablesUpdate));
      return systemSettings.get('keyLastSuccessfulResourceTablesUpdate').then(function () {
        return systemSettings.get('keyLastSuccessfulResourceTablesUpdate');
      }).then(function () {
        expect(systemSettings.api.get).toHaveBeenCalledTimes(2);
      });
    });
    it('should only call the API once when there is a cache', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture));
      return systemSettings.all().then(function () {
        return systemSettings.get('keyLastSuccessfulResourceTablesUpdate');
      }).then(function () {
        return systemSettings.get('keyLastSuccessfulResourceTablesUpdate');
      }).then(function (value) {
        expect(value).toBe(settingsFixture.keyLastSuccessfulResourceTablesUpdate);
        expect(systemSettings.api.get).toHaveBeenCalledTimes(1);
      });
    });
    it('should also return a promise when serving cached values', function () {
      systemSettings.api.get.mockReturnValueOnce(Promise.resolve(settingsFixture));
      return systemSettings.all().then(function () {
        expect(systemSettings.get('keyLastSuccessfulResourceTablesUpdate')).toBeInstanceOf(Promise);
      });
    });
  });
  describe('.set', function () {
    beforeEach(function () {
      systemSettings = new _SystemSettings.default(new _Api.default());
      mockApi.get.mockReturnValue(Promise.resolve(settingsFixture));
      mockApi.post.mockReturnValue(Promise.resolve());
      mockApi.delete.mockReturnValue(Promise.resolve());
    });
    it('should POST to the API', function () {
      return systemSettings.set('mySetting', 'my value').then(function () {
        expect(mockApi.get).toHaveBeenCalledTimes(0);
        expect(mockApi.post).toHaveBeenCalledTimes(1);
        expect(mockApi.delete).toHaveBeenCalledTimes(0);
      });
    });
    it('should DELETE if the value is null or an empty string', function () {
      return systemSettings.set('mySetting', '').then(function () {
        expect(mockApi.get).toHaveBeenCalledTimes(0);
        expect(mockApi.post).toHaveBeenCalledTimes(0);
        expect(mockApi.delete).toHaveBeenCalledTimes(1);
      });
    });
    it('should not alter the value', function () {
      var value = {
        type: 'object',
        value: 'some value'
      };
      return systemSettings.set('mySetting', value).then(function () {
        expect(mockApi.get).toHaveBeenCalledTimes(0);
        expect(mockApi.post).toHaveBeenCalledTimes(1);
        expect(mockApi.delete).toHaveBeenCalledTimes(0);
        expect(mockApi.post.mock.calls[0][0]).toBe('systemSettings/mySetting');
        expect(mockApi.post.mock.calls[0][1]).toBe(value);
      });
    });
    it('should add a "Content-Type: text/plain" header to the request', function () {
      var value = 'test';
      return systemSettings.set('mySetting', value).then(function () {
        expect(mockApi.get).toHaveBeenCalledTimes(0);
        expect(mockApi.post).toHaveBeenCalledTimes(1);
        expect(mockApi.delete).toHaveBeenCalledTimes(0);
        var requestOptions = {
          headers: {
            'Content-Type': 'text/plain'
          }
        };
        expect(mockApi.post).toBeCalledWith('systemSettings/mySetting', value, requestOptions);
      });
    });
    it('should clear the settings cache', function () {
      return systemSettings.all().then(function () {
        return systemSettings.set('test', 'value');
      }).then(function () {
        return systemSettings.all();
      }).then(function () {
        expect(mockApi.get).toHaveBeenCalledTimes(2);
        expect(mockApi.post).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('.set API request', function () {
    beforeEach(function () {
      systemSettings.api.post.mockReturnValueOnce(Promise.resolve());
    });
    afterEach(function () {
      systemSettings = new _SystemSettings.default(new _Api.default());
    });
    it('should not encode the value as JSON', function () {
      var value = 'test';
      return systemSettings.set('mySetting', value).then(function () {
        expect(mockApi.post).toHaveBeenCalledTimes(1);
        expect(mockApi.post.mock.calls[0][0]).toBe('systemSettings/mySetting');
        expect(mockApi.post.mock.calls[0][1]).toBe(value);
      });
    });
  });
});
//# sourceMappingURL=SystemSettings_spec.js.map
"use strict";

var _Api = _interopRequireDefault(require("../../../src/api/Api"));

var _UserSettings = _interopRequireDefault(require("../../../src/current-user/UserSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../../src/api/Api');
describe('CurrentUser.userSettings', function () {
  var userSettingsFixture = {
    keyUiLocale: 'en'
  };
  var userSettings;
  beforeEach(function () {
    userSettings = new _UserSettings.default();
  });
  afterEach(function () {
    _Api.default.mockReset();
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _UserSettings.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should set an instance of MockApi onto the UserSettings instance', function () {
    expect(userSettings.api).toBe(_Api.default.getApi());
  });
  describe('all', function () {
    beforeEach(function () {
      userSettings.api.get.mockReturnValue(Promise.resolve(userSettingsFixture));
    });
    it('should be a function', function () {
      expect(userSettings.all).toBeInstanceOf(Function);
    });
    it('should call the api to get all the userSettings', function () {
      expect.assertions(2);
      return userSettings.all().then(function () {
        expect(userSettings.api.get).toHaveBeenCalledTimes(1);
        expect(userSettings.api.get.mock.calls[0][0]).toBe('userSettings');
      });
    });
    it('should resolve the promise with the settings', function () {
      expect.assertions(1);
      return userSettings.all().then(function (settings) {
        expect(settings.keyUiLocale).toBe('en');
      });
    });
    it('should cache the current user settings', function () {
      expect.assertions(2);
      return userSettings.all().then(function () {
        return userSettings.all();
      }).then(function () {
        expect(userSettings.api.get).toHaveBeenCalledTimes(1);
        expect(userSettings.settings).toEqual(userSettingsFixture);
      });
    });
  });
  describe('get', function () {
    beforeEach(function () {
      userSettings.api.get.mockReturnValue(Promise.resolve(userSettingsFixture.keyUiLocale));
    });
    it('should be a function', function () {
      expect(userSettings.get).toBeInstanceOf(Function);
    });
    it('should return a Promise', function () {
      var result = userSettings.get('keyUiLocale');
      expect(result).toBeInstanceOf(Promise);
    });
    it('should reject the promise with an error if no key has been specified', function () {
      expect.assertions(2);
      return userSettings.get().catch(function (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('A "key" parameter should be specified when calling get() on userSettings');
      });
    });
    it('should call the api to get the value', function () {
      userSettings.get('keyUiLocale');
      expect(userSettings.api.get).toBeCalledWith('userSettings/keyUiLocale');
    });
    it('should return the value from the promise', function () {
      expect.assertions(1);
      return userSettings.get('keyUiLocale').then(function (value) {
        expect(value).toBe('en');
      });
    });
    it('should try to transform the response to json if possible', function () {
      userSettings.api.get.mockReturnValueOnce(Promise.resolve('{"mydataKey": "myDataValue"}'));
      expect.assertions(1);
      return userSettings.get('keyUiLocale').then(function (value) {
        expect(value).toEqual({
          mydataKey: 'myDataValue'
        });
      });
    });
    it('should reject the promise if the value is empty', function () {
      userSettings.api.get.mockReturnValueOnce(Promise.resolve(''));
      expect.assertions(1);
      return userSettings.get('keyThatDefinitelyDoesNotExist').catch(function (error) {
        expect(error.message).toBe('The requested userSetting has no value or does not exist.');
      });
    });
    it('should use the cache', function () {
      userSettings.api.get.mockReturnValueOnce(Promise.resolve(userSettingsFixture));
      expect.assertions(2);
      return userSettings.all().then(function () {
        return userSettings.get('keyUiLocale');
      }).then(function (value) {
        expect(userSettings.api.get).toHaveBeenCalledTimes(1);
        expect(value).toBe(userSettingsFixture.keyUiLocale);
      });
    });
    it('should also return a promise when serving cached values', function () {
      userSettings.api.get.mockReturnValueOnce(Promise.resolve(userSettingsFixture));
      expect.assertions(1);
      return userSettings.all().then(function () {
        expect(userSettings.get('keyUiLocale')).toBeInstanceOf(Promise);
      });
    });
  });
  describe('set', function () {
    beforeEach(function () {
      userSettings.api.get.mockReturnValue(Promise.resolve(userSettingsFixture));
      userSettings.api.post.mockReturnValueOnce(Promise.resolve());
      userSettings.api.delete.mockReturnValueOnce(Promise.resolve());
    });
    afterEach(function () {
      userSettings = new _UserSettings.default();
    });
    it('should POST to the API', function () {
      return userSettings.set('mySetting', 'my value').then(function () {
        expect(userSettings.api.get).toHaveBeenCalledTimes(0);
        expect(userSettings.api.post).toHaveBeenCalledTimes(1);
        expect(userSettings.api.delete).toHaveBeenCalledTimes(0);
      });
    });
    it('should DELETE if the value is null or an empty string', function () {
      return userSettings.set('mySetting', '').then(function () {
        expect(userSettings.api.get).toHaveBeenCalledTimes(0);
        expect(userSettings.api.post).toHaveBeenCalledTimes(0);
        expect(userSettings.api.delete).toHaveBeenCalledTimes(1);
      });
    });
    it('should clear out the cache', function () {
      return userSettings.all().then(function () {
        return userSettings.all();
      }).then(function () {
        return userSettings.set('a', 'b');
      }).then(function () {
        return userSettings.all();
      }).then(function () {
        return userSettings.all();
      }).then(function () {
        expect(userSettings.api.post).toHaveBeenCalledTimes(1);
        expect(userSettings.api.get).toHaveBeenCalledTimes(2);
      });
    });
  });
});
//# sourceMappingURL=UserSettings.spec.js.map
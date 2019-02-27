"use strict";

var utils = _interopRequireWildcard(require("../utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('Utils', function () {
  describe('throwError', function () {
    it('should throw an error', function () {
      function shouldThrow() {
        utils.throwError('MyMessage');
      }

      expect(shouldThrow).toThrowError('MyMessage');
    });
  });
  describe('pick', function () {
    var object = {
      name: 'Mark',
      users: ['mark', 'this', 'color']
    };
    it('should return the value of the property', function () {
      expect(utils.pick('name')(object)).toBe('Mark');
      expect(utils.pick('users')(object)).toBe(object.users);
    });
    it('should return undefined if the property does not exist', function () {
      expect(utils.pick('groups')(object)).toBeUndefined();
    });
    it('should return undefined if the object is undefined', function () {
      expect(utils.pick('name')(undefined)).toBeUndefined();
    });
    it('should support property paths', function () {
      var value = {
        user: {
          name: 'Mark',
          settings: {
            disabled: false
          }
        }
      };
      expect(utils.pick('user.name')(value)).toBe('Mark');
      expect(utils.pick('user.settings.disabled')(value)).toBe(false);
    });
    it('should not throw when a property in the path does not exist', function () {
      var value = {};
      expect(function () {
        return utils.pick('user.name')(value);
      }).not.toThrow();
      expect(function () {
        return utils.pick('user.settings.disabled')(value);
      }).not.toThrow();
    });
  });
  describe('updateAPIUrlWithBaseUrlVersionNumber()', function () {
    var baseUrl = 'https://www.whitehouse.gov/secret/top/dhis/api';
    it('works with unreasonable api versions', function () {
      for (var i = 10; i < 99; i++) {
        expect(utils.updateAPIUrlWithBaseUrlVersionNumber('https://localhost:8080/dhis/api/dataSetElements/abcDEFghi3', "".concat(baseUrl, "/").concat(i))).toBe("https://localhost:8080/dhis/api/".concat(i, "/dataSetElements/abcDEFghi3"));
      }
    });
  });
  describe('pickOr', function () {
    it('should return the defaultValue if it was defined', function () {
      var value = {};
      expect(utils.pickOr('user.name', 'John')(value)).toBe('John');
      expect(utils.pickOr('user.settings.disabled', true)(value)).toBe(true);
    });
    it('should return a null value over a default if it exists', function () {
      var value = {
        user: {
          name: null,
          settings: {
            disabled: false
          }
        }
      };
      expect(utils.pickOr('user.name', 'John')(value)).toBe(null);
      expect(utils.pickOr('user.settings.disabled', true)(value)).toBe(false);
    });
  });
});
//# sourceMappingURL=utils.spec.js.map
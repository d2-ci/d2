"use strict";

var check = _interopRequireWildcard(require("../check"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

describe('Check', function () {
  describe('isDefined', function () {
    it('should return when the parameter is defined', function () {
      expect(check.isDefined({})).toBe(true);
    });
    it('should return false when the parameter is not defined', function () {
      expect(check.isDefined(undefined)).toBe(false);
    });
  });
  describe('isType', function () {
    it('should return true if the value is of the correct type', function () {
      expect(check.isType('Mark', 'string')).toBe(true);
    });
    it('should return false when the value is not of the right type', function () {
      expect(check.isType({}, 'string')).toBe(false);
    });
    it('should return true when the value is an instance of', function () {
      expect(check.isType([], Object)).toBe(true);
    });
    it('should return false when the object is not an instance', function () {
      expect(check.isType('', Object)).toBe(false);
    });
  });
  describe('isString', function () {
    it('should return true for a string', function () {
      expect(check.isString('Mark')).toBe(true);
    });
    it('should return false for an array', function () {
      expect(check.isString([])).toBe(false);
    });
  });
  describe('isEmpty', function () {
    it('should return true if array is empty', function () {
      expect(check.isEmpty([])).toBe(true);
    });
    it('should return false if array has element', function () {
      expect(check.isEmpty([1, 2, 3])).toBe(false);
    });
  });
  describe('isInteger', function () {
    it('should return for 1', function () {
      expect(check.isInteger(1)).toBe(true);
    });
    it('should return false for 0.1', function () {
      expect(check.isInteger(0.1)).toBe(false);
    });
    it('should return false for NaN', function () {
      expect(check.isInteger(NaN)).toBe(false);
    });
    it('should return false for an array', function () {
      expect(check.isInteger([])).toBe(false);
    });
    it('should return false for an object', function () {
      expect(check.isInteger({})).toBe(false);
    });
    it('should return false for Infinity', function () {
      expect(check.isInteger(Infinity)).toBe(false);
    });
    it('should return false for empty string', function () {
      expect(check.isInteger('')).toBe(false);
    });
    it('should return false for white space strings', function () {
      expect(check.isInteger(' ')).toBe(false);
      expect(check.isInteger('\t')).toBe(false);
      expect(check.isInteger('\n')).toBe(false);
      expect(check.isInteger('\n\r')).toBe(false);
    });
  });
  describe('isNumeric', function () {
    it('should return true for 1', function () {
      expect(check.isNumeric(1)).toBe(true);
    });
    it('should return true for 1.1', function () {
      expect(check.isNumeric(1.1)).toBe(true);
    });
    it('should return true for negative 1', function () {
      expect(check.isNumeric(-1)).toBe(true);
    });
    it('should return true for negative 1.1', function () {
      expect(check.isNumeric(-1.1)).toBe(true);
    });
    it('should return true for 0', function () {
      expect(check.isNumeric(0)).toBe(true);
    });
    it('should return false for NaN', function () {
      expect(check.isNumeric(NaN)).toBe(false);
    });
    it('should return false for an array', function () {
      expect(check.isNumeric([])).toBe(false);
    });
    it('should return false for an object', function () {
      expect(check.isNumeric({})).toBe(false);
    });
    it('should return false for Infinity', function () {
      expect(check.isNumeric(Infinity)).toBe(false);
    });
    it('should return false for empty string', function () {
      expect(check.isNumeric('')).toBe(false);
    });
    it('should return false for white space strings', function () {
      expect(check.isNumeric(' ')).toBe(false);
      expect(check.isNumeric('\t')).toBe(false);
      expect(check.isNumeric('\n')).toBe(false);
      expect(check.isNumeric('\n\r')).toBe(false);
    });
    it('should concider Infinity not to be numeric', function () {
      expect(check.isNumeric(Infinity)).toBe(false);
    });
  });
  describe('isArray', function () {
    beforeEach(function () {
      jest.spyOn(Array, 'isArray');
    });
    afterEach(function () {
      Array.isArray.mockRestore();
    });
    it('should call Array.isArray', function () {
      check.isArray([]);
      expect(Array.isArray).toHaveBeenCalledTimes(1);
    });
  });
  describe('contains', function () {
    it('should be a function', function () {
      expect(check.contains).toBeInstanceOf(Function);
    });
    it('should return true when an item is contained in the array', function () {
      var list = [3, 4, 2, 6, 7];
      expect(check.contains(2, list)).toBe(true);
    });
    it('should return false when an item is not in the list', function () {
      var list = [3, 4, 2, 6, 7];
      expect(check.contains(9, list)).toBe(false);
    });
    it('should return false if the list is not an array', function () {
      expect(check.contains(1, 'two')).toBe(false);
    });
    it('should return false when the item is undefined', function () {
      expect(check.contains(undefined, [])).toBe(false);
    });
    it('should return true when undefined is in the list', function () {
      expect(check.contains(undefined, [undefined])).toBe(true);
    });
  });
  describe('isValidUid', function () {
    it('should return true when the value is a valid uid', function () {
      expect(check.isValidUid('q2egwkkrfco')).toBe(true);
    });
  });
  describe('toBe', function () {
    it('should do strict equals', function () {
      expect(check.toBe(undefined, undefined)).toBe(true);
      expect(check.toBe(null, null)).toBe(true);
      expect(check.toBe(null, undefined)).toBe(false);
      expect(check.toBe({}, {})).toBe(false);
      expect(check.toBe(expect, expect)).toBe(true);
      expect(check.toBe('q2egwkkrfco', 'q2egwkkrfco')).toBe(true);
    });
  });
  describe('toBeAny', function () {
    it('should return true when the value exists in the values', function () {
      expect(check.toBeAny([undefined, null, ''])(null)).toBe(true);
      expect(check.toBeAny(['A', 'B', 'C'])('C')).toBe(true);
    });
    it('should return false when the value does not exist in the values', function () {
      expect(check.toBeAny([undefined, null, ''])(0)).toBe(false);
      expect(check.toBeAny(['A', 'B', 'C'])('D')).toBe(false);
      expect(check.toBeAny(['A', 'B', 'C'])()).toBe(false);
    });
  });
  describe('isNullUndefinedOrEmptyString', function () {
    it('should return true when the passed value is either undefined, null, or empty string', function () {
      expect(check.isNullUndefinedOrEmptyString(null)).toBe(true);
      expect(check.isNullUndefinedOrEmptyString(undefined)).toBe(true);
      expect(check.isNullUndefinedOrEmptyString('')).toBe(true);
    });
    it('should return false when the passed value that is not undefined, null, or empty string', function () {
      expect(check.isNullUndefinedOrEmptyString('A')).toBe(false);
      expect(check.isNullUndefinedOrEmptyString({
        name: 'Stuff'
      })).toBe(false);
      expect(check.isNullUndefinedOrEmptyString(' ')).toBe(false);
      expect(check.isNullUndefinedOrEmptyString([])).toBe(false);
    });
  });
});
//# sourceMappingURL=check.spec.js.map
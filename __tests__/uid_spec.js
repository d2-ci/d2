"use strict";

var _lodash = require("lodash");

var _uid = require("../uid");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe('Uid generation', function () {
  describe('isValidUid()', function () {
    it('should be a function', function () {
      expect(_typeof(_uid.isValidUid)).toBe('function');
    });
    it('should return false for undefined', function () {
      expect((0, _uid.isValidUid)()).toBe(false);
    });
    it('should return false for null', function () {
      expect((0, _uid.isValidUid)(null)).toBe(false);
    });
    it('should return false for 0', function () {
      expect((0, _uid.isValidUid)(0)).toBe(false);
    });
    it('should return false for empty string', function () {
      expect((0, _uid.isValidUid)('')).toBe(false);
    });
    it('should return false for a uid that is shorter than 11 characters', function () {
      expect((0, _uid.isValidUid)('a1234')).toBe(false);
    });
    it('should return true for a valid uid', function () {
      expect((0, _uid.isValidUid)('JkWynlWMjJR')).toBe(true);
    });
    it('should return false for a uid that starts with a number', function () {
      expect((0, _uid.isValidUid)('0kWynlWMjJR')).toBe(false);
    });
    it('should return false for a uid that has a special character', function () {
      expect((0, _uid.isValidUid)('AkWy$lWMjJR')).toBe(false);
    });
  });
  describe('generateUid', function () {
    it('should generate a uid that is 11 characters long', function () {
      expect((0, _uid.generateUid)()).toHaveLength(11);
    });
    it('should generate a uid that starts with a letter', function () {
      expect((0, _uid.generateUid)()).toMatch(/^[A-z]{1}/);
    });
    it('should not generate the same uids', function () {
      expect((0, _uid.generateUid)()).not.toBe((0, _uid.generateUid)());
    });
    it('should generate a lot of unique codes', function () {
      var generate500UniqueCodes = function generate500UniqueCodes() {
        return (0, _lodash.range)(0, 500).map(function () {
          return (0, _uid.generateUid)();
        }).reduce(function (codes, code) {
          return codes.add(code);
        }, new Set());
      };

      expect(generate500UniqueCodes).not.toThrowError();
    });
  });
});
//# sourceMappingURL=uid_spec.js.map
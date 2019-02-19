"use strict";

var _AnalyticsResponseHeader = _interopRequireDefault(require("../AnalyticsResponseHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var responseHeader;
var expectedResponseHeader;
describe('AnalyticsResponseHeader', function () {
  beforeEach(function () {
    responseHeader = new _AnalyticsResponseHeader.default();
    expectedResponseHeader = {};
  });
  describe('constructor', function () {
    var flags = {
      isPrefix: false,
      isCollect: false,
      index: undefined
    };
    it('should not be allowed to be called without new', function () {
      expect(function () {
        return (0, _AnalyticsResponseHeader.default)();
      }).toThrowErrorMatchingSnapshot(); // eslint-disable-line new-cap
    });
    it('should initialize properties', function () {
      expect(responseHeader.isPrefix).toEqual(flags.isPrefix);
      expect(responseHeader.isCollect).toEqual(flags.isCollect);
      expect(responseHeader.index).toEqual(flags.index);
    });
    it('should set the header when passed as argument', function () {
      var header = {
        name: 'cejWyOfXge6',
        column: 'Gender',
        valueType: 'TEXT',
        type: 'java.lang.String',
        hidden: false,
        meta: true,
        optionSet: 'pC3N9N77UmT'
      };
      responseHeader = new _AnalyticsResponseHeader.default(header);
      expectedResponseHeader = _objectSpread({}, header, flags);
      Object.keys(expectedResponseHeader).forEach(function (key) {
        expect(responseHeader[key]).toEqual(expectedResponseHeader[key]);
      });
    });
  });
  describe('properties', function () {
    describe('.setIndex()', function () {
      it('should set the index with the given value', function () {
        responseHeader.setIndex(12);
        expect(responseHeader.index).toEqual(12);
      });
      it('should set the index as numeric when passing a string', function () {
        responseHeader.setIndex('10');
        expect(responseHeader.index).toEqual(10);
      });
      it('should set the index as integer', function () {
        responseHeader.setIndex(12.5);
        expect(responseHeader.index).toEqual(12);
      });
    });
    describe('.getIndex()', function () {
      it('should return the correct index value', function () {
        responseHeader.index = 17;
        expect(responseHeader.getIndex()).toEqual(17);
      });
    });
  });
});
//# sourceMappingURL=AnalyticsResponseHeader.spec.js.map
"use strict";

var _BaseStore2 = _interopRequireDefault(require("../../datastore/BaseStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

describe('BaseStore', function () {
  describe('constructor()', function () {
    it('it should throw if created with new() directly', function () {
      expect(function () {
        return new _BaseStore2.default();
      }).toThrow();
    });
    it('it should throw if not created with a subclass', function () {
      var AnotherClass =
      /*#__PURE__*/
      function (_BaseStore) {
        _inherits(AnotherClass, _BaseStore);

        function AnotherClass() {
          _classCallCheck(this, AnotherClass);

          return _possibleConstructorReturn(this, _getPrototypeOf(AnotherClass).call(this, null, 'endpoint', String));
        }

        return AnotherClass;
      }(_BaseStore2.default);

      expect(function () {
        return new AnotherClass();
      }).toThrow(/must be subclass/);
    });
  });
});
//# sourceMappingURL=BaseStore.spec.js.map
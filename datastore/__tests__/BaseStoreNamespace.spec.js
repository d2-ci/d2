"use strict";

var _BaseStoreNamespace = _interopRequireDefault(require("../../datastore/BaseStoreNamespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('BaseStoreNamespace', function () {
  describe('constructor()', function () {
    it('it should throw if created with new() directly', function () {
      expect(function () {
        return new _BaseStoreNamespace.default('namespace', null, null, 'endpoint');
      }).toThrow(/Can't instantiate abstract class/);
    });
    it('it should throw if not created with an endpoint', function () {
      expect(function () {
        return new _BaseStoreNamespace.default('namespace', null, null, null);
      }).toThrow(/must be called with an endPoint/);
    });
    it('it should throw if endpoint is not a string', function () {
      expect(function () {
        return new _BaseStoreNamespace.default('namespace', null, null, {});
      }).toThrow(/must be called with an endPoint/);
    });
  });
});
//# sourceMappingURL=BaseStoreNamespace.spec.js.map
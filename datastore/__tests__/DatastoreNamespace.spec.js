"use strict";

var _DataStoreNamespace = _interopRequireDefault(require("../../datastore/DataStoreNamespace"));

var _Api = _interopRequireDefault(require("../../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jest.mock('../../api/Api');
describe('DataStoreNamespace', function () {
  var keys = ['key1', 'a key', 'aowelfkxuw'];
  var namespace;
  var apiMock;
  beforeEach(function () {
    apiMock = _Api.default.getApi();
    namespace = new _DataStoreNamespace.default('DHIS', keys, apiMock);
    apiMock.get.mockReturnValue(Promise.resolve());
    apiMock.post.mockReturnValue(Promise.resolve());
    apiMock.update.mockReturnValue(Promise.resolve());
    apiMock.delete.mockReturnValue(Promise.resolve());
  });
  afterEach(function () {
    _Api.default.mockReset();
  });
  it('should throw an error if not called with a string', function () {
    expect(function () {
      return new _DataStoreNamespace.default();
    }).toThrowError('BaseStoreNamespace must be called with a string to identify the Namespace');
  });
  it('should contain an array of keys', function () {
    expect(Array.isArray(namespace.keys)).toBe(true);
    expect(namespace.keys).toEqual(keys);
  });
  it('should contain a string of a namespace', function () {
    expect(_typeof(namespace.namespace)).toBe('string');
  });
  describe('getKeys()', function () {
    var refreshedKeys = keys.concat('newkey');
    beforeEach(function () {
      apiMock.get.mockClear();
      apiMock.get.mockReturnValue(Promise.resolve(keys));
    });
    it('should return an array of keys', function () {
      expect.assertions(1);
      return namespace.getKeys().then(function (res) {
        expect(res).toEqual(keys);
      });
    });
    it('should be backwards compatible with getKeys(false), but send request either way', function () {
      namespace.getKeys().then(function (res) {
        expect(res).toEqual(keys);
        expect(apiMock.get).toHaveBeenCalled();
      });
    });
    it('should call remote api if forceload is true and update internal array', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(refreshedKeys));
      expect.assertions(3);
      return namespace.getKeys(true).then(function (res) {
        expect(res).toEqual(refreshedKeys);
        expect(namespace.keys).toEqual(refreshedKeys);
        expect(apiMock.get).toBeCalledWith('dataStore/DHIS');
      });
    });
    it('should throw an error when there is no response', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve({}));
      expect.assertions(1);
      return namespace.getKeys(true).catch(function (namespaceRes) {
        expect(namespaceRes.message).toBe('The requested namespace has no keys or does not exist.');
      });
    });
  });
  describe('get()', function () {
    beforeEach(function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve('value'));
    });
    it('should call API with correct parameters', function () {
      expect.assertions(1);
      return namespace.get('key1').then(function () {
        expect(apiMock.get).toBeCalledWith('dataStore/DHIS/key1');
      });
    });
    it('should return a value', function () {
      expect.assertions(1);
      return namespace.get('key1').then(function (val) {
        expect(val).toBe('value');
      });
    });
  });
  describe('getMetaData()', function () {
    var key = 'key1';
    var metaObj = {
      created: '2017-01-22T14:15:14.176',
      lastUpdated: '2017-01-22T14:15:14.176',
      externalAccess: false,
      namespace: 'DHIS',
      key: 'key1',
      value: '{}',
      id: 'B6SZPkuigc0'
    };
    beforeEach(function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(metaObj));
    });
    it('should retrieve an object with metaData', function () {
      expect.assertions(1);
      return namespace.getMetaData(key).then(function (res) {
        expect(res).toBe(metaObj);
      });
    });
    it('should call api.get() with correct parameters', function () {
      expect.assertions(1);
      return namespace.getMetaData(key).then(function () {
        expect(apiMock.get).toBeCalledWith("dataStore/DHIS/".concat(key, "/metaData"));
      });
    });
  });
  describe('set()', function () {
    var valueData = 'value';
    beforeEach(function () {
      jest.spyOn(namespace, 'update');
      jest.spyOn(namespace, 'set');
    });
    it('should call the api with correct url', function () {
      var setKey = 'DHIS2';
      expect.assertions(1);
      return namespace.set(setKey, valueData).then(function () {
        expect(apiMock.post).toBeCalledWith("dataStore/DHIS/".concat(setKey), valueData);
      });
    });
    it('should update if the key exists', function () {
      var setKey = 'key1';
      return namespace.set(setKey, valueData).then(function () {
        expect(namespace.update).toBeCalledWith(setKey, valueData);
        expect(apiMock.update).toBeCalledWith("dataStore/DHIS/".concat(setKey), valueData);
      });
    });
    it('should call post if the key exists and override is true', function () {
      var setKey = 'key1';
      return namespace.set(setKey, valueData, true).then(function () {
        expect(namespace.update).not.toHaveBeenCalled();
        expect(apiMock.post).toBeCalledWith("dataStore/DHIS/".concat(setKey), valueData);
      });
    });
    it('should add key to internal array', function () {
      var arr = namespace.keys;
      var key = 'key';
      expect.assertions(1);
      return namespace.set('key', valueData).then(function () {
        expect(namespace.keys).toEqual(arr.concat(key));
      });
    });
    it('should work with encrypt = true',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var encryptedVal, calls;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              encryptedVal = {
                prop: 'am encrypted'
              };
              _context.next = 3;
              return namespace.set('encrypt', encryptedVal, false, true);

            case 3:
              calls = apiMock.post.mock.calls;
              expect(namespace.set).toHaveBeenCalledWith('encrypt', encryptedVal, false, true);
              expect(calls[calls.length - 1][0]).toContain('encrypt'); // last call with arg0

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
  });
  describe('delete()', function () {
    it('should call api.delete() with the correct url', function () {
      expect.assertions(1);
      return namespace.delete('key1').then(function () {
        expect(apiMock.delete).toBeCalledWith('dataStore/DHIS/key1');
      });
    });
    it('should delete key from internal array', function () {
      var orgLen = namespace.keys.length;
      expect.assertions(1);
      return namespace.delete('key1').then(function () {
        expect(namespace.keys.length).toBe(orgLen - 1);
      });
    });
    it('should call api.delete() even if the key was not present in the internal array', function () {
      expect.assertions(1);
      return namespace.delete('someInaginaryKeyIJustMadeUp').then(function () {
        expect(apiMock.delete).toBeCalledWith('dataStore/DHIS/someInaginaryKeyIJustMadeUp');
      });
    });
    it('should throw if not called with a string',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var err;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              /* this way of handling errors is quite weird, see
                      https://github.com/facebook/jest/issues/3601
                   */
              err = null;
              _context2.prev = 1;
              _context2.next = 4;
              return namespace.delete({});

            case 4:
              _context2.next = 9;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](1);
              err = _context2.t0;

            case 9:
              expect(err.message).toMatch(/Expected key to be string, but got/);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 6]]);
    })));
  });
  describe('update()', function () {
    var valueData = 'value';
    it('should call the api with correct url', function () {
      var setKey = 'DHIS';
      expect.assertions(1);
      return namespace.update(setKey, valueData).then(function () {
        expect(apiMock.update).toBeCalledWith("dataStore/DHIS/".concat(setKey), valueData);
      });
    });
  });
});
//# sourceMappingURL=DatastoreNamespace.spec.js.map
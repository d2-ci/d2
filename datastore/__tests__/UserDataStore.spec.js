"use strict";

var _UserDataStore = _interopRequireDefault(require("../../datastore/UserDataStore"));

var _UserDataStoreNamespace = _interopRequireDefault(require("../../datastore/UserDataStoreNamespace"));

var _Api = _interopRequireDefault(require("../../api/Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

jest.mock('../../api/Api');
describe('UserDataStore', function () {
  var namespaces = ['DHIS', 'History', 'social-media-video'];
  var keys = ['key1', 'a key', 'aowelfkxuw'];
  var userDataStore;
  var apiMock;
  beforeEach(function () {
    apiMock = new _Api.default();
    userDataStore = new _UserDataStore.default(apiMock);
  });
  afterEach(function () {
    _Api.default.mockReset();
  });
  describe('get()', function () {
    it('should return an instance of UserDatastoreNamespace', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(namespaces));
      return userDataStore.get('DHIS').then(function (namespace) {
        expect(namespace).toBeInstanceOf(_UserDataStoreNamespace.default);
      });
    });
    it('should return a UserDatastoreNamespace with keys if it exists', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(namespaces)).mockReturnValueOnce(Promise.resolve(keys));
      return userDataStore.get('DHIS').then(function (namespace) {
        return namespace.getKeys().then(function (res) {
          expect(res).toEqual(keys);
          expect(apiMock.get).toHaveBeenCalledTimes(2);
        });
      });
    });
    it('should not request API if autoload is false', function () {
      return userDataStore.get('DHIS', false).then(function (res) {
        expect(res).toBeInstanceOf(_UserDataStoreNamespace.default);
        expect(apiMock.get).not.toHaveBeenCalled();
      });
    });
    it('should throw an error when no response', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(null));
      return userDataStore.get('DHIS').catch(function (e) {
        expect(e.message).toBe('The requested namespace has no keys or does not exist.');
      });
    });
    it('should throw an error if namespace does not exist on server', function () {
      var err = {
        httpStatusCode: 404
      };
      apiMock.get.mockReturnValueOnce(Promise.reject(err));
      return expect(userDataStore.get('DHIS').catch(function (e) {
        expect(e).toThrow();
      })).rejects.toBeDefined();
    });
    it('should throw when error is not 404', function () {
      var error = {
        httpStatusCode: 500
      };
      apiMock.get.mockReturnValueOnce(Promise.reject(error));
      return userDataStore.get('DHIS').catch(function (e) {
        expect(e).toEqual(error);
      });
    });
    it('should throw an error if response is an empty array', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve([]));
      expect.assertions(1);
      return userDataStore.get('namespace').then(function () {
        throw new Error('this hould have failed');
      }).catch(function (e) {
        expect(e.message).toMatch(/does not exist/);
      });
    });
    describe('for an invalid namespace', function () {
      beforeEach(function () {
        apiMock.get.mockReturnValueOnce(Promise.reject(['{', '"httpStatus":"Not Found",', '"httpStatusCode":404,', '"status":"ERROR",', '"message":"The namespace \'not-my-namespace\' was not found."', '}'].join('')));
      });
      it('should throw an error', function () {
        expect.assertions(1);
        return userDataStore.get('not-my-namespace').catch(function () {
          // TODO: this seems to just be testing the mock
          expect(true).toBe(true);
        });
      });
    });
  });
  describe('getAll()', function () {
    it('should return an array of namespaces', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(namespaces));
      expect.assertions(1);
      return userDataStore.getAll().then(function (namespaceRes) {
        expect(namespaces).toEqual(namespaceRes);
      });
    });
    it('should throw an error when there is no response', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(null));
      expect.assertions(1);
      return userDataStore.getAll().catch(function (namespaceRes) {
        expect(namespaceRes.message).toBe('No namespaces exist.');
      });
    });
  });
  describe('delete()', function () {
    beforeEach(function () {
      apiMock.delete.mockReturnValueOnce(Promise.resolve());
    });
    it('should call the api with correct url', function () {
      var namespaceDel = 'DHIS';
      return userDataStore.delete(namespaceDel).then(function () {
        expect(apiMock.delete).toBeCalledWith("userDataStore/".concat(namespaceDel));
      });
    });
  });
  describe('getUserDataStore', function () {
    it('should return an instance of UserDataStore', function () {
      expect(_UserDataStore.default.getUserDataStore()).toBeInstanceOf(_UserDataStore.default);
    });
    it('should return the same object when called twice', function () {
      expect(_UserDataStore.default.getUserDataStore()).toBe(_UserDataStore.default.getUserDataStore());
    });
  });
  describe('create()', function () {
    it('should return an instance of UserDataStoreNamespace if namespace do not exist', function () {
      var error = {
        httpStatusCode: 404
      };
      apiMock.get.mockReturnValueOnce(Promise.reject(error));
      return userDataStore.create('DHIS').then(function (namespace) {
        expect(namespace).toBeInstanceOf(_UserDataStoreNamespace.default);
        expect(namespace.keys).toHaveLength(0);
      });
    });
    it('should return an error if namespace exists', function () {
      apiMock.get.mockReturnValueOnce(Promise.resolve(keys));
      return userDataStore.get('DHIS').then(function (namespace) {
        expect(namespace).toBeInstanceOf(_UserDataStoreNamespace.default);
      });
    });
  });
  describe('has', function () {
    it('should resolve with true if namespace exists',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var hasNamespace;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              apiMock.get.mockReturnValueOnce(Promise.resolve(keys));
              _context.next = 3;
              return userDataStore.has('DHIS');

            case 3:
              hasNamespace = _context.sent;
              expect(hasNamespace).toBe(true);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })));
    it('should resolve with false if namespace does not exists (404 from server)',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var err, hasNamespace;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              err = {
                httpStatusCode: 404
              };
              apiMock.get.mockReturnValueOnce(Promise.reject(err));
              _context2.next = 4;
              return userDataStore.has('arandomnamespace');

            case 4:
              hasNamespace = _context2.sent;
              expect(hasNamespace).toBe(false);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    it('should resolve with false if namespace does not exists (empty array)',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var hasNamespace;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              apiMock.get.mockReturnValueOnce(Promise.resolve([]));
              _context3.next = 3;
              return userDataStore.has('arandomnamespace');

            case 3:
              hasNamespace = _context3.sent;
              expect(hasNamespace).toBe(false);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should throw an error if resolved response is not an array',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              apiMock.get.mockReturnValueOnce(Promise.resolve({}));
              _context4.next = 3;
              return expect(userDataStore.has('arandomnamespace')).rejects.toBeDefined();

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
    it('should throw an error if rejected response is not 404 or empty array ',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var err;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              err = {
                httpStatusCode: 500
              };
              apiMock.get.mockReturnValueOnce(Promise.resolve(err));
              _context5.next = 4;
              return expect(userDataStore.has('arandomnamespace')).rejects.toBeDefined();

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
  });
});
//# sourceMappingURL=UserDataStore.spec.js.map
"use strict";

require("isomorphic-fetch");

var _d = require("../../../d2");

var _UserDataStoreNamespace = _interopRequireDefault(require("../../UserDataStoreNamespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('UserDataStore', function () {
  var credentials = "Basic ".concat(btoa('admin:district'));
  var d2;
  var namespace;
  var store;
  beforeAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _d.init)({
              baseUrl: 'https://play.dhis2.org/demo/api',
              schemas: [],
              headers: {
                authorization: credentials
              }
            });

          case 2:
            d2 = _context.sent;
            store = d2.currentUser.dataStore;
            _context.prev = 4;
            _context.next = 7;
            return store.create('namespace');

          case 7:
            namespace = _context.sent;
            _context.next = 15;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);
            // delete if exists
            expect(_context.t0).toThrow(/already exist/);
            _context.next = 15;
            return store.delete('namespace');

          case 15:
            _context.next = 17;
            return store.has('new namespace');

          case 17:
            if (!_context.sent) {
              _context.next = 20;
              break;
            }

            _context.next = 20;
            return store.delete('new namespace');

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 10]]);
  })));
  afterAll(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return store.delete('namespace');

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  describe('get()', function () {
    it('should fetch asynchronously',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var value, key, retVal;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              value = {
                value: '123'
              };
              key = 'key';
              _context3.next = 4;
              return namespace.set(key, value);

            case 4:
              _context3.next = 6;
              return namespace.get(key);

            case 6:
              retVal = _context3.sent;
              expect(Array.isArray(namespace.keys)).toBe(true);
              expect(namespace.keys).toEqual([key]);
              expect(retVal).toEqual(value);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));
    it('should work when autoLoad = false',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var ns;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return store.get('another namespace', false);

            case 2:
              ns = _context4.sent;
              expect(ns).toBeInstanceOf(_UserDataStoreNamespace.default);
              expect(ns.keys).toHaveLength(0);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));
  });
  describe('getAll()', function () {
    it('should get asynchronously',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var newNamespace, stringVal, namespaces, serverVal;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return store.create('new namespace');

            case 2:
              newNamespace = _context5.sent;
              stringVal = 'a random string';
              _context5.next = 6;
              return newNamespace.set('key', stringVal);

            case 6:
              _context5.next = 8;
              return store.getAll();

            case 8:
              namespaces = _context5.sent;
              _context5.next = 11;
              return newNamespace.get('key');

            case 11:
              serverVal = _context5.sent;
              expect(namespaces).toContain(newNamespace.namespace);
              expect(serverVal).toEqual(stringVal);
              _context5.next = 16;
              return store.delete('new namespace');

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })));
  });
  describe('delete()', function () {
    it('should delete asynchronously',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var newNamespace, stringVal;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return store.create('new namespace');

            case 2:
              newNamespace = _context6.sent;
              stringVal = 'a random string';
              _context6.next = 6;
              return newNamespace.set('key', stringVal);

            case 6:
              _context6.next = 8;
              return store.delete('new namespace');

            case 8:
              _context6.next = 10;
              return expect(store.get('new namespace')).rejects.toBeDefined();

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));
  });
});
//# sourceMappingURL=UserDataStore.e2e.js.map
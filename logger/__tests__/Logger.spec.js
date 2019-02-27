"use strict";

var _Logger = _interopRequireDefault(require("../Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Logger', function () {
  var logger;
  var consoleMock;
  beforeEach(function () {
    consoleMock = {
      log: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      warn: jest.fn()
    };
    logger = new _Logger.default(consoleMock);
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _Logger.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should get the correct Logger instance from the namespace', function () {
    expect(logger).toBeInstanceOf(_Logger.default);
  });
  it('should have a log function', function () {
    expect(logger.log).toBeDefined();
    expect(logger.log).toBeInstanceOf(Function);
  });
  it('should log to the console', function () {
    logger.log('my message');
    expect(consoleMock.log).toBeCalledWith('my message');
  });
  it('should return true after successful logging', function () {
    expect(logger.log('my message')).toBe(true);
  });
  it('should not log when it does not exist', function () {
    delete consoleMock.log;
    expect(logger.log('my message')).toBe(false);
  });
  it('should not log if the method does not exist', function () {
    delete consoleMock.warn;
    expect(logger.warn('my message')).toBe(false);
  });
  it('should log a warning', function () {
    expect(logger.warn('my message')).toBe(true);
    expect(consoleMock.warn).toBeCalledWith('my message');
  });
  it('should log a debug request', function () {
    expect(logger.debug('my message')).toBe(true);
    expect(consoleMock.debug).toBeCalledWith('my message');
  });
  it('should not log when it does not exist', function () {
    delete consoleMock.debug;
    expect(logger.debug('my message')).toBe(false);
  });
  it('should log an error request', function () {
    expect(logger.error('my message')).toBe(true);
    expect(consoleMock.error).toBeCalledWith('my message');
  });
  it('should not log when error does not exist', function () {
    delete consoleMock.error;
    expect(logger.error('my message')).toBe(false);
  });
  describe('getLogger', function () {
    it('should return a logger', function () {
      expect(_Logger.default.getLogger()).toBeInstanceOf(_Logger.default);
    });
    it('should create a singleton and return that', function () {
      expect(_Logger.default.getLogger()).toBe(_Logger.default.getLogger());
    });
  });
});
//# sourceMappingURL=Logger.spec.js.map
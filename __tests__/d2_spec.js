"use strict";

var _Api = _interopRequireDefault(require("../api/Api"));

var _fixtures = _interopRequireDefault(require("../__fixtures__/fixtures"));

var _I18n = _interopRequireDefault(require("../i18n/I18n"));

var _DataStore = _interopRequireDefault(require("../datastore/DataStore"));

var _Logger = _interopRequireDefault(require("../logger/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jest.mock('../logger/Logger');
jest.mock('../api/Api');
jest.mock('../i18n/I18n');
describe('D2', function () {
  var ModelDefinition = function ModelDefinition() {
    this.name = 'dataElement';
  };

  ModelDefinition.prototype = {};
  var ModelDefinitionMock = {
    createFromSchema: jest.fn().mockReturnValue(new ModelDefinition()),
    prototype: {}
  };
  var d2;
  var apiMock;
  var loggerMock;
  var i18nMock;
  beforeEach(function () {
    ModelDefinitionMock.createFromSchema.callCount = 0;
    var schemasResponse = {
      schemas: [_fixtures.default.get('/api/schemas/dataElement'), _fixtures.default.get('/api/schemas/dataElement'), _fixtures.default.get('/api/schemas/dataElement')]
    };
    apiMock = {
      get: jest.fn() // First init round
      .mockReturnValueOnce(Promise.resolve(schemasResponse)).mockReturnValueOnce(new Promise(function (resolve) {
        return resolve(_fixtures.default.get('/api/attributes'));
      })).mockReturnValueOnce(Promise.resolve({})).mockReturnValueOnce(Promise.resolve([])).mockReturnValueOnce(new Promise(function (resolve) {
        return resolve(_fixtures.default.get('/api/userSettings'));
      })).mockReturnValueOnce(Promise.resolve({
        version: '2.21'
      })).mockReturnValueOnce(Promise.resolve({
        apps: []
      })) // Second init round
      .mockReturnValueOnce(new Promise(function (resolve) {
        return resolve(schemasResponse);
      })).mockReturnValueOnce(new Promise(function (resolve) {
        return resolve(_fixtures.default.get('/api/attributes'));
      })).mockReturnValueOnce(Promise.resolve({})).mockReturnValueOnce(Promise.resolve([])).mockReturnValueOnce(new Promise(function (resolve) {
        return resolve(_fixtures.default.get('/api/userSettings'));
      })).mockReturnValueOnce(Promise.resolve({
        version: '2.21'
      })).mockReturnValueOnce(Promise.resolve({
        apps: []
      })),
      setBaseUrl: jest.fn(),
      getApi: function getApi() {
        return this;
      },
      setDefaultHeaders: jest.fn()
    };
    loggerMock = {
      error: jest.fn()
    };
    i18nMock = {
      addSource: jest.fn(),
      addStrings: jest.fn(),
      load: jest.fn().mockReturnValue(Promise.resolve())
    };
    _Logger.default.getLogger = _Logger.default.getLogger.mockReturnValue(loggerMock);
    _Api.default.getApi = _Api.default.getApi.mockReturnValue(apiMock);
    _I18n.default.getI18n = _I18n.default.getI18n.mockReturnValue(i18nMock); // jscs:disable

    var ModelDefinitionsMock = function ModelDefinitions() {
      this.modelsMockList = true;

      this.add = function add(schema) {
        this[schema.name] = schema;
      };
    }; // jscs:enable


    ModelDefinitionsMock.prototype = {
      add: function add(schema) {
        this[schema.name] = schema;
      }
    };
    ModelDefinitionsMock.getModelDefinitions = jest.fn().mockReturnValue(new ModelDefinitionsMock()); // Import after we have set all the mock values
    // TODO: should probably use jest.mock and use a regular ES6 import

    d2 = require('../d2').default; // eslint-disable-line global-require
  });
  afterEach(function () {});
  it('should have an init function', function () {
    expect(_typeof(d2.init)).toBe('function');
  });
  it('should have a getInstance function', function () {
    expect(_typeof(d2.getInstance)).toBe('function');
  });
  describe('init', function () {
    it('should call load on i18n instance', function (done) {
      d2.init(undefined, apiMock);
      d2.getInstance().then(function () {
        expect(i18nMock.load).toHaveBeenCalledTimes(1);
        done();
      }).catch(done);
    });
  });
  describe('config', function () {
    it('should have a default baseUrl in the config', function () {
      expect(d2.config.baseUrl).toBe('/api');
    });
    it('should use the baseUrl from the pre-init config', function (done) {
      d2.config.baseUrl = '/dhis/api';
      d2.init(undefined, apiMock);
      d2.getInstance().then(function () {
        expect(apiMock.setBaseUrl).toHaveBeenCalledWith('/dhis/api');
        done();
      }).catch(done);
    });
    it('should let the init() config override the pre-init config', function (done) {
      d2.config.baseUrl = '/dhis/api';
      d2.init({
        baseUrl: '/demo/api'
      }, apiMock);
      d2.getInstance().then(function () {
        expect(apiMock.setBaseUrl).toHaveBeenCalledWith('/demo/api');
        done();
      }).catch(done);
    });
    it('should use default headers for requests', function (done) {
      d2.config.baseUrl = '/dhis/api';
      d2.config.headers = {
        Authorization: new Buffer('admin:district').toString('base64')
      };
      d2.init({
        baseUrl: '/demo/api'
      }, apiMock);
      d2.getInstance().then(function () {
        expect(apiMock.setDefaultHeaders).toHaveBeenCalledWith({
          Authorization: 'YWRtaW46ZGlzdHJpY3Q='
        });
        done();
      }).catch(done);
    });
    it('should pass the sources Set as an sources array to the i18n class', function (done) {
      d2.config.i18n.sources.add('global.properties');
      d2.config.i18n.sources.add('nonglobal.properties');
      d2.config.i18n.sources.add('systemsettings.properties');
      d2.init(undefined, apiMock);
      d2.getInstance().then(function () {
        expect(i18nMock.addSource).toHaveBeenCalledTimes(3);
        done();
      }).catch(function (e) {
        done(e);
      });
    });
    it('should call addStrings for the pre-init added strings', function (done) {
      d2.config.i18n.strings.add('name');
      d2.config.i18n.strings.add('yes');
      d2.init(undefined, apiMock);
      d2.getInstance().then(function () {
        expect(i18nMock.addStrings).toHaveBeenCalledWith(['name', 'yes']);
        done();
      }).catch(function (e) {
        done(e);
      });
    });
  });
  describe('getInstance', function () {
    it('should return a promise', function () {
      expect(d2.getInstance()).toBeInstanceOf(Promise);
    });
    it('should return the d2 instance after init', function (done) {
      Promise.all([d2.init({
        baseUrl: '/dhis/api'
      }, apiMock), d2.getInstance()]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            d2FromInit = _ref2[0],
            d2FromFactory = _ref2[1];

        expect(d2FromInit).toBe(d2FromFactory);
        done();
      }).catch(done);
    });
    it('should return the same instance on getInstance calls', function (done) {
      d2.init({
        baseUrl: '/dhis/api'
      }, apiMock);
      Promise.all([d2.getInstance(), d2.getInstance()]).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            firstCallResult = _ref4[0],
            secondCallResult = _ref4[1];

        expect(firstCallResult).toBe(secondCallResult);
        done();
      }).catch(done);
    });
    it('should return a different instance after re-init', function (done) {
      d2.init(undefined, apiMock);
      var instanceAfterFirstInit = d2.getInstance();
      instanceAfterFirstInit.then(function (first) {
        d2.init({
          baseUrl: '/dhis/api'
        }, apiMock);
        var instanceAfterSecondInit = d2.getInstance();
        return Promise.all([first, instanceAfterSecondInit]);
      }).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            first = _ref6[0],
            second = _ref6[1];

        expect(first).not.toBe(second);
        done();
      }).catch(done);
    });
    it('should return a promise when calling getInstance before init', function () {
      expect(d2.getInstance()).toBeInstanceOf(Promise);
    });
  });
  it('should set the base url onto the api', function () {
    d2.init({
      baseUrl: '/dhis/api'
    }, apiMock);
    expect(apiMock.setBaseUrl).toHaveBeenCalledWith('/dhis/api');
  });
  it('should set the baseUrl to the default /api', function () {
    d2.init({}, apiMock);
    expect(apiMock.setBaseUrl).toBeCalled();
  });
  it('should throw an error when the passed config is not an object', function () {
    function shouldThrowOnString() {
      d2.init(' ');
    }

    function shouldThrowOnFunction() {
      d2.init(function () {
        return true;
      });
    }

    expect(shouldThrowOnString).toThrowError('Expected Config parameter to have type object');
    expect(shouldThrowOnFunction).toThrowError('Expected Config parameter to have type object');
  });
  it('should not throw an error when no config is passed', function () {
    function shouldNotThrow() {
      d2.init(undefined, apiMock);
    }

    expect(shouldNotThrow).not.toThrowError();
  });
  it('should call the api', function () {
    return d2.init({
      baseUrl: '/dhis/api'
    }, apiMock).then(function () {
      var fields = 'apiEndpoint,name,displayName,authorities,singular,plural,' + 'shareable,metadata,klass,identifiableObject,translatable,' + 'properties[href,writable,collection,collectionName,name,propertyType,persisted,required,min,max,' + 'ordered,unique,constants,owner,itemPropertyType,translationKey,embeddedObject]';
      expect(apiMock.get).toHaveBeenCalledWith('schemas', {
        fields: fields
      });
    });
  });
  it('should log the error when schemas can not be requested', function () {
    apiMock.get = jest.fn().mockReturnValueOnce(Promise.reject(new Error('Failed')));
    return d2.init({
      baseUrl: '/dhis/api'
    }, apiMock, loggerMock).then(function () {
      return Promise.reject('No error occurred');
    }, function () {
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
      expect(loggerMock.error).toHaveBeenCalledWith('Unable to get schemas from the api', '{}', new Error('Failed'));
    });
  });
  it('should return an object with the api object', function (done) {
    d2.init({
      baseUrl: '/dhis/api'
    }, apiMock).then(function (newD2) {
      expect(newD2.Api.getApi()).toBe(apiMock);
      done();
    }).catch(done);
  });
  it('should call the api for all startup calls', function (done) {
    d2.init({
      baseUrl: '/dhis/api'
    }, apiMock).then(function () {
      expect(apiMock.get).toHaveBeenCalledTimes(7);
      done();
    }).catch(done);
  });
  it('should query the api for all the attributes', function (done) {
    d2.init({
      baseUrl: '/dhis/api'
    }, apiMock).then(function () {
      var attributeCallArgs = apiMock.get.mock.calls[1];
      /* 0: Url, 1: Data, 1: Query params, 2: Request options */

      expect(attributeCallArgs[0]).toBe('attributes');
      expect(attributeCallArgs[1]).toEqual({
        fields: ':all,optionSet[:all,options[:all]]',
        paging: false
      });
      done();
    }).catch(done);
  });
  describe('creation of ModelDefinitions', function () {
    it('should add the model definitions object to the d2 object', function (done) {
      d2.init(undefined, apiMock).then(function (newD2) {
        expect(newD2.models).toBeDefined(); // expect(newD2.models.modelsMockList).to.equal(true);

        done();
      }).catch(done);
    });
    it('should add the ModelDefinitions to the models list', function (done) {
      d2.init(undefined, apiMock).then(function (newD2) {
        expect(newD2.models.dataElement).toBeDefined();
        done();
      }).catch(done);
    });
  });
  describe('currentUser', function () {
    it('should be available on the d2 object', function () {
      d2.init(undefined, apiMock);
      return d2.getInstance().then(function (newD2) {
        expect(newD2.currentUser).toBeDefined();
      });
    });
  });
  describe('with specific schema loading', function () {
    it('should have only loaded a single schema', function () {
      apiMock.get // First init round
      .mockReturnValueOnce(Promise.resolve(_fixtures.default.get('/api/schemas/user')));
      d2.init({
        schemas: ['user']
      }, apiMock);
      return d2.getInstance().then(function () {
        expect(apiMock.get).toHaveBeenCalledWith('schemas/user', {
          fields: 'apiEndpoint,name,displayName,authorities,singular,plural,shareable,metadata,klass,' + 'identifiableObject,translatable,' + 'properties[href,writable,collection,collectionName,name,propertyType,persisted,required,min,' + 'max,ordered,unique,constants,owner,itemPropertyType,translationKey,embeddedObject]'
        });
      });
    });
  });
  describe('DataStore', function () {
    it('should have a dataStore object on the instance', function () {
      return d2.init(undefined, apiMock).then(function (d2Instance) {
        expect(d2Instance.dataStore).toBeInstanceOf(_DataStore.default);
      });
    });
  });
  describe('getUserSettings', function () {
    it('should be a function', function () {
      expect(_typeof(d2.getUserSettings)).toBe('function');
    });
    it('should return an object with the uiLocale', function () {
      apiMock.get = jest.fn().mockReturnValueOnce(Promise.resolve(_fixtures.default.get('/api/userSettings')));
      return d2.getUserSettings(apiMock).then(function (settings) {
        expect(settings.keyUiLocale).toBe('fr');
      });
    });
    it('should call the api for keyUiLocale', function () {
      d2.getUserSettings(apiMock);
      expect(apiMock.get).toBeCalled();
    });
    it('should use the default base url when the set baseUrl is not valid', function (done) {
      d2.config.baseUrl = undefined;
      d2.getUserSettings(apiMock).then(function () {
        expect(apiMock.setBaseUrl).not.toBeCalled();
        expect(apiMock.get).toHaveBeenCalledWith('userSettings');
        done();
      }).catch(done);
    });
  });
  describe('getManifest', function () {
    it('should be a function', function () {
      expect(_typeof(d2.getManifest)).toBe('function');
    });
    it('should return a promise', function () {
      expect(d2.getManifest('manifest.webapp', apiMock)).toBeInstanceOf(Promise);
    });
    it('should request the manifest.webapp', function (done) {
      apiMock.get.mockReturnValueOnce(Promise.resolve({}));
      d2.getManifest('manifest.webapp', apiMock).then(function () {
        expect(apiMock.get).toHaveBeenCalledWith('manifest.webapp');
        done();
      }).catch(done);
    });
    it('should return the manifest.webapp object', function (done) {
      var expectedManifest = {
        name: 'MyApp'
      };
      apiMock.get = jest.fn().mockReturnValueOnce(Promise.resolve(expectedManifest));
      d2.getManifest('manifest.webapp', apiMock).then(function (manifest) {
        expect(manifest.name).toBe(expectedManifest.name);
        done();
      }).catch(done);
    });
    it('should add the getBaseUrl convenience method', function (done) {
      var expectedManifest = {
        name: 'MyApp',
        activities: {
          dhis: {
            href: 'http://localhost:8080'
          }
        }
      };
      apiMock.get = jest.fn().mockReturnValueOnce(Promise.resolve(expectedManifest));
      d2.getManifest('manifest.webapp', apiMock).then(function (manifest) {
        expect(manifest.getBaseUrl()).toBe('http://localhost:8080');
        done();
      }).catch(done);
    });
  });
});
//# sourceMappingURL=d2_spec.js.map
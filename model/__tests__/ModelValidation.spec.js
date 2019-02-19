"use strict";

var _Logger = _interopRequireDefault(require("../../logger/Logger"));

var _Api = _interopRequireDefault(require("../../api/Api"));

var _ModelValidation = _interopRequireDefault(require("../ModelValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jest.mock('../../logger/Logger', function () {
  return (
    /*#__PURE__*/
    function () {
      function Logger() {
        _classCallCheck(this, Logger);
      }

      _createClass(Logger, null, [{
        key: "getLogger",
        value: function getLogger() {
          return new Logger();
        }
      }]);

      return Logger;
    }()
  );
});
jest.mock('../../api/Api');
jest.mock('../helpers/json', function () {
  return {
    getOwnedPropertyJSON: function getOwnedPropertyJSON() {
      return {
        id: 'R4dd3wwdwdw',
        name: 'ANC'
      };
    }
  };
});
describe('ModelValidations', function () {
  var mockApi;
  var modelValidation;
  beforeEach(function () {
    mockApi = _Api.default.getApi();
    modelValidation = new _ModelValidation.default(new _Logger.default({}));
  });
  afterEach(function () {
    _Api.default.mockReset();
  });
  it('should create a ModelValidation object', function () {
    expect(modelValidation).toBeInstanceOf(_ModelValidation.default);
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _ModelValidation.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  describe('getModelValidation', function () {
    it('should return a ModelValidation object', function () {
      expect(_ModelValidation.default.getModelValidation()).toBeInstanceOf(_ModelValidation.default);
    });
    it('should create a singleton and return that', function () {
      expect(_ModelValidation.default.getModelValidation()).toBe(_ModelValidation.default.getModelValidation());
    });
  });
  describe('validateAgainstSchema', function () {
    var modelMock;
    beforeEach(function () {
      modelMock = {
        modelDefinition: {
          name: 'dataElement',
          getOwnedPropertyJSON: jest.fn().mockReturnValueOnce({
            id: 'R4dd3wwdwdw',
            name: 'ANC'
          }),
          getOwnedPropertyNames: jest.fn().mockReturnValueOnce(['id', 'name']),
          modelValidations: {
            id: {},
            name: {}
          }
        },
        dataValues: {
          id: 'R4dd3wwdwdw',
          name: 'ANC'
        },
        getCollectionChildrenPropertyNames: jest.fn().mockReturnValueOnce([]),
        getReferenceProperties: jest.fn().mockReturnValueOnce([])
      };
    });
    it('should be a function', function () {
      expect(modelValidation.validateAgainstSchema).toBeInstanceOf(Function);
    });
    it('should return a promise', function () {
      mockApi.post.mockReturnValueOnce(Promise.resolve({}));
      expect(modelValidation.validateAgainstSchema(modelMock)).toBeInstanceOf(Promise);
    });
    it('should return a rejected promise if the model.modelDefinition.name is not present', function () {
      modelValidation.validateAgainstSchema().catch(function (message) {
        expect(message).toBe('model.modelDefinition.name can not be found');
      });
    });
    it('should call the post method on the Api', function () {
      mockApi.post.mockReturnValueOnce(Promise.resolve({
        httpStatus: 'OK',
        httpStatusCode: 200,
        status: 'OK',
        response: {
          responseType: 'ValidationViolations'
        }
      }));
      return modelValidation.validateAgainstSchema(modelMock).then(function () {
        expect(mockApi.post).toBeCalled();
      });
    });
    it('should call the post method on the api with the modeldata', function () {
      mockApi.post.mockReturnValueOnce(Promise.resolve({
        httpStatus: 'OK',
        httpStatusCode: 200,
        status: 'OK',
        response: {
          responseType: 'ValidationViolations'
        }
      }));
      return modelValidation.validateAgainstSchema(modelMock).then(function () {
        expect(mockApi.post).toBeCalledWith('schemas/dataElement', {
          id: 'R4dd3wwdwdw',
          name: 'ANC'
        });
      });
    });
    it('should return the validationViolations array from the webmessage', function () {
      var schemaValidationResult = {
        httpStatus: 'Bad Request',
        httpStatusCode: 400,
        status: 'ERROR',
        response: {
          responseType: 'ErrorReports',
          errorReports: [{
            message: 'Missing required property `domainType`.',
            mainKlass: 'org.hisp.dhis.dataelement.DataElement',
            errorKlass: 'org.hisp.dhis.dataelement.DataElementDomain',
            errorCode: 'E4000'
          }, {
            message: 'Missing required property `categoryCombo`.',
            mainKlass: 'org.hisp.dhis.dataelement.DataElement',
            errorKlass: 'org.hisp.dhis.dataelement.DataElementCategoryCombo',
            errorCode: 'E4000'
          }, {
            message: 'Missing required property `name`.',
            mainKlass: 'org.hisp.dhis.dataelement.DataElement',
            errorKlass: 'java.lang.String',
            errorCode: 'E4000'
          }, {
            message: 'Missing required property `shortName`.',
            mainKlass: 'org.hisp.dhis.dataelement.DataElement',
            errorKlass: 'java.lang.String',
            errorCode: 'E4000'
          }]
        }
      };
      mockApi.post.mockReturnValueOnce(Promise.reject(schemaValidationResult));
      return modelValidation.validateAgainstSchema(modelMock).then(function (validationMessages) {
        expect(validationMessages).toBe(schemaValidationResult.response.errorReports);
      });
    });
    it('should return the errorReports array from the webmessage', function () {
      var schemaValidationResult = {
        httpStatus: 'Bad Request',
        httpStatusCode: 400,
        status: 'ERROR',
        response: {
          errorReports: [{
            message: 'Required property missing.',
            property: 'name'
          }]
        }
      };
      mockApi.post.mockReturnValueOnce(Promise.reject(schemaValidationResult));
      return modelValidation.validateAgainstSchema(modelMock).then(function (validationMessages) {
        expect(validationMessages).toEqual([{
          message: 'Required property missing.',
          property: 'name'
        }]);
      });
    });
    it('should return an empty array when the validation passed', function (done) {
      mockApi.post.mockReturnValueOnce(Promise.resolve({
        httpStatus: 'OK',
        httpStatusCode: 200,
        status: 'OK',
        response: {
          responseType: 'ValidationViolations'
        }
      }));
      modelValidation.validateAgainstSchema(modelMock).then(function (validationMessages) {
        expect(validationMessages).toEqual([]);
        done();
      }).catch(done);
    });
    it('should throw an error when the server does not return the correct WebMessage format', function () {
      var schemaValidationResult = {
        httpStatus: 'Bad Request',
        httpStatusCode: 400,
        status: 'ERROR',
        response: {}
      };
      mockApi.post.mockReturnValueOnce(Promise.reject(schemaValidationResult));
      return modelValidation.validateAgainstSchema(modelMock).catch(function (errorMessage) {
        expect(errorMessage.message).toBe('Response was not a WebMessage with the expected format');
      });
    });
    it('should reject the promise if the server gives a successful status code ' + 'but the web message status is not the `OK` string', function () {
      mockApi.post.mockReturnValueOnce(Promise.resolve({
        data: 'someData'
      }));
      return modelValidation.validateAgainstSchema(modelMock).catch(function (errorMessage) {
        expect(errorMessage.message).toBe('Response was not a WebMessage with the expected format');
      });
    });
  });
});
//# sourceMappingURL=ModelValidation.spec.js.map
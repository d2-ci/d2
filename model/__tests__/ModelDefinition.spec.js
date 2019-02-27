"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _ModelBase = require("../ModelBase");

var _Model = _interopRequireDefault(require("../Model"));

var _ModelDefinitions = _interopRequireDefault(require("../ModelDefinitions"));

var _ModelCollectionProperty = _interopRequireDefault(require("../ModelCollectionProperty"));

var _ModelCollection = _interopRequireDefault(require("../ModelCollection"));

var _ModelDefinition = _interopRequireDefault(require("../ModelDefinition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

jest.mock('../ModelCollection');
jest.mock('../ModelCollectionProperty');
jest.mock('../Model');
describe('ModelDefinition', function () {
  var modelDefinition;
  var mockModelCollectionCreate;
  var mockModelCollectionPropertyCreate;
  beforeEach(function () {
    modelDefinition = new _ModelDefinition.default({
      displayName: 'Data Elements',
      singular: 'dataElement',
      plural: 'dataElements'
    });
    mockModelCollectionCreate = jest.fn(_ModelCollection.default, 'create');
    mockModelCollectionCreate.mockReturnValue(new _ModelCollection.default(modelDefinition, [], {}));
    mockModelCollectionPropertyCreate = jest.fn(_ModelCollectionProperty.default, 'create');
    mockModelCollectionPropertyCreate.mockReturnValue(new _ModelCollectionProperty.default({}, modelDefinition, 'propName', [], undefined));
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _ModelDefinition.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should create a ModelDefinition object', function () {
    expect(modelDefinition).toBeInstanceOf(_ModelDefinition.default);
  });
  it('should not add epiEndpoint when it does not exist', function () {
    expect(modelDefinition.apiEndpoint).toBeUndefined();
  });
  it('should throw an error when a name is not specified', function () {
    function shouldThrow() {
      return new _ModelDefinition.default();
    }

    expect(shouldThrow).toThrowError('Value should be provided');
  });
  it('should throw an error when plural is not specified', function () {
    function shouldThrow() {
      return new _ModelDefinition.default({
        displayName: 'Data Elements',
        singular: 'dataElement'
      });
    }

    expect(shouldThrow).toThrowError('Plural should be provided');
  });
  describe('instance', function () {
    it('should not be able to change the name', function () {
      var isWritable = Object.getOwnPropertyDescriptor(modelDefinition, 'name').writable;
      var isConfigurable = Object.getOwnPropertyDescriptor(modelDefinition, 'name').configurable;
      expect(isWritable).toBe(false);
      expect(isConfigurable).toBe(false);
    });
    it('should not change the name', function () {
      function shouldThrow() {
        modelDefinition.name = 'anotherName';

        if (modelDefinition.name !== 'anotherName') {
          throw new Error('');
        }
      }

      expect(shouldThrow).toThrowError();
      expect(modelDefinition.name).toBe('dataElement');
    });
    it('should have the correct displayName', function () {
      expect(modelDefinition.displayName).toBe('Data Elements');
    });
    it('should not change the displayName', function () {
      function shouldThrow() {
        modelDefinition.displayName = 'Another Name';
      }

      expect(shouldThrow).toThrowError();
      expect(modelDefinition.displayName).toBe('Data Elements');
    });
    it('should not be able to change the isMetaData', function () {
      var isWritable = Object.getOwnPropertyDescriptor(modelDefinition, 'isMetaData').writable;
      var isConfigurable = Object.getOwnPropertyDescriptor(modelDefinition, 'isMetaData').configurable;
      expect(isWritable).toBe(false);
      expect(isConfigurable).toBe(false);
    });
    it('should not change the isMetaData', function () {
      function shouldThrow() {
        modelDefinition.isMetaData = true;

        if (modelDefinition.isMetaData !== true) {
          throw new Error('');
        }
      }

      expect(modelDefinition.isMetaData).toBe(false);
      expect(shouldThrow).toThrowError();
    });
  });
  describe('createFromSchema', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'), _fixtures.default.get('/api/attributes').attributes);
    });
    it('should be a method on ModelDefinition', function () {
      expect(_ModelDefinition.default.createFromSchema).toBeDefined();
    });
    it('should throw if the schema is not provided', function () {
      expect(_ModelDefinition.default.createFromSchema).toThrowError('Schema should be provided');
    });
    describe('dataElementSchema', function () {
      it('should return a ModelDefinition object', function () {
        expect(dataElementModelDefinition).toBeInstanceOf(_ModelDefinition.default);
      });
      it('should set the name on the definition', function () {
        expect(dataElementModelDefinition.name).toBe('dataElement');
      });
      it('should set if it is a metadata model', function () {
        expect(dataElementModelDefinition.isMetaData).toBe(true);
      });
      it('should set the epiEndpoint', function () {
        expect(dataElementModelDefinition.apiEndpoint).toBe('https://play.dhis2.org/demo/api/dataElements');
      });
      it('should set metadata to false if it is not a metadata model', function () {
        var nonMetaDataModel = _fixtures.default.get('/api/schemas/dataElement');

        nonMetaDataModel.metadata = false;
        dataElementModelDefinition = _ModelDefinition.default.createFromSchema(nonMetaDataModel);
        expect(dataElementModelDefinition.isMetaData).toBe(false);
      });
      it('should a properties property for each of the schema properties', function () {
        expect(Object.keys(dataElementModelDefinition.modelProperties).length).toBe(37);
      });
      it('should not be able to modify the modelProperties array', function () {
        function shouldThrow() {
          dataElementModelDefinition.modelProperties.anotherKey = {}; // TODO: There is an implementation bug in PhantomJS that does not properly freeze the array

          if (Object.keys(dataElementModelDefinition.modelProperties).length === 37) {
            throw new Error();
          }
        }

        expect(shouldThrow).toThrowError();
        expect(Object.keys(dataElementModelDefinition.modelProperties).length).toBe(37);
      });
      it('should store property constants', function () {
        dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
        expect(dataElementModelDefinition.modelProperties.aggregationType.constants).toEqual(['SUM', 'AVERAGE', 'AVERAGE_SUM_ORG_UNIT', 'COUNT', 'STDDEV', 'VARIANCE', 'MIN', 'MAX', 'NONE', 'CUSTOM', 'DEFAULT', 'AVERAGE_SUM_INT', 'AVERAGE_SUM_INT_DISAGGREGATION', 'AVERAGE_INT', 'AVERAGE_INT_DISAGGREGATION', 'AVERAGE_BOOL']);
      });
    });
    describe('modelProperties', function () {
      var modelProperties;
      beforeEach(function () {
        modelProperties = dataElementModelDefinition.modelProperties;
      });
      it('should be an object', function () {
        expect(modelProperties.name).toBeInstanceOf(Object);
      });
      it('should throw an error when a type is not found', function () {
        var schema = _fixtures.default.get('/api/schemas/dataElement');

        function shouldThrow() {
          _ModelDefinition.default.createFromSchema(schema);
        }

        schema.properties.push({
          name: 'unknownProperty',
          propertyType: 'uio.some.unknown.type'
        });
        expect(shouldThrow).toThrowError('Type from schema "uio.some.unknown.type" not found available type list.');
      });
      it('should not add properties that do not have a name', function () {
        var schema = _fixtures.default.get('/api/schemas/dataElement');

        var expectedProperties = ['aggregationLevels', 'zeroIsSignificant', 'displayDescription', 'optionSet', 'id', 'created', 'description', 'displayFormName', 'commentOptionSet', 'name', 'externalAccess', 'valueType', 'href', 'dataElementGroups', 'publicAccess', 'aggregationType', 'formName', 'lastUpdated', 'dataSetElements', 'code', 'access', 'url', 'domainType', 'legendSet', 'legendSets', 'categoryCombo', 'attributeValues', 'optionSetValue', 'userGroupAccesses', 'userAccesses', 'shortName', 'displayName', 'displayShortName', 'user', 'translations', 'dimensionItem', 'dimensionItemType'];
        schema.properties.push({
          propertyType: 'TEXT'
        });

        var definition = _ModelDefinition.default.createFromSchema(schema);

        expect(Object.keys(definition.modelProperties).sort()).toEqual(expectedProperties.sort());
      });
      it('should use the collection name for collections', function () {
        expect(modelProperties.dataElementGroups).toBeDefined();
        expect(modelProperties.dataElementGroup).toBeUndefined();
      });
      it('should add a get method to the propertyDescriptor', function () {
        expect(modelProperties.name.get).toBeInstanceOf(Function);
      });
      it('should add a set method to the propertyDescriptor for name', function () {
        expect(modelProperties.name.set).toBeInstanceOf(Function);
      });
      it('should not have a set method for dimensionItem', function () {
        expect(modelProperties.dimensionItem.set).not.toBeInstanceOf(Function);
      });
      it('should create getter function on the propertyDescriptor', function () {
        var model = {
          dataValues: {
            name: 'Mark'
          }
        };
        expect(modelProperties.name.get.call(model)).toBe('Mark');
      });
      it('should create setter function on the propertyDescriptor', function () {
        var model = {
          dataValues: {}
        };
        model[_ModelBase.DIRTY_PROPERTY_LIST] = new Set([]);
        modelProperties.name.set.call(model, 'James');
        expect(model.dataValues.name).toBe('James');
      });
      describe('setter', function () {
        var model;
        beforeEach(function () {
          model = {
            dirty: false,
            dataValues: {}
          };
          model[_ModelBase.DIRTY_PROPERTY_LIST] = new Set([]);
        });
        it('should set the dirty property to true when a value is set', function () {
          modelProperties.name.set.call(model, 'James');
          expect(model.dirty).toBe(true);
        });
        it('should not set the dirty property to true when the value is the same', function () {
          model.dataValues.name = 'James';
          modelProperties.name.set.call(model, 'James');
          expect(model.dirty).toBe(false);
        });
        it('should set the dirty property when a different object is added', function () {
          model.dataValues.name = {
            name: 'James'
          };
          modelProperties.name.set.call(model, {
            name: 'James',
            last: 'Doe'
          });
          expect(model.dirty).toBe(true);
        });
      });
    });
    describe('modelValidations', function () {
      var modelValidations;
      beforeEach(function () {
        modelValidations = dataElementModelDefinition.modelValidations;
      });
      describe('created', function () {
        it('should set the data object as a type for date fields', function () {
          expect(modelValidations.created.type).toBe('DATE');
        });
        it('should be owned by this schema', function () {
          expect(modelValidations.created.owner).toBe(true);
        });
      });
      describe('externalAccess', function () {
        it('should set the boolean datatype for externalAccess', function () {
          expect(modelValidations.externalAccess.type).toBe('BOOLEAN');
        });
        it('should not be owned by this schema', function () {
          expect(modelValidations.externalAccess.owner).toBe(false);
        });
      });
      describe('id', function () {
        it('should have a maxLength', function () {
          expect(modelValidations.id.max).toBe(11);
        });
      });
      describe('name', function () {
        it('should have have a type property', function () {
          expect(modelValidations.name.type).toBe('TEXT');
        });
        it('should have a persisted property', function () {
          expect(modelValidations.name.persisted).toBe(true);
        });
        it('should have a required property', function () {
          expect(modelValidations.name.required).toBe(true);
        });
        it('should have an owner property', function () {
          expect(modelValidations.name.owner).toBe(true);
        });
      });
      it('should add the referenceType to the optionSet and commentOptionSet', function () {
        expect(modelValidations.commentOptionSet.referenceType).toBe('optionSet');
        expect(modelValidations.optionSet.referenceType).toBe('optionSet');
      });
      it('should add the referenceType to the categoryCombo property', function () {
        expect(modelValidations.categoryCombo.referenceType).toBe('categoryCombo');
      });
      it('should add the referenceType to the user property', function () {
        expect(modelValidations.user.referenceType).toBe('user');
      });
      it('should not add a referenceType for a property that are not a reference', function () {
        expect(modelValidations.name.referenceType).toBeUndefined();
      });
      describe('ordered', function () {
        it('should set ordered to false when the property is not available', function () {
          expect(modelValidations.name.ordered).toBe(false);
        });
        it('should set ordered to false when the ordered property is available and is false', function () {
          var dataElementSchemaFixture = _fixtures.default.get('/api/schemas/dataElement');

          dataElementSchemaFixture.properties[0].ordered = false;
          dataElementModelDefinition = _ModelDefinition.default.createFromSchema(dataElementSchemaFixture, _fixtures.default.get('/api/attributes').attributes);
          modelValidations = dataElementModelDefinition.modelValidations;
          expect(modelValidations.aggregationType.ordered).toBe(false);
        });
        it('should set ordered to true when the ordered property is available and is true', function () {
          var dataElementSchemaFixture = _fixtures.default.get('/api/schemas/dataElement');

          dataElementSchemaFixture.properties[0].ordered = true;
          dataElementModelDefinition = _ModelDefinition.default.createFromSchema(dataElementSchemaFixture, _fixtures.default.get('/api/attributes').attributes);
          modelValidations = dataElementModelDefinition.modelValidations;
          expect(modelValidations.aggregationLevels.ordered).toBe(true);
        });
      });
      describe('collection reference', function () {
        var indicatorGroupModelDefinition;
        beforeEach(function () {
          var indicatorGroupSchema = _fixtures.default.get('/api/schemas/indicatorGroup');

          indicatorGroupModelDefinition = _ModelDefinition.default.createFromSchema(indicatorGroupSchema);
          modelValidations = indicatorGroupModelDefinition.modelValidations;
        });
        it('should add a reference type for a collection of references', function () {
          expect(modelValidations.indicators.referenceType).toBe('indicator');
        });
        it('should not add a reference type for a collection of complex objects', function () {
          expect(modelValidations.userGroupAccesses.referenceType).toBeUndefined();
        });
      });
      describe('embedded object property', function () {
        var indicatorGroupModelDefinition;
        beforeEach(function () {
          var legendSetSchema = _fixtures.default.get('/api/schemas/legendSet');

          indicatorGroupModelDefinition = _ModelDefinition.default.createFromSchema(legendSetSchema);
          modelValidations = indicatorGroupModelDefinition.modelValidations;
        });
        it('should have set the embedded property validation for userGroupAcceses to true', function () {
          expect(modelValidations.userGroupAccesses.embeddedObject).toBe(true);
        });
        it('should have set the embedded property validation for attributeValues to false', function () {
          expect(modelValidations.attributeValues.embeddedObject).toBe(false);
        });
        it('should set the embedded object to false for simple types', function () {
          expect(modelValidations.name.embeddedObject).toBe(false);
        });
      });
    });
    describe('specialized definitions', function () {
      var UserModelDefinition;
      var userModelDefinition;
      var DataSetModelDefinition;
      var dataSetModelDefinition;
      beforeEach(function () {
        UserModelDefinition = _ModelDefinition.default.specialClasses.user;
        userModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/user'));
        DataSetModelDefinition = _ModelDefinition.default.specialClasses.dataSet;
        dataSetModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataSet'));
      });
      it('should return a UserModelDefinition for the user schema', function () {
        expect(userModelDefinition).toBeInstanceOf(UserModelDefinition);
      });
      it('should return a DataSetModelDefinition for the data set schema', function () {
        expect(dataSetModelDefinition).toBeInstanceOf(DataSetModelDefinition);
      });
    });
    describe('attribute properties', function () {
      var attributeProperties;
      beforeEach(function () {
        attributeProperties = dataElementModelDefinition.attributeProperties;
      });
      it('should have added the attribute properties onto the model', function () {
        expect(attributeProperties).toBeDefined();
      });
      it('should be descriptor objects', function () {
        expect(attributeProperties.name).toBeInstanceOf(Object);
      });
    });
  });
  describe('create()', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    }); // TODO: This is currently not a pure unit test as we haven't mocked out Model

    it('should return an instance of Model', function () {
      expect(dataElementModelDefinition.create()).toBeInstanceOf(_Model.default);
    });
    describe('with default values', function () {
      var orgUnitGroupSchema = _fixtures.default.get('/api/schemas/organisationUnitGroupSet');

      var organisationUnitGroupSetModelDefinition = _ModelDefinition.default.createFromSchema(orgUnitGroupSchema);

      var model;
      beforeEach(function () {
        model = organisationUnitGroupSetModelDefinition.create();
      });
      it('should set the default data dimension', function () {
        expect(model.dataDimension).toBe(true);
      });
    });
    describe('collection properties', function () {
      var orgunitModelDefinition;
      var userModelDefinition;
      beforeEach(function () {
        var orgUnitSchema = _fixtures.default.get('/api/schemas/organisationUnit');

        userModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/user'));
        orgunitModelDefinition = _ModelDefinition.default.createFromSchema(orgUnitSchema); // TODO: Mock the ModelDefinitions singleton, so we can get rid of this logic

        if (!_ModelDefinitions.default.getModelDefinitions().user) {
          _ModelDefinitions.default.getModelDefinitions().add(userModelDefinition);
        }

        if (!_ModelDefinitions.default.getModelDefinitions().organisationUnit) {
          _ModelDefinitions.default.getModelDefinitions().add(orgunitModelDefinition);
        }
      });
      afterEach(function () {
        _ModelCollectionProperty.default.create.mockClear();
      });
      describe('with data', function () {
        beforeEach(function () {
          userModelDefinition.create({
            organisationUnits: [{
              name: 'Kenya',
              id: 'FTRrcoaog83'
            }, {
              name: 'Oslo',
              id: 'P3jJH5Tu5VC'
            }]
          });
        });
        it('should create a ModelCollectionProperty.create for a collection of objects', function () {
          expect(_ModelCollectionProperty.default.create).toHaveBeenCalledTimes(9);
        });
        it('should create a ModelCollectionProperty with the correct values', function () {
          expect(_ModelCollectionProperty.default.create.mock.calls[0]).toMatchSnapshot();
        });
      });
      describe('without data', function () {
        beforeEach(function () {
          userModelDefinition.create();
        });
        it('should create a ModelCollectionProperty.create for a collection of objects', function () {
          expect(_ModelCollectionProperty.default.create).toHaveBeenCalledTimes(3);
        });
        it('should create a ModelCollectionProperty without data', function () {
          var passedModelInstance = _ModelCollectionProperty.default.create.mock.calls[0][0];
          var modelDefinitionForCollection = _ModelCollectionProperty.default.create.mock.calls[0][1];
          var modelCollectionPropName = _ModelCollectionProperty.default.create.mock.calls[0][2];
          var modelCollectionData = _ModelCollectionProperty.default.create.mock.calls[0][3]; // First argument to ModelCollectionPrototype.create

          expect(passedModelInstance).toMatchSnapshot(); // Second argument to ModelCollectionProperty.create

          expect(modelDefinitionForCollection.name).toBe(orgunitModelDefinition.name);
          expect(modelDefinitionForCollection.plural).toBe(orgunitModelDefinition.plural); // Third argument to ModelCollectionProperty.create
          // teiSearchOrganisationUnits is the first collection property on the user model

          expect(modelCollectionPropName).toEqual('teiSearchOrganisationUnits'); // Fourth argument to ModelCollectionProperty.create

          expect(modelCollectionData).toEqual(undefined);
        });
      });
    });
  });
  describe('get', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      _ModelDefinition.default.prototype.api = {
        get: jest.fn().mockReturnValue(new Promise(function (resolve) {
          resolve({
            name: 'BS_COLL (N, DSD) TARGET: Blood Units Donated'
          });
        }))
      };
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    });
    it('should throw an error when the given id is not a string', function () {
      function shouldThrow() {
        dataElementModelDefinition.get();
      }

      expect(shouldThrow).toThrowError('Identifier should be provided');
    });
    it('should return a promise', function () {
      var modelPromise = dataElementModelDefinition.get('d4343fsss');
      expect(modelPromise.then).toBeInstanceOf(Function);
    });
    it('should call the api for the requested id', function () {
      dataElementModelDefinition.get('d4343fsss');
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements/d4343fsss', {
        fields: ':all,attributeValues[:all,attribute[id,name,displayName]]'
      });
    });
    it('should set the data onto the model when it is available', function () {
      return dataElementModelDefinition.get('d4343fsss').then(function (dataElementModel) {
        expect(dataElementModel.name).toBe('BS_COLL (N, DSD) TARGET: Blood Units Donated');
      });
    });
    it('should reject the promise with the message when the request fails', function () {
      _ModelDefinition.default.prototype.api.get = jest.fn().mockReturnValue(Promise.reject({
        httpStatus: 'Not Found',
        httpStatusCode: 404,
        status: 'ERROR',
        message: 'DataElementCategory with id sdfsf could not be found.'
      }));
      return dataElementModelDefinition.get('d4343fsss').catch(function (dataElementError) {
        expect(dataElementError).toBe('DataElementCategory with id sdfsf could not be found.');
      });
    });
    it('should reject with the promise payload when no message was returned', function () {
      var responsePayload = '500 error string';
      _ModelDefinition.default.prototype.api.get = jest.fn().mockReturnValue(Promise.reject(responsePayload));
      return dataElementModelDefinition.get('d4343fsss').catch(function (dataElementError) {
        expect(dataElementError).toBe(responsePayload);
      });
    });
    describe('multiple', function () {
      it('should return a ModelCollection object', function () {
        var dataElementsResult = _fixtures.default.get('/api/dataElements');

        _ModelDefinition.default.prototype.api.get = jest.fn().mockReturnValue(Promise.resolve(dataElementsResult));
        return dataElementModelDefinition.get(['id1', 'id2']).then(function (dataElementCollection) {
          expect(dataElementCollection).toBeInstanceOf(_ModelCollection.default);
        });
      });
      it('should call the api with the in filter', function () {
        var dataElementsResult = _fixtures.default.get('/api/dataElements');

        _ModelDefinition.default.prototype.api.get = jest.fn().mockReturnValue(Promise.resolve(dataElementsResult));
        return dataElementModelDefinition.get(['id1', 'id2']).then(function () {
          expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
            filter: ['id:in:[id1,id2]'],
            fields: ':all'
          });
        });
      });
    });
  });
  describe('list', function () {
    var dataElementsResult = _fixtures.default.get('/api/dataElements');

    var dataElementModelDefinition;
    beforeEach(function () {
      _ModelDefinition.default.prototype.api = {
        get: jest.fn().mockReturnValue(new Promise(function (resolve) {
          resolve(dataElementsResult);
        }))
      };
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    });
    it('should be a function', function () {
      expect(dataElementModelDefinition.list).toBeInstanceOf(Function);
    });
    it('should call the get method on the api', function () {
      dataElementModelDefinition.list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalled();
    });
    it('should return a promise', function () {
      expect(dataElementModelDefinition.list()).toBeInstanceOf(Promise);
    });
    it('should call the get method on the api with the endpoint of the model', function () {
      dataElementModelDefinition.list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all'
      });
    });
    it('should return a model collection object', function () {
      return dataElementModelDefinition.list().then(function (dataElementCollection) {
        expect(dataElementCollection).toBeInstanceOf(_ModelCollection.default);
      });
    });
    it('should call the model collection constructor with the correct data', function () {
      return dataElementModelDefinition.list().then(function () {
        var firstCallArguments = _ModelCollection.default.create.mock.calls[0];
        expect(firstCallArguments).toMatchSnapshot();
      });
    });
    it('should call the api get method with the correct parameters after filters are set', function () {
      dataElementModelDefinition.filter().on('name').like('John').list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John']
      });
    });
    it('should return a separate modelDefinition when filter is called', function () {
      expect(dataElementModelDefinition.filter).not.toBe(dataElementModelDefinition);
    });
    it('should not influence the list method of the default modelDefinition', function () {
      dataElementModelDefinition.filter().on('name').like('John').list();
      dataElementModelDefinition.list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all'
      });
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John']
      });
    });
    it('should support multiple filters', function () {
      dataElementModelDefinition.filter().on('name').like('John').filter().on('username').equals('admin').list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John', 'username:eq:admin']
      });
    });
    it('should work with operator-filter', function () {
      dataElementModelDefinition.filter().on('name').operator('like', 'John').list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John']
      });
    });
    it('should work with chained operator-filter', function () {
      dataElementModelDefinition.filter().on('name').operator('like', 'John').filter().on('username').operator('token', 'admin').list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John', 'username:token:admin']
      });
    });
    it('should work with rootJunction', function () {
      dataElementModelDefinition.filter().logicMode('OR').on('name').like('John').filter().logicMode('OR').on('username').token('admin').list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John', 'username:token:admin'],
        rootJunction: 'OR'
      });
    });
    it('should not try to filter by "undefined"', function () {
      dataElementModelDefinition.list({
        filter: undefined
      });
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all'
      });
    });
    it('should work by constructing filters before calling list', function () {
      var filters = dataElementModelDefinition.filter();
      filters.logicMode('OR');
      filters.on('name').like('John');
      filters.on('username').token('admin');
      filters.list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all',
        filter: ['name:like:John', 'username:token:admin'],
        rootJunction: 'OR'
      });
    });
  });
  describe('clone', function () {
    var dataElementsResult = _fixtures.default.get('/api/dataElements');

    var dataElementModelDefinition;
    beforeEach(function () {
      _ModelDefinition.default.prototype.api = {
        get: jest.fn().mockReturnValue(new Promise(function (resolve) {
          resolve(dataElementsResult);
        }))
      };
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    });
    it('should be a method', function () {
      expect(dataElementModelDefinition.clone).toBeInstanceOf(Function);
    });
    it('should return a cloned modelDefinition', function () {
      expect(dataElementModelDefinition.clone()).not.toBe(dataElementModelDefinition);
    });
    it('should deep equal the creator', function () {
      var clonedDefinition = dataElementModelDefinition.clone();
      expect(clonedDefinition.name).toBe(dataElementModelDefinition.name);
      expect(clonedDefinition.plural).toBe(dataElementModelDefinition.plural);
      expect(clonedDefinition.isMetaData).toBe(dataElementModelDefinition.isMetaData);
      expect(clonedDefinition.apiEndpoint).toBe(dataElementModelDefinition.apiEndpoint);
      expect(clonedDefinition.modelProperties).toBe(dataElementModelDefinition.modelProperties);
    });
    it('should not have reset the filter', function () {
      var clonedDefinition = dataElementModelDefinition.clone();
      expect(clonedDefinition.filters).not.toBe(dataElementModelDefinition.filters);
    });
    it('should still work like normal modelDefinition', function () {
      var clonedDefinition = dataElementModelDefinition.clone();
      clonedDefinition.list();
      expect(_ModelDefinition.default.prototype.api.get).toBeCalledWith('https://play.dhis2.org/demo/api/dataElements', {
        fields: ':all'
      });
    });
  });
  describe('saving', function () {
    var apiUpdateStub;
    var apiPostStub;
    var model;
    var userModelDefinition;
    beforeEach(function () {
      var singleUserAllFields = _fixtures.default.get('/singleUserAllFields');

      apiUpdateStub = jest.fn().mockReturnValue(new Promise(function (resolve) {
        resolve({
          name: 'BS_COLL (N, DSD) TARGET: Blood Units Donated'
        });
      }));
      apiPostStub = jest.fn().mockReturnValue(new Promise(function (resolve) {
        resolve({
          name: 'BS_COLL (N, DSD) TARGET: Blood Units Donated'
        });
      }));
      _ModelDefinition.default.prototype.api = {
        update: apiUpdateStub,
        post: apiPostStub
      };
      userModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/user'));

      var Model = // eslint-disable-line no-shadow
      function Model() {
        _classCallCheck(this, Model);

        this.dataValues = {};
        this[_ModelBase.DIRTY_PROPERTY_LIST] = new Set([]);
        this.getCollectionChildrenPropertyNames = jest.fn().mockReturnValue([]);
        this.getEmbeddedObjectCollectionPropertyNames = jest.fn().mockReturnValue([]);
        this.getReferenceProperties = jest.fn().mockReturnValue([]);
      };

      model = new Model();
      Object.keys(singleUserAllFields).forEach(function (key) {
        model.dataValues[key] = singleUserAllFields[key];
        model[key] = singleUserAllFields[key];
      });
      Object.defineProperty(model, 'modelDefinition', {
        value: userModelDefinition
      });
    });
    describe('save()', function () {
      it('should be a method that returns a promise', function () {
        expect(userModelDefinition.save(model)).toBeInstanceOf(Promise);
      });
      it('should call the update method on the api', function () {
        userModelDefinition.save(model);
        expect(apiUpdateStub).toBeCalled();
      });
      it('should pass only the properties that are owned to the api', function () {
        var expectedPayload = _fixtures.default.get('/singleUserOwnerFields');

        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][1]).toEqual(expectedPayload);
      });
      it('should let a falsy value pass as an owned property', function () {
        var expectedPayload = _fixtures.default.get('/singleUserOwnerFields');

        expectedPayload.surname = '';
        model.dataValues.surname = '';
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][1].surname).toEqual(expectedPayload.surname);
      });
      it('should not let undefined pass as a value', function () {
        var expectedPayload = _fixtures.default.get('/singleUserOwnerFields');

        delete expectedPayload.surname;
        model.dataValues.surname = undefined;
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][1].surname).toEqual(expectedPayload.surname);
      });
      it('should not let null pass as a value', function () {
        var expectedPayload = _fixtures.default.get('/singleUserOwnerFields');

        delete expectedPayload.surname;
        model.dataValues.surname = null;
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][1].surname).toEqual(expectedPayload.surname);
      });
      it('should save to the url set on the model', function () {
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][0]).toBe(_fixtures.default.get('/singleUserAllFields').href);
      });
      it('should be able to construct a valid save url without an href set on the model', function () {
        delete model.dataValues.href;
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][0]).toBe(_fixtures.default.get('/singleUserAllFields').href);
      });
      it('should call the update method on the api with the replace strategy option set to true', function () {
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][2]).toBe(true);
      });
      it('should save a new object using a post', function () {
        // Objects without id are concidered "new"
        delete model.id;
        userModelDefinition.save(model);
        expect(apiPostStub).toBeCalled();
      });
      it('should translate a collection property to an array of ids', function () {
        model.getCollectionChildrenPropertyNames.mockReturnValue(['organisationUnits']);
        model.dataValues.organisationUnits = new Set([{
          name: 'Kenya',
          id: 'FTRrcoaog83'
        }, {
          name: 'Oslo',
          id: 'P3jJH5Tu5VC'
        }]);
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][1].organisationUnits).toEqual([{
          id: 'FTRrcoaog83'
        }, {
          id: 'P3jJH5Tu5VC'
        }]);
      });
      it('should not add invalid objects that do not have an id', function () {
        model.getCollectionChildrenPropertyNames.mockReturnValue(['organisationUnits']);
        model.dataValues.organisationUnits = new Set([{
          name: 'Kenya'
        }, {
          name: 'Oslo',
          id: 'P3jJH5Tu5VC'
        }]);
        userModelDefinition.save(model);
        expect(apiUpdateStub.mock.calls[0][1].organisationUnits).toEqual([{
          id: 'P3jJH5Tu5VC'
        }]);
      });
    });
    describe('saveNew()', function () {
      it('should be a method that returns a promise', function () {
        expect(userModelDefinition.saveNew(model)).toBeInstanceOf(Promise);
      });
      it('should call the update method on the api', function () {
        userModelDefinition.saveNew(model);
        expect(apiPostStub).toBeCalled();
      });
      it('should pass only the properties that are owned to the api', function () {
        var expectedPayload = _fixtures.default.get('/singleUserOwnerFields');

        userModelDefinition.saveNew(model);
        expect(apiPostStub.mock.calls[0][1]).toEqual(expectedPayload);
      });
    });
  });
  describe('delete', function () {
    var apiDeleteStub;
    var model;
    var userModelDefinition;
    beforeEach(function () {
      var singleUserAllFields = _fixtures.default.get('/singleUserAllFields');

      apiDeleteStub = jest.fn().mockReturnValue(new Promise(function (resolve) {
        resolve();
      }));
      _ModelDefinition.default.prototype.api = {
        delete: apiDeleteStub
      };
      userModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/user'));

      var Model = // eslint-disable-line no-shadow
      function Model() {
        _classCallCheck(this, Model);

        this.dataValues = {};
        this.modelDefinition = userModelDefinition;
        this[_ModelBase.DIRTY_PROPERTY_LIST] = new Set([]);
      };

      model = new Model();
      Object.keys(singleUserAllFields).forEach(function (key) {
        model.dataValues[key] = singleUserAllFields[key];
        model[key] = singleUserAllFields[key];
      });
    });
    it('should call the delete method on the api', function () {
      userModelDefinition.delete(model);
      expect(apiDeleteStub).toBeCalled();
    });
    it('should call delete with the url', function () {
      userModelDefinition.delete(model);
      expect(apiDeleteStub).toBeCalledWith(model.href);
    });
    it('should return a promise', function () {
      expect(userModelDefinition.delete(model)).toBeInstanceOf(Promise);
    });
    it('should create the url from the endpoint and model.id when the href is not available', function () {
      model.dataValues.href = undefined;
      userModelDefinition.delete(model);
      expect(apiDeleteStub).toBeCalledWith('http://localhost:8080/dhis/api/users/aUplAx3DOWy');
    });
  });
  describe('getOwnedPropertyNames', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    });
    it('should return only the owned properties', function () {
      var expectedDataElementProperties = ['lastUpdated', 'code', 'id', 'created', 'name', 'formName', 'legendSets', 'shortName', 'zeroIsSignificant', 'publicAccess', 'commentOptionSet', 'aggregationType', 'valueType', 'url', 'optionSet', 'domainType', 'description', 'categoryCombo', 'user', 'aggregationLevels', 'attributeValues', 'userAccesses', 'userGroupAccesses', 'translations'].sort();
      var ownProperties = dataElementModelDefinition.getOwnedPropertyNames();
      expect(ownProperties.sort()).toEqual(expectedDataElementProperties);
    });
  });
  describe('isTranslatable', function () {
    var dataElementModelDefinition;
    var userModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
      userModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/user'));
    });
    it('should be a function', function () {
      expect(_typeof(dataElementModelDefinition.isTranslatable)).toBe('function');
    });
    it('should return true if the schema supports translations', function () {
      expect(dataElementModelDefinition.isTranslatable()).toBe(true);
    });
    it('should return false if the schema can not be translated', function () {
      expect(userModelDefinition.isTranslatable()).toBe(false);
    });
  });
  describe('getTranslatableProperties()', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    });
    it('should be a function', function () {
      expect(_typeof(dataElementModelDefinition.getTranslatableProperties)).toBe('function');
    });
    it('should return the translatable properties', function () {
      expect(dataElementModelDefinition.getTranslatableProperties()).toEqual(['description', 'formName', 'name', 'shortName']);
    });
    it('should return only the properties that have a translatableKey', function () {
      var dataElementSchema = _fixtures.default.get('/api/schemas/dataElement');

      dataElementSchema.properties = dataElementSchema.properties.map(function (_ref) {
        var translationKey = _ref.translationKey,
            props = _objectWithoutProperties(_ref, ["translationKey"]);

        return _objectSpread({}, props);
      });
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(dataElementSchema);
      expect(dataElementModelDefinition.getTranslatableProperties()).toEqual([]);
    });
  });
  describe('getTranslatablePropertiesWithKeys()', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    });
    it('should be a function', function () {
      expect(_typeof(dataElementModelDefinition.getTranslatablePropertiesWithKeys)).toBe('function');
    });
    it('should return the translatable properties with their keys', function () {
      expect(dataElementModelDefinition.getTranslatablePropertiesWithKeys()).toEqual([{
        name: 'description',
        translationKey: 'DESCRIPTION'
      }, {
        name: 'formName',
        translationKey: 'FORM_NAME'
      }, {
        name: 'name',
        translationKey: 'NAME'
      }, {
        name: 'shortName',
        translationKey: 'SHORT_NAME'
      }]);
    });
    it('should return only the properties that have a translatableKey', function () {
      var dataElementSchema = _fixtures.default.get('/api/schemas/dataElement');

      dataElementSchema.properties = dataElementSchema.properties.map(function (_ref2) {
        var translationKey = _ref2.translationKey,
            props = _objectWithoutProperties(_ref2, ["translationKey"]);

        return _objectSpread({}, props);
      });
      dataElementModelDefinition = _ModelDefinition.default.createFromSchema(dataElementSchema);
      expect(dataElementModelDefinition.getTranslatablePropertiesWithKeys()).toEqual([]);
    });
  });
});
describe('ModelDefinition subsclasses', function () {
  var getOnApiStub;
  beforeEach(function () {
    getOnApiStub = jest.fn().mockReturnValue(Promise.resolve());
    _ModelDefinition.default.prototype.api = {
      get: getOnApiStub
    };
  });
  describe('UserModelDefinition', function () {
    var UserModelDefinitionClass;
    var userModelDefinition;
    beforeEach(function () {
      UserModelDefinitionClass = _ModelDefinition.default.specialClasses.user;
      userModelDefinition = new UserModelDefinitionClass({
        singular: 'user',
        plural: 'users',
        displayName: 'Users'
      }, {}, {});
    });
    it('should be instance of Model', function () {
      expect(userModelDefinition).toBeInstanceOf(_ModelDefinition.default);
    });
    it('should call the get function with the extra parameters', function () {
      userModelDefinition.get('myUserId');
      expect(getOnApiStub).toBeCalledWith('/myUserId', {
        fields: ':all,userCredentials[:owner]'
      });
    });
  });
  describe('DataSetModelDefinition', function () {
    var DataSetModelDefinitionClass;
    var dataSetModelDefinition;
    beforeEach(function () {
      DataSetModelDefinitionClass = _ModelDefinition.default.specialClasses.dataSet;
      dataSetModelDefinition = new DataSetModelDefinitionClass(_fixtures.default.get('/api/schemas/dataSet'), {}, {}, {}, {});
    });
    it('handles compulsory data element operands correctly', function () {
      var dataSet = dataSetModelDefinition.create({
        compulsoryDataElementOperands: ['one', 'two', 'three']
      });
      expect(dataSet).toBeInstanceOf(_Model.default);
      expect(dataSet.dataValues.compulsoryDataElementOperands).toEqual(['one', 'two', 'three']);
    });
  });
  describe('OrganisationUnitDefinition', function () {
    var OrganisationUnitModelDefinitionClass;
    var organisationUnitModelDefinition;
    beforeEach(function () {
      OrganisationUnitModelDefinitionClass = _ModelDefinition.default.specialClasses.organisationUnit;
      organisationUnitModelDefinition = new OrganisationUnitModelDefinitionClass({
        singular: 'organisationUnit',
        plural: 'organisationUnits',
        apiEndpoint: 'organisationUnits'
      }, {}, {}, {}, {});
    });
    it('should use the special root orgunit id when fetching lists', function () {
      expect.assertions(1);
      return organisationUnitModelDefinition.list({
        root: 'myRootId'
      }).catch(function () {
        expect(getOnApiStub).toBeCalledWith('organisationUnits/myRootId', {
          fields: ':all'
        });
      });
    });
    it('should handle list queries without special `root` parameters', function () {
      expect.assertions(1);
      return organisationUnitModelDefinition.list().catch(function () {
        expect(getOnApiStub).toBeCalledWith('organisationUnits', {
          fields: ':all'
        });
      });
    });
  });
});
//# sourceMappingURL=ModelDefinition.spec.js.map
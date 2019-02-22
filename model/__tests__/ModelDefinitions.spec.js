"use strict";

var _ModelDefinitions = _interopRequireDefault(require("../ModelDefinitions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

describe('D2 models', function () {
  var models;

  var ModelDefinition = function ModelDefinition(name, plural) {
    _classCallCheck(this, ModelDefinition);

    this.name = name;
    this.plural = plural;
  };

  beforeEach(function () {
    models = new _ModelDefinitions.default();
  });
  it('should be an object', function () {
    expect(models).toBeInstanceOf(Object);
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _ModelDefinitions.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  describe('add method', function () {
    var dataElementModelDefinition;
    beforeEach(function () {
      dataElementModelDefinition = new ModelDefinition('dataElement');
    });
    it('should be a function', function () {
      expect(models.add).toBeInstanceOf(Function);
    });
    it('should add a property to the models object', function () {
      models.add(dataElementModelDefinition);
      expect(models.dataElement).toBeInstanceOf(ModelDefinition);
    });
    it('should throw an error when trying to add something that already exists', function () {
      function shouldThrow() {
        models.add(dataElementModelDefinition);
      }

      models.add(dataElementModelDefinition);
      expect(shouldThrow).toThrowError('Model dataElement already exists');
    });
    it('should reject a ModelDefinition that does not have a name property', function () {
      function shouldThrow() {
        models.add({
          apiEndPoint: '/dataElement'
        });
      }

      models.add(dataElementModelDefinition);
      expect(shouldThrow).toThrowError('Name should be set on the passed ModelDefinition to add one');
    });
    it('should add the plural version to the object', function () {
      var indicatorDefinition = new ModelDefinition('indicator', 'indicators');
      models.add(indicatorDefinition);
      expect(models.indicator).toBeInstanceOf(ModelDefinition);
      expect(models.indicator).toBe(models.indicators);
    });
  });
  describe('mapThroughDefinitions method', function () {
    beforeEach(function () {
      models.add({
        name: 'dataElement'
      });
      models.add({
        name: 'dataValue'
      });
      models.add({
        name: 'user'
      });
      models.add({
        name: 'userGroup'
      });
    });
    it('should should be a function', function () {
      expect(models.mapThroughDefinitions).toBeInstanceOf(Function);
    });
    it('should return an array of ModelDefinitions', function () {
      var expectedArray = [{
        name: 'dataElement'
      }, {
        name: 'dataValue'
      }, {
        name: 'user'
      }, {
        name: 'userGroup'
      }];

      function returnValue(item) {
        return item;
      }

      expect(models.mapThroughDefinitions(returnValue)).toEqual(expectedArray);
    });
    it('should throw if the transformer passed is not a function', function () {
      expect(function () {
        return models.mapThroughDefinitions('');
      }).toThrowError('Expected transformer to have type function');
      expect(function () {
        return models.mapThroughDefinitions({});
      }).toThrowError('Expected transformer to have type function');
    });
    it('should not map through properties that are the plural versions', function () {
      var iterator = jest.fn();
      models.add({
        name: 'indicator',
        plural: 'indicators'
      });
      models.mapThroughDefinitions(iterator);
      expect(iterator).toHaveBeenCalledTimes(5);
    });
  });
});
//# sourceMappingURL=ModelDefinitions.spec.js.map
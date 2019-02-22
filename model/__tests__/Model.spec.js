"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _Model = _interopRequireDefault(require("../Model"));

var _ModelDefinition = _interopRequireDefault(require("../ModelDefinition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

describe('Model', function () {
  var model;
  beforeEach(function () {
    model = new _Model.default({
      modelProperties: []
    });
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _Model.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should throw when modelDefinition is not defined', function () {
    function shouldThrow() {
      return new _Model.default();
    }

    expect(shouldThrow).toThrowError('modelDefinition should be provided');
  });
  it('should throw when modelDefinition.modelProperties is not provided', function () {
    function shouldThrow() {
      return new _Model.default({});
    }

    expect(shouldThrow).toThrowError('modelProperties should be provided');
  });
  it('should have a create method on the class', function () {
    expect(_typeof(_Model.default.create)).toBe('function');
  });
  it('should have a save method', function () {
    expect(_typeof(model.save)).toBe('function');
  });
  it('should have a validate method', function () {
    expect(_typeof(model.validate)).toBe('function');
  });
  it('should have a dirty property that is set to false', function () {
    expect(model.dirty).toBe(false);
  });
  it('should not show the dirty property in the enumerable properties', function () {
    var keys = Object.keys(model);
    expect(keys).not.toContain('dirty');
  });
  it('should add properties based on the modelDefinition', function () {
    // TODO: This fixture is outdated and we should update to a fixture with getters and setters.
    var dataElementModel = _Model.default.create(_fixtures.default.get('/modelDefinitions/dataElement'));

    expect(Object.keys(dataElementModel).length).toBe(34);
  });
  it('should keep a reference to its definition', function () {
    var modelDefinition = {
      modelProperties: []
    };

    var dataElementModel = _Model.default.create(modelDefinition);

    expect(dataElementModel.modelDefinition).toBe(modelDefinition);
  });
  it('should not show the modelDefinition property in the enumerable properties', function () {
    var keys = Object.keys(model);
    expect(keys).not.toContain('modelDefinition');
  });
  it.skip('should not allow the modelDefinition to be changed', function () {
    var modelDefinition = {
      modelProperties: []
    };

    var dataElementModel = _Model.default.create(modelDefinition);

    function shouldThrow() {
      dataElementModel.modelDefinition = {};
    }

    expect(shouldThrow).toThrowError();
  });
  describe('properties based off model definition', function () {
    var modelDefinition;
    beforeEach(function () {
      modelDefinition = {
        modelProperties: {
          name: {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this.dataValues.name;
            },
            set: function set(value) {
              this.dataValues.name = value;
            }
          }
        }
      };
    });
    it('should call the set method for name', function () {
      modelDefinition.modelProperties.name.set = jest.fn();

      var dataElementModel = _Model.default.create(modelDefinition);

      dataElementModel.name = 'ANC';
      expect(modelDefinition.modelProperties.name.set).toHaveBeenCalledWith('ANC');
    });
    it('should set the correct value', function () {
      var dataElementModel = _Model.default.create(modelDefinition);

      dataElementModel.name = 'ANC';
      expect(dataElementModel.dataValues.name).toBe('ANC');
    });
    it('should call the get method for name', function () {
      modelDefinition.modelProperties.name.get = jest.fn().mockReturnValue('ANC');

      var dataElementModel = _Model.default.create(modelDefinition);

      var name = dataElementModel.name;
      expect(modelDefinition.modelProperties.name.get).toHaveBeenCalled();
      expect(name).toBe('ANC');
    });
    it('should return the correct value', function () {
      var dataElementModel = _Model.default.create(modelDefinition);

      dataElementModel.name = 'ANC';
      expect(dataElementModel.name).toBe('ANC');
    });
  });
  describe('getDirtyPropertyNames', function () {
    var dataElementModel;
    beforeEach(function () {
      var dataElementSchema = _fixtures.default.get('/api/schemas/dataElement');

      var dataElementModelDefinition = _ModelDefinition.default.createFromSchema(dataElementSchema);

      dataElementModel = new _Model.default(dataElementModelDefinition);
    });
    it('should be a method', function () {
      expect(dataElementModel.getDirtyPropertyNames).toBeInstanceOf(Function);
    });
    it('should return the names of properties that are dirty', function () {
      dataElementModel.name = 'ANC new';
      expect(dataElementModel.getDirtyPropertyNames()).toEqual(['name']);
    });
    it('should return an empty array for a clean model', function () {
      expect(dataElementModel.getDirtyPropertyNames()).toEqual([]);
    });
  });
  describe('attributes', function () {
    var dataElementModel;
    beforeEach(function () {
      var dataElementModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'), _fixtures.default.get('/dataElementAttributes'));

      dataElementModel = _Model.default.create(dataElementModelDefinition);
    });
    it('should not create the property when there are no attributes', function () {
      var dataElementSchema = _fixtures.default.get('/api/schemas/dataElement');

      var dataElementModelDefinition = _ModelDefinition.default.createFromSchema(dataElementSchema);

      dataElementModel = _Model.default.create(dataElementModelDefinition);
      expect(dataElementModel.attributes).toBeUndefined();
    });
    it('should create the property when there are attributes available', function () {
      expect(dataElementModel.attributes).toBeDefined();
    });
    it('should have a property for each of the attributes that belong to this model type', function () {
      expect(Object.keys(dataElementModel.attributes)).toEqual(['marktribute', 'marktribute2', 'name']);
    });
    it('should set the correct value onto the attributeValues properties', function () {
      dataElementModel.attributes.name = 'Mark';
      expect(dataElementModel.attributeValues.length).toBe(1);
      expect(dataElementModel.attributeValues[0].value).toBe('Mark');
      expect(dataElementModel.attributeValues[0].attribute).toEqual({
        id: 'S8a2OBRnqEc',
        name: 'name'
      });
    });
    it('should get the correct value from the attributeValues property', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'marktribute'
        }
      }];
      expect(dataElementModel.attributes.marktribute).toBe('Mark');
    });
    it('should not add a value for the same attribute twice', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'marktribute'
        }
      }];
      dataElementModel.attributes.marktribute = 'John';
      expect(dataElementModel.attributes.marktribute).toBe('John');
      expect(dataElementModel.attributeValues[0].value).toBe('John');
      expect(dataElementModel.attributeValues.length).toBe(1);
    });
    it('should add a value for the attribute when it does not exist yet', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'marktribute'
        }
      }];
      dataElementModel.attributes.name = 'John';
      expect(dataElementModel.attributes.marktribute).toBe('Mark');
      expect(dataElementModel.attributes.name).toBe('John');
      expect(dataElementModel.attributeValues[0].value).toBe('Mark');
      expect(dataElementModel.attributeValues[1].value).toBe('John');
      expect(dataElementModel.attributeValues.length).toBe(2);
    });
    it('should remove the attributeValue from the attributeValue array when the value is cleared out', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'name'
        }
      }];
      dataElementModel.attributes.name = '';
      expect(dataElementModel.attributes.name).toBe(undefined);
      expect(dataElementModel.attributeValues.length).toBe(0);
    });
    it('should not remove the attributeValue when the attribute is set to false', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'name'
        }
      }];
      dataElementModel.attributes.name = false;
      expect(dataElementModel.attributes.name).toBe(false);
      expect(dataElementModel.attributeValues.length).toBe(1);
    });
    it('should not remove the attributeValue when the attribute is set 0', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'name'
        }
      }];
      dataElementModel.attributes.name = 0;
      expect(dataElementModel.attributes.name).toBe(0);
      expect(dataElementModel.attributeValues.length).toBe(1);
    });
    it('should remove the attributeValue when the attribute is set to undefined', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'name'
        }
      }];
      dataElementModel.attributes.name = undefined;
      expect(dataElementModel.attributes.name).toBe(undefined);
      expect(dataElementModel.attributeValues.length).toBe(0);
    });
    it('should remove the attributeValue when the attribute is set to null', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'name'
        }
      }];
      dataElementModel.attributes.name = null;
      expect(dataElementModel.attributes.name).toBe(undefined);
      expect(dataElementModel.attributeValues.length).toBe(0);
    });
    it('should not show up in the list of model keys', function () {
      var modelKeys = Object.keys(dataElementModel);
      expect(modelKeys).not.toContain('attributes');
    });
    it('should not be able to set attributes to something else', function () {
      var changeAttributesProperty = function changeAttributesProperty() {
        dataElementModel.attributes = 'something else';
      };

      expect(changeAttributesProperty).toThrow();
      expect(dataElementModel.attributes).not.toBe('something else');
    });
    it('should set the model to dirty when an attribute was changed', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'marktribute'
        }
      }];
      expect(dataElementModel.dirty).toBe(false);
      dataElementModel.attributes.marktribute = 'John';
      expect(dataElementModel.dirty).toBe(true);
    });
    it('should not set the model to be dirty when the attribute value is the same', function () {
      dataElementModel.dataValues.attributeValues = [{
        value: 'Mark',
        attribute: {
          id: 'FpoWdhxCMwH',
          name: 'marktribute'
        }
      }];
      dataElementModel.attributes.marktribute = 'Mark';
      expect(dataElementModel.dirty).toBe(false);
    });
    it('should not fail if requesting an attribute but the model has no attributeValues', function () {
      dataElementModel.dataValues.attributeValues = undefined;
      expect(function () {
        return dataElementModel.attributes.marktribute;
      }).not.toThrowError();
    });
    it('should still correctly set the attributeValue if the model has initially no attributeValues', function () {
      dataElementModel.dataValues.attributeValues = undefined;
      dataElementModel.attributes.marktribute = 'John';
      expect(dataElementModel.attributes.marktribute).toBe('John');
      expect(dataElementModel.attributeValues[0].attribute.id).toBe('FpoWdhxCMwH');
    });
  });
});
//# sourceMappingURL=Model.spec.js.map
"use strict";

var _ModelValidation = _interopRequireDefault(require("../ModelValidation"));

var _ModelBase5 = _interopRequireWildcard(require("../ModelBase"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jest.mock('../ModelValidation');
describe('ModelBase', function () {
  // TODO: For some reason we have to setup the mock before the beforeEach and reset the spy, should figure out a way to perhaps do this differently.
  var validateAgainstSchemaSpy;
  beforeEach(function () {
    validateAgainstSchemaSpy = _ModelValidation.default.getModelValidation().validateAgainstSchema;
    validateAgainstSchemaSpy.mockReset();
  });
  it('should have a save method', function () {
    var modelBase = new _ModelBase5.default();
    expect(_typeof(modelBase.save)).toBe('function');
  });
  it('should have a validate method', function () {
    var modelBase = new _ModelBase5.default();
    expect(_typeof(modelBase.validate)).toBe('function');
  });
  it('should have a clone method', function () {
    var modelBase = new _ModelBase5.default();
    expect(_typeof(modelBase.clone)).toBe('function');
  });
  describe('saving', function () {
    var modelDefinition;
    var model;
    var validateFunction;
    beforeEach(function () {
      validateFunction = jest.fn();
      modelDefinition = {
        apiEndpoint: '/dataElements',
        save: jest.fn().mockReturnValue(Promise.resolve()),
        saveNew: jest.fn().mockReturnValue(Promise.resolve())
      };

      var Model =
      /*#__PURE__*/
      function (_ModelBase) {
        _inherits(Model, _ModelBase);

        function Model(modelDef) {
          var _this;

          _classCallCheck(this, Model);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
          _this.modelDefinition = modelDef;
          _this.validate = validateFunction;
          _this.dirty = true;
          _this[_ModelBase5.DIRTY_PROPERTY_LIST] = new Set(['name']);
          _this.dataValues = {};
          return _this;
        }

        return Model;
      }(_ModelBase5.default);

      model = new Model(modelDefinition);
      Object.defineProperty(model, 'id', {
        get: function get() {
          return this.dataValues.id;
        }
      });
    });
    describe('create()', function () {
      it('should call validate before calling save', function () {
        validateFunction.mockReturnValue(Promise.resolve({
          status: true
        }));
        model.create(); // TODO: Fix assertion when the .toBeCalledBefore(model.save) is available https://github.com/facebook/jest/issues/4402

        expect(model.validate).toBeCalled();
      });
      it('should call saveNew on the model', function () {
        validateFunction.mockReturnValue(Promise.resolve({
          status: true
        }));
        return model.create().then(function () {
          expect(modelDefinition.saveNew).toBeCalledWith(model);
        });
      });
      it('should not call saveNew when validate fails', function () {
        validateFunction.mockReturnValue(Promise.resolve({
          status: false
        }));
        return model.create().catch(function (e) {
          return e;
        }).then(function () {
          expect(modelDefinition.save).not.toBeCalled();
        });
      });
    });
    describe('save()', function () {
      beforeEach(function () {
        model.validate.mockReturnValue(Promise.resolve({
          status: true
        }));
      });
      it('should call the save on the model modelDefinition with itself as a parameter', function () {
        return model.save().then(function () {
          expect(modelDefinition.save).toBeCalledWith(model);
        });
      });
      it('should call validate before calling save', function () {
        model.save();
        expect(model.validate).toBeCalled();
      });
      it('should not call save when validate fails', function () {
        model.validate.mockReturnValue(Promise.resolve({
          status: false
        }));
        return model.save().catch(function (e) {
          return e;
        }).then(function () {
          expect(modelDefinition.save).not.toBeCalled();
        });
      });
      it('should not call save when the model is not dirty', function () {
        model.dirty = false;
        model.save();
        expect(modelDefinition.save).not.toBeCalled();
      });
      it('should reset dirty to false after save', function (done) {
        model.save().then(function () {
          expect(model.dirty).toBe(false);
          done();
        }).catch(function (err) {
          done(err);
        });
      });
      it('should reset the DIRTY_PROPERTY_LIST to an empty set after save', function (done) {
        model.save().then(function () {
          expect(model[_ModelBase5.DIRTY_PROPERTY_LIST].size).toBe(0);
          done();
        }).catch(function (err) {
          done(err);
        });
      });
      it('should return a promise that resolves to an empty object when the model is not dirty', function (done) {
        model.dirty = false;
        model.save().then(function (result) {
          expect(result).toEqual({});
          done();
        }).catch(done);
      });
      it('should return rejected promise when the model is not valid', function (done) {
        model.validate.mockReturnValue(Promise.resolve({
          status: false
        }));
        model.save().catch(function (message) {
          expect(message).toEqual({
            status: false
          });
          done();
        });
      });
      it('should set the newly created id onto the model', function () {
        modelDefinition.save.mockReturnValue(Promise.resolve({
          httpStatus: 'Created',
          response: {
            uid: 'DXyJmlo9rge'
          }
        }));
        return model.save().then(function () {
          expect(model.id).toBe('DXyJmlo9rge');
        });
      });
      it('should set the correct href property onto the object', function () {
        modelDefinition.save.mockReturnValue(Promise.resolve({
          httpStatus: 'Created',
          response: {
            uid: 'DXyJmlo9rge'
          }
        }));
        return model.save().then(function () {
          expect(model.dataValues.href).toBe('/dataElements/DXyJmlo9rge');
        });
      });
      it('should set the dirty children\'s dirty flag back to false', function () {
        model.modelDefinition.modelValidations = {
          organisationUnits: {
            owner: true
          }
        };
        model.organisationUnits = {
          size: 1,
          dirty: true
        };
        return model.save().then(function () {
          expect(model.organisationUnits.dirty).toBe(false);
        });
      });
    });
  });
  describe('validate', function () {
    var modelValidations;
    var model;
    beforeEach(function () {
      modelValidations = {
        age: {
          persisted: true,
          type: 'NUMBER',
          required: true,
          min: 0,
          max: 2342,
          owner: true,
          unique: false
        }
      };

      var Model =
      /*#__PURE__*/
      function (_ModelBase2) {
        _inherits(Model, _ModelBase2);

        function Model(validations) {
          var _this2;

          _classCallCheck(this, Model);

          _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
          _this2.modelDefinition = {};
          _this2.modelDefinition.modelValidations = validations;
          _this2.dataValues = {
            age: 4
          };
          return _this2;
        }

        return Model;
      }(_ModelBase5.default);

      model = new Model(modelValidations);
      validateAgainstSchemaSpy.mockReturnValue(Promise.resolve([]));
    });
    it('should fail when the async validate fails', function () {
      var message = 'Validation against schema endpoint failed.';
      validateAgainstSchemaSpy.mockReturnValue(Promise.reject(message));
      expect.assertions(1);
      return model.validate().catch(function (errMessage) {
        expect(errMessage).toBe(message);
      });
    });
    it('should call the validateAgainstSchema method on the modelValidator', function () {
      expect.assertions(1);
      return model.validate().then(function () {
        expect(validateAgainstSchemaSpy).toBeCalled();
      });
    });
    it('should call validateAgainstSchema with the model', function () {
      expect.assertions(1);
      return model.validate().then(function () {
        expect(validateAgainstSchemaSpy).toBeCalledWith(model);
      });
    });
    it('should return false when there are the asyncValidation against the schema failed', function () {
      validateAgainstSchemaSpy.mockReturnValue(Promise.resolve([{
        message: 'Required property missing.',
        property: 'name'
      }]));
      expect.assertions(1);
      return model.validate().then(function (validationState) {
        expect(validationState.status).toBe(false);
      });
    });
    it('should return false when there are the asyncValidation against the schema failed', function () {
      validateAgainstSchemaSpy.mockReturnValue(Promise.resolve([]));
      expect.assertions(1);
      return model.validate().then(function (validationState) {
        expect(validationState.status).toBe(true);
      });
    });
  });
  describe('clone', function () {
    var modelDefinition;
    var model;

    var Model =
    /*#__PURE__*/
    function (_ModelBase3) {
      _inherits(Model, _ModelBase3);

      function Model(modelDef) {
        var _this3;

        _classCallCheck(this, Model);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
        _this3.modelDefinition = modelDef;
        _this3.validate = jest.fn().mockReturnValue(Promise.resolve({
          status: true
        }));
        _this3.dirty = false;
        _this3[_ModelBase5.DIRTY_PROPERTY_LIST] = new Set([]);
        _this3.dataValues = {
          id: 'DXyJmlo9rge',
          name: 'My metadata object'
        };
        return _this3;
      }

      _createClass(Model, null, [{
        key: "create",
        value: function create(modelDef) {
          model = new Model(modelDef);
          Object.defineProperty(model, 'id', {
            get: function get() {
              return this.dataValues.id;
            },
            enumerable: true
          });
          Object.defineProperty(model, 'name', {
            get: function get() {
              return this.dataValues.name;
            },
            set: function set(newValue) {
              this.dataValues.name = newValue;
            },
            enumerable: true
          });
          Object.defineProperty(model, 'userGroups', {
            get: function get() {
              return this.dataValues.userGroups;
            },
            enumerable: true
          });
          return model;
        }
      }]);

      return Model;
    }(_ModelBase5.default);

    beforeEach(function () {
      modelDefinition = {
        apiEndpoint: '/dataElements',
        save: jest.fn().mockReturnValue(Promise.resolve()),
        saveNew: jest.fn().mockReturnValue(Promise.resolve()),
        create: jest.fn().mockReturnValue(Model.create(modelDefinition)),
        modelValidations: {
          id: {},
          name: {},
          userGroups: {
            type: 'COLLECTION'
          }
        }
      };
      model = Model.create(modelDefinition);
    });
    it('should call create on the modelDefinition', function () {
      model.clone();
      expect(modelDefinition.create).toBeCalled();
    });
    it('should pass all the dataValues to the create function', function () {
      model.clone();
      expect(modelDefinition.create).toBeCalledWith({
        id: 'DXyJmlo9rge',
        name: 'My metadata object'
      });
    });
    it('should pass collections arrays of ids', function () {
      // Would generally be a ModelCollection, but it extends Map so for simplicity we use Map directly.
      model.dataValues.userGroups = new Map([['P3jJH5Tu5VC', {
        id: 'P3jJH5Tu5VC'
      }], ['FQ2o8UBlcrS', {
        id: 'FQ2o8UBlcrS'
      }]]);
      model.clone();
      expect(modelDefinition.create).toBeCalledWith({
        id: 'DXyJmlo9rge',
        name: 'My metadata object',
        userGroups: [{
          id: 'P3jJH5Tu5VC'
        }, {
          id: 'FQ2o8UBlcrS'
        }]
      });
    });
    it('should retain all of the values in the child collections', function () {
      model.dataValues.userGroups = new Map([['P3jJH5Tu5VC', {
        id: 'P3jJH5Tu5VC',
        name: 'Administrators',
        clone: function clone() {
          return {
            id: 'P3jJH5Tu5VC',
            name: 'Administrators'
          };
        }
      }], ['FQ2o8UBlcrS', {
        id: 'FQ2o8UBlcrS',
        name: 'Super users',
        clone: function clone() {
          return {
            id: 'FQ2o8UBlcrS',
            name: 'Super users'
          };
        }
      }]]);
      model.clone();
      expect(modelDefinition.create).toBeCalledWith({
        id: 'DXyJmlo9rge',
        name: 'My metadata object',
        userGroups: [{
          id: 'P3jJH5Tu5VC',
          name: 'Administrators'
        }, {
          id: 'FQ2o8UBlcrS',
          name: 'Super users'
        }]
      });
    });
    it('should return an independent clone', function () {
      var modelClone = model.clone();
      expect(model).not.toBe(modelClone);
      modelClone.name = 'NewName';
      expect(modelClone.dataValues.name).toBe('NewName');
      expect(model.dataValues.name).toBe('My metadata object');
    });
    it('should preserve the dirty state of the original model', function () {
      model.dirty = true;
      model[_ModelBase5.DIRTY_PROPERTY_LIST] = new Set(['name']);
      var modelClone = model.clone();
      expect(modelClone.dirty).toBe(true);
    });
  });
  describe('delete', function () {
    var modelDefinition;
    var model;
    beforeEach(function () {
      modelDefinition = {
        delete: jest.fn().mockReturnValue(new Promise(function (resolve) {
          resolve();
        }))
      };

      var Model =
      /*#__PURE__*/
      function (_ModelBase4) {
        _inherits(Model, _ModelBase4);

        function Model(modelDef) {
          var _this4;

          _classCallCheck(this, Model);

          _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
          _this4.modelDefinition = modelDef;
          _this4.validate = jest.fn().mockReturnValue(Promise.resolve({
            status: true
          }));
          _this4.dirty = true;
          _this4[_ModelBase5.DIRTY_PROPERTY_LIST] = new Set(['name']);
          return _this4;
        }

        return Model;
      }(_ModelBase5.default);

      model = new Model(modelDefinition);
    });
    it('should have a delete method', function () {
      expect(model.delete).toBeInstanceOf(Function);
    });
    it('should call delete on the modeldefinition when called', function () {
      model.delete();
      expect(model.modelDefinition.delete).toBeCalled();
    });
    it('should call the modelDefinition.delete method with the model', function () {
      model.delete();
      expect(model.modelDefinition.delete).toBeCalledWith(model);
    });
    it('should return a promise', function () {
      expect(model.delete()).toBeInstanceOf(Promise);
    });
  });
  describe('getCollectionChildren', function () {
    var model;
    beforeEach(function () {
      model = new _ModelBase5.default();
      model.modelDefinition = {
        modelValidations: {
          dataElements: {
            owner: true
          },
          userGroups: {}
        }
      };
      model.dataElements = {
        name: 'dataElements',
        dirty: true,
        size: 2
      };
      model.userGroups = {
        name: 'userGroups'
      };
    });
    it('should return the collection children', function () {
      expect(model.getCollectionChildren()).toContain(model.dataElements);
    });
    it('should not return the children that are not collections', function () {
      expect(model.getCollectionChildren()).not.toContain(model.userGroups);
    });
  });
  describe('getCollectionChildrenPropertyNames', function () {
    var model;
    beforeEach(function () {
      model = new _ModelBase5.default();
      model.modelDefinition = {
        modelValidations: {
          dataElements: {
            type: 'COLLECTION'
          },
          dataEntryForm: {
            type: 'COMPLEX'
          }
        }
      };
      model.dataElements = [];
    });
    it('should return the correct property collections', function () {
      expect(model.getCollectionChildrenPropertyNames()).toContain('dataElements');
    });
    it('should not return the collection for the property if there is no modelValidation for the property', function () {
      model.indicators = [];
      expect(model.getCollectionChildrenPropertyNames()).not.toContain('indicators');
    });
    it('should not return the collection for the property if there is no modelValidation for the property', function () {
      model.modelDefinition.modelValidations.indicators = {
        type: 'COLLECTION'
      };
      expect(model.getCollectionChildrenPropertyNames()).not.toContain('indicators');
    });
  });
  describe('getReferenceProperties', function () {
    var model;
    beforeEach(function () {
      model = new _ModelBase5.default();
      model.modelDefinition = {
        modelValidations: {
          dataElements: {
            type: 'COLLECTION',
            embeddedObject: false
          },
          dataEntryForm: {
            type: 'COMPLEX'
          },
          user: {
            type: 'REFERENCE',
            embeddedObject: false
          },
          accesses: {
            type: 'REFERENCE',
            embeddedObject: true
          }
        }
      };
      model.dataElements = [];
      model.user = {
        id: 'xE7jOejl9FI',
        firstName: 'John'
      };
      model.accesses = {
        read: true,
        write: true
      };
    });
    it('should return the correct reference properties', function () {
      expect(model.getReferenceProperties()).toContain('user');
    });
    it('should not return the reference property if there is no modelValidation for the property', function () {
      model.randomObject = {};
      expect(model.getReferenceProperties()).not.toContain('randomObject');
    });
    it('should not return the reference property if there is no value for the property', function () {
      model.modelDefinition.modelValidations.randomObject = {
        type: 'REFERENCE'
      };
      expect(model.getReferenceProperties()).not.toContain('randomObject');
    });
    it('should not return the property if the reference property is embedded', function () {
      expect(model.getReferenceProperties()).not.toContain('accesses');
    });
  });
  describe('getEmbeddedObjectCollectionPropertyNames', function () {
    var model;
    beforeEach(function () {
      model = new _ModelBase5.default();
      model.modelDefinition = {
        modelValidations: {
          dataElements: {
            type: 'COLLECTION',
            embeddedObject: false
          },
          dataEntryForm: {
            type: 'COMPLEX'
          },
          legends: {
            type: 'COLLECTION',
            embeddedObject: true
          }
        }
      };
      model.dataElements = [];
      model.legends = [];
    });
    it('should include the embedded collection', function () {
      expect(model.getEmbeddedObjectCollectionPropertyNames()).toContain('legends');
    });
    it('should not include non embedded object collections', function () {
      expect(model.getEmbeddedObjectCollectionPropertyNames()).not.toContain('dataElements');
    });
  });
  describe('getDirtyChildren', function () {
    var model;
    beforeEach(function () {
      model = new _ModelBase5.default();
      model.modelDefinition = {
        modelValidations: {
          dataElements: {
            owner: true
          }
        }
      };
      model.dataElements = {
        name: 'dataElements',
        dirty: true,
        size: 2
      };
    });
    it('should return the dirty children properties', function () {
      expect(model.getDirtyChildren()).toEqual([model.dataElements]);
    });
  });
  describe('toJSON', function () {
    var model;
    beforeEach(function () {
      model = new _ModelBase5.default();
    });
    it('should be a function', function () {
      expect(_typeof(model.toJSON)).toBe('function');
    });
    it('should not throw an exception on `toJSON` for base models', function () {
      expect(model.toJSON()).toEqual({});
    });
    it('should return a json representation of the model', function () {
      model.modelDefinition = {
        modelValidations: {
          name: {
            owner: true
          },
          dataElements: {
            owner: true,
            type: 'COLLECTION'
          }
        }
      };
      model.dataValues = {
        name: 'ANC',
        dataElements: new Map([['P3jJH5Tu5VC', {
          id: 'P3jJH5Tu5VC',
          name: 'anc1'
        }], ['FQ2o8UBlcrS', {
          id: 'FQ2o8UBlcrS',
          name: 'anc2'
        }]])
      };
      model.name = model.dataValues.name;
      model.dataElements = model.dataValues.dataElements;
      var expected = {
        name: 'ANC',
        dataElements: [{
          id: 'P3jJH5Tu5VC'
        }, {
          id: 'FQ2o8UBlcrS'
        }]
      };
      expect(model.toJSON()).toEqual(expected);
    });
  });
});
//# sourceMappingURL=ModelBase.spec.js.map
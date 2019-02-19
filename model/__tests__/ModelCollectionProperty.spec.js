"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _Api = _interopRequireDefault(require("../../api/Api"));

var _Model = _interopRequireDefault(require("../Model"));

var _ModelDefinition = _interopRequireDefault(require("../ModelDefinition"));

var _ModelCollectionProperty = _interopRequireDefault(require("../ModelCollectionProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe.skip('ModelCollectionProperty', function () {
  // let ModelCollectionProperty;
  var mockParentModel;
  var mockModelDefinition;
  var mcp;
  var testModels = [];
  beforeEach(function () {
    mockParentModel = {
      id: 'parentModelId',
      plural: 'notArealModel',
      href: 'my.dhis/instance',
      modelDefinition: {
        apiEndpoint: 'http://my.base.url/api/parentModelEndpoint'
      }
    };
    mockModelDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/dataElement'));
    mcp = _ModelCollectionProperty.default.create(mockParentModel, mockModelDefinition, 'dataElementGroups', []);
    testModels.push(mockModelDefinition.create({
      id: 'dataEleme01',
      name: 'Test'
    }));
    testModels.push(mockModelDefinition.create({
      id: 'dataEleme02'
    }));
    testModels.push(mockModelDefinition.create({
      id: 'dataEleme03'
    }));
  });
  afterEach(function () {
    testModels = [];
  });
  it('Should be an object', function () {
    expect(_ModelCollectionProperty.default).toBeInstanceOf(Object);
  });
  it('Should not be callable as a function', function () {
    expect(function () {
      return (0, _ModelCollectionProperty.default)();
    }).toThrowError();
  });
  describe('create()', function () {
    it('Supplies the default API implementation', function () {
      expect(mcp.api).toEqual(_Api.default.getApi());
    });
    it('Sets the dirty flag to false', function () {
      expect(mcp.dirty).toBe(false);
    });
    it('Creates empty Sets for added and removed elements', function () {
      expect(mcp.added).toBeInstanceOf(Set);
      expect(mcp.removed).toBeInstanceOf(Set);
      expect(mcp.added.size).toBe(0);
      expect(mcp.removed.size).toBe(0);
    });
    it('Sets the correct parentModel', function () {
      expect(mcp.parentModel).toEqual(mockParentModel);
    });
  });
  describe('add()', function () {
    it('Registers added elements', function () {
      testModels.forEach(function (model) {
        return mcp.add(model);
      });
      expect(mcp.added.size).toBe(testModels.length);
    });
    it('Only registers each added element once', function () {
      testModels.forEach(function (model) {
        return mcp.add(model);
      });
      testModels.forEach(function (model) {
        return mcp.add(model);
      });
      expect(mcp.added.size).toBe(testModels.length);
    });
    it('Updates the dirty flag', function () {
      expect(mcp.dirty).toBe(false);
      mcp.add(testModels[0]);
      expect(mcp.dirty).toBe(true);
    });
    it('Sets the dirty flag to false when an element is added and then removed', function () {
      expect(mcp.dirty).toBe(false);
      mcp.add(testModels[0]);
      expect(mcp.dirty).toBe(true);
      mcp.remove(testModels[0]);
      expect(mcp.dirty).toBe(false);
    });
  });
  describe('remove()', function () {
    beforeEach(function () {
      // Create a new ModelCollectionProperty with existing values
      mcp = _ModelCollectionProperty.default.create(mockParentModel, mockModelDefinition, 'dataElementGroups', testModels);
    });
    it('Registers removed elements', function () {
      expect(mcp.removed.size).toBe(0);
      mcp.remove(testModels[0]);
      expect(mcp.removed.size).toBe(1);
      mcp.remove(testModels[1]);
      expect(mcp.removed.size).toBe(2);
      mcp.remove(testModels[2]);
      expect(mcp.removed.size).toBe(3);
    });
    it('Only registers each removed element once', function () {
      expect(mcp.removed.size).toBe(0);
      mcp.remove(testModels[0]);
      expect(mcp.removed.size).toBe(1);
      mcp.remove(testModels[0]);
      expect(mcp.removed.size).toBe(1);
    });
    it('Updates the dirty flag', function () {
      expect(mcp.dirty).toBe(false);
      mcp.remove(testModels[0]);
      expect(mcp.dirty).toBe(true);
    });
    it('Sets the dirty flag to false when an element is removed and re-added', function () {
      expect(mcp.dirty).toBe(false);
      mcp.remove(testModels[0]);
      expect(mcp.dirty).toBe(true);
      mcp.add(testModels[0]);
      expect(mcp.dirty).toBe(false);
    });
  });
  describe('updateDirty()', function () {
    it('Updates the dirty flag correctly', function () {
      expect(mcp.updateDirty()).toBe(false);
      mcp.added.add({
        id: 'not a real model'
      });
      expect(mcp.updateDirty()).toBe(true);
    });
    it('Returns the updated value of the dirty flag', function () {
      mcp.added.add({
        id: 'not a real model'
      });
      expect(mcp.updateDirty()).toBe(mcp.dirty);
    });
  });
  describe('resetDirtyState()', function () {
    it('Clears all added and removed elements', function () {
      mcp.added.add(testModels[0]);
      mcp.removed.add({
        id: 'bah '
      });
      expect(mcp.added.size).toBe(1);
      expect(mcp.removed.size).toBe(1);
      mcp.resetDirtyState();
      expect(mcp.added.size).toBe(0);
      expect(mcp.removed.size).toBe(0);
    });
    it('Sets the dirty flag to false', function () {
      expect(mcp.dirty).toBe(false);
      mcp.add(testModels[0]);
      mcp.removed.add({
        id: 'bah '
      });
      expect(mcp.updateDirty()).toBe(true);
      mcp.resetDirtyState();
      expect(mcp.dirty).toBe(false);
    });
  });
  describe('isDirty()', function () {
    it('Returns the current value of the dirty flag', function () {
      expect(mcp.isDirty()).toBe(mcp.dirty);
      mcp.add(testModels[0]);
      expect(mcp.isDirty()).toBe(true);
      expect(mcp.isDirty()).toBe(mcp.dirty);
    });
    it('Does not update the dirty flag', function () {
      expect(mcp.isDirty()).toBe(false);
      mcp.added.add(testModels[0]);
      expect(mcp.isDirty()).toBe(false);
    });
    it('Should be dirty=true if any model has been edited by default', function () {
      expect(mcp.isDirty()).toBe(false);
      mcp.add(testModels[0]);
      expect(mcp.isDirty()).toBe(true);
      mcp.resetDirtyState();
      expect(mcp.isDirty()).toBe(false);
      testModels[0].name = 'Raccoon';
      expect(testModels[0].isDirty()).toBe(true);
      expect(mcp.isDirty()).toBe(true);
    });
    it('Should be dirty=false if includeValues=false', function () {
      expect(mcp.isDirty()).toBe(false);
      mcp.add(testModels[0]);
      expect(mcp.isDirty()).toBe(true);
      mcp.resetDirtyState();
      expect(mcp.isDirty()).toBe(false);
      testModels[0].name = 'Raccoon';
      expect(testModels[0].isDirty()).toBe(true);
      expect(mcp.isDirty(false)).toBe(false);
    });
  });
  describe('save()', function () {
    var api = {
      get: jest.fn().mockReturnValue(Promise.resolve()),
      post: jest.fn().mockReturnValue(Promise.resolve())
    };
    beforeEach(function () {
      mcp = new _ModelCollectionProperty.default(mockParentModel, mockModelDefinition, 'dataElementGroups', [testModels[0]], api);
    });
    afterEach(function () {
      api.get.mockClear();
      api.post.mockClear();
    });
    it('Does nothing when the collection not dirty', function (done) {
      mcp.save().then(function () {
        expect(api.post).toHaveBeenCalledTimes(0);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Sends additions and removals in a single request', function (done) {
      mcp.remove(testModels[0]);
      mcp.add(testModels[1]);
      mcp.save().then(function () {
        expect(api.get).not.toHaveBeenCalled();
        expect(api.post).toHaveBeenCalledTimes(1);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Sends an API requests with the correct additions and removals, using the correct URL', function (done) {
      mcp.remove(testModels[0]);
      mcp.add(testModels[1]);
      mcp.save().then(function () {
        expect(api.get).not.toHaveBeenCalled();
        expect(api.post).toHaveBeenCalledTimes(1);
        expect(api.post).toBeCalledWith('my.dhis/instance/dataElements', {
          additions: [{
            id: 'dataEleme02'
          }],
          deletions: [{
            id: 'dataEleme01'
          }]
        });
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Resets the dirty flag', function (done) {
      mcp.remove(testModels[0]);
      mcp.add(testModels[1]);
      expect(mcp.dirty).toBe(true);
      mcp.save().then(function () {
        expect(mcp.dirty).toBe(false);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Does not throw when the API fails', function (done) {
      api.post.mockReturnValue(Promise.reject());
      mcp.add(testModels[1]);
      expect(mcp.dirty).toBe(true);
      expect(function () {
        mcp.save().then(function () {
          return done();
        }).catch(function () {
          return done();
        });
      }).not.toThrowError();
    });
    it('Rejects the promise when the API fails', function (done) {
      api.post.mockReturnValue(Promise.reject());
      mcp.add(testModels[1]);
      expect(mcp.dirty).toBe(true);
      expect(function () {
        mcp.save().then(function () {
          return done('API failure was accepted silently');
        }).catch(function () {
          return done();
        });
      }).not.toThrowError();
    });
  });
  describe('load()', function () {
    var loadedWithValues;
    var loadedWithoutValues;
    var unloadedWithValues;
    var unloadedWithoutValues;
    var excludedByFieldFilters;
    var api = {
      get: jest.fn().mockReturnValue(Promise.resolve({
        dataElementGroups: [{
          id: 'groupNo0001'
        }, {
          id: 'groupNo0002'
        }, {
          id: 'groupNo0003'
        }]
      }))
    };
    var mockMcpPropName = 'dataElementGroups';
    beforeEach(function () {
      loadedWithValues = new _ModelCollectionProperty.default(mockParentModel, mockModelDefinition, mockMcpPropName, [// Loaded, actual values
      mockModelDefinition.create({
        id: 'groupNo0001'
      }), mockModelDefinition.create({
        id: 'groupNo0002'
      }), mockModelDefinition.create({
        id: 'groupNo0003'
      })], api); // A ModelCollectionProperty that has been fully loaded, but contains no values

      loadedWithoutValues = new _ModelCollectionProperty.default(mockParentModel, mockModelDefinition, mockMcpPropName, [], // Loaded, no values
      api); // A ModelCollectionProperty that has not yet been loaded, but contains values that can be lazy loaded

      unloadedWithValues = new _ModelCollectionProperty.default(mockParentModel, mockModelDefinition, mockMcpPropName, true, // Not loaded, has values (meaning the field was loaded with the '::isNotEmpty' transformer)
      api);
      unloadedWithoutValues = new _ModelCollectionProperty.default(mockParentModel, mockModelDefinition, mockMcpPropName, false, // Not loaded, no values
      api);
      excludedByFieldFilters = new _ModelCollectionProperty.default(mockParentModel, mockModelDefinition, mockMcpPropName, undefined, // This field was not included in the API query
      api);
    });
    afterEach(function () {
      api.get.mockClear();
    });
    it('Sets `hasUnloadedData` correctly', function () {
      expect(loadedWithValues.hasUnloadedData).toBe(false);
      expect(loadedWithoutValues.hasUnloadedData).toBe(false);
      expect(unloadedWithValues.hasUnloadedData).toBe(true);
      expect(unloadedWithoutValues.hasUnloadedData).toBe(false);
      expect(excludedByFieldFilters.hasUnloadedData).toBe(true);
    });
    it('does not query the API when there are no unloaded values', function (done) {
      Promise.all([loadedWithValues.load(), loadedWithoutValues.load(), unloadedWithoutValues.load()]).then(function () {
        expect(api.get).not.toHaveBeenCalled();
        done();
      }).catch(function (err) {
        return done(err);
      });
    });
    it('performs the correct API call for lazy loading', function (done) {
      unloadedWithValues.load().then(function () {
        expect(api.get).toHaveBeenCalledWith([mockParentModel.modelDefinition.apiEndpoint, mockParentModel.id].join('/'), {
          fields: 'dataElementGroups[:all]',
          paging: false
        });
        done();
      }).catch(function (err) {
        return done(err);
      });
    });
    it('correctly merges request parameters when lazy loading', function (done) {
      unloadedWithValues.load({
        paging: false,
        fields: 'id,displayName'
      }).then(function () {
        expect(api.get).toHaveBeenCalledWith([mockParentModel.modelDefinition.apiEndpoint, mockParentModel.id].join('/'), {
          fields: 'dataElementGroups[id,displayName]',
          paging: false
        });
        done();
      }).catch(function (err) {
        return done(err);
      });
    });
    it('updates hasUnloadedData when data has been lazy loaded', function (done) {
      expect(unloadedWithValues.hasUnloadedData).toBe(true);
      unloadedWithValues.load().then(function () {
        expect(unloadedWithValues.hasUnloadedData).toBe(false);
        done();
      }).catch(function (err) {
        return done(err);
      });
    });
    it('creates models for lazy loaded objects', function (done) {
      unloadedWithValues.load().then(function () {
        expect(unloadedWithValues.valuesContainerMap.size).toBe(3);
        unloadedWithValues.toArray().forEach(function (value) {
          return expect(value).toBeInstanceOf(_Model.default);
        });
        done();
      }).catch(function (err) {
        return done(err);
      });
    });
    it('supports lazy loading collection fields that were not included in the original API query', function (done) {
      expect(excludedByFieldFilters.hasUnloadedData).toBe(true);
      excludedByFieldFilters.load().then(function () {
        expect(api.get).toHaveBeenCalled();
        expect(excludedByFieldFilters.hasUnloadedData).toBe(false);
        done();
      }).catch(function (err) {
        return done(err);
      });
    });
  });
});
//# sourceMappingURL=ModelCollectionProperty.spec.js.map
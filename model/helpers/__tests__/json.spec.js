"use strict";

var _fixtures = _interopRequireDefault(require("../../../__fixtures__/fixtures"));

var check = _interopRequireWildcard(require("../../../lib/check"));

var _ModelDefinition = _interopRequireDefault(require("../../ModelDefinition"));

var _json = require("../json");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockModelDefinitions = {};
jest.mock('../../ModelDefinitions', function () {
  return {
    getModelDefinitions: function getModelDefinitions() {
      return mockModelDefinitions;
    }
  };
});
describe.skip('getJSONForProperties', function () {
  describe('for validationRule', function () {
    var validationRuleSchema;
    var validationRuleModelDefinition;
    beforeEach(function () {
      validationRuleSchema = _fixtures.default.get('/api/schemas/validationRule');
      validationRuleModelDefinition = _ModelDefinition.default.createFromSchema(validationRuleSchema);
      mockModelDefinitions.validationRule = validationRuleModelDefinition;
    });
    it('does fancy stuffs', function () {
      var model = validationRuleModelDefinition.create({
        id: 'a0123456789',
        organisationUnitLevels: [1, 2]
      });
      expect((0, _json.getJSONForProperties)(model, ['organisationUnitLevels'])).toEqual({
        organisationUnitLevels: [1, 2]
      });
    });
  });
  describe('for legendSet', function () {
    var checkTypeStub;
    var legendSetSchema;
    var legendSet;
    var legendSetSchemaDefinition;
    beforeEach(function () {
      checkTypeStub = jest.spyOn(check, 'checkType').mockReturnValue(true);
      legendSetSchema = _fixtures.default.get('/api/schemas/legendSet');
      legendSetSchemaDefinition = _ModelDefinition.default.createFromSchema(legendSetSchema);
      mockModelDefinitions.legendSet = legendSetSchemaDefinition;
      legendSet = _fixtures.default.get('/api/legendSets/k1JHPfXsJND');
    });
    afterEach(function () {
      checkTypeStub.mockRestore();
    });
    it('should embed the legends in the payload', function () {
      var model = legendSetSchemaDefinition.create(legendSet);
      expect((0, _json.getJSONForProperties)(model, ['legends']).legends).toHaveLength(6);
      expect((0, _json.getJSONForProperties)(model, ['legends']).legends).toEqual(legendSet.legends);
    });
    it('should not throw on userGroupAcceses', function () {
      var model = legendSetSchemaDefinition.create(legendSet);
      expect((0, _json.getJSONForProperties)(model, ['userGroupAccesses']).userGroupAccesses).toHaveLength(1);
    });
    it('should maintain the full structure of the userGroupAccesses', function () {
      var model = legendSetSchemaDefinition.create(legendSet);
      expect((0, _json.getJSONForProperties)(model, ['userGroupAccesses']).userGroupAccesses).toEqual([{
        access: 'rw------',
        userGroupUid: 'wl5cDMuUhmF',
        displayName: 'Administrators',
        id: 'wl5cDMuUhmF'
      }]);
    });
    it('should maintain the full structure of the userAccesses', function () {
      legendSetSchemaDefinition = _ModelDefinition.default.createFromSchema(legendSetSchema);
      var model = legendSetSchemaDefinition.create(legendSet);
      expect((0, _json.getJSONForProperties)(model, ['userAccesses']).userAccesses).toEqual([{
        access: 'rw------',
        userUid: 'UgDpalMTGDr',
        displayName: 'Kanu Nwankwo',
        id: 'UgDpalMTGDr'
      }]);
    });
    it('should only use the ID of the user object', function () {
      legendSetSchemaDefinition = _ModelDefinition.default.createFromSchema(legendSetSchema);
      var model = legendSetSchemaDefinition.create(legendSet);
      model.user = {
        id: 'xE7jOejl9FI',
        username: 'admin',
        firstName: 'John'
      };
      expect((0, _json.getJSONForProperties)(model, ['user']).user).toEqual({
        id: 'xE7jOejl9FI'
      });
    });
  });
  describe('property types', function () {
    it('should handle non-embedded collection properties', function () {
      var favoritesPropName = 'favorites';
      var favoritesValue = ['userId1', 'userId2'];
      var model = {
        modelDefinition: {
          modelValidations: {
            favorites: {}
          }
        },
        dataValues: _defineProperty({}, favoritesPropName, favoritesValue),
        getCollectionChildrenPropertyNames: function getCollectionChildrenPropertyNames() {
          return [favoritesPropName];
        },
        getReferenceProperties: function getReferenceProperties() {
          return [];
        }
      };
      var actual = (0, _json.getJSONForProperties)(model, [favoritesPropName]);

      var expected = _defineProperty({}, favoritesPropName, favoritesValue);

      expect(actual).toEqual(expected);
    });
  });
});
//# sourceMappingURL=json.spec.js.map
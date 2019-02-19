"use strict";

var _Api = _interopRequireDefault(require("../../api/Api"));

var _GeoFeatures = _interopRequireDefault(require("../GeoFeatures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../api/Api'); // src/api/__mocks/Api.js

describe('GeoFeatures', function () {
  var geoFeatures;
  beforeEach(function () {
    geoFeatures = new _GeoFeatures.default();
  });
  describe('getGeoFeatures', function () {
    it('should create an instance of GeoFeatures', function () {
      expect(_GeoFeatures.default.getGeoFeatures()).toBeInstanceOf(_GeoFeatures.default);
    });
  });
  describe('byOrgUnit', function () {
    it('should return an instance of GeoFeatures', function () {
      expect(geoFeatures.byOrgUnit()).toBeInstanceOf(_GeoFeatures.default);
    });
    it('should add LEVEL-3 to the orgUnits array', function () {
      geoFeatures = geoFeatures.byOrgUnit('LEVEL-3');
      expect(geoFeatures.orgUnits).toContain('LEVEL-3');
    });
    it('should add LEVEL-3 and org unit to the orgUnits array', function () {
      geoFeatures = geoFeatures.byOrgUnit(['LEVEL-3', 'YuQRtpLP10I']);
      expect(geoFeatures.orgUnits).toEqual(['LEVEL-3', 'YuQRtpLP10I']);
    });
    it('should not add undefined to the orgUnits array', function () {
      geoFeatures = geoFeatures.byOrgUnit(undefined);
      expect(geoFeatures.orgUnits).not.toContain(undefined);
    });
    it('should throw when invalid uid', function () {
      expect(function () {
        return geoFeatures.byOrgUnit('invalid');
      }).toThrow('Invalid organisation unit: invalid');
    });
    it('should throw when invalid org unit level format', function () {
      expect(function () {
        return geoFeatures.byOrgUnit('LEVEL-1b');
      }).toThrow('Invalid organisation unit: LEVEL-1b');
    });
    it('should throw when invalid org unit group format', function () {
      expect(function () {
        return geoFeatures.byOrgUnit('OU_GROUP-invalid');
      }).toThrow('Invalid organisation unit: OU_GROUP-invalid');
    });
    it('should throw when invalid user org unit', function () {
      expect(function () {
        return geoFeatures.byOrgUnit('SHORTNAMES');
      }).toThrow('Invalid organisation unit: SHORTNAMES');
    });
  });
  describe('displayProperty', function () {
    it('should return an instance of GeoFeatures', function () {
      expect(geoFeatures.displayProperty()).toBeInstanceOf(_GeoFeatures.default);
    });
    it('should set displayProperty to SHORTNAME', function () {
      geoFeatures = geoFeatures.displayProperty('SHORTNAME');
      expect(geoFeatures.displayName).toEqual('SHORTNAME');
    });
    it('should return the same instance when display property is undefined', function () {
      expect(geoFeatures.displayProperty(undefined)).toBe(geoFeatures);
    });
    it('should throw when invalid displayProperty', function () {
      expect(function () {
        return geoFeatures.displayProperty('invalid');
      }).toThrow('Invalid display property: invalid');
    });
  });
  describe('getAll', function () {
    var mockApi;
    beforeEach(function () {
      mockApi = _Api.default.getApi();
    });
    afterEach(function () {
      _Api.default.mockReset();
    });
    it('should request geoFeature for one org. unit', function () {
      mockApi.get.mockReturnValue(Promise.resolve([]));
      geoFeatures = geoFeatures.byOrgUnit('YuQRtpLP10I').getAll();
      expect(mockApi.get).toBeCalledWith('geoFeatures', {
        ou: 'ou:YuQRtpLP10I'
      });
    });
    it('should request geoFeature for multiple org. units', function () {
      mockApi.get.mockReturnValue(Promise.resolve([]));
      geoFeatures = geoFeatures.byOrgUnit(['XuQRtpLP10I', 'YuQRtpLP10I']).getAll();
      expect(mockApi.get).toBeCalledWith('geoFeatures', {
        ou: 'ou:XuQRtpLP10I;YuQRtpLP10I'
      });
    });
    it('should request geoFeature using uid and SHORTNAME display property', function () {
      mockApi.get.mockReturnValue(Promise.resolve([]));
      geoFeatures = geoFeatures.byOrgUnit('YuQRtpLP10I').displayProperty('SHORTNAME').getAll();
      expect(mockApi.get).toBeCalledWith('geoFeatures', {
        ou: 'ou:YuQRtpLP10I',
        displayProperty: 'SHORTNAME'
      });
    });
    it('should request geoFeature using uid and extra URL parameter', function () {
      mockApi.get.mockReturnValue(Promise.resolve([]));
      geoFeatures = geoFeatures.byOrgUnit('YuQRtpLP10I').getAll({
        includeGroupSets: true
      });
      expect(mockApi.get).toBeCalledWith('geoFeatures', {
        ou: 'ou:YuQRtpLP10I',
        includeGroupSets: true
      });
    });
    it('should return an array of geoFeatures', function () {
      mockApi.get.mockReturnValue(Promise.resolve([{
        id: 'YuQRtpLP10I'
      }])); // Async test

      return geoFeatures.byOrgUnit('YuQRtpLP10I').getAll().then(function (features) {
        expect(features).toEqual([{
          id: 'YuQRtpLP10I'
        }]);
      });
    });
    it('should reject the promise with an error if a wrong org. unit has been requested', function (done) {
      mockApi.get.mockReturnValue(Promise.reject());
      return geoFeatures.byOrgUnit('LEVEL-20').getAll().then(function () {
        throw new Error('this should have failed');
      }).catch(function () {
        return done();
      });
    });
  });
});
//# sourceMappingURL=GeoFeatures.spec.js.map
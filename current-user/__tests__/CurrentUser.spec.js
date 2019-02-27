"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _CurrentUser = _interopRequireDefault(require("../../current-user/CurrentUser"));

var _UserAuthorities = _interopRequireDefault(require("../../current-user/UserAuthorities"));

var _UserSettings = _interopRequireDefault(require("../../current-user/UserSettings"));

var _defaultConfig = require("../../defaultConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CurrentUser', function () {
  var currentUser;
  var userData;
  var modelDefinitions;
  var mockUserAuthorities;
  beforeEach(function () {
    modelDefinitions = {
      userGroup: {
        list: jest.fn().mockReturnValue(Promise.resolve([])),
        authorities: [{
          type: 'CREATE_PUBLIC',
          authorities: ['F_USERGROUP_PUBLIC_ADD']
        }]
      },
      userRole: {
        list: jest.fn().mockReturnValue(Promise.resolve([]))
      },
      organisationUnit: {
        list: jest.fn().mockReturnValue(Promise.resolve([])),
        authorities: [{
          type: 'CREATE',
          authorities: ['F_ORGANISATIONUNIT_ADD']
        }, {
          type: 'DELETE',
          authorities: ['F_ORGANISATIONUNIT_DELETE']
        }]
      },
      organisationUnitLevel: {
        authorities: [{
          type: 'UPDATE',
          authorities: ['F_ORGANISATIONUNITLEVEL_UPDATE']
        }]
      },
      categoryOptionCombo: {
        name: 'categoryOptionCombo',
        authorities: [{
          type: 'CREATE',
          authorities: ['F_CATEGORY_COMBO_PUBLIC_ADD', 'F_CATEGORY_COMBO_PRIVATE_ADD']
        }, {
          type: 'DELETE',
          authorities: ['F_CATEGORY_COMBO_DELETE']
        }]
      }
    };

    _defaultConfig.noCreateAllowedFor.clear();

    _defaultConfig.noCreateAllowedFor.add('categoryOptionCombo');

    userData = _fixtures.default.get('/me');
    jest.spyOn(_UserAuthorities.default, 'create');
    mockUserAuthorities = ['F_ORGANISATIONUNIT_ADD', 'F_ORGANISATIONUNIT_DELETE', 'F_ORGANISATIONUNITLEVEL_UPDATE', 'F_USERGROUP_PUBLIC_ADD', 'F_CATEGORY_COMBO_PRIVATE_ADD'];
    currentUser = _CurrentUser.default.create(userData, mockUserAuthorities, modelDefinitions);
  });
  it('should be an instance of CurrentUser', function () {
    expect(currentUser).toBeInstanceOf(_CurrentUser.default);
  });
  it('should contain an instance of UserSettings', function () {
    expect(currentUser.userSettings).toBeInstanceOf(_UserSettings.default);
  });
  it('should have an authorities property', function () {
    expect(currentUser.authorities).toBeInstanceOf(_UserAuthorities.default);
  });
  describe('create', function () {
    it('should call create on UserAuthorities with the user authorities array', function () {
      expect(_UserAuthorities.default.create).toBeCalledWith(mockUserAuthorities);
    });
  });
  describe('properties', function () {
    it('should have set the properties from the data object', function () {
      expect(currentUser.name).toBe('John Traore');
      expect(currentUser.jobTitle).toBe('Super user');
    });
    it('should not override the authorities property', function () {
      currentUser = _CurrentUser.default.create({
        authorities: []
      }, ['ALL'], modelDefinitions);
      expect(currentUser.authorities).toBeInstanceOf(_UserAuthorities.default);
    });
  });
  describe('userCredentials', function () {
    it('should set the userCredentials properties onto the currentUser object', function () {
      expect(currentUser.username).toBe('admin');
    });
    it('should not set the userCredentials property onto the currentUser', function () {
      expect(currentUser.userCredentials).toBeUndefined();
    });
    it('should not modify the passed data object', function () {
      expect(userData.userCredentials).toBeDefined();
    });
    it('should keep the created date of the orignal user object', function () {
      expect(currentUser.created).toBe('2013-04-18T15:15:08.407+0000');
    });
  });
  describe('reference and collection properties', function () {
    it('userGroups should not exist', function () {
      expect(currentUser.userGroups).toBeUndefined();
    });
    it('userRoles should not exist', function () {
      expect(currentUser.userRoles).toBeUndefined();
    });
    it('organisationUnits should not exist', function () {
      expect(currentUser.organisationUnits).toBeUndefined();
    });
    it('dataViewOrganisationUnits should not exist', function () {
      expect(currentUser.dataViewOrganisationUnits).toBeUndefined();
    });
  });
  describe('getUserGroups', function () {
    it('should return a promise', function () {
      expect(currentUser.getUserGroups()).toBeInstanceOf(Promise);
    });
    it('should be called with the userGroup ids', function () {
      currentUser.getUserGroups();
      expect(modelDefinitions.userGroup.list).toBeCalledWith({
        filter: ['id:in:[vAvEltyXGbD,wl5cDMuUhmF,QYrzIjSfI8z,jvrEwEJ2yZn]'],
        paging: false
      });
    });
  });
  describe('getUserRoles', function () {
    it('should return a promise', function () {
      expect(currentUser.getUserRoles()).toBeInstanceOf(Promise);
    });
    it('should be called with the userRole ids', function () {
      currentUser.getUserRoles();
      expect(modelDefinitions.userRole.list).toBeCalledWith({
        filter: ['id:in:[Ufph3mGRmMo]'],
        paging: false
      });
    });
  });
  describe('getOrganisationUnits', function () {
    it('should return a promise', function () {
      expect(currentUser.getOrganisationUnits()).toBeInstanceOf(Promise);
    });
    it('should be called with organisationUnit ids', function () {
      currentUser.getOrganisationUnits();
      expect(modelDefinitions.organisationUnit.list).toBeCalledWith({
        fields: ':all,displayName,path,children[id,displayName,path,children::isNotEmpty]',
        filter: ['id:in:[ImspTQPwCqd]'],
        paging: false
      });
    });
  });
  describe('getDataViewOrganisationUnits', function () {
    it('should return a promise', function () {
      expect(currentUser.getDataViewOrganisationUnits()).toBeInstanceOf(Promise);
    });
    it('should be called with organisationUnit ids', function () {
      currentUser.getDataViewOrganisationUnits();
      expect(modelDefinitions.organisationUnit.list).toBeCalledWith({
        fields: ':all,displayName,path,children[id,displayName,path,children::isNotEmpty]',
        filter: ['id:in:[]'],
        paging: false
      });
    });
  });
  describe('canCreate', function () {
    it('should return false if the no model is passed', function () {
      expect(currentUser.canCreate()).toBe(false);
    });
    it('should return false for userRole', function () {
      expect(currentUser.canCreate(modelDefinitions.userRole)).toBe(false);
    });
    it('should return true for organisationUnit', function () {
      expect(currentUser.canCreate(modelDefinitions.organisationUnit)).toBe(true);
    });
    it('should return for userGroup', function () {
      expect(currentUser.canCreate(modelDefinitions.userGroup)).toBe(true);
    });
    it('should return false when the modelDefinition is in the noCreateAllowedFor list', function () {
      expect(currentUser.canCreate(modelDefinitions.categoryOptionCombo)).toBe(false);
    });
  });
  describe('canDelete', function () {
    it('should return false if the no model is passed', function () {
      expect(currentUser.canDelete()).toBe(false);
    });
    it('should return false for userGroup', function () {
      expect(currentUser.canDelete(modelDefinitions.userGroup)).toBe(false);
    });
    it('should return true for organisationUnit', function () {
      expect(currentUser.canDelete(modelDefinitions.organisationUnit)).toBe(true);
    });
  });
  describe('canUpdate', function () {
    it('should return false if no model is passed', function () {
      expect(currentUser.canUpdate()).toBe(false);
    });
    it('should return false for userRole', function () {
      expect(currentUser.canCreate(modelDefinitions.userRole)).toBe(false);
    });
    it('should return true for userGroup', function () {
      expect(currentUser.canUpdate(modelDefinitions.userGroup)).toBe(true);
    });
    it('should return true for organisationUnitLevel', function () {
      expect(currentUser.canUpdate(modelDefinitions.organisationUnitLevel)).toBe(true);
    });
  });
  describe('canCreatePublic', function () {
    it('should return false if no model is passed', function () {
      expect(currentUser.canCreatePublic()).toBe(false);
    });
    it('should return false for userGroup', function () {
      expect(currentUser.canCreatePublic(modelDefinitions.userGroup)).toBe(true);
    });
    it('should return false for userGroup ' + 'even when the user has the authority due to the presence in the ignore list', function () {
      _defaultConfig.noCreateAllowedFor.add('userGroup');

      expect(currentUser.canCreatePrivate(modelDefinitions.userGroup)).toBe(false);
    });
  });
  describe('canCreatePrivate', function () {
    it('should return false if no model is passed', function () {
      expect(currentUser.canCreatePrivate()).toBe(false);
    });
    it('should return false for userGroup', function () {
      expect(currentUser.canCreatePrivate(modelDefinitions.userGroup)).toBe(false);
    });
  });
});
//# sourceMappingURL=CurrentUser.spec.js.map
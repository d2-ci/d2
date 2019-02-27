"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _Api = _interopRequireDefault(require("../../api/Api"));

var _System = _interopRequireDefault(require("../System"));

var _SystemConfiguration = _interopRequireDefault(require("../SystemConfiguration"));

var _SystemSettings = _interopRequireDefault(require("../SystemSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jest.mock('../../api/Api');
describe('System', function () {
  var system;
  var apiMock;
  beforeEach(function () {
    apiMock = new _Api.default();
    system = new _System.default(new _SystemSettings.default(), new _SystemConfiguration.default());
  });
  afterEach(function () {
    _Api.default.mockReset();
  });
  it('should be an instance of System', function () {
    expect(system).toBeInstanceOf(_System.default);
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _System.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should contain an instance of SystemConfiguration', function () {
    expect(system.configuration).toBeInstanceOf(_SystemConfiguration.default);
  });
  it('should contain an instance of SystemSettings', function () {
    expect(system.settings).toBeInstanceOf(_SystemSettings.default);
  });
  describe('loadInstalledApps()', function () {
    var appsFromApi;
    beforeEach(function () {
      appsFromApi = [{
        version: '0.4.8',
        name: 'Data Approval',
        description: 'Approvals app for PEPFAR',
        icons: {
          48: 'img/icons/dataapproval.png'
        },
        developer: {
          url: 'http://www.dhis2.org',
          name: 'Mark Polak',
          company: 'DHIS2 Core Team',
          email: 'markpo@ifi.uio.no'
        },
        activities: {
          dhis: {
            href: 'http://localhost:8080/dhis'
          }
        },
        folderName: 'approvals',
        launchUrl: 'http://localhost:8080/dhis/api/apps/approvals/index.html?v=0.4.8',
        key: 'approvals',
        launch_path: 'index.html?v=0.4.8',
        default_locale: 'en'
      }, {
        version: '0.0.1',
        name: 'Data Export Log',
        description: 'Data export log viewer',
        icons: {
          48: 'icons/export.png'
        },
        developer: {
          url: '',
          name: 'Mark Polak'
        },
        activities: {
          dhis: {
            href: 'http://localhost:8080/dhis'
          }
        },
        folderName: 'data-export-log',
        launchUrl: 'http://localhost:8080/dhis/api/apps/data-export-log/index.html?1.0.0-rc1',
        key: 'data-export-log',
        launch_path: 'index.html?1.0.0-rc1',
        default_locale: 'en'
      }];
      apiMock.get = jest.fn().mockReturnValue(Promise.resolve(appsFromApi));
    });
    it('should set the list of installed apps onto the Settings object', function () {
      return system.loadInstalledApps().then(function () {
        expect(system.installedApps).toEqual(appsFromApi);
      });
    });
    it('should reject the promise if the request fails', function () {
      apiMock.get = jest.fn().mockReturnValue(Promise.reject('Apps can not be loaded'));
      return system.loadInstalledApps().catch(function (error) {
        return error;
      }).then(function (message) {
        expect(message).toBe('Apps can not be loaded');
      });
    });
    it('should resolve with the returned list of apps', function () {
      return system.loadInstalledApps().then(function (apps) {
        expect(apps).toEqual(appsFromApi);
      });
    });
  });
  describe('uploadApp()', function () {
    var appendSpy;
    var formData;
    beforeEach(function () {
      jest.spyOn(apiMock, 'post').mockReturnValue(Promise.resolve()); // Fake FormData object

      appendSpy = jest.fn();
      formData = {
        append: appendSpy
      }; // Fake formData global constructor

      global.FormData = function FormData() {
        return formData;
      };
    });
    afterEach(function () {
      global.FormData = undefined;
    });
    it('should be a function on the system object', function () {
      expect(_typeof(system.uploadApp)).toBe('function');
    });
    it('should call the post with the correct options', function () {
      var xhrOptions = {
        contentType: false,
        processData: false,
        xhr: undefined
      };
      system.uploadApp('ZipFile');
      expect(apiMock.post).toBeCalledWith('apps', formData, xhrOptions);
    });
    it('should call append on the formData object to add the file to upload', function () {
      system.uploadApp('ZipFile');
      expect(formData.append).toBeCalledWith('file', 'ZipFile');
    });
    describe('xhr', function () {
      var progressCallbackSpy;
      var xhrMock;
      beforeEach(function () {
        progressCallbackSpy = jest.fn();
        xhrMock = {
          upload: {}
        };

        global.XMLHttpRequest = function XMLHttpRequest() {
          return xhrMock;
        };
      });
      afterEach(function () {
        global.XMLHttpRequest = undefined;
      });
      it('should pass custom XMLHttpRequest Object with an on progress callback as an option', function () {
        system.uploadApp('ZipFile', progressCallbackSpy);
        expect(_typeof(apiMock.post.mock.calls[0][2].xhr)).toBe('function');
        expect(apiMock.post.mock.calls[0][2].xhr.call()).toBe(xhrMock);
      });
      it('should define the onprogress function onto the upload object of the xhr', function () {
        system.uploadApp('ZipFile', progressCallbackSpy);
        expect(_typeof(xhrMock.upload.onprogress)).toBe('function');
      });
      it('should not call the callback if the progress can not be computed', function () {
        system.uploadApp('ZipFile', progressCallbackSpy);
        xhrMock.upload.onprogress({});
        expect(progressCallbackSpy).not.toBeCalled();
      });
      it('should call the callback spy if the progress can be computed', function () {
        system.uploadApp('ZipFile', progressCallbackSpy);
        xhrMock.upload.onprogress({
          lengthComputable: true,
          loaded: 10,
          total: 50
        });
        expect(progressCallbackSpy).toBeCalledWith(0.2);
      });
    });
  });
  describe('loadAppStore()', function () {
    // Useful constants!
    var sysVersionMinusTwo = '2.26';
    var sysVersionMinusOne = '2.27';
    var sysVersion = '2.28';
    var sysVersionPlusOne = '2.29';
    var sysVersionPlusTwo = '2.30';
    beforeEach(function () {
      system.setSystemInfo({
        version: sysVersion
      });
      jest.spyOn(apiMock, 'get').mockReturnValue(Promise.resolve(_fixtures.default.get('/appStore')));
    });
    it('should be a function on the system object', function () {
      expect(_typeof(system.loadAppStore)).toBe('function');
    });
    it('should return a promise', function () {
      expect(system.loadAppStore()).toBeInstanceOf(Promise);
    });
    it('should request the api for the appStore', function () {
      system.loadAppStore();
      expect(apiMock.get).toBeCalledWith('appStore');
    });
    it('should return the compatible apps from the api', function () {
      // Apps 3 and 6 are compatible with 2.28
      var expectedApps = _fixtures.default.get('/appStore').filter(function (app, i) {
        return [3, 6].includes(i);
      });

      return system.loadAppStore().then(function (apps) {
        expect(apps).toEqual(expectedApps);
      });
    });
    describe('with version 2.24', function () {
      beforeEach(function () {
        system.setSystemInfo({
          version: '2.24'
        });
      });
      it('should return the compatible apps from the API', function () {
        // Apps 2, 4 and 6 are compatible with 2.24
        var expectedApps = _fixtures.default.get('/appStore').filter(function (app, i) {
          return [2, 4, 6].includes(i);
        });

        return system.loadAppStore().then(function (apps) {
          expect(apps).toEqual(expectedApps);
        });
      });
    });
    describe('with version 2.25', function () {
      beforeEach(function () {
        system.setSystemInfo({
          version: '2.25'
        });
      });
      it('should return the compatible apps from the API', function () {
        // Apps 1, 2, 4, 5 and 6 are compatible with 2.25
        var expectedApps = _fixtures.default.get('/appStore').filter(function (app, i) {
          return [1, 2, 4, 5, 6].includes(i);
        });

        return system.loadAppStore().then(function (apps) {
          expect(apps).toEqual(expectedApps);
        });
      });
    });
    it('should return the compatible apps', function () {
      // const returnedApps = fixtures.get('/appStore');
      var returnedApps = [{
        versions: [// One version compatible
        {
          min_platform_version: sysVersionMinusTwo,
          max_platform_version: sysVersionMinusOne
        }, {
          min_platform_version: sysVersionMinusOne
        }]
      }, {
        versions: [// Both incompatible
        {
          min_platform_version: sysVersionPlusOne,
          max_platform_version: sysVersionPlusTwo
        }, {
          min_platform_version: sysVersionPlusTwo
        }]
      }, {
        versions: [// Compatible
        {
          min_platform_version: sysVersionMinusOne
        }]
      }, {
        versions: [// Incompatible
        {
          max_platform_version: sysVersionMinusOne
        }]
      }, {
        versions: [// One version compatible
        {
          minDhisVersion: sysVersionMinusTwo,
          maxDhisVersion: sysVersionMinusOne
        }, {
          minDhisVersion: sysVersionMinusOne
        }]
      }, {
        versions: [// Both incompatible
        {
          minDhisVersion: sysVersionPlusOne,
          maxDhisVersion: sysVersionPlusTwo
        }, {
          minDhisVersion: sysVersionPlusTwo
        }]
      }, {
        versions: [// Compatible
        {
          minDhisVersion: sysVersionMinusOne
        }]
      }, {
        versions: [// Incompatible
        {
          maxDhisVersion: sysVersionMinusOne
        }]
      }];
      apiMock.get.mockReturnValue(Promise.resolve(returnedApps));
      return system.loadAppStore().then(function (apps) {
        expect(apps.length).toBe(4);
      });
    });
    it('should return all the apps when compatibility flag is set to false', function () {
      return system.loadAppStore(false).then(function (apps) {
        expect(apps.length).toBe(_fixtures.default.get('/appStore').length);
      });
    });
    it('should reject the promise when the request fails', function () {
      apiMock.get.mockReturnValue(Promise.reject('Request for appStore failed'));
      return system.loadAppStore().catch(function (error) {
        return error;
      }).then(function (error) {
        expect(error).toBe('Request for appStore failed');
      });
    });
    it('should reject the promise when system.version is not set', function () {
      system.version = undefined;
      return system.loadAppStore().catch(function (error) {
        return error;
      }).then(function (error) {
        expect(error.message).toBe('Cannot read property \'major\' of undefined');
      });
    });
  });
  describe('installAppVersion()', function () {
    beforeEach(function () {
      apiMock.post.mockReturnValue(Promise.resolve(''));
    });
    it('should be a function on the system object', function () {
      expect(_typeof(system.installAppVersion)).toBe('function');
    });
    it('should reject the promise when the request fails', function () {
      apiMock.post.mockReturnValue(Promise.reject('Request for installation failed'));
      return system.installAppVersion('PyYnjVl5iGt').catch(function (error) {
        return error;
      }).then(function (errorMessage) {
        expect(errorMessage).toBe('Request for installation failed');
      });
    });
    it('should call the api with the correct url', function () {
      return system.installAppVersion('PyYnjVl5iGt').then(function () {
        expect(apiMock.post).toBeCalledWith('appStore/PyYnjVl5iGt', '', {
          dataType: 'text'
        });
      });
    });
    it('should resolve the promise without a value', function () {
      return system.installAppVersion('PyYnjVl5iGt').then(function (response) {
        expect(response).toBeUndefined();
      });
    });
  });
  describe('uninstallApp()', function () {
    beforeEach(function () {
      apiMock.delete = jest.fn().mockReturnValue(Promise.resolve({}));
    });
    it('should be a function on the system object', function () {
      expect(_typeof(system.uninstallApp)).toBe('function');
    });
    it('should call the api.delete method with the correct url', function () {
      return system.uninstallApp('PyYnjVl5iGt').then(function () {
        expect(apiMock.delete).toBeCalledWith('apps/PyYnjVl5iGt');
      });
    });
    it('should resolve the request even when the api request fails', function () {
      apiMock.delete = jest.fn().mockReturnValue(Promise.reject({}));
      return system.uninstallApp('PyYnjVl5iGt');
    });
  });
  describe('reloadApps()', function () {
    beforeEach(function () {
      jest.spyOn(apiMock, 'update').mockReturnValue(Promise.resolve());
      jest.spyOn(system, 'loadInstalledApps').mockReturnValueOnce(Promise.resolve());
    });
    it('should be a function on the system object', function () {
      expect(_typeof(system.reloadApps)).toBe('function');
    });
    it('should call the update method on the api', function () {
      return system.reloadApps().then(function () {
        expect(apiMock.update.mock.calls[0][0]).toBe('apps');
      });
    });
    it('should call system.loadInstalledApps on success ', function () {
      return system.reloadApps().then(function () {
        expect(system.loadInstalledApps).toBeCalled();
      });
    });
    it('should chain the promise from loadInstalledApps', function () {
      var loadInstalledAppsPromise = Promise.resolve('Apps loaded');
      system.loadInstalledApps.mockReset();
      system.loadInstalledApps.mockReturnValue(loadInstalledAppsPromise);
      return system.reloadApps().then(function (message) {
        return expect(message).toBe('Apps loaded');
      });
    });
    it('should not call loadInstalledApps when the update request fails', function () {
      apiMock.update.mockReturnValue(Promise.reject());
      jest.spyOn(system, 'loadInstalledApps');
      return system.reloadApps().catch(function (message) {
        return message;
      }).then(function () {
        expect(system.loadInstalledApps).not.toBeCalled();
      });
    });
  });
  describe('compareVersions()', function () {
    var systemVersion;
    var appVersion;
    beforeEach(function () {
      systemVersion = {
        major: 2,
        minor: 23,
        snapshot: true
      };
      appVersion = {
        major: 2,
        minor: 23,
        snapshot: true
      };
    });
    it('should be a function on the system class', function () {
      expect(_typeof(_System.default.compareVersions)).toBe('function');
    });
    it('should return 0 for equal versions', function () {
      expect(_System.default.compareVersions(systemVersion, appVersion)).toBe(0);
    });
    it('should return 1 for a larger major system version', function () {
      systemVersion.major = 3;
      expect(_System.default.compareVersions(systemVersion, appVersion)).toBe(1);
    });
    it('should return 1 for a larger minor version', function () {
      systemVersion.minor = 24;
      expect(_System.default.compareVersions(systemVersion, appVersion)).toBe(1);
    });
    it('should return 1 when the app is a snapshot version', function () {
      systemVersion.snapshot = false;
      appVersion.snapshot = true;
      expect(_System.default.compareVersions(systemVersion, appVersion)).toBe(1);
    });
    it('should return -1 when the app is not a snapshot', function () {
      systemVersion.snapshot = true;
      appVersion.snapshot = false;
      expect(_System.default.compareVersions(systemVersion, appVersion)).toBe(-1);
    });
    it('should do correct comparison when a string is passed as a version', function () {
      expect(_System.default.compareVersions('2.15', '2.16')).toBe(-1);
      expect(_System.default.compareVersions('2.20-SNAPSHOT', '2.16')).toBe(4);
    });
  });
  describe('isVersionCompatible()', function () {
    var appVersion;
    var systemVersion;
    beforeEach(function () {
      jest.spyOn(_System.default, 'compareVersions');
      appVersion = {
        min_platform_version: '2.23',
        max_platform_version: '2.23'
      };
      systemVersion = '2.23';
    });
    afterEach(function () {
      _System.default.compareVersions.mockRestore();
    });
    it('should return false when the app is too new', function () {
      expect(_System.default.isVersionCompatible(systemVersion, Object.assign(appVersion, {
        min_platform_version: '2.24'
      }))).toBe(false);
    });
    it('should return false when the app is too old', function () {
      expect(_System.default.isVersionCompatible(systemVersion, Object.assign(appVersion, {
        max_platform_version: '2.22'
      }))).toBe(false);
    });
    it('should return true when the system version is within the app version range', function () {
      appVersion.min_platform_version = '2.20';
      appVersion.max_platform_version = '2.25';
      expect(_System.default.isVersionCompatible(systemVersion, appVersion));
    });
    it('should return true when no version bounds are given', function () {
      appVersion = {};
      expect(_System.default.isVersionCompatible(systemVersion, appVersion)).toBe(true);
    });
    it('should return false when the version is not compatible', function () {
      expect(_System.default.isVersionCompatible('2.22', {
        min_platform_version: '2.17',
        max_platform_version: '2.20'
      })).toBe(false);
    });
    describe('with 2.28 app version format', function () {
      beforeEach(function () {
        appVersion = {
          minDhisVersion: '2.22',
          maxDhisVersion: '2.23-SNAPSHOT'
        };
        systemVersion = '2.23';
      });
      it('should return false when the app is too new', function () {
        expect(_System.default.isVersionCompatible(systemVersion, Object.assign(appVersion, {
          minDhisVersion: '2.24'
        }))).toBe(false);
      });
      it('should return false when the app is too old', function () {
        expect(_System.default.isVersionCompatible(systemVersion, Object.assign(appVersion, {
          maxDhisVersion: '2.22'
        }))).toBe(false);
      });
      it('should return true when the system version is within the app version range', function () {
        appVersion.minDhisVersion = '2.20';
        appVersion.maxDhisVersion = '2.25';
        expect(_System.default.isVersionCompatible(systemVersion, appVersion));
      });
      it('should return true when no version bounds are given', function () {
        appVersion = {};
        expect(_System.default.isVersionCompatible(systemVersion, appVersion)).toBe(true);
      });
      it('should return false when the version is not compatible', function () {
        expect(_System.default.isVersionCompatible('2.22', {
          minDhisVersion: '2.17',
          maxDhisVersion: '2.20'
        })).toBe(false);
      });
    });
  });
  describe('getSystem', function () {
    it('should return the same instance on consecutive requests', function () {
      expect(_System.default.getSystem()).toBe(_System.default.getSystem());
    });
  });
});
//# sourceMappingURL=System_spec.js.map
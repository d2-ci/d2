"use strict";

var _Api = _interopRequireDefault(require("../../api/Api"));

var _SystemConfiguration = _interopRequireDefault(require("../SystemConfiguration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('../../api/Api');
describe('System.configuration', function () {
  var configuration;
  var mockApi;
  var mockConfiguration = {
    systemId: 'eed3d451-4ff5-4193-b951-ffcc68954299',
    feedbackRecipients: {
      name: 'Feedback Message Recipients',
      created: '2011-12-25T16:52:04.409+0000',
      lastUpdated: '2015-10-19T10:27:27.636+0000',
      externalAccess: false,
      user: {
        name: 'John Traore',
        created: '2013-04-18T17:15:08.407+0000',
        lastUpdated: '2015-09-14T20:18:28.355+0000',
        externalAccess: false,
        id: 'xE7jOejl9FI'
      },
      id: 'QYrzIjSfI8z'
    },
    offlineOrganisationUnitLevel: {
      name: 'Chiefdom',
      created: '2011-12-24T12:24:22.935+0000',
      lastUpdated: '2015-08-09T12:58:05.001+0000',
      externalAccess: false,
      id: 'tTUf91fCytl'
    },
    infrastructuralIndicators: {
      name: 'Staffing',
      created: '2013-04-18T14:36:27.000+0000',
      lastUpdated: '2013-04-18T14:36:27.000+0000',
      externalAccess: false,
      publicAccess: 'rw------',
      id: 'EdDc97EJUdd'
    },
    infrastructuralDataElements: {
      name: 'Population Estimates',
      created: '2011-12-24T12:24:24.298+0000',
      lastUpdated: '2013-03-15T16:08:56.135+0000',
      externalAccess: false,
      publicAccess: 'rw------',
      id: 'sP7jTt3YGBb'
    },
    infrastructuralPeriodType: 'Yearly',
    selfRegistrationRole: {
      name: 'Guest',
      created: '2012-11-13T15:56:23.510+0000',
      lastUpdated: '2015-01-20T11:32:40.188+0000',
      externalAccess: false,
      id: 'XS0dNzuZmfH'
    },
    selfRegistrationOrgUnit: {
      code: 'OU_525',
      name: 'Sierra Leone',
      created: '2012-11-13T12:20:53.028+0000',
      lastUpdated: '2015-04-24T11:21:00.090+0000',
      externalAccess: false,
      user: {
        name: 'Tom Wakiki',
        created: '2012-11-21T12:02:04.303+0000',
        lastUpdated: '2015-10-19T10:27:27.567+0000',
        externalAccess: false,
        id: 'GOLswS44mh8'
      },
      id: 'ImspTQPwCqd'
    },
    corsWhitelist: ['http://cors1.example.com', 'https://cors2.example.com'],
    remoteServerUrl: 'https://apps.dhis2.org/demo',
    remoteServerUsername: 'admin'
  };
  var mockCorsWhitelistText = 'http://cors1.example.com\nhttps://cors2.example.com';
  beforeEach(function () {
    mockApi = _Api.default.getApi();

    _Api.default.mockClear();

    configuration = new _SystemConfiguration.default();
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _SystemConfiguration.default)();
    }).toThrowErrorMatchingSnapshot();
  });
  it('should add the mockApi onto the SystemConfiguration instance', function () {
    expect(configuration.api).toBe(mockApi);
  });
  it('all() should be a function', function () {
    expect(configuration.all).toBeInstanceOf(Function);
  });
  it('get() should be a function', function () {
    expect(configuration.get).toBeInstanceOf(Function);
  });
  it('should use the api object when it is passed', function () {
    var apiMockObject = {};
    configuration = new _SystemConfiguration.default(apiMockObject);
    expect(configuration.api).toBe(apiMockObject);
  });
  describe('API call', function () {
    beforeEach(function () {
      mockApi.get.mockImplementation(function (url) {
        if (url === 'configuration') {
          return Promise.resolve(mockConfiguration);
        }

        return Promise.reject();
      });
      mockApi.post.mockReturnValue(Promise.resolve());
      mockApi.delete.mockReturnValue(Promise.resolve());
    });
    afterEach(function () {
      configuration = new _SystemConfiguration.default();
    });
    describe('.all()', function () {
      it('should return the entire config', function () {
        expect.assertions(1);
        return configuration.all().then(function (res) {
          expect(res).toEqual(mockConfiguration);
        });
      });
      it('should query the API for all configuration endpoints', function () {
        configuration.all();
        expect(mockApi.get).toHaveBeenCalledTimes(1);
        expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
      });
      it('should only call the API once', function () {
        expect.assertions(4);
        return configuration.all().then(function () {
          configuration.all().then(function () {
            expect(mockApi.get).toHaveBeenCalledTimes(1);
            expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
          });
          expect(mockApi.get).toHaveBeenCalledTimes(1);
          expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
        });
      });
      it('should call the API again if ignoreCache is true', function () {
        expect.assertions(5);
        return configuration.all(true).then(function () {
          expect(mockApi.get).toHaveBeenCalledTimes(1);
          expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
          return configuration.all(true).then(function () {
            expect(mockApi.get).toHaveBeenCalledTimes(2);
            expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
            expect(mockApi.get.mock.calls[1][0]).toBe('configuration');
          });
        });
      });
    });
    describe('.get()', function () {
      it('should return the correct systemId', function () {
        expect.assertions(1);
        return configuration.get('systemId').then(function (res) {
          expect(res).toBe(mockConfiguration.systemId);
        });
      });
      it('should return the correct feedback recipient user group', function () {
        expect.assertions(1);
        return configuration.get('feedbackRecipients').then(function (res) {
          expect(res).toBe(mockConfiguration.feedbackRecipients);
        });
      });
      it('should only query the API once', function () {
        expect.assertions(4);
        return configuration.get('systemId').then(function (res1) {
          expect(res1).toBe(mockConfiguration.systemId);
          expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
          configuration.get('systemId').then(function (res2) {
            expect(res2).toBe(mockConfiguration.systemId);
            expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
          });
        });
      });
      it('should query the API twice if ignoreCache is true', function () {
        expect.assertions(4);
        return configuration.get('systemId', true).then(function (res1) {
          expect(res1).toBe(mockConfiguration.systemId);
          expect(mockApi.get.mock.calls[0][0]).toBe('configuration');
          configuration.get('systemId', true).then(function (res2) {
            expect(res2).toBe(mockConfiguration.systemId);
            expect(mockApi.get.mock.calls[1][0]).toBe('configuration');
          });
        });
      });
      it('should throw an error when asked for an unknown config option', function () {
        expect.assertions(1);
        return configuration.get('someRandomOptionThatDoesntExist').catch(function (err) {
          expect(err).toMatchSnapshot();
        });
      });
    });
    describe('.set()', function () {
      it('should not be able to change the systemId', function () {
        expect.assertions(1);
        return configuration.set('systemId', 'my-random-system-id').catch(function (err) {
          expect(err).toMatchSnapshot();
        });
      });
      it('should not attempt to change unknown settings', function () {
        expect.assertions(1);
        return configuration.set('completelyCrazyConfigurationOption', 'totally rediculous value').then(function () {
          // TODO: useless assertion
          expect(true).toBe(true);
        });
      });
      it('should call DELETE to remove feedback recipients', function () {
        expect.assertions(3);
        return configuration.set('feedbackRecipients', 'null').then(function () {
          expect(mockApi.post).toHaveBeenCalledTimes(0);
          expect(mockApi.delete).toHaveBeenCalledTimes(1);
          expect(mockApi.delete.mock.calls[0][0]).toBe('configuration/feedbackRecipients');
        });
      });
      it('should call DELETE to remove self registration role', function () {
        expect.assertions(2);
        return configuration.set('selfRegistrationRole', null).then(function () {
          expect(mockApi.post).toHaveBeenCalledTimes(0);
          expect(mockApi.delete.mock.calls[0][0]).toBe('configuration/selfRegistrationRole');
        });
      });
      it('should call DELETE to remove self registration organisation unit', function () {
        expect.assertions(2);
        return configuration.set('selfRegistrationOrgUnit', 'null').then(function () {
          expect(mockApi.post).toHaveBeenCalledTimes(0);
          expect(mockApi.delete.mock.calls[0][0]).toBe('configuration/selfRegistrationOrgUnit');
        });
      });
      it('should convert CORS string to an array', function () {
        return configuration.set('corsWhitelist', mockCorsWhitelistText).then(function () {
          expect(mockApi.post.mock.calls[0][0]).toBe('configuration/corsWhitelist');
          expect(mockApi.post.mock.calls[0][1]).toEqual(mockConfiguration.corsWhitelist);
        });
      });
      it('should post new settings to the API', function () {
        mockApi.post.mockClear();
        return configuration.set('infrastructuralPeriodType', 'Monthly').then(function () {
          expect(mockApi.post.mock.calls[0][0]).toBe('configuration/infrastructuralPeriodType');
          expect(mockApi.post.mock.calls[0][1]).toBe('Monthly');
        });
      });
      it('should reject a promise when no configuration can be found for the key', function () {
        mockApi.post.mockReset();
        mockApi.post.mockReturnValue(Promise.reject('StackTrace!'));
        return configuration.set('thisKeyDoesNotExist', 'Some value').catch(function (message) {
          return message;
        }).then(function (message) {
          expect(message).toBe('No configuration found for thisKeyDoesNotExist');
        });
      });
    });
  });
});
//# sourceMappingURL=SystemConfiguration_spec.js.map
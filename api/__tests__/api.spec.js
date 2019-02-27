"use strict";

var _formData = _interopRequireDefault(require("form-data"));

var _System = _interopRequireDefault(require("../../system/System"));

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _Api = _interopRequireDefault(require("../Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jest.mock('../../system/System');
describe('Api', function () {
  var fetchMock;
  var api;
  var baseFetchOptions;
  beforeEach(function () {
    fetchMock = jest.fn().mockReturnValue(Promise.resolve({
      ok: true,
      text: function text() {
        return Promise.resolve(_fixtures.default.get('/api/schemas/dataElement'));
      }
    }));
    api = new _Api.default(fetchMock);
    baseFetchOptions = Object.assign({
      method: 'GET'
    }, {
      headers: new Headers({
        'x-requested-with': 'XMLHttpRequest'
      })
    }, api.defaultFetchOptions);
    _System.default.getSystem = jest.fn().mockReturnValue({
      version: {
        major: 2,
        minor: 25
      }
    });
  });
  afterEach(function () {
    _System.default.getSystem.mockReset();
  });
  it('should be an function', function () {
    expect(_Api.default).toBeInstanceOf(Function);
  });
  it('should create a new instance of Api', function () {
    expect(new _Api.default(fetchMock)).toBeInstanceOf(_Api.default);
  });
  it('should have a baseUrl property that is set to /api', function () {
    expect(new _Api.default(fetchMock).baseUrl).toBe('/api');
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _Api.default)(fetchMock);
    }).toThrowErrorMatchingSnapshot();
  });
  describe('when fetch is not supported', function () {
    var wasFetch;
    beforeEach(function () {
      wasFetch = (window || global).fetch;
      if (window !== undefined) window.fetch = undefined;
      if (global !== undefined) global.fetch = undefined;
    });
    afterEach(function () {
      if (window !== undefined) window.fetch = wasFetch;
      if (global !== undefined) global.fetch = wasFetch;
    });
    it('should throw', function () {
      expect(function () {
        return new _Api.default();
      }).toThrowError();
    });
  });
  describe('getApi', function () {
    it('should have a method to get an instance of Api', function () {
      expect(_Api.default.getApi).toBeInstanceOf(Function);
    });
    it('should return a singleton', function () {
      expect(_Api.default.getApi()).toBe(_Api.default.getApi());
    });
  });
  describe('setBaseUrl', function () {
    beforeEach(function () {
      api = new _Api.default(function () {});
    });
    it('should be a method', function () {
      expect(api.setBaseUrl).toBeInstanceOf(Function);
    });
    it('should throw when the base url provided is not a string', function () {
      function shouldThrow() {
        api.setBaseUrl();
      }

      expect(shouldThrow).toThrowError('Base url should be provided');
    });
    it('should set the baseUrl property on the object', function () {
      api.setBaseUrl('/dhis/api');
      expect(api.baseUrl).toBe('/dhis/api');
    });
  });
  describe('setUnauthorizedCallback', function () {
    beforeEach(function () {
      api = new _Api.default(function () {});
    });
    it('should be a method', function () {
      expect(api.setUnauthorizedCallback).toBeInstanceOf(Function);
    });
    it('should throw when the base url provided is not a function', function () {
      function shouldThrow() {
        api.setUnauthorizedCallback('asf');
      }

      expect(shouldThrow).toThrowError('Callback must be a function.');
    });
    it('should set the unauthorizedCallback property on the object', function () {
      var cb = function cb() {};

      api.setUnauthorizedCallback(cb);
      expect(api.unauthorizedCallback).toBe(cb);
    });
  });
  describe('request()', function () {
    it('should handle responses in plain text format', function () {
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: true,
        text: function text() {
          return Promise.resolve('this is not valid json');
        }
      }));
      expect.assertions(1);
      return api.get('text').then(function (result) {
        expect(result).toBe('this is not valid json');
      });
    });
    it('should handle responses in JSON format', function () {
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: true,
        text: function text() {
          return Promise.resolve('"this is a JSON string"');
        }
      }));
      expect.assertions(1);
      return api.get('json').then(function (result) {
        expect(result).toBe('this is a JSON string');
      });
    });
    it('should handle complex JSON objects', function () {
      var data = {
        id: '12345',
        name: 'bla bla',
        isEmpty: false,
        subObj: {
          a: true,
          b: false
        }
      };
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: true,
        text: function text() {
          return Promise.resolve(JSON.stringify(data));
        }
      }));
      expect.assertions(1);
      return api.get('json').then(function (result) {
        expect(result).toEqual(data);
      });
    });
    it('should report network errors', function () {
      fetchMock.mockReturnValueOnce(Promise.reject(new TypeError('Failed to fetch-o')));
      expect.assertions(2);
      return api.get('http://not.a.real.server/hi').catch(function (err) {
        expect(_typeof(err)).toBe('string');
        expect(err).toContain('failed');
      });
    });
    it('should report 404 errors', function () {
      var errorText = ['{', '"httpStatus":"Not Found",', '"httpStatusCode":404,', '"status":"ERROR",', '"message":"DataElement with id 404 could not be found."', '}'].join('');
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: false,
        status: 404,
        text: function text() {
          return Promise.resolve(errorText);
        }
      }));
      expect.assertions(2);
      return api.get('dataElements/404').catch(function (err) {
        expect(_typeof(err)).toBe('object');
        expect(err).toEqual(JSON.parse(errorText));
      });
    });
    it('should handle 401', function () {
      var response = {
        httpStatus: 'Unauthorized',
        httpStatusCode: 401,
        status: 'ERROR',
        message: 'Unauthorized'
      };
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: false,
        status: 401,
        text: function text() {
          return Promise.resolve(response);
        }
      }));
      expect.assertions(2);
      return api.get('dataElements/401').catch(function (err) {
        expect(_typeof(err)).toBe('object');
        expect(err).toEqual(response);
      });
    });
    it('401 should call unauthorizedCb if set', function () {
      var cb = jest.fn();
      api.setUnauthorizedCallback(cb);
      var response = {
        httpStatus: 'Unauthorized',
        httpStatusCode: 401,
        status: 'ERROR',
        message: 'Unauthorized'
      };
      var req = Promise.resolve({
        ok: false,
        status: 401,
        text: function text() {
          return Promise.resolve(response);
        }
      });
      fetchMock.mockReturnValueOnce(req);
      expect.assertions(2);
      api.get('dataElements/401').catch(function () {
        expect(cb).toBeCalled();
        expect(cb).toHaveBeenCalledWith(expect.objectContaining({
          method: 'GET',
          options: {},
          url: '/api/dataElements/401'
        }), response);
      });
    });
    it('should report 500 errors', function () {
      var errorText = ['{', '"httpStatus":"Internal Server Error",', '"httpStatusCode":500,', '"status":"ERROR",', '"message":', '"object references an unsaved transient instance - save the transient instance before flushing: ', 'org.hisp.dhis.dataelement.CategoryOptionGroupSet"', '}'].join('');
      var data = ['{', '"name":"District Funding Agency",', '"orgUnitLevel":2,', '"categoryOptionGroupSet":{"id":"SooXFOUnciJ"}', '}'].join('');
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: false,
        status: 500,
        text: function text() {
          return Promise.resolve(errorText);
        }
      }));
      expect.assertions(2);
      return api.post('dataApprovalLevels', data).catch(function (err) {
        expect(_typeof(err)).toBe('object');
        expect(err).toEqual(JSON.parse(errorText));
      });
    });
    it('should properly encode URIs', function () {
      expect.assertions(1);
      return api.get('some/endpoint?a=b&c=d|e[with:filter]', {
        f: 'g|h[i,j],k[l|m],n{o~p`q`$r@s!t}',
        u: '-._~:/?#[]@!$&()*+,;===,~$!@*()_-=+/;:'
      }).then(function () {
        expect(fetchMock).toHaveBeenCalledWith(['/api/some/endpoint?', 'a=b&', 'c=d%7Ce%5Bwith:filter%5D&', 'f=g%7Ch%5Bi%2Cj%5D%2Ck%5Bl%7Cm%5D%2Cn%7Bo~p%60q%60%24r%40s!t%7D&', 'u=-._~%3A%2F%3F%23%5B%5D%40!%24%26()*%2B%2C%3B%3D%3D%3D%2C~%24!%40*()_-%3D%2B%2F%3B%3A'].join(''), baseFetchOptions);
      });
    });
    it('should reject with an error when url contains encoded query string', function () {
      var message = 'Cannot process URL-encoded URLs, pass an unencoded URL';
      expect.assertions(2);
      return api.get('test?one=%5Bwith%20a%20filter%5D').catch(function (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(message);
      });
    });
    it('should reject with an error when url is malformed', function () {
      var message = 'Query parameters in URL are invalid';
      expect.assertions(2);
      return api.get('test?%5').catch(function (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(message);
      });
    });
    it('should not break URIs when encoding', function () {
      expect.assertions(1);
      return api.get('test?a=b=c&df,gh').then(function () {
        expect(fetchMock).toHaveBeenCalledWith('/api/test?a=b=c&df,gh', baseFetchOptions);
      });
    });
    it('should encode data as JSON', function () {
      var data = {
        name: 'Name',
        code: 'Code_01'
      };
      expect.assertions(1);
      return api.post('jsonData', data).then(function () {
        expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(data));
      });
    });
    it('should not encode text/plain data as JSON', function () {
      var data = 'my data';
      expect.assertions(1);
      return api.post('textData', data, {
        headers: {
          'Content-Type': 'text/plain'
        }
      }).then(function () {
        expect(fetchMock.mock.calls[0][1].body).toBe(data);
      });
    });
  });
  describe('get', function () {
    it('should be a method', function () {
      expect(api.get).toBeInstanceOf(Function);
    });
    it('should return a promise', function () {
      expect(api.get('dataElements')).toBeInstanceOf(Promise);
    });
    it('should use the baseUrl when requesting', function () {
      api.get('dataElements');
      expect(fetchMock).toBeCalledWith('/api/dataElements', baseFetchOptions);
    });
    it('should not add a double slash to the url', function () {
      api.get('path/of/sorts//dataElements');
      expect(fetchMock).toBeCalledWith('/api/path/of/sorts/dataElements', baseFetchOptions);
    });
    it('should strip the trailing slash', function () {
      api.get('/dataElements.json/');
      expect(fetchMock).toBeCalledWith('/api/dataElements.json', baseFetchOptions);
    });
    it('should keep a full url if it is given as a base', function () {
      api.baseUrl = 'http://localhost:8090/dhis/api';
      api.get('/dataElements.json');
      expect(fetchMock).toBeCalledWith('http://localhost:8090/dhis/api/dataElements.json', baseFetchOptions);
    });
    it('should keep the the slashes if they are the first two characters', function () {
      api.baseUrl = '//localhost:8090/dhis/api';
      api.get('/dataElements.json');
      expect(fetchMock).toBeCalledWith('//localhost:8090/dhis/api/dataElements.json', baseFetchOptions);
    });
    it('should call the get method on the http object', function () {
      api.get('dataElements');
      expect(fetchMock).toBeCalledWith('/api/dataElements', baseFetchOptions);
    });
    it('should transfer data to the query string', function () {
      api.get('dataElements', {
        fields: 'id,name'
      });
      expect(fetchMock).toBeCalledWith('/api/dataElements?fields=id%2Cname', baseFetchOptions);
    });
    it('should call the failure handler when the server can\'t be reached', function () {
      fetchMock.mockReturnValueOnce(Promise.reject());
      expect.assertions(1);
      return api.get('/api/dataElements', {
        fields: 'id,name'
      }).catch(function (errMessage) {
        expect(errMessage).toMatchSnapshot();
      });
    });
    it('should call the failure handler with the message if a webmessage was returned', function () {
      var errorJson = {
        httpStatus: 'Not Found',
        httpStatusCode: 404,
        status: 'ERROR',
        message: 'DataElementCategory with id sdfsf could not be found.'
      };
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: false,
        text: function text() {
          return Promise.resolve(JSON.stringify(errorJson));
        }
      }));
      expect.assertions(1);
      return api.get('/api/dataElements/sdfsf', {
        fields: 'id,name'
      }).catch(function (err) {
        expect(err).toEqual(errorJson);
      });
    });
    it('should call the success resolve handler', function () {
      fetchMock.mockReturnValueOnce(Promise.resolve({
        ok: true,
        text: function text() {
          return Promise.resolve('"Success!"');
        }
      }));
      expect.assertions(1);
      return api.get('/api/dataElements', {
        fields: 'id,name'
      }).then(function (res) {
        expect(res).toBe('Success!');
      });
    });
    it('should allow the options to be overridden', function () {
      api.get('dataElements', undefined, {
        mode: 'no-cors',
        credentials: 'omit',
        cache: 'no-cache'
      });
      expect(fetchMock).toBeCalledWith('/api/dataElements', Object.assign(baseFetchOptions, {
        mode: 'no-cors',
        credentials: 'omit',
        cache: 'no-cache'
      }));
    });
    it('should encode filters', function () {
      api.get('filterTest', {
        filter: ['a:1', 'b:2']
      });
      expect(fetchMock).toBeCalledWith('/api/filterTest?filter=a:1&filter=b:2', baseFetchOptions);
    });
    it('should not double encode filter values', function () {
      api.get('filterTest', {
        filter: ['name:eq:A & B']
      });
      expect(fetchMock).toBeCalledWith('/api/filterTest?filter=name:eq:A%20%26%20B', baseFetchOptions);
    });
    it('should transfer complex filters to the query parameters', function () {
      api.get('complexQueryTest', {
        fields: ':all',
        filter: ['id:eq:a0123456789', 'name:ilike:Test']
      });
      expect(fetchMock.mock.calls[0][0]).toContain('/api/complexQueryTest?');
      expect(fetchMock.mock.calls[0][0]).toContain('filter=id:eq:a0123456789&filter=name:ilike:Test');
    });
  });
  describe('post', function () {
    it('should be a method', function () {
      expect(api.post).toBeInstanceOf(Function);
    });
    it('should call the api the with the correct data', function () {
      api.post(_fixtures.default.get('/singleUserAllFields').href, _fixtures.default.get('/singleUserOwnerFields'));
      expect(fetchMock).toBeCalledWith(_fixtures.default.get('/singleUserAllFields').href, Object.assign(baseFetchOptions, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: JSON.stringify(_fixtures.default.get('/singleUserOwnerFields'))
      }));
    });
    it('should not stringify plain text data', function () {
      api.post('systemSettings/mySettingsKey', 'string=test', {
        headers: {
          'content-type': 'text/plain'
        }
      });
      expect(fetchMock).toBeCalledWith('/api/systemSettings/mySettingsKey', Object.assign(baseFetchOptions, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'text/plain',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: 'string=test'
      }));
    });
    it('should post the number zero', function () {
      api.post('systemSettings/numberZero', 0, {
        headers: {
          'content-type': 'text/plain'
        }
      });
      expect(fetchMock).toBeCalledWith('/api/systemSettings/numberZero', Object.assign(baseFetchOptions, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'text/plain',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: JSON.stringify(0)
      }));
    });
    it('should send plain text boolean true values as "true"', function () {
      api.post('systemSettings/keyTrue', true);
      expect(fetchMock).toBeCalledWith('/api/systemSettings/keyTrue', Object.assign(baseFetchOptions, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: 'true'
      }));
    });
    it('should send plain text boolean false values as "false"', function () {
      api.post('systemSettings/keyTrue', false);
      expect(fetchMock).toBeCalledWith('/api/systemSettings/keyTrue', Object.assign(baseFetchOptions, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: 'false'
      }));
    });
    it('should set remove the Content-Type header for form data', function () {
      // Set the global FormData
      global.FormData = _formData.default;
      var data = new FormData();
      data.append('field_1', 'value_1');
      data.append('field_2', 'value_2');
      expect.assertions(2);
      return api.post('form/data', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function () {
        expect(fetchMock.mock.calls[0][1].headers.constructor.name).toBe('Headers');
        expect(fetchMock.mock.calls[0][1].headers.get('Content-Type')).toBeNull(); // Unset the global FormData

        global.FormData = undefined;
      });
    });
  });
  describe('delete', function () {
    it('should be a method', function () {
      expect(api.delete).toBeInstanceOf(Function);
    });
    it('should call fetch with the correct DELETE request', function () {
      api.delete(_fixtures.default.get('/singleUserAllFields').href);
      expect(fetchMock).toBeCalledWith(_fixtures.default.get('/singleUserAllFields').href, Object.assign(baseFetchOptions, {
        method: 'DELETE'
      }));
    });
    it('should call the correct api endpoint when the url starts with a /', function () {
      api.delete('/users/aUplAx3DOWy');
      var fetchOptions = {
        cache: 'default',
        credentials: 'include',
        headers: {
          map: {
            'x-requested-with': 'XMLHttpRequest'
          }
        },
        method: 'DELETE',
        mode: 'cors'
      };
      expect(fetchMock).toBeCalledWith('/api/users/aUplAx3DOWy', fetchOptions);
    });
  });
  describe('update', function () {
    it('should be a method', function () {
      expect(api.update).toBeInstanceOf(Function);
    });
    it('should call the ajax method with the correct UPDATE request', function () {
      var data = {
        a: 'A',
        b: 'B!',
        obj: {
          oa: 'o.a',
          ob: 'o.b'
        },
        arr: [1, 2, 3]
      };
      api.update('some/fake/api/endpoint', data);
      expect(fetchMock).toBeCalledWith('/api/some/fake/api/endpoint', expect.objectContaining(Object.assign(baseFetchOptions, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: JSON.stringify(data)
      })));
    });
    it('should add the mergeMode param to the url when useMergeStrategy is passed', function () {
      api.update('some/fake/api/endpoint', {}, true);
      var fetchOptions = {
        body: '{}',
        cache: 'default',
        credentials: 'include',
        headers: {
          map: {
            'content-type': 'application/json',
            'x-requested-with': 'XMLHttpRequest'
          }
        },
        method: 'PUT',
        mode: 'cors'
      };
      expect(fetchMock).toBeCalledWith('/api/some/fake/api/endpoint?mergeMode=REPLACE', fetchOptions);
    });
    it('should add the mergeStrategy param to the url when useMergeStrategy is passed ' + 'and the version is 2.22', function () {
      _System.default.getSystem.mockReturnValueOnce({
        version: {
          major: 2,
          minor: 22
        }
      });

      api.update('some/fake/api/endpoint', {}, true);
      var fetchOptions = {
        body: '{}',
        cache: 'default',
        credentials: 'include',
        headers: {
          map: {
            'content-type': 'application/json',
            'x-requested-with': 'XMLHttpRequest'
          }
        },
        method: 'PUT',
        mode: 'cors'
      };
      expect(fetchMock).toBeCalledWith('/api/some/fake/api/endpoint?mergeStrategy=REPLACE', fetchOptions);
    });
    it('should support payloads of plain texts', function () {
      api.update('some/fake/api/endpoint', 'a string');
      expect(fetchMock).toBeCalledWith('/api/some/fake/api/endpoint', Object.assign(baseFetchOptions, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'text/plain',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: 'a string'
      }));
    });
  });
  describe('patch', function () {
    it('should be a method', function () {
      expect(api.patch).toBeInstanceOf(Function);
    });
    it('should call the ajax method with the correct PATCH request', function () {
      var data = {
        propAtBaseLevel: {
          nestedChildThatNeedsTOBeUpdated: false
        }
      };
      var endpoint = 'some/fake/api/endpoint';
      api.patch(endpoint, data);

      var _fetchMock$mock$calls = _slicedToArray(fetchMock.mock.calls[0], 2),
          endpointParam = _fetchMock$mock$calls[0],
          fetchOptsParam = _fetchMock$mock$calls[1];

      expect(endpointParam).toEqual("/api/".concat(endpoint));
      expect(fetchOptsParam).toEqual(expect.objectContaining(Object.assign(baseFetchOptions, {
        method: 'PATCH',
        headers: new Headers({
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'
        }),
        body: JSON.stringify(data)
      })));
    });
  });
  describe('defaultHeaders', function () {
    it('should use the set default headers for the request', function () {
      api.setDefaultHeaders({
        Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=',
        'x-requested-with': 'XMLHttpRequest'
      });
      api.get('/me');
      expect(fetchMock).toBeCalledWith('/api/me', Object.assign(baseFetchOptions, {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=',
          'x-requested-with': 'XMLHttpRequest'
        })
      }));
    });
    it('should not use the defaultHeaders if specific header has been passed', function () {
      api.setDefaultHeaders({
        Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=',
        'x-requested-with': 'XMLHttpRequest'
      });
      api.get('/me', undefined, {
        headers: {
          Authorization: 'Bearer ASDW212331sss',
          'x-requested-with': 'XMLHttpRequest'
        }
      });
      expect(fetchMock).toBeCalledWith('/api/me', Object.assign(baseFetchOptions, {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ASDW212331sss',
          'x-requested-with': 'XMLHttpRequest'
        })
      }));
    });
    it('should still use the default headers for keys that have not been defined', function () {
      api.setDefaultHeaders({
        Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=',
        'Custom-Header': 'Some header data'
      });
      api.get('/me', undefined, {
        headers: {
          Authorization: 'Bearer ASDW212331sss'
        }
      });
      expect(fetchMock).toBeCalledWith('/api/me', Object.assign(baseFetchOptions, {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ASDW212331sss',
          'Custom-Header': 'Some header data'
        })
      }));
    });
  });
});
//# sourceMappingURL=api.spec.js.map
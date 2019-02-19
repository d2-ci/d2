"use strict";

var _Api = _interopRequireDefault(require("../../api/Api"));

var _I18n = _interopRequireDefault(require("../../i18n/I18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

jest.mock('../../api/Api');
describe('Internationalisation (I18n)', function () {
  var mockApi;
  var i18n;
  var mockTranslations = {
    general_settings: 'General settings',
    yes: 'Yup',
    no: 'Nope',
    system_settings_in_french: 'Paramètres du système',
    // 'escapes': 'Characters may be escaped! Even\nnewlines?!?',
    string_with_variable: 'Some times $$variable$$ are useful'
  };
  var mockUnicode = "Param\\u00e8tres du syst\\u00e8me";
  var mockEscape = 'Characters\\ may \\b\\e \\e\\s\\c\\a\\p\\e\\d\\!\\\\ Even\\\nnewline\\s\\?\\!\\?';
  var mockPropsFile = "".concat('general_settings=General settings\n' + 'yes=Yup\n' + 'no=Nope\n\n# Blank lines and commends - ignored?\n#\n\n' + 'system_settings_in_french=').concat(mockUnicode, "\n") + "escapes=".concat(mockEscape, "\n");
  beforeEach(function () {
    mockApi = _Api.default.getApi();
    i18n = new _I18n.default();
  });
  afterEach(function () {
    _Api.default.mockReset();
  });
  it('should not be allowed to be called without new', function () {
    expect(function () {
      return (0, _I18n.default)();
    }).toThrowErrorMatchingSnapshot(); // eslint-disable-line
  });
  it('should set an instance of Api onto the SystemConfiguration instance', function () {
    expect(i18n.api).toBe(mockApi);
  });
  it('addSource() should be a function', function () {
    expect(i18n.addSource).toBeInstanceOf(Function);
  });
  it('addStrings() should be a function', function () {
    expect(i18n.addStrings).toBeInstanceOf(Function);
  });
  it('load() should be a function', function () {
    expect(i18n.load).toBeInstanceOf(Function);
  });
  it('should set the passed sources onto the object', function () {
    var sources = ['translation_18n'];
    i18n = new _I18n.default(sources);
    expect(i18n.sources).toBe(sources);
  });
  it('should use the passed Api object', function () {
    mockApi = jest.fn();
    i18n = new _I18n.default([], mockApi);
    expect(i18n.api).toBe(mockApi);
  });
  it('getTranslations() should throw an error is translations haven\'t been loaded yet', function () {
    expect.assertions(1);

    try {
      i18n.getTranslation('some_string');
    } catch (err) {
      expect(err.message).toMatchSnapshot();
    }
  });
  describe('getI18n', function () {
    it('should be a function on the I18n class', function () {
      expect(_typeof(_I18n.default.getI18n)).toBe('function');
    });
    it('should return a new instanceof I18n', function () {
      expect(_I18n.default.getI18n()).toBeInstanceOf(_I18n.default);
    });
  });
  describe('addStrings()', function () {
    it('accepts a single string', function () {
      i18n.addStrings('yes');
      var strings = Array.from(i18n.strings);
      expect(strings).toContain('yes');
      expect(strings.length).toBe(1);
    });
    it('accepts an array of strings', function () {
      i18n.addStrings(['yes', 'no', 'maybe']);
      var strings = Array.from(i18n.strings);
      expect(strings).toContain('yes');
      expect(strings).toContain('no');
      expect(strings).toContain('maybe');
      expect(strings.length).toBe(3);
    });
    it('handles consequtive calls', function () {
      i18n.addStrings(['yes', 'no']);
      i18n.addStrings('maybe');
      i18n.addStrings('probably');
      var strings = Array.from(i18n.strings);
      expect(strings).toContain('yes');
      expect(strings).toContain('no');
      expect(strings).toContain('maybe');
      expect(strings).toContain('probably');
      expect(strings.length).toBe(4);
    });
    it('doesn\'t add duplicates', function () {
      i18n.addStrings(['yes', 'no']);
      i18n.addStrings(['no', 'maybe']);
      i18n.addStrings(['maybe', 'probably', 'yes']);
      var strings = Array.from(i18n.strings);
      expect(strings).toContain('yes');
      expect(strings).toContain('no');
      expect(strings).toContain('maybe');
      expect(strings).toContain('probably');
      expect(strings.length).toBe(4);
    });
    it('should not add empty strings', function () {
      jest.spyOn(i18n.strings, 'add');
      i18n.addStrings(['yes', '', '  ']);
      expect(i18n.strings.add).toHaveBeenCalledTimes(1);
    });
  });
  describe('load()', function () {
    var apiGet;
    var apiPost;
    var apiReq;
    beforeEach(function () {
      apiGet = mockApi.get.mockReturnValueOnce(Promise.resolve(mockTranslations));
      apiPost = mockApi.post.mockReturnValueOnce(Promise.resolve(mockTranslations));
      apiReq = mockApi.request.mockReturnValueOnce(Promise.resolve(mockPropsFile));
      i18n.addStrings(['yes', 'no']);
    });
    it('should return a promise', function () {
      expect(i18n.load()).toBeInstanceOf(Promise);
    });
    it('should POST to get untranslated strings', function () {
      expect.assertions(4);
      return i18n.load().then(function () {
        expect(apiGet).toHaveBeenCalledTimes(0);
        expect(apiPost).toHaveBeenCalledTimes(1);
        expect(apiReq).toHaveBeenCalledTimes(0);
        expect(i18n.getTranslation('yes')).toEqual(mockTranslations.yes);
      });
    });
    it('should load props files first', function () {
      i18n.addSource('props_file_name');
      expect.assertions(3);
      return i18n.load().then(function () {
        expect(apiGet).toHaveBeenCalledTimes(0);
        expect(apiPost).toHaveBeenCalledTimes(0);
        expect(apiReq).toHaveBeenCalledTimes(1);
      });
    });
    it('keeps going if one props file fails', function () {
      i18n.addSource('props_file_one');
      i18n.addSource('props_file_two');
      i18n.addSource('props_file_three');
      apiReq.mockReset();
      apiReq.mockReturnValueOnce(Promise.resolve(mockPropsFile)).mockReturnValueOnce(Promise.reject('404 Fail or something')).mockReturnValueOnce(Promise.resolve(''));
      expect.assertions(3);
      return i18n.load().then(function () {
        expect(apiGet).toHaveBeenCalledTimes(0);
        expect(apiPost).toHaveBeenCalledTimes(0);
        expect(apiReq).toHaveBeenCalledTimes(3);
      });
    });
    it('chooses strings based on source order', function () {
      i18n.addSource('slow_props_file');
      i18n.addSource('fast_props_file');
      apiReq.mockReset();
      apiReq.mockReturnValueOnce(new Promise(function (resolve) {
        setTimeout(function () {
          resolve('result=first priority file\n');
        });
      })).mockReturnValueOnce(Promise.resolve('result=first file to load\n'));
      expect.assertions(1);
      return i18n.load().then(function () {
        expect(i18n.getTranslation('result')).toEqual('first priority file');
      });
    });
    it('should not add the strings if no responses were returned', function () {
      i18n.addStrings(['string_that_has_no_translation']);
      mockApi.post.mockReturnValueOnce(Promise.resolve({
        string_that_has_no_translation: 'string_that_has_no_translation'
      }));
      return i18n.load().then(function () {
        return expect(i18n.translations.string_that_has_no_translation).toBeUndefined();
      });
    });
  });
  describe('async API', function () {
    beforeEach(function () {
      i18n.api.get.mockReturnValue(Promise.resolve(mockTranslations));
      i18n.api.request.mockReturnValue(Promise.resolve(mockPropsFile));
      i18n.api.post.mockReturnValue(Promise.resolve(mockTranslations));
      i18n.addSource('mockPropsFile');
      i18n.addStrings(Object.keys(mockTranslations));
    });
    describe('getTranslation()', function () {
      it('returns the correct translations', function () {
        expect.assertions(5);
        return i18n.load().then(function () {
          Object.keys(mockTranslations).forEach(function (key) {
            expect(i18n.getTranslation(key)).toEqual(mockTranslations[key]);
          });
        });
      });
      it('decodes unicode entities from properties files', function () {
        return i18n.load().then(function () {
          expect(mockApi.get).toHaveBeenCalledTimes(0);
          expect(mockApi.post).toHaveBeenCalledTimes(1);
          expect(mockApi.request).toHaveBeenCalledTimes(1);
          expect(i18n.getTranslation('system_settings_in_french')).toEqual(mockTranslations.system_settings_in_french);
          expect(i18n.getTranslation('system_settings_in_french')).not.toEqual(mockUnicode);
        });
      });
      it('returns ** string ** for unknown strings', function () {
        expect.assertions(1);
        return i18n.load().then(function () {
          expect(i18n.getTranslation('string')).toEqual('** string **');
        });
      });
      it('replaces $$variable$$ in translations', function () {
        expect.assertions(2);
        return i18n.load().then(function () {
          var sub1 = i18n.getTranslation('string_with_variable', {
            variable: 'tests'
          });
          var sub2 = i18n.getTranslation('string_with_variable', {
            variable: 'FUNNY TRANSLATIONS'
          });
          expect(sub1).toBe('Some times tests are useful');
          expect(sub2).toBe('Some times FUNNY TRANSLATIONS are useful');
        });
      });
    });
    describe('isTranslated()', function () {
      it('returns true for translated strings', function () {
        expect.assertions(5);
        return i18n.load().then(function () {
          Object.keys(mockTranslations).forEach(function (key) {
            expect(i18n.isTranslated(key)).toEqual(true);
          });
        });
      });
      it('returns false for untranslated strings', function () {
        expect.assertions(1);
        return i18n.load().then(function () {
          expect(i18n.isTranslated('string')).toEqual(false);
        });
      });
      it('totally tilts out if translations haven\'t been loaded yet', function () {
        expect(function () {
          return i18n.isTranslated('some random string');
        }).toThrowErrorMatchingSnapshot();
      });
    });
    describe('getUntranslatedStrings()', function () {
      it('returns undefined if translations haven\'t been loaded yet', function () {
        expect(i18n.getUntranslatedStrings()).toEqual(undefined);
      });
      it('returns an array', function () {
        expect.assertions(1);
        return i18n.load().then(function () {
          expect(i18n.getUntranslatedStrings()).toBeInstanceOf(Array);
        });
      });
      it('doesn\'t return translated strings', function () {
        i18n.addStrings('string');
        return i18n.load().then(function () {
          var str = i18n.getUntranslatedStrings();
          expect(str).toContain('string');
          expect(str).not.toContain('yes');
          expect(str).not.toContain('some_random_string');
        });
      });
    });
  });
});
//# sourceMappingURL=I18n.spec.js.map
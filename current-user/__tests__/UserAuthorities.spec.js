"use strict";

var _fixtures = _interopRequireDefault(require("../../__fixtures__/fixtures"));

var _UserAuthorities = _interopRequireDefault(require("../../current-user/UserAuthorities"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UserAuthorities', function () {
  var authorities;
  var userAuthorities;
  beforeEach(function () {
    authorities = _fixtures.default.get('/me/authorities');
    userAuthorities = _UserAuthorities.default.create(authorities);
  });
  it('should return true if the user has an authority', function () {
    expect(userAuthorities.has('F_DATAVALUE_DELETE')).toBe(true);
  });
  it('should return false if the user does not have an authority', function () {
    expect(userAuthorities.has('F_DOCUMENT_PUBLIC_DELETE')).toBe(false);
  });
  it('should return true if the user does not have an authority but does have ALL', function () {
    userAuthorities = _UserAuthorities.default.create(['F_DATAVALUE_DELETE', 'ALL']);
    expect(userAuthorities.has('F_DOCUMENT_PUBLIC_DELETE')).toBe(true);
  });
  it('should return false when asking for ALL and the user does not have it', function () {
    expect(userAuthorities.has('ALL')).toBe(false);
  });
  it('should return true when asking for ALL and the user has the authority', function () {
    userAuthorities = _UserAuthorities.default.create(['F_DATAVALUE_DELETE', 'ALL']);
    expect(userAuthorities.has('ALL')).toBe(true);
  });
});
//# sourceMappingURL=UserAuthorities.spec.js.map
"use strict";

var _ModelDefinition = _interopRequireDefault(require("../../../ModelDefinition"));

var _fixtures = _interopRequireDefault(require("../../../../__fixtures__/fixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Program defaults', function () {
  var program;
  beforeEach(function () {
    var ProgramDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/program'));

    program = ProgramDefinition.create();
  });
  it('should have `version` set to 0', function () {
    expect(program.version).toBe(0);
  });
  it('should have `completedEventExpiryDays` set to 0', function () {
    expect(program.completeEventsExpiryDays).toBe(0);
  });
  it('should have `expiryDays` set to 0', function () {
    expect(program.expiryDays).toBe(0);
  });
});
//# sourceMappingURL=Program.spec.js.map
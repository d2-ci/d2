"use strict";

var _ModelDefinition = _interopRequireDefault(require("../../../ModelDefinition"));

var _fixtures = _interopRequireDefault(require("../../../../__fixtures__/fixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ProgramNotificationTemplate defaults', function () {
  var programNotificationTemplate;
  beforeEach(function () {
    var ProgramNotificationTemplateDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/programNotificationTemplate'));

    programNotificationTemplate = ProgramNotificationTemplateDefinition.create();
  });
  it('should have `version` set to 0', function () {
    expect(programNotificationTemplate.notificationTrigger).toBe('COMPLETION');
  });
  it('should have `completedEventExpiryDays` set to 0', function () {
    expect(programNotificationTemplate.notificationRecipient).toBe('USERS_AT_ORGANISATION_UNIT');
  });
});
//# sourceMappingURL=ProgramNotificationTemplate.spec.js.map
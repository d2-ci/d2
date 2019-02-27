"use strict";

var _ModelDefinition = _interopRequireDefault(require("../../../ModelDefinition"));

var _fixtures = _interopRequireDefault(require("../../../../__fixtures__/fixtures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ValidationRule defaults', function () {
  var validationRule;
  beforeEach(function () {
    var ValidationRuleDefinition = _ModelDefinition.default.createFromSchema(_fixtures.default.get('/api/schemas/validationRule'));

    validationRule = ValidationRuleDefinition.create();
  });
  it('should have `importance` set to `MEDIUM`', function () {
    expect(validationRule.importance).toBe('MEDIUM');
  });
  it('should have `periodType` set to `Monthly`', function () {
    expect(validationRule.periodType).toBe('Monthly');
  });
  it('should have `operator` set to `not_equal_to`', function () {
    expect(validationRule.operator).toBe('not_equal_to');
  });
  it('should have `leftSide` set to the correct values', function () {
    var correctValues = {
      missingValueStrategy: 'NEVER_SKIP',
      description: '',
      expression: ''
    };
    expect(validationRule.leftSide).toEqual(correctValues);
  });
  it('should have `rightSide` set to the correct values', function () {
    var correctValues = {
      missingValueStrategy: 'NEVER_SKIP',
      description: '',
      expression: ''
    };
    expect(validationRule.rightSide).toEqual(correctValues);
  });
});
//# sourceMappingURL=ValidationRule.spec.js.map
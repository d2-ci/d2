"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var validation = jest.fn();
var _default = {
  getModelValidation: function getModelValidation() {
    return {
      validateAgainstSchema: validation
    };
  }
};
exports.default = _default;
//# sourceMappingURL=ModelValidation.js.map
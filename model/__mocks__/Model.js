"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function Model() {
  _classCallCheck(this, Model);
};

exports.default = Model;
Model.create = jest.fn(function (modelDefinition) {
  var model = new Model();
  Object.defineProperty(model, 'modelDefinition', {
    value: modelDefinition,
    enumerable: false
  });
  Object.defineProperty(model, 'dataValues', {
    value: {},
    enumerable: false
  });
  var propertyDescriptors = Object.keys(modelDefinition.modelProperties).reduce(function (descriptors, propertyName) {
    descriptors[propertyName] = {
      // eslint-disable-line no-param-reassign
      set: function set(value) {
        this.dataValues[propertyName] = value;
      },
      get: function get() {
        return this.dataValues[propertyName];
      },
      enumerable: true
    };
    return descriptors;
  }, {});
  Object.defineProperties(model, propertyDescriptors);
  return model;
});
//# sourceMappingURL=Model.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _check = require('../lib/check');

var _utils = require('../lib/utils');

var _ModelBase = require('./ModelBase');

var _ModelBase2 = _interopRequireDefault(_ModelBase);

var _attibutes = require('./helpers/attibutes');

var _attibutes2 = _interopRequireDefault(_attibutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pickAttributeValues = (0, _utils.pickOr)('attributeValues', []);

// TODO: Perhaps we can generate model classes dynamically based on the schemas and inherit from this.
/**
 * @extends ModelBase
 *
 * @description
 * A Model represents an object from the DHIS2 Api. A model is created based of a ModelDefinition. The ModelDefinition
 * has the properties that the model should have.
 *
 * @memberof module:model
 */

var Model = function () {
  /**
   * @constructor
   *
   * @param {ModelDefinition} modelDefinition The model definition that corresponds with the model.
   * This is essential defining what type the model is representing.
   *
   * @description
   * Will create a new model instanced based on the model definition. When creating a new instance the model
   * definition needs to have both the modelValidations and modelProperties.
   *
   * The model properties will depend on the ModelDefinition. A model definition is based on a DHIS2 Schema.
   */
  function Model(modelDefinition) {
    var _this = this;

    _classCallCheck(this, Model);

    (0, _check.checkType)(modelDefinition, 'object', 'modelDefinition');
    (0, _check.checkType)(modelDefinition.modelProperties, 'object', 'modelProperties');

    /**
     * @property {ModelDefinition} modelDefinition Stores reference to the modelDefinition that was used when
     * creating the model. This property is not enumerable or writable and will therefore not show up when looping
     * over the object properties.
     */
    Object.defineProperty(this, 'modelDefinition', { value: modelDefinition });

    /**
     * @property {Boolean} dirty Represents the state of the model. When the model is concidered `dirty`
     * there are pending changes.
     * This property is not enumerable or writable and will therefore not show up when looping
     * over the object properties.
     */
    Object.defineProperty(this, 'dirty', { writable: true, value: false });

    /**
     * @private
     * @property {Object} dataValues Values object used to store the actual model values. Normally access to the
     * Model data will be done through accessor properties that are generated from the modelDefinition.
     *
     * @note {warning} This should not be accessed directly.
     */
    Object.defineProperty(this, 'dataValues', { configurable: true, writable: true, value: {} });

    /**
     * Attach the modelDefinition modelProperties (the properties from the schema) onto the Model.
     *
     * For a data element model the modelProperties would be the following
     * https://play.dhis2.org/demo/api/schemas/dataElement.json?fields=properties
     */
    Object.defineProperties(this, modelDefinition.modelProperties);

    var attributes = {};
    var attributeProperties = modelDefinition.attributeProperties;
    if ((0, _check.hasKeys)(attributeProperties)) {
      /**
       * @property {Object} attributes The attributes objects contains references to custom attributes defined
       * on the metadata object.
       *
       * @description
       * These properties are generated based of the attributes that are created for the the specific schema.
       * As these properties are not defined on the schemas they're put on a separate attributes object.
       * When there are no attributes defined for the object type, the attributes property will not be attached
       * to the model.
       *
       * @see https://docs.dhis2.org/2.27/en/user/html/dhis2_user_manual_en_full.html#manage_attribute
       */
      Object.defineProperty(this, 'attributes', { value: attributes });

      var getAttributeValues = function getAttributeValues() {
        return pickAttributeValues(_this);
      };
      var setAttributeValues = function setAttributeValues(attributeValues) {
        return _this.attributeValues = attributeValues;
      };
      var setDirty = function setDirty() {
        return _this.dirty = true;
      };
      var attributeDefinitions = (0, _attibutes2.default)(attributeProperties, getAttributeValues, setAttributeValues, setDirty);

      Object.defineProperties(attributes, attributeDefinitions);
    }

    this[_ModelBase.DIRTY_PROPERTY_LIST] = new Set([]);
  }

  /**
   * @static
   *
   * @param {ModelDefinition} modelDefinition ModelDefinition from which the model should be created
   * @returns {Model} Returns an instance of the model.
   *
   * @description The static method is a factory method to create Model objects. It calls `new Model()` with the passed `ModelDefinition`.
   *
   * ```js
   * let myModel = Model.create(modelDefinition);
   * ```
   */


  _createClass(Model, null, [{
    key: 'create',
    value: function create(modelDefinition) {
      return new Model(modelDefinition);
    }
  }]);

  return Model;
}();

// Set the prototype of the Model class, this way we're able to extend from an single object


Model.prototype = _ModelBase2.default;

exports.default = Model;
//# sourceMappingURL=Model.js.map
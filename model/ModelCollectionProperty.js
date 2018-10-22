'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _ModelCollection2 = require('./ModelCollection');

var _ModelCollection3 = _interopRequireDefault(_ModelCollection2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A ModelCollectionProperty instance is a ModelCollection that is a property of
 * a model instance. ModelCollectionProperties can be operated on independently of
 * the Model that owns them.
 *
 * @memberof module:model
 */
var ModelCollectionProperty = function (_ModelCollection) {
    _inherits(ModelCollectionProperty, _ModelCollection);

    /**
     * @constructor
     *
     * @param {Model} parentModel The `Model` of the parent of this `ModelCollectionProperty`
     * @param {ModelDefinition} modelDefinition The `ModelDefinition` that this `ModelCollection` property is for
     * @param {String} propName The name of this property on the parent model
     * @param {Model[]|boolean} values Initial values that should be added to the collection property
     * @param {Api} api The class to use for API calls
     *
     * @description
     *
     * Creates a new `ModelCollectionProperty` object. This is a subclass of `ModelCollection`, which adds logic
     * for adding and removing elements to the collection and saving the changes to the API.
     *
     * If the value is `true` or `undefined` is specified instead of an array of data values, this indicates that the
     * collection contains (or may contain) data that has not yet been loaded from the API.
     */
    function ModelCollectionProperty(parentModel, modelDefinition, propName, values, api) {
        _classCallCheck(this, ModelCollectionProperty);

        // The name of this property on the parent object - necessary for loading values lazily
        var _this = _possibleConstructorReturn(this, (ModelCollectionProperty.__proto__ || Object.getPrototypeOf(ModelCollectionProperty)).call(this, modelDefinition, values, undefined));

        _this.propName = propName;

        // Dirty bit - true if any models have been added to or removed from the collection
        _this.dirty = false;

        // Keep track of added and removed elements
        _this.added = new Set();
        _this.removed = new Set();

        // Using field transformers, it's possible to query the API for the presence of data without actually fetching
        // the data. For instance this is used to determine if an organization unit has any children without actually
        // loading the children. If yes, it will be displayed as an expandable branch within the tree.
        // For more information, see the documentation about field transformers, specifically the isNotEmpty operator:
        // https://docs.dhis2.org/master/en/developer/html/dhis2_developer_manual_full.html#webapi_field_transformers
        _this.hasUnloadedData = values === true || values === undefined;

        _this.api = api;

        // Store the parent model of this collection so we can construct the URI for API calls
        _this.parentModel = parentModel;
        return _this;
    }

    /**
     * @param {Model} value Model instance to add to the collection.
     * @returns {ModelCollectionProperty} Returns itself for chaining purposes.
     *
     * @description
     * Calls the `add` method on the parent `ModelCollection` class, and then performs checks to keep track of
     * what, if any, changes that have been made to the collection.
     */


    _createClass(ModelCollectionProperty, [{
        key: 'add',
        value: function add(value) {
            if (this.valuesContainerMap.has(value.id)) {
                return this;
            }

            _get(ModelCollectionProperty.prototype.__proto__ || Object.getPrototypeOf(ModelCollectionProperty.prototype), 'add', this).call(this, value);

            if (this.removed.has(value.id)) {
                this.removed.delete(value.id);
            } else {
                this.added.add(value.id);
            }

            this.updateDirty();
            return this;
        }

        /**
         * If the collection contains an object with the same id as the `value` parameter, that object is removed
         * from the collection. Checks are then performed to keep track of what, if any, changes that have been
         * made to the collection.
         *
         * @param {Model} value Model instance to remove from the collection.
         * @returns {ModelCollectionProperty} Returns itself for chaining purposes.
         */

    }, {
        key: 'remove',
        value: function remove(value) {
            _ModelCollection3.default.throwIfContainsOtherThanModelObjects([value]);
            _ModelCollection3.default.throwIfContainsModelWithoutUid([value]);

            if (this.delete(value.id)) {
                if (this.added.has(value.id)) {
                    this.added.delete(value.id);
                } else {
                    this.removed.add(value.id);
                }
            }

            this.updateDirty();
            return this;
        }

        /**
         * Checks whether any changes have been made to the collection, and updates the dirty flag accordingly.
         *
         * @returns {boolean} True if the collection has changed, false otherwise.
         */

    }, {
        key: 'updateDirty',
        value: function updateDirty() {
            this.dirty = this.added.size > 0 || this.removed.size > 0;
            return this.dirty;
        }

        /**
         * Sets dirty=false and resets the added and removed sets used for dirty state tracking.
         */

    }, {
        key: 'resetDirtyState',
        value: function resetDirtyState() {
            this.dirty = false;
            this.added = new Set();
            this.removed = new Set();
        }

        /**
         * Checks if the collection property has been modified.
         * @param {boolean} [includeValues=true] If true, also checks if any models in the collection
         * has been edited by checking the dirty flag on each model.
         * @returns {boolean} true if any elements have been added to or removed from the collection
         */

    }, {
        key: 'isDirty',
        value: function isDirty() {
            var includeValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (includeValues) {
                return this.dirty || this.toArray().filter(function (model) {
                    return model && model.isDirty() === true;
                }).length > 0;
            }
            return this.dirty;
        }

        /**
         * If any changes have been made to the collection, these changes will be submitted to the API. The returned
         * promise will resolve successfully when the changes have been saved to the API, and will be rejected if
         * either the changes weren't saved or if there were no changes to save.
         *
         * @returns {Promise} A `Promise`
         */

    }, {
        key: 'save',
        value: function save() {
            var _this2 = this;

            // Calling save when there's nothing to be saved is a no-op (not an error)
            if (!this.isDirty()) {
                return Promise.resolve({});
            }

            var url = [this.parentModel.href, this.modelDefinition.plural].join('/');
            var data = {
                additions: Array.from(this.added).map(function (id) {
                    return { id: id };
                }),
                deletions: Array.from(this.removed).map(function (id) {
                    return { id: id };
                })
            };

            return this.api.post(url, data).then(function () {
                _this2.resetDirtyState();
                return Promise.resolve({});
            }).catch(function (err) {
                return Promise.reject('Failed to alter collection:', err);
            });
        }
    }, {
        key: 'load',
        value: function load(options) {
            var _this3 = this;

            var forceReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!this.hasUnloadedData && !forceReload) {
                return Promise.resolve(this);
            }

            var url = [this.parentModel.modelDefinition.apiEndpoint, this.parentModel.id].join('/');
            var requestOptions = Object.assign({
                paging: false
            }, options, { fields: this.propName + '[' + (options && options.fields || ':all') + ']' });

            return this.api.get(url, requestOptions).then(function (data) {
                return data[_this3.propName];
            }).then(function (values) {
                if (Array.isArray(values)) {
                    _this3.valuesContainerMap.clear();
                    values.forEach(function (value) {
                        return _this3.valuesContainerMap.set(value.id, _this3.modelDefinition.create(value));
                    });
                }
                _this3.hasUnloadedData = false;
                return Promise.resolve(_this3);
            });
        }

        /**
         * See `ModelCollectionProperty.constructor`.
         *
         * @param {Model} parentModel
         * @param {ModelDefinition} modelDefinition
         * @param {Model[]} values
         * @returns {ModelCollectionProperty}
         */

    }], [{
        key: 'create',
        value: function create(parentModel, modelDefinition, propName, values) {
            return new ModelCollectionProperty(parentModel, modelDefinition, propName, values, _Api2.default.getApi());
        }
    }]);

    return ModelCollectionProperty;
}(_ModelCollection3.default);

exports.default = ModelCollectionProperty;
//# sourceMappingURL=ModelCollectionProperty.js.map
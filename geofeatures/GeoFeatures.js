'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _uid = require('../uid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class GeoFeatures
 * @description
 * GeoFeatures class used to request organisation unit coordinates from the Web API.
 */
var GeoFeatures = function () {
    /**
     * @constructor
     *
     * @param {Array} orgUnits Organisation units (UID, level, group, user org. unit) to include in the response.
     * @param {String} displayName The name property to display (NAME|SHORTNAME).
     */
    function GeoFeatures() {
        var orgUnits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var displayName = arguments[1];

        _classCallCheck(this, GeoFeatures);

        this.orgUnits = orgUnits;
        this.displayName = displayName;
    }

    /**
     * @method byOrgUnit
     *
     * @param {Array} orgUnits Organisation units (UID, level, group, user org. unit) to include in the response.
     *
     * @returns {GeoFeatures}
     */


    _createClass(GeoFeatures, [{
        key: 'byOrgUnit',
        value: function byOrgUnit(orgUnits) {
            if (!orgUnits) {
                return this;
            }

            var orgUnitsArray = [].concat(orgUnits);

            if (!orgUnitsArray.every(GeoFeatures.isValidOrgUnit)) {
                throw new Error('Invalid organisation unit: ' + orgUnits);
            }

            return new GeoFeatures(orgUnitsArray, this.displayName);
        }

        /**
         * @method byOrgUnit
         *
         * @param {String} displayName The name property to display (NAME|SHORTNAME).
         *
         * @returns {GeoFeatures}
         */

    }, {
        key: 'displayProperty',
        value: function displayProperty(displayName) {
            if (!displayName) {
                return this;
            }

            if (!GeoFeatures.isValidDisplayName(displayName)) {
                throw new Error('Invalid display property: ' + displayName);
            }

            return new GeoFeatures(this.orgUnits, displayName);
        }

        /**
         * @method getAll
         *
         * @param {Object} params Extra URL params to pass to the Web API endpoint.
         *
         * @returns {Promise} with an array of geofeatures.
         */

    }, {
        key: 'getAll',
        value: function getAll() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var api = _Api2.default.getApi();
            var urlParams = params;

            if (this.orgUnits.length) {
                urlParams.ou = 'ou:' + this.orgUnits.join(';');
            }

            if (this.displayName) {
                urlParams.displayProperty = this.displayName;
            }

            return api.get('geoFeatures', urlParams);
        }

        /**
         * @method isValidOrgUnit
         * @static
         *
         * @returns {boolean} True if the org. unit is valid
         *
         * @description
         * Checks if the org. unit is valid (UID, level, group, user org. unit)
         */

    }], [{
        key: 'isValidOrgUnit',
        value: function isValidOrgUnit(orgUnit) {
            return (0, _uid.isValidUid)(orgUnit) || GeoFeatures.isValidOrgUnitLevel(orgUnit) || GeoFeatures.isValidOrgUnitGroup(orgUnit) || GeoFeatures.isValidUserOrgUnit(orgUnit);
        }

        /**
         * @method isValidOrgUnitLevel
         * @static
         *
         * @returns {boolean} True if the org. unit level is valid
         *
         * @description
         * Checks if the org. unit level is valid.
         */

    }, {
        key: 'isValidOrgUnitLevel',
        value: function isValidOrgUnitLevel(level) {
            return (/^LEVEL-[0-9]+$/.test(level)
            );
        }

        /**
         * @method isValidOrgUnitGroup
         * @static
         *
         * @returns {boolean} True if the org. unit group is valid
         *
         * @description
         * Checks if the org. unit group is valid.
         */

    }, {
        key: 'isValidOrgUnitGroup',
        value: function isValidOrgUnitGroup(group) {
            var match = group.match(/OU_GROUP-(.*)$/);
            return Array.isArray(match) && (0, _uid.isValidUid)(match[1]);
        }

        /**
         * @method isValidUserOrgUnit
         * @static
         *
         * @returns {boolean} True if the user org. unit is valid
         *
         * @description
         * Checks if the user org. unit is valid.
         */

    }, {
        key: 'isValidUserOrgUnit',
        value: function isValidUserOrgUnit(orgUnit) {
            return orgUnit === GeoFeatures.USER_ORGUNIT || orgUnit === GeoFeatures.USER_ORGUNIT_CHILDREN || orgUnit === GeoFeatures.USER_ORGUNIT_GRANDCHILDREN;
        }

        /**
         * @method isValidDisplayName
         * @static
         *
         * @returns {boolean} True if display name is valid
         *
         * @description
         * Checks if the display name is valid.
         */

    }, {
        key: 'isValidDisplayName',
        value: function isValidDisplayName(displayName) {
            return displayName === GeoFeatures.DISPLAY_PROPERTY_NAME || displayName === GeoFeatures.DISPLAY_PROPERTY_SHORTNAME;
        }

        /**
         * @method getGeoFeatures
         * @static
         *
         * @returns {GeoFeatures} Object with interaction properties
         *
         * @description
         * Get a new instance of the GeoFeatures object.
         */

    }, {
        key: 'getGeoFeatures',
        value: function getGeoFeatures() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return new (Function.prototype.bind.apply(GeoFeatures, [null].concat(args)))();
        }
    }]);

    return GeoFeatures;
}();

GeoFeatures.DISPLAY_PROPERTY_NAME = 'NAME';
GeoFeatures.DISPLAY_PROPERTY_SHORTNAME = 'SHORTNAME';
GeoFeatures.USER_ORGUNIT = 'USER_ORGUNIT';
GeoFeatures.USER_ORGUNIT_CHILDREN = 'USER_ORGUNIT_CHILDREN';
GeoFeatures.USER_ORGUNIT_GRANDCHILDREN = 'USER_ORGUNIT_GRANDCHILDREN';
exports.default = GeoFeatures;
//# sourceMappingURL=GeoFeatures.js.map
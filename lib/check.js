'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.checkDefined = checkDefined;
exports.checkType = checkType;
exports.isType = isType;
exports.isString = isString;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isDefined = isDefined;
exports.isInteger = isInteger;
exports.isNumeric = isNumeric;
exports.contains = contains;
exports.isValidUid = isValidUid;
exports.areDefinedAndEqual = areDefinedAndEqual;
exports.checkValidRootJunction = checkValidRootJunction;
/**
 * @module lib/check
 */

/**
 *
 * @param value
 * @param name
 * @returns {boolean}
 */
function checkDefined(value, name) {
    if (value !== undefined) {
        return true;
    }
    throw new Error([name || 'Value', 'should be provided'].join(' '));
}

// TODO: Decide if checkType([], 'object') is a 'false' positive
function checkType(value, type, name) {
    checkDefined(value, name);
    checkDefined(type, 'Type');

    if (typeof type === 'function' && value instanceof type || typeof type === 'string' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type) {
        // eslint-disable-line valid-typeof
        return true;
    }
    throw new Error(['Expected', name || value, 'to have type', type].join(' '));
}

// TODO: Log type error?
function isType(value, type) {
    function noop() {}

    try {
        checkType(value, type);
        return true;
    } catch (e) {
        noop();
    }

    return false;
}

function isString(value) {
    return isType(value, 'string');
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return isType(value, Object);
}

function isDefined(value) {
    return value != null;
}

function isInteger(nVal) {
    return typeof nVal === 'number' && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 && Math.floor(nVal) === nVal;
}

// Polyfill for the isInteger function that will be added in ES6
// http://wiki.ecmascript.org/doku.php?id=harmony:number.isinteger
/* istanbul ignore if  */
if (!Number.isInteger) {
    Number.isInteger = isInteger;
}

function isNumeric(nVal) {
    return typeof nVal === 'number' && isFinite(nVal) && nVal - parseFloat(nVal) + 1 >= 0;
}

function contains(item, list) {
    var listToCheck = isArray(list) && list || [];

    return listToCheck.indexOf(item) >= 0;
}

var isEmpty = exports.isEmpty = function isEmpty(list) {
    return list.length === 0;
};

/**
 * @deprecated Use isValidUid from the `uid.js` file.
 */
function isValidUid(value) {
    return value && value.length === 11;
}

var hasKeys = exports.hasKeys = function hasKeys(object) {
    return object && Object.keys(object).length > 0;
};

function areDefinedAndEqual(left, right) {
    return isDefined(left) && isDefined(right) && right === left;
}

var toBe = exports.toBe = function toBe(left, right) {
    return left === right;
};
var toBeAny = exports.toBeAny = function toBeAny(values) {
    return function (left) {
        return values.some(function (right) {
            return toBe(left, right);
        });
    };
};
var isNullUndefinedOrEmptyString = exports.isNullUndefinedOrEmptyString = toBeAny([undefined, null, '']);

var isFunction = exports.isFunction = function isFunction(fun) {
    return typeof fun === 'function';
};

var hasOwnProperty = exports.hasOwnProperty = function hasOwnProperty(object, propertyName) {
    return Object.prototype.hasOwnProperty.call(object, propertyName);
};

// The logical mode to use when having multiple filters.
// Default is AND.
// See https://docs.dhis2.org/master/en/developer/html/webapi_metadata_object_filter.html

var rootJunctions = exports.rootJunctions = ['OR', 'AND'];
var isValidRootJunction = exports.isValidRootJunction = toBeAny(rootJunctions);
function checkValidRootJunction(rootJunction) {
    checkType(rootJunction, 'string', 'rootJunction');

    if (isValidRootJunction(rootJunction)) {
        return true;
    }
    throw new Error('Expected ' + rootJunction + ' to be one of [' + rootJunctions + ']');
}
//# sourceMappingURL=check.js.map
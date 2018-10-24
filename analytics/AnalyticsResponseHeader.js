"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnalyticsResponseHeader = function () {
    function AnalyticsResponseHeader() {
        var header = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { isPrefix: false, isCollect: false, index: undefined };

        _classCallCheck(this, AnalyticsResponseHeader);

        Object.assign(this, header, options);
    }

    _createClass(AnalyticsResponseHeader, [{
        key: "getIndex",
        value: function getIndex() {
            return this.index;
        }
    }, {
        key: "setIndex",
        value: function setIndex(value) {
            var index = +value;

            if (!Number.isNaN(index) && Number.isFinite(index)) {
                this.index = parseInt(index, 10);
            }
        }
    }]);

    return AnalyticsResponseHeader;
}();

exports.default = AnalyticsResponseHeader;
//# sourceMappingURL=AnalyticsResponseHeader.js.map
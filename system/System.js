'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module system
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @requires module:api/Api
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Api = require('../api/Api');

var _Api2 = _interopRequireDefault(_Api);

var _SystemSettings = require('./SystemSettings');

var _SystemSettings2 = _interopRequireDefault(_SystemSettings);

var _SystemConfiguration = require('./SystemConfiguration');

var _SystemConfiguration2 = _interopRequireDefault(_SystemConfiguration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description
 * Represents the system that can be interacted with. There is a single instance of this pre-defined onto the d2
 * object after initialisation. This can be interacted with using its property objects to among other be used
 * to get and save systemSettings.
 *
 * @memberof module:system
 */
var System = function () {
    function System(settings, configuration) {
        _classCallCheck(this, System);

        /**
         * Contains a reference to a `SystemSettings` instance that can be used
         * to retrieve and save system settings.
         *
         * ```js
         * d2.system.settings.get('keyLastSuccessfulResourceTablesUpdate')
         *  .then(systemSettingsValue => {
         *    console.log('Analytics was last updated on: ' + systemSettingsValue);
         *  });
         * ```
         * @type {SystemSettings}
         *
         */
        this.settings = settings;

        /**
         * A representation of the system configuration,
         * that can be used to retrieve and change system configuration options.
         * @type {SystemConfiguration}
         */
        this.configuration = configuration;

        /**
         * An object containing system information about the DHIS2 instance
         * @type {Object}
         */
        this.systemInfo = undefined;

        /**
         * An object containing version information about the DHIS2 instance
         * @type {Object}
         */
        this.version = undefined;

        /**
         * An array of all the webapps that are installed on the current DHIS2 instance
         * @type {Array}
         */
        this.installedApps = undefined;
    }

    /**
     * Sets the systemInfo and version properties
     *
     * @param systemInfo
     */


    _createClass(System, [{
        key: 'setSystemInfo',
        value: function setSystemInfo(systemInfo) {
            this.version = System.parseVersionString(systemInfo.version);
            this.systemInfo = systemInfo;
        }

        /**
         * Sets the list of currently installed webapps
         *
         * @param apps
         */

    }, {
        key: 'setInstalledApps',
        value: function setInstalledApps(apps) {
            this.installedApps = apps;
        }

        /**
         * Refreshes the list of currently installed webapps
         *
         * @returns {Promise} A promise that resolves to the list of installed apps
         */

    }, {
        key: 'loadInstalledApps',
        value: function loadInstalledApps() {
            var _this = this;

            var api = _Api2.default.getApi();

            return api.get('apps').then(function (apps) {
                _this.setInstalledApps(apps);

                return apps;
            });
        }

        /**
         * Upload and install a zip file containing a new webapp
         *
         * @param zipFile Zip file data from a file input form field
         * @param onProgress An optional callback that will be called whenever file upload progress info is available
         * @returns {Promise}
         */

    }, {
        key: 'uploadApp',
        value: function uploadApp(zipFile, onProgress) {
            // eslint-disable-line class-methods-use-this
            var api = _Api2.default.getApi();
            var data = new FormData();
            var xhr = void 0;
            data.append('file', zipFile);

            if (onProgress !== undefined) {
                xhr = new XMLHttpRequest();
                xhr.upload.onprogress = function (progress) {
                    if (progress.lengthComputable) {
                        onProgress(progress.loaded / progress.total);
                    }
                };
            }

            return api.post('apps', data, {
                contentType: false,
                processData: false,
                xhr: xhr !== undefined ? function () {
                    return xhr;
                } : undefined
            });
        }

        /**
         * Load the list of apps available in the DHIS 2 app store
         *
         * @param compatibleOnly If true, apps that are incompatible with the current system will be filtered out
         * @returns {Promise}
         */

    }, {
        key: 'loadAppStore',
        value: function loadAppStore() {
            var _this2 = this;

            var compatibleOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            return new Promise(function (resolve, reject) {
                var api = _Api2.default.getApi();
                api.get('appStore').then(function (appStoreData) {
                    return resolve(appStoreData.map(function (appData) {
                        var app = Object.assign({}, appData);

                        if (compatibleOnly) {
                            app.versions = app.versions.filter(function (versionData) {
                                return System.isVersionCompatible(_this2.version, versionData);
                            });
                        }

                        return app;
                    }).filter(function (appData) {
                        return appData.versions.length > 0;
                    }));
                }).catch(function (err) {
                    return reject(err);
                });
            });
        }

        /**
         * Install the specified app version from the DHIS 2 app store
         *
         * @param uid The uid of the app version to install
         * @returns {Promise}
         */

    }, {
        key: 'installAppVersion',
        value: function installAppVersion(uid) {
            // eslint-disable-line class-methods-use-this
            var api = _Api2.default.getApi();
            return new Promise(function (resolve, reject) {
                api.post(['appStore', uid].join('/'), '', { dataType: 'text' }).then(function () {
                    resolve();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }

        /**
         * Remove the specified app from the system
         *
         * @param appKey The key of the app to remove
         * @returns {Promise}
         */

    }, {
        key: 'uninstallApp',
        value: function uninstallApp(appKey) {
            // eslint-disable-line class-methods-use-this
            var api = _Api2.default.getApi();

            return api.delete(['apps', appKey].join('/'))
            // TODO: Stop jQuery from rejecting successful promises
            .catch(function () {
                return undefined;
            });
        }

        /**
         * Refresh the list of apps that are installed on the server
         *
         * @returns {Promise} A promise that resolves to the updated list of installed apps
         */

    }, {
        key: 'reloadApps',
        value: function reloadApps() {
            var _this3 = this;

            var api = _Api2.default.getApi();
            return api.update('apps').then(function () {
                return _this3.loadInstalledApps();
            });
        }

        /**
         * @static
         * @typedef {Object} ParsedVersion
         * @property {number} major - Major version of the parsed-string (before .)
         * @property {number} minor - Minor version of the parsed-string (after .)
         * @property {boolean} snapshot - If it's a snapshot-version
         */
        // TODO: Validate string
        // TODO: Handle valid version objects too
        /**
         * Parses a version string into an object describing the version.
         * @param {string} version Version-string to parse
         * @returns {module:system.ParsedVersion}
         */

    }], [{
        key: 'parseVersionString',
        value: function parseVersionString(version) {
            return {
                major: Number.parseInt(version, 10),
                minor: Number.parseInt(version.substring(version.indexOf('.') + 1), 10),
                snapshot: version.indexOf('-SNAPSHOT') >= 0
            };
        }

        // Disable eslint complexity warning
        /* eslint-disable complexity */
        /**
         * Compares version a to version b.
         * @param a {string|module:system.ParsedVersion}
         * @param b {string|module:system.ParsedVersion}
         * @returns {number} 0 if same version, else a - b.
         */

    }, {
        key: 'compareVersions',
        value: function compareVersions(a, b) {
            var from = typeof a === 'string' || a instanceof String ? System.parseVersionString(a) : a;
            var to = typeof b === 'string' || b instanceof String ? System.parseVersionString(b) : b;

            if (from.major !== to.major) {
                return from.major - to.major;
            } else if (from.minor !== to.minor) {
                return from.minor - to.minor;
            }

            return (from.snapshot ? 0 : 1) - (to.snapshot ? 0 : 1);
        }

        /**
         * Checks if systemVersion is compatible with appVersion.
         * Versions are compatible if appVersion.minDhisVersion <= parsed systemVersion and
         * if appVersion.maxDhisVersion >= parsed systemVersion.
         * @param systemVersion {string|module:system.ParsedVersion} systemVersion to check
         * @param {Object} appVersion - AppVersion object to check
         * @returns {boolean} true if compatible, false otherwise.
         */

    }, {
        key: 'isVersionCompatible',
        value: function isVersionCompatible(systemVersion, appVersion) {
            var minVersion = appVersion.minDhisVersion || appVersion.min_platform_version || null;
            var maxVersion = appVersion.maxDhisVersion || appVersion.max_platform_version || null;

            var isNewEnough = minVersion ? System.compareVersions(systemVersion, minVersion) >= 0 : true;
            var isNotTooOld = maxVersion ? System.compareVersions(systemVersion, maxVersion) <= 0 : true;

            return isNewEnough && isNotTooOld;
        }
        /* eslint-enable */

        /**
         * Get a new instance of the system object. This will function as a singleton, when a System object has been created
         * when requesting getSystem again the original version will be returned.
         *
         * @returns {System} Object with the system interaction properties
         */

    }, {
        key: 'getSystem',
        value: function getSystem() {
            if (!System.getSystem.system) {
                System.getSystem.system = new System(new _SystemSettings2.default(), new _SystemConfiguration2.default());
            }

            return System.getSystem.system;
        }
    }]);

    return System;
}();

exports.default = System;
//# sourceMappingURL=System.js.map
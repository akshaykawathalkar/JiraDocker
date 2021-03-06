/**
 * This is the AUI deprecation file which has been removed from the AUI API.
 * @module
 * @ignore
 */

define('jira/deprecator', ['exports'], function(exports) {
    'use strict';

    var deprecationCalls = [];
    var supportsProperties = false;
    try {
        if (Object.defineProperty) {
            Object.defineProperty({}, 'blam', { get: function get() {}, set: function set() {} });
            exports.propertyDeprecationSupported = supportsProperties = true;
        }
    } catch (e) {}
    /* IE8 doesn't support on non-DOM elements */

    function toSentenceCase(str) {
        str += '';

        if (!str) {
            return '';
        }

        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    function getDeprecatedLocation(printFrameOffset) {
        var err = new Error();
        var stack = err.stack || err.stacktrace;
        var stackMessage = stack && stack.replace(/^Error\n/, '') || '';

        if (stackMessage) {
            stackMessage = stackMessage.split('\n');
            return stackMessage[printFrameOffset + 2];
        }
        return stackMessage;
    }

    function logger() {
        if (typeof console !== 'undefined' && console.warn) {
            Function.prototype.apply.call(console.warn, console, arguments);
        }
    }

    /**
     * @typedef {Object} DeprecationOptions
     * @prop {string} [removeInVersion] the version this will be removed in
     * @prop {string} [alternativeName] the name of an alternative to use
     * @prop {string} [sinceVersion] the version this has been deprecated since
     * @prop {string} [extraInfo] extra information to be printed at the end of the deprecation log
     * @prop {string} [extraObject] an extra object that will be printed at the end
     * @prop {string} [deprecationType] type of the deprecation to append to the start of the deprecation message. e.g. JS or CSS
     */

    /**
     * Return a function that logs a deprecation warning to the console the first time it is called from a certain location.
     * It will also print the stack frame of the calling function.
     *
     * @param {string} displayName the name of the thing being deprecated
     * @param {DeprecationOptions} [options]
     * @return {Function} that logs the warning and stack frame of the calling function. Takes in an optional parameter for the offset of
     * the stack frame to print, the default is 0. For example, 0 will log it for the line of the calling function,
     * -1 will print the location the logger was called from
     */
    function getShowDeprecationMessage(displayName, options) {
        // This can be used internally to pas in a showmessage fn
        if (typeof displayName === 'function') {
            return displayName;
        }

        var called = false;
        options = options || {};

        return function (printFrameOffset) {
            var deprecatedLocation = getDeprecatedLocation(printFrameOffset ? printFrameOffset : 1) || '';
            // Only log once if the stack frame doesn't exist to avoid spamming the console/test output
            if (!called || deprecationCalls.indexOf(deprecatedLocation) === -1) {
                deprecationCalls.push(deprecatedLocation);

                called = true;

                var deprecationType = options.deprecationType + ' ' || '';

                var message = 'DEPRECATED ' + deprecationType + '- ' + toSentenceCase(displayName) + ' has been deprecated' + (options.sinceVersion ? ' since ' + options.sinceVersion : '') + ' and will be removed in ' + (options.removeInVersion || 'a future release') + '.';

                if (options.alternativeName) {
                    message += ' Use ' + options.alternativeName + ' instead. ';
                }

                if (options.extraInfo) {
                    message += ' ' + options.extraInfo;
                }

                if (deprecatedLocation === '') {
                    deprecatedLocation = ' \n ' + 'No stack trace of the deprecated usage is available in your current browser.';
                } else {
                    deprecatedLocation = ' \n ' + deprecatedLocation;
                }

                if (options.extraObject) {
                    message += '\n';
                    logger(message, options.extraObject, deprecatedLocation);
                } else {
                    logger(message, deprecatedLocation);
                }
            }
        };
    }

    /**
     * Returns a wrapped version of the function that logs a deprecation warning when the function is used.
     * @param {Function} fn the fn to wrap
     * @param {string} displayName the name of the fn to be displayed in the message
     * @param {DeprecationOptions} [options] the deprecation options
     * @return {Function} wrapping the original function
     */
    function deprecateFunctionExpression(fn, displayName, options) {
        options = options || {};
        options.deprecationType = options.deprecationType || 'JS';

        var showDeprecationMessage = getShowDeprecationMessage(displayName || fn.name || 'this function', options);
        return function () {
            showDeprecationMessage();
            return fn.apply(this, arguments);
        };
    }

    /**
     * Wraps a "value" object property in a deprecation warning in browsers supporting Object.defineProperty
     * @param {Object} obj the object containing the property
     * @param {string} prop the name of the property to deprecate
     * @param {DeprecationOptions} [options] the deprecation options
     * @param {string} [options.displayName] the display name of the property to deprecate (optional, will fall back to the property name)
     */
    function deprecateValueProperty(obj, prop, options) {
        if (supportsProperties) {
            var oldVal = obj[prop];
            options = options || {};
            options.deprecationType = options.deprecationType || 'JS';

            var displayNameOrShowMessageFn = options.displayName || prop;
            var showDeprecationMessage = getShowDeprecationMessage(displayNameOrShowMessageFn, options);
            Object.defineProperty(obj, prop, {
                get: function get() {
                    showDeprecationMessage();
                    return oldVal;
                },
                set: function set(val) {
                    oldVal = val;
                    showDeprecationMessage();
                    return val;
                }
            });
        }
    }

    /**
     * Wraps an object property in a deprecation warning, if possible. functions will always log warnings, but other
     * types of properties will only log in browsers supporting Object.defineProperty
     * @param {Object} obj the object containing the property
     * @param {string} prop the name of the property to deprecate
     * @param {DeprecationOptions} [options] the deprecation options
     * @param {string} [options.displayName] the display name of the property to deprecate (optional, will fall back to the property name)
     */
    function deprecateObjectProperty(obj, prop, options) {
        if (typeof obj[prop] === 'function') {
            options = options || {};
            options.deprecationType = options.deprecationType || 'JS';

            var displayNameOrShowMessageFn = options.displayName || prop;
            obj[prop] = deprecateFunctionExpression(obj[prop], displayNameOrShowMessageFn, options);
        } else {
            deprecateValueProperty(obj, prop, options);
        }
    }

    exports.getDeprecatedLocation = getDeprecatedLocation;
    exports.prop = deprecateObjectProperty;
});

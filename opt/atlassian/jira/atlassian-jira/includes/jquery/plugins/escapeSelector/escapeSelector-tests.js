AJS.test.require(["jira.webresources:jquery-escape-selector-polyfill"], function() {
    'use strict';

    module("jQuery escapeSelector", {});

    var jQuery = require("jquery");

    test('Test $.escapeSelector presence', function() {
        equal( typeof jQuery.escapeSelector, "function", "jQuery.escapeSelector present" );
    });
    test('Test escaping CSS selector via jQuery function', function() {
        equal( jQuery.escapeSelector( "#dot.dot" ), "\\#dot\\.dot", "jQuery.escapeSelector function properly" );
    });
});

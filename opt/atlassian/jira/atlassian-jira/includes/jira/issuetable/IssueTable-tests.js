AJS.test.require('jira.webresources:jira-global', function () {

    var $ = require('jquery');
    var _ = require('underscore');

    var IssueTable = require('jira/issuetable');

    var fixture = null;

    module("jira/issuetable", {
        setup: function(){
            fixture = $("#qunit-fixture");
        },
        tearDown: function(){}
    });

    test("Listeners for initialization being notified on component appearance on page", function(){
        var value = "not notified";
        IssueTable.on(IssueTable.Events.ON_INIT, function(){
            value = "notified";
        });
        $("<issuetable-web-component><table id='issuetable'></table></issuetable-web-component>")
            .appendTo(fixture);

        stop();

        _.defer(function(){
            start();
            equal(value, "notified", 'Listeners must be notified when Issue Table appears on page');
        }.bind(this));
    });
});

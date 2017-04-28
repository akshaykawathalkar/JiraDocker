AJS.test.require([
    "jira.webresources:jira-fields",
    "jira.webresources:jira-global"
], function() {

    var MultiUserListPickerItem = require('jira/field/multi-user-list-picker/item');

    module("JIRA.MultiUserListPicker.Item", {
        setup: function () {
            this.sandbox = sinon.sandbox.create();
            var fixture = jQuery("#qunit-fixture");
        },
        teardown: function () {
            this.sandbox.restore();
        }
    });

    test("Is correctly declared in AMD", function () {
        ok(MultiUserListPickerItem, "Is AMDifyed");
    });

});

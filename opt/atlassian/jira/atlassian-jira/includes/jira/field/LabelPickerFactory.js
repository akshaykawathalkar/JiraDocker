define('jira/field/label-picker-factory', [
    'jira/field/label-picker',
    'jira/data/parse-options-from-fieldset',
    'jquery',
    'exports'
], function(
    LabelPicker,
    parseOptionsFromFieldset,
    $,
    exports) {

    exports.createPicker = function($fieldset, context) {
        var opts = parseOptionsFromFieldset($fieldset);
        var $select = $('#' + opts.id, context);
        var issueId = opts.issueId;
        var data = {};

        if (/customfield_\d/.test(opts.id)) {
            data.customFieldId = parseInt(opts.id.replace('customfield_', ''), 10);
        }

        new LabelPicker({
            element: $select,
            ajaxOptions: {
                url: contextPath + '/rest/api/1.0/labels' + (issueId ? '/' + issueId : '') + '/suggest',
                data: data
            }
        });
    };

});

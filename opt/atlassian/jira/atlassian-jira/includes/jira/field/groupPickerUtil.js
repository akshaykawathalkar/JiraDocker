define('jira/field/group-picker-util', [
    'jira/ajs/list/item-descriptor',
    'jira/ajs/list/group-descriptor',
    'jquery'
], function(
    ItemDescriptor,
    GroupDescriptor,
    jQuery) {

    var formatResponse = function(data, showLabels) {
        var ret = [];

        var template = showLabels ? JIRA.Templates.GroupPickerUtil.formatResponseWithLabels :
            JIRA.Templates.GroupPickerUtil.formatResponse;

        jQuery(data).each(function(i, suggestions) {

            var groupDescriptor = new GroupDescriptor({
                weight: i, // order or groups in suggestions dropdown
                label: suggestions.header
            });
            jQuery(suggestions.groups).each(function(){
                groupDescriptor.addItem(new ItemDescriptor({
                    value: this.name, // value of item added to select
                    label: this.name, // title of lozenge
                    title: this.name, // tooltip
                    html: template(this),
                    highlighted: true
                }));
            });

            ret.push(groupDescriptor);
        });

        return ret;
    };

    return {
        formatResponseWithLabels: function(data) {
            return formatResponse(data, true);
        },

        formatResponse: function (data, showLabels) {
            return formatResponse(data, showLabels);
        }
    };
});

AJS.namespace('JIRA.GroupPickerUtil', null, require('jira/field/group-picker-util'));

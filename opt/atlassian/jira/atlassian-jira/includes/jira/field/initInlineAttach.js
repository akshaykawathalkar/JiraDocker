define('jira/field/init-inline-attach', [
    'jquery',
    'jira/util/events',
    'jira/util/events/types',
    'jira/util/events/reasons',
    // Ensure jQuery plugin is defined
    'jira/jquery/plugins/attachment/inline-attach'
], function(jQuery, Events, Types, Reasons, jQuery) {

    /**
     * @param {jQuery} context
     */
    function createInlineAttach(context) {
        context.find("input[type=file]:not('.ignore-inline-attach')").inlineAttach();
    }

    Events.bind(Types.NEW_CONTENT_ADDED, function (e, context, reason) {
        if (reason !== Reasons.panelRefreshed) {
            createInlineAttach(context);
        }
    });

});

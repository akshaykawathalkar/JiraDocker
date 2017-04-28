require(['require'], function (require) {
    var $ = require('jquery');
    var FormDialog = require('jira/dialog/form-dialog');

    $(function () {
        // JIRA.loggingLevels is made available via an inline script written to the page by a JSP.
        var loggingLevels = JIRA.loggingLevels;

        new FormDialog({
            trigger: "#add-custom-logger-link",
            id: "add-custom-loger-dialog",
            width: 560,
            content: function (ready) {
                var content = JIRA.Templates.Logging.loggerForm({
                    availableLevels: loggingLevels,
                    atlToken: atl_token()
                });

                var $dialogWrapper = $(content);
                ready($dialogWrapper);
            },
            autoClose: true
        });
    });
});

define('jira/viewissue/watchers-voters/views/watchers-read-only-view', ['require'], function(require) {
    var AbstractWatchersView = require('jira/viewissue/watchers-voters/views/abstract-watchers-view');
    var TEMPLATES = JIRA.Templates.Issue;

    /**
     * @class WatchersReadOnlyView
     * @extends AbstractWatchersView
     */
    return AbstractWatchersView.extend({
        _render: function () {
            this.$el.html(TEMPLATES.usersListReadOnly({ users: this.collection.toJSON() }));
        }
    });
});

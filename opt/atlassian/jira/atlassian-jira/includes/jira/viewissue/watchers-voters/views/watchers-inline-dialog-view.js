define('jira/viewissue/watchers-voters/views/watchers-inline-dialog-view', ['require'], function (require) {
    var Backbone = require('backbone');
    var skate = require('jira/skate');

    var _setElement = Backbone.View.prototype.setElement;

    /**
     * A wrapper layer to house an AUI Inline Dialog for the Watchers list.
     * Exists because inline dialogs are finicky things and their API changes
     * across multiple versions of AUI.
     */
    return Backbone.View.extend({
        id: "inline-dialog-watchers",

        events: {
            "click .cancel": function(e) {
                e.preventDefault();
                this.hide();
            }
        },
        setElement: function(val) {
            var el = (val instanceof Backbone.$) ? val.get(0) : val;
            if (!el) {
                return; // don't set an empty element.
            }
            if (this.el && this.el.parentNode && this.el !== el) {
                this.el.parentNode.removeChild(this.el); // detach from DOM, allow for GC.
            }
            _setElement.call(this, el);
            skate.init(this.el);
            return this;
        },
        contents: function(html) {
            this.$el.find('.aui-inline-dialog-contents').html(html);
        },
        show: function() {
            // Using setAttribute('open', '') instead of this.el.open = true as per this bug:
            // https://ecosystem.atlassian.net/browse/AUI-4190
            this.el.setAttribute('open', '');
        },
        hide: function() {
            // Using removeAttribute('open') instead of this.el.open = false as per this bug:
            // https://ecosystem.atlassian.net/browse/AUI-4190
            this.el.removeAttribute('open');
        },
        isVisible: function() {
            return !!this.el.hasAttribute('open');
        }
    });
});

define('jira/project/project-edit-key', [
    'jira/util/formatter',
    'jira/lib/class',
    'jquery',
    'aui/flag',
    'underscore',
    'aui/inline-dialog2'
], function(formatter, Class, jQuery, flag, _, inlineDialog2) {
    /**
     * @class ProjectEditKey
     * @extends Class
     */
    return Class.extend({
        init: function (form, options) {
            this.options = _.defaults(options || {}, {
                flagShowDelay: 600
            });
            var $form = jQuery(form);
            var context = this;
            this.warningFlag = null;
            this.$input = $form.find("#project-edit-key");
            this.$initialKey = $form.find('#edit-project-original-key');
            this.$keyEdited = $form.find('#edit-project-key-edited');
            this.updateFlagDebounced = _.throttle(this.updateFlag, this.options.flagShowDelay, {
                leading: false,
                trailing: true
            });
            this.updateFlag();
            $form.find('#project-edit-key').on("remove", function () {
                context.cleanupFlag();
            });
        },
        checkModified: function () {
            this.updateFlagDebounced();
            this.$keyEdited.val(this._hasBeenModified().toString());
        },
        updateFlag: function () {
            if (this._hasBeenModified()) {
                if (this.warningFlag == null) {
                    this.createFlag();
                }
            } else {
                this.cleanupFlag();
            }
        },
        cleanupFlag: function () {
            if (this.warningFlag != null) {
                this.warningFlag.close();
                this.warningFlag = null;
            }
        },
        createFlag: function () {
            this.warningFlag = flag({
                type: 'warning',
                title: '',
                body: JIRA.Templates.Project.ChangeTriggeredFlag.fieldRevertWarning({
                    message: formatter.I18n.getText('admin.projects.edit.project.key.warning.message'),
                    revertMessage: formatter.I18n.getText("admin.projects.edit.project.warning.cancel")
                })
            });
            var context = this;
            jQuery(this.warningFlag).find('.cancel').click(function (event) {
                event.preventDefault();
                context._revert();
            });
            jQuery(this.warningFlag).find('.icon-close').click(function () {
                context.updateFlagDebounced = function () {
                };
                context.warningFlag = null;
            });
            jQuery(this.warningFlag).find('.icon-close').keypress(function (e) {
                if ((e.which === AJS.keyCode.ENTER) || (e.which === AJS.keyCode.SPACE)) {
                    context.updateFlagDebounced = function () {
                    };
                    context.warningFlag = null;
                }
            });
        },
        _hasBeenModified: function () {
            return this.$initialKey.val() !== this.$input.val();
        },
        _revert: function () {
            this.$input.val(this.$initialKey.val());
            this.updateFlag();

            AJS.trigger('analyticsEvent', {
                name: "jira.administration.projectdetails.projectkeyupdate.cancelled"
            });
        }
    });
});

AJS.namespace('ProjectEditKey', null, require('jira/project/project-edit-key'));

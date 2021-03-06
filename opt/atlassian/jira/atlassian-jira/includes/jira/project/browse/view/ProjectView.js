define('jira/project/browse/projectview',
    ['jquery', 'underscore', 'backbone'],
    function ($, _, Backbone) {
        "use strict";

        return Backbone.Marionette.ItemView.extend({
            template: JIRA.Templates.Project.Browse.projectRow,
            ui: {
                'name': 'td.cell-type-name a',
                'leadUser': 'td.cell-type-user a',
                'category': 'td.cell-type-category a',
                'url': 'td.cell-type-url a'
            },
            events: {
                'click @ui.name': function () {
                    this.trigger('project-view.click-project-name', this.model);
                },
                'click @ui.leadUser': function () {
                    this.trigger('project-view.click-lead-user', this.model);
                },
                'click @ui.category': function () {
                    this.trigger('project-view.click-category', this.model);
                },
                'click @ui.url': function() {
                    this.trigger('project-view.click-url', this.model);
                }
            },
            onRender: function onRender() {
                this.unwrapTemplate();
            }
        });
    });

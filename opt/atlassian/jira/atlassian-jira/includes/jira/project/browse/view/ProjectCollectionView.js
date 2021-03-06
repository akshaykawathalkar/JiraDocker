define('jira/project/browse/projectcollectionview', [
    'jira/analytics',
    'jira/util/formatter',
    'jira/util/data/meta',
    'backbone',
    'jquery',
    'jira/project/browse/projectview',
    'jira/project/browse/projecttypesservice',
    'jira/project/project-type-keys'
], function(
    analytics,
    formatter,
    Meta,
    Backbone,
    $,
    ProjectView,
    ProjectTypesService,
    ProjectTypeKeys
) {
        "use strict";

        return Backbone.Marionette.CompositeView.extend({
            template: JIRA.Templates.Project.Browse.projects,
            itemView: ProjectView,
            itemViewOptions: function() {
                return {
                    filters: this.model
                };
            },
            itemEvents: {
                'project-view.click-project-name': function(event, childView, project) {
                    var position = this.collection.indexOf(project);
                    this.trigger('project-view.click-project-name', project, position);
                },
                'project-view.click-lead-user': function(event, childView, project) {
                    var position = this.collection.indexOf(project);
                    this.trigger('project-view.click-lead-user', project, position);
                },
                'project-view.click-category': function(event, childView, project) {
                    var position = this.collection.indexOf(project);
                    this.trigger('project-view.click-category', project, position);
                },
                'project-view.click-url': function(event, childView, project) {
                    var position = this.collection.indexOf(project);
                    this.trigger('project-view.click-url', project, position);
                }
            },
            emptyView: Backbone.Marionette.ItemView.extend({
                events: {
                    "click .empty-state-add-project-button": "_handleAddProjectClicked"
                },
                shouldUseCallToActionTemplate: function() {
                    var validProjectTypes = [
                        ProjectTypeKeys.SOFTWARE,
                        ProjectTypeKeys.SERVICE_DESK,
                        ProjectTypeKeys.BUSINESS
                    ];
                    return (this.options.filters.get("projectType") &&
                        this.options.filters.get("category").id === "all" &&
                        this.options.filters.get("contains") === "" &&
                        validProjectTypes.indexOf(this.options.filters.get("projectType").key) !== -1);
                },
                getTemplate: function() {
                    if (this.shouldUseCallToActionTemplate()) {
                        return JIRA.Templates.Project.Browse.emptyRowWithCallToAction;
                    } else {
                        return JIRA.Templates.Project.Browse.emptyRow;
                    }
                },
                onRender: function() {
                    this.unwrapTemplate();
                },
                _handleAddProjectClicked: function(e) {
                    analytics.send({
                        name: "projects.browse.empty.state.add.projects.clicked",
                        properties: {
                            projectTypeKey: $(e.target).data("project-type")
                        }
                    });
                },
                serializeData: function() {
                    var templateParams = {};
                    if (this.shouldUseCallToActionTemplate()) {
                        var projectType = this.options.filters.get("projectType").key;
                        if (projectType === ProjectTypeKeys.SOFTWARE) {
                            templateParams = {
                                headerText: formatter.I18n.getText("browse.projects.software.projects.title"),
                                descriptionText: formatter.I18n.getText("browse.projects.software.projects.description"),
                                callToActionText: formatter.I18n.getText("browse.projects.create.new.project.link"),
                                projectType: projectType
                            };
                        } else if (projectType === ProjectTypeKeys.SERVICE_DESK) {
                            templateParams = {
                                headerText: formatter.I18n.getText("browse.projects.servicedesk.projects.title"),
                                descriptionText: formatter.I18n.getText("browse.projects.servicedesk.projects.description"),
                                callToActionText: formatter.I18n.getText("browse.projects.create.new.project.link"),
                                projectType: projectType
                            };
                        } else if (projectType === ProjectTypeKeys.BUSINESS) {
                            templateParams = {
                                imageClassName: "create-business-project-image",
                                headerText: formatter.I18n.getText("browse.projects.business.projects.not.created"),
                                descriptionText: formatter.I18n.getText("browse.projects.business.projects.description"),
                                callToActionText: formatter.I18n.getText("browse.projects.create.new.project.link"),
                                projectType: projectType
                            };
                        }
                    }
                    return $.extend({
                        isAdmin: Meta.get("is-admin")
                    }, templateParams);
                }
            }),
            itemViewContainer: 'tbody',
            onRender: function onRender() {
                this.unwrapTemplate();
            }
        });
    }
);

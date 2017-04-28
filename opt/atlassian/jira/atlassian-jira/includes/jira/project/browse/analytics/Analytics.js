/*global AJS*/

define('jira/project/browse/analytics', ['backbone'], function(Backbone) {
        'use strict';

        return Backbone.Marionette.Controller.extend({
            initialize: function(options) {
                this.target = options.target;
            },
            startListening: function() {
                this.listenTo(this.target, {
                    'browse-projects.projects-render': function(numProjects) {
                        this.triggerProjectsRender(numProjects);
                    },
                    'browse-projects.project-view.click-project-name': function(project, position) {
                        this.triggerProjectOpened(project, position);
                    },
                    'browse-projects.project-view.click-lead-user': function(project, position) {
                        this.triggerProfileNameClicked(project, position);
                    },
                    'browse-projects.project-view.click-category': function(project, position) {
                        this.triggerProjectCategoryClicked(project, position);
                    },
                    'browse-projects.project-view.click-url': function(project, position) {
                        this.triggerProjectURLClicked(project, position);
                    },
                    'browse-projects.project-type-change': function(projectType) {
                        this.triggerProjectTypeChanged(projectType);
                    },
                    'browse-projects.category-change': function(category) {
                        this.triggerCategoryChanged(category);
                    },
                    'browse-projects.navigate-to-page': function(page) {
                        this.triggerNavigateToPage(page);
                    },
                    'browse-projects.navigate-to-previous': function() {
                        this.triggerNavigateToPrevious();
                    },
                    'browse-projects.navigate-to-next': function() {
                        this.triggerNavigateToNext();
                    }
                });
            },
            triggerProjectTypeChanged: function(projectType) {
                if (projectType === 'business') {
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.types.business'});
                } else if (projectType === 'software') {
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.types.software'});
                } else if (projectType === 'service_desk') {
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.types.servicedesk'});
                } else if (projectType === 'all') {
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.types.all'});
                }
            },
            triggerCategoryChanged: function(categoryId) {
                if (categoryId === 'all') {
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.categories.all'});
                } else if (categoryId === 'recent') {
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.categories.recent'});
                } else {
                    // The specific category can be user-defined, and so will not be recorded due to privacy concerns.
                    AJS.trigger('analyticsEvent', {name: 'projects.browse.categories.select'});
                }
            },
            triggerProjectsRender: function(numProjects) {
                AJS.trigger('analyticsEvent', {
                    name: 'projects.browse.view',
                    data: {numProjects: numProjects}
                });
            },
            triggerProjectOpened: function(project, position) {
                AJS.trigger('analyticsEvent', {
                    name: 'projects.browse.openProject',
                    data: {
                        projectId: project.attributes.id,
                        projectType: project.attributes.projectTypeKey,
                        position: position
                    }
                });
            },
            triggerProfileNameClicked: function(project, position) {
                AJS.trigger('analyticsEvent', {
                    name: 'projects.browse.openProfile',
                    data: {
                        projectId: project.attributes.id,
                        projectType: project.attributes.projectTypeKey,
                        position: position
                    }
                });
            },
            triggerProjectURLClicked: function(project, position) {
                AJS.trigger('analyticsEvent', {
                    name: 'projects.browse.openURL',
                    data: {
                        projectId: project.attributes.id,
                        projectType: project.attributes.projectTypeKey,
                        position: position
                    }
                });
            },
            triggerProjectCategoryClicked: function(project, position) {
                AJS.trigger('analyticsEvent', {
                    name: 'projects.browse.openCategory',
                    data: {
                        projectId: project.attributes.id,
                        projectType: project.attributes.projectTypeKey,
                        position: position
                    }
                });
            },
            triggerNavigateToPage: function(pageNumber) {
                AJS.trigger('analyticsEvent', {
                    name: 'projects.browse.pagination.goto',
                    data: {pageNumber: pageNumber}
                });
            },
            triggerNavigateToPrevious: function() {
                AJS.trigger('analyticsEvent', {name: 'projects.browse.pagination.previous'});
            },
            triggerNavigateToNext: function() {
                AJS.trigger('analyticsEvent', {name: 'projects.browse.pagination.next'});
            }
        });
    }
);

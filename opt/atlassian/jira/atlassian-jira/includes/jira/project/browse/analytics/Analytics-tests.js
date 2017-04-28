/*global AJS*/

AJS.test.require('jira.webresources:browseprojects', function() {
    require(['backbone'], function(Backbone) {
        'use strict';

        module('Analytics', {
            setup: function() {
                this.application = new Backbone.Marionette.Application();
                this.application.start();

                var context = AJS.test.mockableModuleContext();
                var Analytics = context.require('jira/project/browse/analytics');

                var analytics = new Analytics({target: this.application});
                analytics.startListening();

                this.mockProject = {
                    attributes: {
                        id: 'PROJT',
                        projectTypeKey: 'Test'
                    }
                };

                sinon.spy(AJS, 'trigger');
            },
            teardown: function() {
                AJS.trigger.restore();
            }
        });

        test('project type changed to business', function() {
            var projectType = 'business';
            this.application.trigger('browse-projects.project-type-change', projectType);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.types.business'
            }));
        });

        test('project type changed to software', function() {
            var projectType = 'software';
            this.application.trigger('browse-projects.project-type-change', projectType);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.types.software'
            }));
        });

        test('project type changed to service desk', function() {
            var projectType = 'service_desk';
            this.application.trigger('browse-projects.project-type-change', projectType);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.types.servicedesk'
            }));
        });

        test('project type changed to all', function() {
            var projectType = 'all';
            this.application.trigger('browse-projects.project-type-change', projectType);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.types.all'
            }));
        });

        test('category changed to all', function() {
            var category = 'all';
            this.application.trigger('browse-projects.category-change', category);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.categories.all'
            }));
        });

        test('category changed to recent', function() {
            var category = 'recent';
            this.application.trigger('browse-projects.category-change', category);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.categories.recent'
            }));
        });

        test('category changed to user-defined category', function() {
            var category = 'test';
            this.application.trigger('browse-projects.category-change', category);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.categories.select'
            }));
        });

        test('project opened', function() {
            var position = 1;
            this.application.trigger('project-view.click-project-name', this.mockProject, position);
            ok(AJS.trigger('analyticsEvent', {
                name: 'projects.browse.openProject',
                data: {
                    projectId: this.mockProject.attributes.id,
                    projectType: this.mockProject.attributes.projectTypeKey,
                    position: position
                }
            }));
        });

        test('user profile URL clicked', function() {
            var position = 1;
            this.application.trigger('browse-projects.project-view.click-lead-user', this.mockProject, position);
            ok(AJS.trigger('analyticsEvent', {
                name: 'projects.browse.openProfile',
                data: {
                    projectId: this.mockProject.attributes.id,
                    projectType: this.mockProject.attributes.projectTypeKey,
                    position: position
                }
            }));
        });

        test('project URL clicked', function() {
            var position = 1;
            this.application.trigger('browse-projects.project-view.click-url', this.mockProject, position);
            ok(AJS.trigger('analyticsEvent', {
                name: 'projects.browse.openURL',
                data: {
                    projectId: this.mockProject.attributes.id,
                    projectType: this.mockProject.attributes.projectTypeKey,
                    position: position
                }
            }));
        });

        test('project category clicked', function() {
            var position = 1;
            this.application.trigger('browse-projects.project-view.click-category', this.mockProject, position);
            ok(AJS.trigger('analyticsEvent', {
                name: 'projects.browse.openCategory',
                data: {
                    projectId: this.mockProject.attributes.id,
                    projectType: this.mockProject.attributes.projectTypeKey,
                    position: position
                }
            }));
        });

        test('navigate to page', function() {
            var pageNumber = 1;
            this.application.trigger('browse-projects.navigate-to-page', pageNumber);
            ok(AJS.trigger.calledWith('analyticsEvent', {
                name: 'projects.browse.pagination.goto',
                data: {pageNumber: pageNumber}
            }));
        });

        test('navigate to previous page', function() {
            this.application.trigger('browse-projects.navigate-to-previous');
            ok(AJS.trigger.calledWith('analyticsEvent', {name: 'projects.browse.pagination.previous'}));
        });

        test('navigate to next page', function() {
            this.application.trigger('browse-projects.navigate-to-next');
            ok(AJS.trigger.calledWith('analyticsEvent', {name: 'projects.browse.pagination.next'}));
        });
    });
});

/**
 * Provides API to perform and listen for drag-and-drops in the IssueTable.
 * Mostly useful for code responsible for subtasks representation.
 */
define("jira/issuetable", [
    "jquery",
    "underscore",
    "backbone",
    "jira/skate",
    "jira/ajs/dark-features"
], function ($, _, Backbone, Skate, DarkFeatures) {
    var impl = (function (impl) {
        _.extend(impl, Backbone.Events);
        return impl;
    })({
        sortable: {},
        enabled: false,
        /**
         * Finds the sequence number of a row in rows list
         *
         * @param rows list of rows to go through
         * @param row to find sequence number for
         *
         * @returns number of row index in case of success, -1 if it fails to find out row index for some reason.
         */
        sequence: function (row) {
            var rows = $(row).parent().children();

            for (var index = 0; index < rows.length; index++) {
                if (rows[index] === row) {
                    return index;
                }
            }

            // -1 means that listeners must not be notified about this event and all "draggings" must be canceled.
            return -1;
        },

        ready: function () {
            if (DarkFeatures.isEnabled("com.atlassian.jira.issuetable.draggable") && this.enabled) {
                $("#issuetable tbody").sortable("destroy");
                $("#issuetable tbody").sortable(this.sortable);
                $("#issuetable tbody tr").addClass("issue-table-draggable");
            }
        },

        cancelDragging: function () {
            $("#issuetable tbody").sortable("cancel");
        },

        enableDragging: function () {
            this.enabled = true;
            this.ready();
        },

        setupDragging: function (settings) {
            this.sortable = settings;
            this.ready();
        }
    });

    var api = {
        Events: {
            ON_INIT: "jira-issuetable-web-component-ready",
            ON_ROW_DRAG: "jira-issuetable-web-component-row-drag"
        },

        /**
         * Subscribe callback to onDrag event.
         *
         * IssueTable component will notify listeners by executing
         * existing callbacks about rows which was dragged.
         *
         * @param callback the listener for 'onDrag' event.
         */
        on: function (event, callback) {
            impl.on(event, callback);

            if (event === this.Events.ON_ROW_DRAG) {
                impl.enableDragging();
            }
        },

        /**
         *
         * Reverts all sortings (draggings) and
         * returns table to pre-drag state.
         *
         */
        cancelDragging: function () {
            impl.cancelDragging();
        }
    };

    Skate("issuetable-web-component", {
        attached: function () {
            impl.setupDragging((function (position) {
                return {
                    items: "> tr",
                    appendTo: "parent",
                    helper: "clone",

                    start: function (event, ui) {
                        position.original = impl.sequence(ui.item[0]);
                    },

                    stop: function (event, ui) {
                        position.current = impl.sequence(ui.item[0]);

                        if (position.original >= 0 && position.current >= 0) {
                            impl.trigger(api.Events.ON_ROW_DRAG, {
                                position: position,
                                table: $("#issuetable")[0],
                                row: ui.item[0]
                            });
                        } else {
                            //in normal circumstances it must not happen.
                            console.warn("Unable to calculate index number of row being moved");
                            impl.cancelDragging();
                        }
                    }
                };
            })({original: -1, current: -1}));

            impl.trigger(api.Events.ON_INIT, {});
        }
    });

    return api;
});


define('jira/dropdown', ['require'], function(require) {
    /**
     * Creates a dropdown list from a JSON object
     *
     * @constructor JIRA.Dropdown
     * @deprecated
     * @author Scott Harwood
     *
     * NOTE: Please use {@link Dropdown} instead of this for future dropdown implementations.
     */
    var topSameOriginWindow = require("jira/util/top-same-origin-window")(window);
    var jQuery = require('jquery');
    var instances = [];

    /**
     * Determine if a dialog is currently open.
     */
    function isDialogOpen() {
        try {
            // This could throw an exception if the `jira/dialog` module isn't loaded in the top window.
            return Boolean(topSameOriginWindow.require("jira/dialog/dialog").current);
        } catch (e) {}
        return false;
    }

    return /** @lends JIRA.Dropdown */ {

        /**
         * The current (i.e. visible) dropdown.
         */
        current: null,

        /**
         * Adds this instance to private var <em>instances</em>
         * This reference can be used to access all instances
         */
        addInstance: function() {
            instances.push(this);
        },


        /**
         * Calls the hideList method on all instances of <em>dropdown</em>
         */
        hideInstances: function() {
            var that = this;
            jQuery(instances).each(function(){
                if (that !== this) {
                    this.hideDropdown();
                }
            });
        },


        getHash: function () {
            if (!this.hash) {
                this.hash = {
                    container: this.dropdown,
                    hide: this.hideDropdown,
                    show: this.displayDropdown
                };
            }
            return this.hash;
        },

        /**
         * Calls <em>hideInstances</em> method to hide all other dropdowns.
         * Adds <em>active</em> class to <em>dropdown</em> and styles to make it visible.
         */
        displayDropdown: function() {
            if (this.current === this) {
                return;
            }

            this.hideInstances();
            this.current = this;
            this.dropdown.css({display: "block"});

            this.displayed = true;

            var dd = this.dropdown;

            if (!isDialogOpen()) {
                setTimeout(function() {
                    // Scroll dropdown into view
                    var win = jQuery(window);
                    var minScrollTop = dd.offset().top + dd.prop("offsetHeight") - win.height() + 10;

                    if (win.scrollTop() < minScrollTop) {
                        jQuery("html,body").animate({scrollTop: minScrollTop}, 300, "linear");
                    }
                }, 100);
            }
        },

        /**
         * Removes <em>active</em> class from <em>dropdown</em> and styles to make it hidden.
         */
        hideDropdown: function() {
            if (this.displayed === false) {
                return;
            }

            this.current = null;
            this.dropdown.css({display: "none"});

            this.displayed = false;
        },

        /**
         * Initialises instance by, applying primary handler, user options and a Internet Explorer hack.
         * @param {HTMLElement} trigger
         * @param {HTMLElement} dropdown
         */
        init: function(trigger, dropdown) {

            var that = this;

            this.addInstance(this);
            this.dropdown = jQuery(dropdown);

            this.dropdown.css({display: "none"});

            // hide dropdown on tab
            jQuery(document).keydown(function(e){
                if(e.keyCode === 9) {
                    that.hideDropdown();
                }
            });

            // this instance is triggered by a method call
            if (trigger.target) {
                jQuery.aop.before(trigger, function(){
                    if (!that.displayed) {
                        that.displayDropdown();
                    }
                });

            // this instance is triggered by a click event
            } else {
                that.dropdown.css("top",jQuery(trigger).outerHeight() + "px");
                trigger.click(function(e){
                    if (!that.displayed) {
                        that.displayDropdown();
                        e.stopPropagation();
                        // lets not follow the link (if it is a link)
                    } else {
                        that.hideDropdown();
                    }
                    e.preventDefault();
                });
            }

            // hide dropdown when click anywhere other than on this instance
            jQuery(document.body).click(function(){
                if (that.displayed) {
                    that.hideDropdown();
                }
            });
        }
    };
});

AJS.namespace('JIRA.Dropdown', null, require('jira/dropdown'));

/** Preserve legacy namespace
    @deprecated jira.widget.dropdown */
AJS.namespace("jira.widget.dropdown", null, require('jira/dropdown'));

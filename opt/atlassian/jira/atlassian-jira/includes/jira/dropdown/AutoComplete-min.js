define("jira/dropdown/auto-complete",["require"],function(require){var objects=require("jira/util/objects");var jQuery=require("jquery");var jiraDropdown=require("jira/dropdown");return function(trigger,dropdown){var that=objects.begetObject(jiraDropdown);that.init=function(trigger,dropdown){this.addInstance(this);this.dropdown=jQuery(dropdown).click(function(e){e.stopPropagation()});this.dropdown.css({display:"none"});if(trigger.target){jQuery.aop.before(trigger,function(){if(!that.displayed){that.displayDropdown()}})}else{trigger.click(function(e){if(!that.displayed){that.displayDropdown();e.stopPropagation()}})}jQuery(document.body).click(function(){if(that.displayed){that.hideDropdown()}})};that.init(trigger,dropdown);return that}});AJS.namespace("JIRA.Dropdown.AutoComplete",null,require("jira/dropdown/auto-complete"));
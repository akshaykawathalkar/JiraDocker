define("jira/dropdown",["require"],function(require){var topSameOriginWindow=require("jira/util/top-same-origin-window")(window);var jQuery=require("jquery");var instances=[];function isDialogOpen(){try{return Boolean(topSameOriginWindow.require("jira/dialog/dialog").current)}catch(e){}return false}return{current:null,addInstance:function(){instances.push(this)},hideInstances:function(){var that=this;jQuery(instances).each(function(){if(that!==this){this.hideDropdown()}})},getHash:function(){if(!this.hash){this.hash={container:this.dropdown,hide:this.hideDropdown,show:this.displayDropdown}}return this.hash},displayDropdown:function(){if(this.current===this){return }this.hideInstances();this.current=this;this.dropdown.css({display:"block"});this.displayed=true;var dd=this.dropdown;if(!isDialogOpen()){setTimeout(function(){var win=jQuery(window);var minScrollTop=dd.offset().top+dd.prop("offsetHeight")-win.height()+10;if(win.scrollTop()<minScrollTop){jQuery("html,body").animate({scrollTop:minScrollTop},300,"linear")}},100)}},hideDropdown:function(){if(this.displayed===false){return }this.current=null;this.dropdown.css({display:"none"});this.displayed=false},init:function(trigger,dropdown){var that=this;this.addInstance(this);this.dropdown=jQuery(dropdown);this.dropdown.css({display:"none"});jQuery(document).keydown(function(e){if(e.keyCode===9){that.hideDropdown()}});if(trigger.target){jQuery.aop.before(trigger,function(){if(!that.displayed){that.displayDropdown()}})}else{that.dropdown.css("top",jQuery(trigger).outerHeight()+"px");trigger.click(function(e){if(!that.displayed){that.displayDropdown();e.stopPropagation()}else{that.hideDropdown()}e.preventDefault()})}jQuery(document.body).click(function(){if(that.displayed){that.hideDropdown()}})}}});AJS.namespace("JIRA.Dropdown",null,require("jira/dropdown"));AJS.namespace("jira.widget.dropdown",null,require("jira/dropdown"));
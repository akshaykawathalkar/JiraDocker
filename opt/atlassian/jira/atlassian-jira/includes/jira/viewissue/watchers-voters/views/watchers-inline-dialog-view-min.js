define("jira/viewissue/watchers-voters/views/watchers-inline-dialog-view",["require"],function(require){var Backbone=require("backbone");var skate=require("jira/skate");var _setElement=Backbone.View.prototype.setElement;return Backbone.View.extend({id:"inline-dialog-watchers",events:{"click .cancel":function(e){e.preventDefault();this.hide()}},setElement:function(val){var el=(val instanceof Backbone.$)?val.get(0):val;if(!el){return }if(this.el&&this.el.parentNode&&this.el!==el){this.el.parentNode.removeChild(this.el)}_setElement.call(this,el);skate.init(this.el);return this},contents:function(html){this.$el.find(".aui-inline-dialog-contents").html(html)},show:function(){this.el.setAttribute("open","")},hide:function(){this.el.removeAttribute("open")},isVisible:function(){return !!this.el.hasAttribute("open")}})});
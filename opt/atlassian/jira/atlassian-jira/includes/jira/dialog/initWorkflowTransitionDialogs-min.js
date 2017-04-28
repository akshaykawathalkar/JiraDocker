define("jira/dialog/init-workflow-transition-dialogs",["jira/dialog/dialog-register","jira/dialog/dialog-util","jira/dialog/form-dialog","jira/issuenavigator/issue-navigator","aui/tabs","jquery","exports","jira/libs/parse-uri"],function(DialogRegister,DialogUtil,FormDialog,IssueNavigator,AuiTabs,jQuery,exports,parseUri){var workflowLinkSelector="a.issueaction-workflow-transition";exports.init=function(){jQuery(document).delegate(workflowLinkSelector,"click",function(event){event.preventDefault();var link=jQuery(event.target).closest(workflowLinkSelector);var action=parseUri(link.attr("href")).queryKey.action;if(action){var id="workflow-transition-"+action+"-dialog";var $trigger=jQuery(this);if(!DialogRegister[id]){DialogRegister[id]=new FormDialog({id:id,trigger:['a[href*="action='+action+'&"].issueaction-workflow-transition','a[href$="action='+action+'"].issueaction-workflow-transition'],widthClass:"large",handleRedirect:true,ajaxOptions:DialogUtil.getDefaultAjaxOptions,onSuccessfulSubmit:DialogUtil.storeCurrentIssueIdOnSucessfulSubmit,delayShowUntil:DialogUtil.BeforeShowIssueDialogHandler.execute,issueMsg:"thanks_issue_transitioned",onContentRefresh:function(){AuiTabs.setup()},isIssueDialog:true});DialogRegister[id].$activeTrigger=$trigger;DialogRegister[id].show()}}})}});
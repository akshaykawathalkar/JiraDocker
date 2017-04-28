if(!AJS.isDevMode){AJS.isDevMode=function(){return AJS.Meta.get("dev-mode")}}AJS.$.ajaxSetup({timeout:30000});define("jira/setup/setup-license",["jira/util/formatter","jira/util/data/meta","jira/jquery/deferred","jquery","jira/flag","underscore"],function(formatter,Meta,Deferred,$,Flag,_){var $existingLicenseForm;var $licenseInputContainer;var $macLink;function showFormError(title,msg){AJS.messages.error("#formError",{title:title,body:msg,closeable:false});$("#formError").scrollIntoView()}function generalErrorLogging(){showFormError(formatter.I18n.getText("setupLicense.error.unknown.title"),formatter.I18n.getText("setupLicense.error.unknown.desc","<a href='https://support.atlassian.com' target='_blank'>","</a>"))}function showForm(){$licenseInputContainer.children().detach();$licenseInputContainer.append($existingLicenseForm).removeClass("hidden")}var startPage=function(){var licenseKey;var serializeObject=function(obj){var o={};var a=obj.serializeArray();$.each(a,function(){if(o[this.name]!==undefined){if(!o[this.name].push){o[this.name]=[o[this.name]]}o[this.name].push(this.value||"")}else{o[this.name]=this.value||""}});return o};$existingLicenseForm=$(JIRA.Templates.LicenseSetup.renderExistingLicenseForm({serverId:Meta.get("server-id")}));$existingLicenseForm.submit(_.compose(formSubmitCleanup,existingLicenseFormSubmit,showSpinner,disableSubmit,clearErrorsOnForm,preventDefaultOnEvent,disableMacLink));$macLink=$existingLicenseForm.find("#generate-mac-license");$macLink.attr("href",$("#mac-redirect").data("mac-redirect-url"));fillFormWithLicenseFromMac();$licenseInputContainer=$("#license-input-container");function getEventRef(e){return e.target||e.srcElement}function verifyLicense(licenseKey){return $.ajax({url:contextPath+"SetupLicense!validateLicense.jspa?licenseToValidate="+licenseKey,type:"POST"})}function errorVerifyingLicense(jqXHR,textStatus){if(jqXHR.status===403){var licenseErrors=JSON.parse(jqXHR.responseText);showFormErrorList(formatter.I18n.getText("setup.importlicense.validation.failure.header"),licenseErrors.errors)}else{generalErrorLogging(jqXHR,textStatus)}}function submitLicenseKey(){$("#setupLicenseKey").val(licenseKey);$("#setupLicenseForm").submit()}function existingLicenseFormSubmit(e){clearErrorsOnForm();var mainDeferred=Deferred();var formValues=serializeObject($(getEventRef(e)));var licenseVerificationDeferred=verifyLicense(formValues.licenseKey);licenseVerificationDeferred.fail(errorVerifyingLicense);licenseVerificationDeferred.fail(function(){mainDeferred.reject()});licenseVerificationDeferred.done(function(){licenseKey=formValues.licenseKey;mainDeferred.resolve()});return mainDeferred}function showFormErrorList(title,msgList){var errorStr="";_.map(msgList,function(msg){errorStr+=msg+"<br />"});AJS.messages.error("#formError",{title:title,body:errorStr,closeable:false});$("#formError").scrollIntoView()}function preventDefaultOnEvent(e){e.preventDefault();return e}function clearErrorsOnForm(e){$(".error").remove();clearWarningsOnForm();return e}function clearWarningsOnForm(){$(".warn").remove()}function disableSubmit(e){$(getEventRef(e)).find(":submit").attr("disabled","disabled");return e}function showSpinner(e){var spinnerMessage=getSpinnerMessage(e);$(getEventRef(e)).find(".throbbers-placeholder").append(JIRA.Templates.LicenseSetup.renderSpinner({msg:spinnerMessage}));return e}function getSpinnerMessage(){return formatter.I18n.getText("setupLicense.existing.license.spinner")}function formSubmitCleanup(deferred){deferred.fail(function(){$licenseInputContainer.find(":submit").removeAttr("disabled");$macLink.off("click");$licenseInputContainer.find(".throbber-message").remove()}).done(function(){submitLicenseKey()})}function disableMacLink(event){$macLink.click(function(e){e.preventDefault()});return event}function fillFormWithLicenseFromMac(){var macLicense=$("#setupLicenseKey").val();if(macLicense.trim()){setTimeout(function(){Flag.showSuccessMsg(formatter.I18n.getText("setupLicense.flag.title"),formatter.I18n.getText("setupLicense.flag.text"),{close:"auto"})},1000);$existingLicenseForm.find("#licenseKey").text(macLicense)}}showForm()};return{startPage:startPage}});
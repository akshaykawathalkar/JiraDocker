define("jira/field/init-component-pickers",["jira/field/component-picker","jira/util/formatter","jira/util/events","jira/util/events/types","jira/util/events/reasons","jquery"],function(ComponentPicker,formatter,Events,Types,Reasons,jQuery){function createPicker($selectField){new ComponentPicker({element:$selectField,itemAttrDisplayed:"label",errorMessage:formatter.I18n.getText("jira.ajax.autocomplete.components.error"),maxInlineResultsDisplayed:15,expandAllResults:true})}function locateSelect(parent){var $parent=jQuery(parent);var $selectField;if($parent.is("select")){$selectField=$parent}else{$selectField=$parent.find("select")}return $selectField}var DEFAULT_SELECTORS=["div.aui-field-componentspicker.frother-control-renderer","td.aui-field-componentspicker.frother-control-renderer","tr.aui-field-componentspicker.frother-control-renderer"];function findComponentSelectAndConvertToPicker(context,selector){selector=selector||DEFAULT_SELECTORS.join(", ");jQuery(selector,context).each(function(){var $selectField=locateSelect(this);if($selectField.length){createPicker($selectField)}})}Events.bind(Types.NEW_CONTENT_ADDED,function(e,context,reason){if(reason!==Reasons.panelRefreshed){findComponentSelectAndConvertToPicker(context)}})});
define('jira/util/cron', ['exports'], function (exports) {
    /*
     Renders an element visible to the user
     */
    exports.hideCronEdit = function (elementid)
    {
        document.getElementById(elementid).style.display = 'none';
    };

    /*
     Renders an element invisible to the user
     */
    exports.showCronEdit = function (elementid)
    {
        document.getElementById(elementid).style.display = '';
    };

    exports.toggleFrequencyControl = function (paramPrefix, setOriginal)
    {
        var select = document.getElementById(paramPrefix + "interval");
        if(select.value == 0)
        {
            switchToOnce(paramPrefix, setOriginal);
        }
        else
        {
            switchToMany(paramPrefix, setOriginal);
        }
    };

    /*
     Toggles the frequency controls to match 'once per day' mode
     */
    exports.switchToOnce = function (paramPrefix, setOriginal)
    {
        //make sure the frequency select is set correctly
        //set state
        hideCronEdit(paramPrefix + "runMany");
        showCronEdit(paramPrefix + "runOnce");
        if (setOriginal)
        {
            timesOnce[paramPrefix] = true;
        }
    };

    /*
     Toggles the frequency controls to match 'many per day' mode
     */
    exports.switchToMany = function (paramPrefix, setOriginal)
    {
        //set state
        hideCronEdit(paramPrefix + "runOnce");
        showCronEdit(paramPrefix + "runMany");
        if (setOriginal)
        {
            timesOnce[paramPrefix] = false;
        }
    };

    exports.switchToDaysOfMonth = function (paramPrefix)
    {
        hideCronEdit(paramPrefix + 'daysOfWeek');
        showCronEdit(paramPrefix + 'daysOfMonth');
        showCronEdit(paramPrefix + 'freqDiv');
        hideCronEdit(paramPrefix + 'innerFreqDiv');
        hideCronEdit(paramPrefix + 'advanced');
        switchToOnce(paramPrefix, false);
    };

    exports.switchToDaysOfWeek = function (paramPrefix)
    {
        showCronEdit(paramPrefix + 'daysOfWeek');
        hideCronEdit(paramPrefix + 'daysOfMonth');
        showCronEdit(paramPrefix + 'freqDiv');
        showCronEdit(paramPrefix + 'innerFreqDiv');
        hideCronEdit(paramPrefix + 'advanced');
        switchToOriginal(paramPrefix);
    };

    exports.switchToDaily = function (paramPrefix)
    {
        hideCronEdit(paramPrefix + 'daysOfWeek');
        hideCronEdit(paramPrefix + 'daysOfMonth');
        showCronEdit(paramPrefix + 'freqDiv');
        showCronEdit(paramPrefix + 'innerFreqDiv');
        hideCronEdit(paramPrefix + 'advanced');
        switchToOriginal(paramPrefix);
    };

    exports.switchToAdvanced = function (paramPrefix)
    {
        hideCronEdit(paramPrefix + 'daysOfWeek');
        hideCronEdit(paramPrefix + 'daysOfMonth');
        hideCronEdit(paramPrefix + "runOnce");
        hideCronEdit(paramPrefix + "runMany");
        hideCronEdit(paramPrefix + 'freqDiv');
        showCronEdit(paramPrefix + 'advanced');

    };

    exports.switchToOriginal = function (paramPrefix)
    {
        if (timesOnce[paramPrefix])
        {
            switchToOnce(paramPrefix, false);
        }
        else
        {
            switchToMany(paramPrefix, false);
        }
    };
});

AJS.namespace("hideCronEdit", null, require("jira/util/cron").hideCronEdit);
AJS.namespace("showCronEdit", null, require("jira/util/cron").showCronEdit);
AJS.namespace("toggleFrequencyControl", null, require("jira/util/cron").toggleFrequencyControl);
AJS.namespace("switchToOnce", null, require("jira/util/cron").switchToOnce);
AJS.namespace("switchToMany", null, require("jira/util/cron").switchToMany);
AJS.namespace("switchToDaysOfMonth", null, require("jira/util/cron").switchToDaysOfMonth);
AJS.namespace("switchToDaysOfWeek", null, require("jira/util/cron").switchToDaysOfWeek);
AJS.namespace("switchToDaily", null, require("jira/util/cron").switchToDaily);
AJS.namespace("switchToAdvanced", null, require("jira/util/cron").switchToAdvanced);
AJS.namespace("switchToOriginal", null, require("jira/util/cron").switchToOriginal);

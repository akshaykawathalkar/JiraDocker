define('jira/bigpipe/element', ['require'], function (require) {
    var $ = require('jquery');
    var skate = require('jira/skate');
    var wrmData = require('wrm/data');
    var logger = require('jira/util/logger');

    return skate('big-pipe', {

        attached: function attached (element) {

            function mark(name) {
                ('performance' in window) && performance.mark && performance.mark(markPrefix + name);
            }

            function dataArrived(data) {
                try {
                    var parsedHtml = $(data);
                    var $newDom = $(element).replaceWith(parsedHtml);
                    // APDEX-1370 - temporarily force synchronous initialisation instead of async :(
                    $newDom.each(function() { skate.init(this); });
                    mark("end");
                }
                catch (e) {
                    logger.error('Error while parsing html: ' + e);
                    dataError(e);
                }
            }

            function renderError() {
                $(element).html('<div class="error">Unable to render element due to an error</div>');
            }

            function dataError() {
                mark("error");
                renderError();
            }

            var pipeId = element.getAttribute('data-id');
            if (pipeId == null) {
                logger.error('No data-id attribute provided for tag <big-pipe/>.');
                renderError();
                return;
            }

            var markPrefix = "bigPipe." + pipeId + ".";
            mark("start");

            // APDEX-1370 - temporarily force synchronous initialisation instead of async :(
            var data = wrmData.claim(pipeId);
            if (data) {
                dataArrived(data);
            } else {
                dataError();
            }
        },

        detached: function detached (element) {

        },

        type: skate.type.ELEMENT,

        resolvedAttribute: 'resolved',
        unresolvedAttribute: 'unresolved'
    });

});

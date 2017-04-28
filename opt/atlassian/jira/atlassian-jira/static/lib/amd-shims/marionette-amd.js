define('marionette', ['require'], function (require) {
    "use strict";

    var marionetteFactory = require('atlassian/libs/factories/marionette-1.6.1');
    var Backbone = require('backbone');
    var _ = require('underscore');

    return marionetteFactory(_, Backbone);
});
Backbone.Marionette = require("marionette");
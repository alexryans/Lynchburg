module.exports = function(plugins) {
    'use strict';

    return function() {
        return plugins.notify.onError(function(error) {
            return error.message;
        });
    };
};
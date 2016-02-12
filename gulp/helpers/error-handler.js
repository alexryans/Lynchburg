module.exports = function(plugins) {
    'use strict';

    return function() {
        return plugins.notify.onError(function(error) {
            console.error(error.message);
            return error.message;
        });
    };
};
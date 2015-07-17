'use strict';

app.factory('PromiseTracker', function(promiseTracker) {

    return promiseTracker({ activationDelay: 0, minDuration: 750 });

});

'use strict';

app.factory('PromiseTrackerService', function(promiseTracker) {

    return promiseTracker({ activationDelay: 0, minDuration: 750 });

});

'use strict';

app.factory('DateUtil', function() {

    var addDaysToDate = function(date, days) {
        var dateVerify = date;
        dateVerify.setDate(date.getDate() + days);
        return dateVerify;
    };

    var getDateFromStr = function(date) {
        if(_.isDate(date)) return date;
        var dates = angular.copy(date).split("/");;
        return new Date(dates[2], dates[1] - 1, dates[0]);
    };

    return {
        addDaysToDate: addDaysToDate,
        getDateFromStr: getDateFromStr
    }

});

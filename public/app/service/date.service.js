'use strict';

app.factory('DateService', function() {

    var _addDaysToDate = function(date, days) {
        var dateVerify = date;
        dateVerify.setDate(date.getDate() + days);
        return dateVerify;
    };

    var _getDateFromStr = function(date) {
        if(_.isDate(date)) return date;
        var dates = angular.copy(date).split("/");;
        return new Date(dates[2], dates[1] - 1, dates[0]);
    };

    return {
        addDaysToDate: _addDaysToDate,
        getDateFromStr: _getDateFromStr
    }

});

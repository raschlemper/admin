'use strict';

app.factory('Pagination', function() {

    var pagination = {
        currentPage: 1,
        maxPerPage: 6
    };

    var list = {
        begin: function(currentPage) {
            return pagination.maxPerPage * currentPage;
        },
        size: function(currentPage, length) {
            var last = list.begin(currentPage) - length;
            return -1 * (pagination.maxPerPage - last);
        }
    };

    return {
        pagination: pagination,
        list: list
    }

});

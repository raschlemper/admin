'use strict';

app.factory('PaginationService', function(VALUE) {

    var _pagination = {
        currentPage: VALUE.currentPage,
        maxPerPage: VALUE.maxPerPage
    };

    var _list = {
        begin: function(currentPage) {
            return _pagination.maxPerPage * currentPage;
        },
        size: function(currentPage, length) {
            var last = _list.begin(currentPage) - length;
            return -1 * (_pagination.maxPerPage - last);
        }
    };

    return {
        pagination: _pagination,
        list: _list
    }

});

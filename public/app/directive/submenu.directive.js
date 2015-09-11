app.directive( 'submenu', function ( ) {

    return {

        restrict: 'E',
        templateUrl: 'app/directive/html/submenu.html',
        scope: {
          currentMenu: '@'
        },

        link: function(scope, element, attrs) {
            scope.menus = [];
            if(scope.currentMenu === 'MENU.USERS') {
                scope.menus = [];
            } else if(scope.currentMenu === 'MENU.USER.CREATE') {
                scope.menus = [
                    { 'label': 'MENU.USERS', 'state': 'users' }
                ];
            }
        }

    }

});
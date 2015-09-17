app.directive( 'submenu', function ( ) {

    return {

        restrict: 'E',
        templateUrl: 'app/directive/html/submenu.html',
        scope: {
          currentMenu: '@'
        },

        link: function(scope, element, attrs) {
            scope.menus = [];
            var menuUser = { 'label': 'MENU.USERS', 'state': 'users' };
            var menuUserView = { 'label': 'MENU.USER.VIEW', 'state': 'userView' };
            if(scope.currentMenu === 'MENU.USERS') {
                scope.menus = [];
            } else if(scope.currentMenu === 'MENU.USER.CREATE') {
                scope.menus = [ menuUser ];
            } else if(scope.currentMenu === 'MENU.USER.VIEW') {
                scope.menus = [ menuUser ];
            } else if(scope.currentMenu === 'MENU.USER.SYSTEM') {
                scope.menus = [ menuUser ];
            }
        }

    }

});
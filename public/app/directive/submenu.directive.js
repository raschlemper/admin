app.directive( 'submenu', function ( ) {

    return {

        restrict: 'E',
        templateUrl: 'app/directive/html/submenu.html',
        scope: {
          currentMenu: '@',
          userId: '@',
          systemId: '@'
        },

        link: function(scope, element, attrs) {

            scope.menus = [];
            var menuUsers = { 'label': 'MENU.USERS', 'state': 'users' };
            var menuUserView = { 'label': 'MENU.USER.VIEW', 'state': 'userView({idUser: ' + scope.userId + '})' };

            if(scope.currentMenu === 'MENU.USERS') {
                scope.menus = [];
            } else if(scope.currentMenu === 'MENU.USER.CREATE') {
                scope.menus = [ menuUsers ];
            } else if(scope.currentMenu === 'MENU.USER.UPDATE') {
                scope.menus = [ menuUsers ];
            } else if(scope.currentMenu === 'MENU.USER.VIEW') {
                scope.menus = [ menuUsers ];
            } else if(scope.currentMenu === 'MENU.USER.SYSTEM') {
                scope.menus = [ menuUsers, menuUserView ];
            }
        }

    }

});
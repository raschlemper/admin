app.directive( 'titlePage', function ( ) {

    return {

        restrict: 'E',
        templateUrl: 'app/directive/html/title-page.html',
        scope: { 
          titlePage: '@',
          currentMenu: '@',
          userId: '@',
          systemId: '@'
        },

        link: function(scope, element, attrs) {

            var idUser = "idUser: '" + scope.userId + "'"; 

            scope.buttons = [];
            var btnAddUser = { 'type': 'button', 'style': 'btn-primary', 'href': 'userCreate', 'icon': 'fa-plus-circle', 'label': 'BUTTON.ADD' };
            var btnSaveUser = { 'type': 'submit', 'style': 'btn-primary', 'icon': 'fa-check-circle', 'label': 'BUTTON.SAVE' };
            var btnCancelUser = { 'type': 'button', 'style': 'btn-danger', 'href': 'userView({' + idUser + '})', 'icon': 'fa-chevron-left', 'label': 'BUTTON.CANCEL' };
            var btnCancelUsers = { 'type': 'button', 'style': 'btn-danger', 'href': 'users', 'icon': 'fa-chevron-left', 'label': 'BUTTON.CANCEL' };

            if(scope.currentMenu === 'MENU.USERS') {
                scope.buttons = [ btnAddUser ];
            } else if(scope.currentMenu === 'MENU.USER.CREATE') {
                scope.buttons = [ btnCancelUsers, btnSaveUser ];
            } else if(scope.currentMenu === 'MENU.USER.UPDATE') {
                scope.buttons = [ btnCancelUser, btnSaveUser ];
            } else if(scope.currentMenu === 'MENU.USER.VIEW') {
                scope.buttons = [ menuUsers ];
            } else if(scope.currentMenu === 'MENU.USER.SYSTEM') {
                scope.buttons = [ menuUsers, menuUserView ];
            } else if(scope.currentMenu === 'MENU.USER.SYSTEM.UPDATE') {
                scope.buttons = [ menuUsers, menuUserView, menuUserSystems ];
            }
        }

    }

});
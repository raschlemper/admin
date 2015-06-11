app.directive('simpleVerticalTab', function() {

    return {

        restrict: 'E',
        transclude: true,
        templateUrl: 'app/directive/html/simple-vertical-tab.html',
        //scope: {},

        link: function(scope, element, attrs, ctrl) {

            $(element).ready(function() {
                $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
                    e.preventDefault();
                    $(this).siblings('a.active').removeClass("active");
                    $(this).addClass("active");
                    var index = $(this).index();
                    $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
                    $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
                });
            });

        }

    };
});

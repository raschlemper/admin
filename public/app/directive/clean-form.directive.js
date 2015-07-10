app.directive( 'cleanForm', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'element', function (val) {
      console.log(val);
    });
    
  };
});
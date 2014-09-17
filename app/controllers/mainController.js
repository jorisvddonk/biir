biir.controller('mainController', function mainController($scope, brewerydbService, freebaseService) {
  freebaseService.getStyles().then(function(data){
    $scope.styles = data.data;
  });

  $scope.getBeers = function(style) {
    freebaseService.getBeers($scope.getID(style)).then(function(data, metadata){
      $scope.beers = data.data;
    });
  };

  $scope.getID = function(obj) {
    if (obj.hasOwnProperty("mid")) {
      return obj.mid;
    } else if (obj.hasOwnProperty("id")) {
      return obj.id;
    }
  };

});
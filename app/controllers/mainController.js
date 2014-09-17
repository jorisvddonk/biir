biir.controller('mainController', function mainController($scope, brewerydbService, freebaseService) {
  brewerydbService.getStyles().then(function(data){
    $scope.styles = data.data;
  });

  $scope.getBeers = function(styleid) {
    brewerydbService.getBeers(styleid).then(function(data, metadata){
      $scope.beers = data.data;
    });
  };
});
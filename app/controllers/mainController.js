biir.controller('mainController', function mainController($scope, brewerydbService) {
  brewerydbService.getStyles().then(function(data){
    $scope.styles = data.data;

    $scope.getBeers = function(styleid) {
      brewerydbService.getBeers(styleid).then(function(data){
        $scope.beers = data.data;
      });
    };
  });
});
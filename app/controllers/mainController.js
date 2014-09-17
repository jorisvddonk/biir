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

  $scope.getBeerImage = function(beer) {
    if (beer.hasOwnProperty("/common/topic/image")) {
      if (Array.isArray(beer["/common/topic/image"]) && beer["/common/topic/image"].length > 0) {
        var retval = "https://usercontent.googleapis.com/freebase/v1/image" + beer["/common/topic/image"][0].id;
        return retval;
      }
    } else {
      return beer.labels.icon;
    }
  };

});
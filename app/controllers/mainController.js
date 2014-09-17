biir.controller('mainController', function mainController($scope, freebaseService) {
  freebaseService.getStyles().then(function(data){
    $scope.styles = data.data;
  });

  $scope.getBeers = function(style) {
    freebaseService.getBeers(style.mid).then(function(data, metadata){
      $scope.beers = data.data;
    });
  };

  $scope.getBeerImage = function(beer) {
    if (beer.hasOwnProperty("/common/topic/image")) {
      if (Array.isArray(beer["/common/topic/image"]) && beer["/common/topic/image"].length > 0) {
        var retval = "https://usercontent.googleapis.com/freebase/v1/image" + beer["/common/topic/image"][0].id;
        return retval;
      }
    }
  };

  $scope.getCountBeers = function(style) {
    if (style.hasOwnProperty("/food/beer_style/beers")) {
      return style["/food/beer_style/beers"];
    }
  };

});
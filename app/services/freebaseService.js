biir.factory('freebaseService', function($http, $q){
  var API_KEY = undefined; //if not undefined, allows for more requests.
  var API_BASE_URL = "https://www.googleapis.com/freebase/v1";
  return {
    getAPIResult: function(url, params) {
      if (params == null) {
        params = {};
      }
      var default_params = {};
      if (API_KEY != undefined) {
        default_params["key"] = API_KEY;
      }
      params = _.extend(default_params, params);

      var deferred = $q.defer();
      $http({
        "method": 'GET',
        "params": params,
        "url": url
      }).success(function(data, status, headers, config) {
          deferred.resolve({"data": data.result, "metadata": data});
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },

    getStyles: function() {
      return this.getAPIResult(API_BASE_URL + "/search", {filter: "(any type:/food/beer_style)"});
    },

    getBeers: function(styleId) {
      return this.getAPIResult(API_BASE_URL + "/search", {filter: "(any type:/food/beer)"});
    },
  };
});
biir.factory('brewerydbService', function($http, $q){
  var API_KEY = "ENTER_KEY_HERE";
  var API_BASE_URL = "http://cors-anywhere.herokuapp.com/api.brewerydb.com/v2"
  return {
    getAPIResult: function(url, params) {
      if (params == null) {
        params = {};
      }
      var default_params = {
          "key": API_KEY
      };
      params = _.extend(default_params, params);

      var deferred = $q.defer();
      $http({
        "method": 'GET',
        "params": params,
        "url": url
      }).success(function(data, status, headers, config) {
          deferred.resolve({"data": data.data, "metadata": data});
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },

    getAPIResultCached: function(fragment, options) {
      var deferred = $q.defer();
      $http({
        "method": 'GET',
        "url": "app/cached" + fragment + ".json"
      }).success(function(data, status, headers, config) {
          deferred.resolve({"data": data.data, "metadata": data});
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });

      return deferred.promise;
    },

    getStyles: function() {
      return this.getAPIResult(API_BASE_URL + "/styles", {});
    },

    getStylesCached: function() {
      return this.getAPIResultCached("/styles", {});
    },

    getBeers: function(styleId) {
      return this.getAPIResult(API_BASE_URL + "/beers", {"styleId": styleId});
    },

    getBeersCached: function(styleId) {
      return this.getAPIResultCached("/beers", {});
    }
  };
});
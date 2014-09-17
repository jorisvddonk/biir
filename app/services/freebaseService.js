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

    getSearch: function(filter) {
      return this.getAPIResult(API_BASE_URL + "/search", {'filter': filter});
    },

    getByMQL: function(mqlquery) {
      return this.getAPIResult(API_BASE_URL + "/mqlread", {'query': JSON.stringify(mqlquery)});
    },

    getStyles: function() {
      return this.getByMQL([{
        "mid": null,
        "name": null,
        "type": "/food/beer_style",
        "/food/beer_style/beers": {
          "return": "count"
        },
        "sort": "-/food/beer_style/beers.count"
      }]);
    },

    getBeers: function(styleId) {
      return this.getByMQL([
        {
          "mid": null,
          "name": null,
          "type": "/food/beer",
          "/food/beer/beer_style": [{
            "mid": styleId
          }],
          "/common/topic/image": [{
            "id": null,
            "optional": "optional"
          }]
        }
      ]);
    },
  };
});
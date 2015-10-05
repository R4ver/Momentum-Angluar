var app = angular.module('services', []);

app.factory('getData', function($http){
    var url = "http://localhost/Momentum-Angluar/data/";
    var url_bgs = url + "wallpapers.json";
    var url_quotes = url + "quotes.json";

    var data = {};

    data.getBgs = function() {
        return $http.get(url_bgs);
    }

    data.getQuotes = function() {
        return $http.get(url_quotes);
    }

    return data;
});
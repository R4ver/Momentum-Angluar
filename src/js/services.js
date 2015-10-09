var services = angular.module('services', []);
var url = "http://localhost/Momentum-Angluar/data/";
var url_bgs = url + "wallpapers.json";
var url_quotes = url + "quotes.json";

var dataX = [];
var dataY = [];

services.factory('randomize', function($http, $interval){
    return {
        wallpaper: function() {
            var rdm = Math.floor(Math.random() * dataX.length);
            console.log(dataX[rdm]);
            return dataX[rdm];
        },

        quotes: function() {
            var tick = function() {
                var rdm = Math.floor(Math.random() * dataY.length);
                return dataY[rdm].the_quote + " - " + dataY[rdm].author;
            }

            tick();
            return tick();
        }
    }
});

services.factory('loadData', function($http){
    return {
        init: function() { 
           $http.get(url_bgs).success(function(data) {
                dataX = data;
            });

            $http.get(url_quotes).success(function(data) {
                dataY = data;
            }); 
        }
    } 
        
});
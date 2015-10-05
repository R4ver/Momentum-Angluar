var app = angular.module('Momentum', ["services"]);

//Variables
var wallpapers = [];
var quotes = [];

app.controller('appController', function($scope, getData) {
  if ( localStorage.getItem("angular-momentum") ) {
    $(".login-screen").css("display", "none");
    $(".user-screen").css("display", "block");
    $("#logoutBtn").css("display", "block");
  }

    //Get all the quotes and wallpapers
    function loadRemoteData() {
        getData.getBgs().success(function(data){
            wallpapers = data;
        });

        getData.getQuotes().success(function(data) {
            quotes = data;
        });
    }

    loadRemoteData();
});

//Background controller 
app.controller("backgroundCtrl", function($scope) {
    setTimeout(function() {
        var rdm = Math.floor(Math.random() * wallpapers.length);

        $scope.background = wallpapers[rdm];
    }, 1000)
    
});

//Controller for the clock on the page
app.controller("timeCtrl", function($scope, $interval) {
    var tick = function() {
        $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
});

//Sets a welcome message, if there is no registered user, use the default
app.controller("welcomeCtrl", function($scope) {
    var name = getStorage();
    $scope.defaultName = "Welcome, awesome person";
    $scope.welcome = "Welcome, " + name;
});

//Controls what happens when you "login"
app.controller("loginCtrl", function($scope) {
    $scope.submit = function() {
        if ($scope.text != "") {
            localStorage.setItem("angular-momentum", $scope.text);
            $("#loginText").empty();
        }

        $(".login-screen").css("display", "none");
        $(".user-screen").css("display", "block");
        $(".welcome__module span").empty();
        $(".welcome__module span").html("Welcome, " + getStorage());
        $("#logoutBtn").css("display", "block");
    };
});

//Controls what happens when you "logout"
app.controller("logoutCtrl", function($scope) {
    $scope.submit = function() {
        localStorage.removeItem("angular-momentum");
        $(".login-screen").css("display", "block");
        $(".user-screen").css("display", "none");
        $("#logoutBtn").css("display", "none");

        $(".login-screen span").html("Welcome, awesome person");
        $("#loginText").val("");
    }
});

//Prints out random quotes
app.controller("quoteCtrl", function($scope, $interval) {
    //Creates a random number and pulls a quote from $scope.quotes
    setTimeout(function() {
        var tick = function() {
            var rdm = Math.floor(Math.random() * quotes.length);
            console.log(rdm);

            $scope.quote = quotes[rdm].the_quote + " - " + quotes[rdm].author;
        }
        tick();
        $interval(tick, 5000); // Tick on 5s
    }, 100) //timeout till $http request is done
    
});

//Gets the localStorage key
function getStorage() {
    return localStorage.getItem("angular-momentum");
}
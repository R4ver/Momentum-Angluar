var app = angular.module('Momentum', ["services"]);

//Variables
var wallpapers = [];
var quotes = [];

app.controller('appController', function($scope, $interval, randomize, loadData) {
    loadData.init();

    if ( localStorage.getItem("angular-momentum") ) {
        $(".login-screen").css("display", "none");
        $.muss([".user-screen", "#logoutBtn"], {
            "display": "block"
        });
    }

    setTimeout(function() {
        $scope.background = randomize.wallpaper();
    }, 100);

    setTimeout(function() {
        $scope.quote = randomize.quotes();
    }, 100);

    setInterval(function() {
        $scope.quote = randomize.quotes();
    }, 5000);
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
        $.muss([".user-screen", "#logoutBtn"], {
            "display": "block"
        });
        $(".welcome__module span").empty();
        $(".welcome__module span").html("Welcome, " + getStorage());
    };
});

//Controls what happens when you "logout"
app.controller("logoutCtrl", function($scope) {
    $scope.submit = function() {
        localStorage.removeItem("angular-momentum");
        $(".login-screen").css("display", "block");
        $.muss([".user-screen", "#logoutBtn"], {
            "display": "none"
        });

        $(".login-screen span").html("Welcome, awesome person");
        $("#loginText").val("");
    }
});

//Gets the localStorage key
function getStorage() {
    return localStorage.getItem("angular-momentum");
}
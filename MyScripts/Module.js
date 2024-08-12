var app = angular.module("ice", ["ngRoute", "angular-loading-bar", "prettyXml"]);
app.factory("shareData", function () {
    return {
        shareJSONClaim:'',
        shareUsername: '',
        shareControllers: '',
        shareInputXML: '',
        shareOutputXML: '',
        shareOnbaseDoctypeId: '',
        shareEnv: '',
        shareState: '',
        shareUserFullName: '',
        shareUserInitial: '',
        shareInsCo: '',
        shareInsCoAbbr: '',
        shareSelectedCategory:''
  }
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.parentSelector = '#loading-bar';
    cfpLoadingBarProvider.spinnerTemplate = '<div><img src="Content/loader.gif" height="150" width="150" /></div>';
}])
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/Startup',
        {
            templateUrl: '/Startup',
            controller: 'StartupController'
        });
    $routeProvider.when('/Home',
            {
                templateUrl: '/Home',
                controller: 'HomeController'
            });
    $routeProvider.otherwise(
            {
                redirectTo: '/Startup'
            });


}]);

app.controller('ModuleController', function (HomeService, shareData, $scope) {

    var region = "";
    var hostName = document.location.hostname;
    if (hostName == "localhost") {
        region = "Dev"
        $scope.ShowAdminTab = true;
        $scope.ShowSimulatorTab = true;
        $scope.ShowInputXMLButton = true;
        $scope.ShowOutputXMLButton = true;
    }
    if (hostName == "devproxy.njmgroup.com") {
        region = "Dev"
        $scope.ShowAdminTab = true;
        $scope.ShowSimulatorTab = true;
        $scope.ShowInputXMLButton = true;
        $scope.ShowOutputXMLButton = true;
    }
    else if (hostName == "qaproxy.njmgroup.com") {
        region = "QA"
        $scope.ShowAdminTab = false;
        $scope.ShowSimulatorTab = false;
        $scope.ShowInputXMLButton = true;
        $scope.ShowOutputXMLButton = true;
    }
    else if (hostName == "ntguat.njmgroup.com") {
        region = "UAT"
        $scope.ShowAdminTab = false;
        $scope.ShowSimulatorTab = false;
        $scope.ShowInputXMLButton = false;
        $scope.ShowOutputXMLButton = false;
    }
    else if (hostName == "smproxy.njmgroup.com") {
        region = "Prod"
        $scope.ShowAdminTab = false;
        $scope.ShowSimulatorTab = false;
        $scope.ShowInputXMLButton = false;
        $scope.ShowOutputXMLButton = false;
    }
    shareData.shareEnv = region;
    HomeService.GetUserName().then(function (response) {
        var userName = response.data;
        $scope.UserDetail = userName;
        shareData.shareUsername = userName;
    });

    //new function to get user full name for creator name field
    HomeService.GetUserFullName().then(function (response) {
        var userFullName = response.data;
        shareData.shareUserFullName = userFullName;
    });

    HomeService.GetUserInitial().then(function (response) {
        var userInitial = response.data;
        shareData.shareUserInitial = userInitial;
    });
});





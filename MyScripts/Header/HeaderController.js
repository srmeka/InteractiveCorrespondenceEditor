app.controller('HeaderController', function ($scope, HomeService) {
    HomeService.GetAdGroups().then(function (response) {
        $scope.ServerVariables = response.data;
    },
                function (error) {
                    console.log(error);
                    if (error.data.message) {
                        $scope.errorDetail ="Error occurred retrieving AD groups -- " + error.data.message, "";
                    }

                    else if (error.data) {
                        $scope.errorDetail ="Error occurred retrieving AD groups -- " + error.data, "";
                    }
                    else {
                        $scope.errorDetail ="Error occurred retrieving AD groups.", "";
                    }
                });
});
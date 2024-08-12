app.controller('PcpaCsfEffectiveDropdownController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        HomeService.LookupValue("CsfEffective").then(function (response) {
            $scope.Effective = response.data;
        }, function (error) {
            $scope.responseError = error;
        });

        $scope.$watch('SelectedEffective', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $rootScope.$broadcast('newPolicySelect', newValue);
            }
        });
        
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaCsfEffectiveDropdown', function (event) {
        try {
            if ($scope.SelectedEffective) {
                HomeService.createPrimaryXML("CSF_EFF", $scope.SelectedEffective.lookupItemValue);
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
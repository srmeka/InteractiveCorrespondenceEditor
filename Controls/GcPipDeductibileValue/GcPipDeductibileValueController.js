app.controller('GcPipDeductibileValueController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.PIPData = JSPath.apply(".Claim.ClaimPolicy.PIPDeductible", shareData.shareJSONClaim.CorrespondenceDataResponse)[0];
        console.log($scope.PIPData);
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcPipDeductibileValue', function (event) {
        try {
          
            if ($scope.PIPData) {
                
                HomeService.createPrimaryXML("PIP_DED", $scope.PIPData);
                }
 
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


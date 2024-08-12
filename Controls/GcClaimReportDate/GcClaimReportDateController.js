app.controller('GcClaimReportDateController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimDate = JSPath.apply(".Claim", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcClaimReportDate', function (event) {
        try {
          
            if ($scope.claimDate) {
                
                HomeService.createPrimaryXML("CLM_RPT_DT_AUTO", $scope.claimDate);
                }
 
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


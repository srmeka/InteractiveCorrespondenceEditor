app.controller('LineOfBusinessController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.SelectedLOB = [];

        

        HomeService.LookupValue("PLLineOfBusiness").then(function (response) {
            $scope.LOB = response.data;

        },
              function (error) {
                  $scope.error = error;
              });

        $scope.updateSelectedLOB = function (lob) {
            
            var lobId = "LOBID" + lob.lookupItemID;

            $scope.SelectedLOB = $scope.SelectedLOB || [];

            if (document.getElementById(lobId).checked) {
                $scope.SelectedLOB.push(lob.lookupItemValue.trim());
            }
            else {

                //$scope.SelectedLOB.pop(lob.lookupItemValue.trim());
                $scope.SelectedLOB.splice($scope.SelectedLOB.indexOf(lob.lookupItemValue.trim()), 1);

            }

        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('LineOfBusiness', function (event) {
        try {
            var id = 0;
            if ($scope.SelectedLOB) {
                for (var i = 0; i < $scope.SelectedLOB.length; i++) {
                    HomeService.createSecondaryTableXML("LINE_OF_BUSINESS_REC");
                    HomeService.createSecondaryXMLValue("LINE_OF_BUSINESS_REC", "BILL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("LINE_OF_BUSINESS_REC", "LOB", $scope.SelectedLOB[i].trim(), id);
                    id = id + 1;
                }
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
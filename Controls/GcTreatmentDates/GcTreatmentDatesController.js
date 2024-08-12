app.controller('GcTreatmentDatesController', function ($scope, $http, shareData, HomeService) {
    try {
  
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcTreatmentDates', function (event) {
        try {

            var DtNum = 0;
            if ($scope.treatmentDateOne) {
                DtNum++;
                HomeService.createPrimaryXML("TRTMNT_DT_" + DtNum, $scope.treatmentDateOne);
            }
            if ($scope.treatmentDateTwo) {
                DtNum++;
                HomeService.createPrimaryXML("TRTMNT_DT_" + DtNum, $scope.treatmentDateTwo);
            }
            if ($scope.treatmentDateThree) {
                DtNum++;
                HomeService.createPrimaryXML("TRTMNT_DT_" + DtNum, $scope.treatmentDateThree);
            }
            if ($scope.treatmentDateFour) {
                DtNum++;
                HomeService.createPrimaryXML("TRTMNT_DT_" + DtNum, $scope.treatmentDateFour);
            }
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


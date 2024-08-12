app.controller('PcpaDrivingWhileSuspendedDriverInfoController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.SelectedDrivingSusDriverData = [];
        $scope.DrivingSusDriver = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Policy Driver"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedDrivingSusDriverData = [];
            $scope.DrivingSusDriver.map(function (DrivingSusDriverInfo) {
                DrivingSusDriverInfo.DrivingSusDriverChecked = false;
            })
            $scope.DrivingSusDriverInput = "";
        }

        $scope.selectDrivingSusDriver = function (DrivingSusDriverInfo) {
            $scope.SelectedDrivingSusDriverData = $scope.SelectedDrivingSusDriverData || [];
            if (DrivingSusDriverInfo.DrivingSusDriverChecked) {
                $scope.SelectedDrivingSusDriverData.push(DrivingSusDriverInfo);
            } else {
                $scope.SelectedDrivingSusDriverData.pop(DrivingSusDriverInfo)
            }
        }
        $(document).ready($scope.clearAllSelectedData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaDrivingWhileSuspendedDriverInfo', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("SUSP_DRV").length;
            var DrivingSusDriverSelected;
            if ($scope.SelectedDrivingSusDriverData && $scope.SelectedDrivingSusDriverData.length > 0) {
                DrivingSusDriverSelected = "Y";
            } else {
                DrivingSusDriverSelected = "N";
            }

            HomeService.createPrimaryXML("SUSP_DRVR_IND", DrivingSusDriverSelected);

            for (var i = 0; i < $scope.SelectedDrivingSusDriverData.length; i++) {
                HomeService.createSecondaryTableXML("SUSP_DRV");
                var DriverName = "";
                if ($scope.SelectedDrivingSusDriverData[i].Person.PersonName.FirstGivenNm) {
                    DriverName = DriverName + $scope.SelectedDrivingSusDriverData[i].Person.PersonName.FirstGivenNm + " ";
                }
                if ($scope.SelectedDrivingSusDriverData[i].Person.SecondGivenNameInitial) {
                    DriverName = DriverName + $scope.SelectedDrivingSusDriverData[i].Person.SecondGivenNameInitial + " ";
                }
                if ($scope.SelectedDrivingSusDriverData[i].Person.PersonName.FamilyNm) {
                    DriverName = DriverName + $scope.SelectedDrivingSusDriverData[i].Person.PersonName.FamilyNm + " ";
                }
                if ($scope.SelectedDrivingSusDriverData[i].Person.PersonName.FamilyNameGenerationCd) {
                    DriverName = DriverName + $scope.SelectedDrivingSusDriverData[i].Person.PersonName.FamilyNameGenerationCd + " ";
                }
                HomeService.createSecondaryXMLValue("SUSP_DRV", "SUSP_DRVR_NAME", DriverName.trim(), id);
                HomeService.createSecondaryXMLValue("SUSP_DRV", "POL_FK", "1", id);
                id += 1;
            }

            if ($scope.DrivingSusDriverInput && $scope.DrivingSusDriverInput.trim()) {
                HomeService.createSecondaryTableXML("SUSP_DRV");
                HomeService.createSecondaryXMLValue("SUSP_DRV", "SUSP_DRVR_NAME", $scope.DrivingSusDriverInput.trim(), id);
                HomeService.createSecondaryXMLValue("SUSP_DRV", "POL_FK", "1", id);
                id += 1;
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
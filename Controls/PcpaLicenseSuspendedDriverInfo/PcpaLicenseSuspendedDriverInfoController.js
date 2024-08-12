app.controller('PcpaLicenseSuspendedDriverInfoController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.SelectedSuspendedDriverData = [];
        $scope.SuspendedDriver = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Policy Driver"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedSuspendedDriverData = [];
            $scope.SuspendedDriver.map(function (SuspendedDriverInfo) {
                SuspendedDriverInfo.SuspendedDriverChecked = false;
            })
            $scope.SuspendedDriverInput = "";
        }

        $scope.selectSuspendedDriver = function (SuspendedDriverInfo) {
            $scope.SelectedSuspendedDriverData = $scope.SelectedSuspendedDriverData || [];
            if (SuspendedDriverInfo.SuspendedDriverChecked) {
                $scope.SelectedSuspendedDriverData.push(SuspendedDriverInfo);
            } else {
                $scope.SelectedSuspendedDriverData.pop(SuspendedDriverInfo)
            }
        }
        $(document).ready($scope.clearAllSelectedData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaLicenseSuspendedDriverInfo', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("LIC_SUSP").length;
            var SuspendedDriverSelected;
            if ($scope.SelectedSuspendedDriverData && $scope.SelectedSuspendedDriverData.length > 0) {
                SuspendedDriverSelected = "Y";
            } else {
                SuspendedDriverSelected = "N";
            }

            HomeService.createPrimaryXML("LIC_SUSP_IND", SuspendedDriverSelected);

            for (var i = 0; i < $scope.SelectedSuspendedDriverData.length; i++) {
                HomeService.createSecondaryTableXML("LIC_SUSP");
                var DriverName = "";
                if ($scope.SelectedSuspendedDriverData[i].Person.PersonName.FirstGivenNm) {
                    DriverName = DriverName + $scope.SelectedSuspendedDriverData[i].Person.PersonName.FirstGivenNm + " ";
                }
                if ($scope.SelectedSuspendedDriverData[i].Person.SecondGivenNameInitial) {
                    DriverName = DriverName + $scope.SelectedSuspendedDriverData[i].Person.SecondGivenNameInitial + " ";
                }
                if ($scope.SelectedSuspendedDriverData[i].Person.PersonName.FamilyNm) {
                    DriverName = DriverName + $scope.SelectedSuspendedDriverData[i].Person.PersonName.FamilyNm + " ";
                }
                if ($scope.SelectedSuspendedDriverData[i].Person.PersonName.FamilyNameGenerationCd) {
                    DriverName = DriverName + $scope.SelectedSuspendedDriverData[i].Person.PersonName.FamilyNameGenerationCd + " ";
                }
                HomeService.createSecondaryXMLValue("LIC_SUSP", "SUSP_LIC_DRVR_NAME", DriverName.trim(), id);
                HomeService.createSecondaryXMLValue("LIC_SUSP", "POL_FK", "1", id);
                id += 1;
            }

            if ($scope.SuspendedDriverInput && $scope.SuspendedDriverInput.trim()) {
                HomeService.createSecondaryTableXML("LIC_SUSP");
                HomeService.createSecondaryXMLValue("LIC_SUSP", "SUSP_LIC_DRVR_NAME", $scope.SuspendedDriverInput.trim(), id);
                HomeService.createSecondaryXMLValue("LIC_SUSP", "POL_FK", "1", id);
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
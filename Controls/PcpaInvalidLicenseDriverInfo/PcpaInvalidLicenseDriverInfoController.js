app.controller('PcpaInvalidLicenseDriverInfoController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.SelectedInvalidDriverData = [];
        $scope.InvalidDriver = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Policy Driver"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedInvalidDriverData = [];
            $scope.InvalidDriver.map(function (InvalidDriverInfo) {
                InvalidDriverInfo.InvalidDriverChecked = false;
            })
            $scope.InvalidDriverInput = "";
        }

        $scope.selectInvalidDriver = function (InvalidDriverInfo) {
            $scope.SelectedInvalidDriverData = $scope.SelectedInvalidDriverData || [];
            if (InvalidDriverInfo.InvalidDriverChecked) {
                $scope.SelectedInvalidDriverData.push(InvalidDriverInfo);
            } else {
                $scope.SelectedInvalidDriverData.pop(InvalidDriverInfo)
            }
        }
        $(document).ready($scope.clearAllSelectedData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaInvalidLicenseDriverInfo', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("INVALID_DRV").length;
            var InvalidDriverSelected;
            if ($scope.SelectedInvalidDriverData && $scope.SelectedInvalidDriverData.length > 0) {
                InvalidDriverSelected = "Y";
            } else {
                InvalidDriverSelected = "N";
            }

            HomeService.createPrimaryXML("INV_LIC_IND", InvalidDriverSelected);

            for (var i = 0; i < $scope.SelectedInvalidDriverData.length; i++) {
                HomeService.createSecondaryTableXML("INVALID_DRV");
                var DriverName = "";
                if ($scope.SelectedInvalidDriverData[i].Person.PersonName.FirstGivenNm) {
                    DriverName = DriverName + $scope.SelectedInvalidDriverData[i].Person.PersonName.FirstGivenNm + " ";
                }
                if ($scope.SelectedInvalidDriverData[i].Person.SecondGivenNameInitial) {
                    DriverName = DriverName + $scope.SelectedInvalidDriverData[i].Person.SecondGivenNameInitial + " ";
                }
                if ($scope.SelectedInvalidDriverData[i].Person.PersonName.FamilyNm) {
                    DriverName = DriverName + $scope.SelectedInvalidDriverData[i].Person.PersonName.FamilyNm + " ";
                }
                if ($scope.SelectedInvalidDriverData[i].Person.PersonName.FamilyNameGenerationCd) {
                    DriverName = DriverName + $scope.SelectedInvalidDriverData[i].Person.PersonName.FamilyNameGenerationCd + " ";
                }
                HomeService.createSecondaryXMLValue("INVALID_DRV", "INV_LIC_DRVR_NAME", DriverName.trim(), id);
                HomeService.createSecondaryXMLValue("INVALID_DRV", "POL_FK", "1", id);
                id += 1;
            }

            if ($scope.InvalidDriverInput && $scope.InvalidDriverInput.trim()) {
                HomeService.createSecondaryTableXML("INVALID_DRV");
                HomeService.createSecondaryXMLValue("INVALID_DRV", "INV_LIC_DRVR_NAME", $scope.InvalidDriverInput.trim(), id);
                HomeService.createSecondaryXMLValue("INVALID_DRV", "POL_FK", "1", id);
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
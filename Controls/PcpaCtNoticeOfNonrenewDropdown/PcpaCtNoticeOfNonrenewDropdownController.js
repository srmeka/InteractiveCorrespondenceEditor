app.controller('PcpaCtNoticeOfNonrenewDropdownController', function ($scope, shareData, $http, HomeService, $rootScope) {

    $scope.Reasons = ["Vehicle Ownership/Registration", "Garage Location", "Residency", "Licensing Requirements", "Driving Record-At Fault Accidents", "Driving Record-All Other Claims", "Driving Record-Motor Vehicle History", "Intentionally Caused Comp Loss", "Physical Damage Inspection", "Cooperation-Info", "Cooperation-Duties after Accident", "Cooperation-Claim Reimbursement", "Other-Fraud", "Other-Outstanding Balance", "Other-RSA", "Other-Ineligible Vehicles", "Transfer of Interest"];

    $scope.XMLReasons = ["Veh Ownership Registration", "Garage Location", "Residency", "Drivers License Permit", "Driving Record At Fault Accidents", "Driving Record All Other Claims", "Driving Record Motor Vehicle History", "Intentionally Caused Comp Loss", "Physical Damage Inspection", "Cooperation UW Info", "Cooperation Duties After Acc", "Cooperation Claim Reimburse", "Other Fraud", "Other Outstanding Balance", "Other RSA", "Other Ineligible Vehicle", "Transfer of Interest"];

    $scope.Vehicle = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.Driver = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=='Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.ShouldShowVehSelect = function () {
        if ($scope.NonrenewReason == "Vehicle Ownership/Registration" || $scope.NonrenewReason == "Physical Damage Inspection" || $scope.NonrenewReason == "Other-Ineligible Vehicles")
            return true;
        return false;
    }

    $scope.ShouldShowDriver = function () {
        if ($scope.NonrenewReason == "Residency" || $scope.NonrenewReason == "Vehicle Ownership/Registration" || $scope.NonrenewReason == "Licensing Requirements")
            return true;
        return false;
    }

    $scope.ShouldShowDateCtrl = function () {
        if ($scope.NonrenewReason == "Intentionally Caused Comp Loss" || $scope.NonrenewReason == "Cooperation-Duties after Accident" || $scope.NonrenewReason == "Cooperation-Claim Reimbursement")
            return true;
        return false;
    }

    $scope.ShouldShowClueRefNum = function () {
        if ($scope.NonrenewReason == "Driving Record-At Fault Accidents" || $scope.NonrenewReason == "Driving Record-All Other Claims" || $scope.NonrenewReason == "Driving Record-Motor Vehicle History")
            return true;
        return false;
    }

    $scope.ShouldShowPolYr = function () {
        if ($scope.NonrenewReason == "II.D.6-Cooperation-Return RQ")
            return true;
        return false;
    }

    $scope.hiddenStatus = false;

    $scope.ClearDriverNm = function () {
        if ($scope.SelectedDriver != undefined)
            $scope.ManualDriverNm = "";
    }

    $scope.ClearAllData = function () {
        $scope.NonrenewReason = undefined;
        $scope.ClearCurrentData();
    }

    $scope.ClearCurrentData = function () {
        $scope.SelectedVehicle = undefined;

        $scope.SelectedDriver = undefined;

        $scope.ManualDriverNm = "";

        $scope.SelectedDate = "";
        $('#SelectDateId')[0].value = "";

        $scope.ClueRefNum = "";

        $scope.SelectedPolYr = "";
        $('#SelectPolicyYearId')[0].value = "";

        if ($scope.NonrenewReason == "Driving Record-At Fault Accidents" || $scope.NonrenewReason == "Driving Record-All Other Claims" || $scope.NonrenewReason == "Driving Record-Motor Vehicle History") {
            $rootScope.$broadcast('ShowHideClaimViolation', { hiddenStatus: false });
            $rootScope.$broadcast('ShowHideMVR', { hiddenStatus: false });
        }
        else {
            $rootScope.$broadcast('ShowHideClaimViolation', { hiddenStatus: true });
            $rootScope.$broadcast('ShowHideMVR', { hiddenStatus: true });
        }
    }

    $scope.$on('PcpaCtNoticeOfNonrenewDropdown', function (event) {

        if ($scope.NonrenewReason) {
            var id;
            var ReasonIndex = 0;
            $scope.Reasons.some(function (obj, i) {
                return obj === $scope.NonrenewReason ? ReasonIndex = i : false;
            });
            HomeService.createPrimaryXML("NON_RNWL_IND", $scope.XMLReasons[ReasonIndex]);
            if ($scope.SelectedDate) {
                HomeService.createPrimaryXML(($scope.NonrenewReason == "II.D.2-Cooperation-Duties after Acc") ? "CLAIM_DT" : "EVENT_DT", $scope.SelectedDate);
            }
            if ($scope.SelectedPolYr) {
                HomeService.createPrimaryXML("POL_YR", $scope.SelectedPolYr);
            }
            if ($scope.ShouldShowVehSelect()) {
                id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
                HomeService.createSecondaryTableXML("VEH_DESC");
                HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", 1, id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", ($scope.SelectedVehicle) ? $scope.SelectedVehicle.Vehicle.ModelYearNr : "", id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", ($scope.SelectedVehicle) ? $scope.SelectedVehicle.Vehicle.VehicleTradeNm : "", id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", ($scope.SelectedVehicle) ? $scope.SelectedVehicle.Vehicle.ManufacturerVehicleIdentificationNr : "", id);
            }
            if ($scope.SelectedDriver || $scope.ManualDriverNm) {
                id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                HomeService.createSecondaryTableXML("POL_DRVR_DESC");

                var DriverNm = "";
                if ($scope.SelectedDriver) {
                    if ($scope.SelectedDriver.Person.PersonName.FirstGivenNm) {
                        DriverNm = DriverNm + $scope.SelectedDriver.Person.PersonName.FirstGivenNm + " ";
                    }
                    if ($scope.SelectedDriver.Person.SecondGivenNameInitial) {
                        DriverNm = DriverNm + $scope.SelectedDriver.Person.SecondGivenNameInitial + " ";
                    }
                    if ($scope.SelectedDriver.Person.PersonName.FamilyNm) {
                        DriverNm = DriverNm + $scope.SelectedDriver.Person.PersonName.FamilyNm + " ";
                    }
                    if ($scope.SelectedDriver.Person.PersonName.FamilyNameGenerationCd) {
                        DriverNm = DriverNm + $scope.SelectedDriver.Person.PersonName.FamilyNameGenerationCd;
                    }
                }
                else {
                    DriverNm = $scope.ManualDriverNm;
                }

                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", DriverNm.trim(), id);
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", 1, id);
            }
            if ($scope.ClueRefNum) {
                id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "CLUE_REF_NO", $scope.ClueRefNum, id);
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", 1, id);
            }
            if ($scope.mvrReferenceNum) {
                id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "MVR_REF_NO", $scope.mvrReferenceNum, id);
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", 1, id);
            }
        }
    });
});
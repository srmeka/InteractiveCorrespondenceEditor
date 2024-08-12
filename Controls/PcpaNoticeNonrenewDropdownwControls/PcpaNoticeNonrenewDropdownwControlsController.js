app.controller('PcpaNoticeNonrenewDropdownwControlsController', function ($scope, shareData, $http, HomeService) {

    $scope.Reasons = ["II.A.1-Gar Loc-Veh Not at Pol Addr", "II.A.1-Vehicle Ownership/Reg", "II.A.1-Disposed of Only Vehicle", "II.A.2-Residency", "II.B-Driver's License/Permit", "II.C-Underwriting Threshold", "II.C-Driving Record-Suspended", "II.D.1-Cooperation-UW Info", "II.D.2-Cooperation-Duties after Acc", "II.D.3-Cooperation-Claim Reimb", "II.D.4-Cooperation-Abusive Beh", "II.D.5-Cooperation-RSA", "II.D.6-Cooperation-Return RQ", "II.E-Physical Damage Inspection", "II.F.1-Civil/Admin Penalty", "II.F.2-Previous SIU Invest", "II.G.1.a-Previous Coop DNR", "II.G.2-Previous 2% DNR", "II.G.1.b-Criminal Offense", "II.G.3-Ineligible Vehicle", "II.G.5-Gray Market Vehicle", "II.H.1-Additional Nonrenewals", "II.H.3-Additional DNR-Evidence Exists", "II.H.3-Additional DNR-Driving Record"];

    $scope.XMLReasons = ["Moved Out of State", "Veh Ownership Registration", "Disposed of Only Veh", "Residency", "Drivers License Permit", "Underwriting Threshold", "Driving Record Suspended", "Cooperation UW Info", "Cooperation Duties after Acc", "Cooperation Claim Reimburse", "Cooperation Abusive Behavior", "Cooperation Roadside Assist", "Cooperation Ret Renew Quest", "Physical Damage Inspection", "Civil or Admin Penalty", "Previous SIU Investigation", "Previous Cooperation DNR", "Previous 2 DNR", "Criminal Offense", "Ineligible Vehicle", "Gray Market Vehicle", "Additional Nonrenewals", "Additional DNR-Evidence Exists", "Additional DNR-Driving Record"];

    $scope.Vehicle = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.Driver = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=='Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.ShouldShowVehSelect = function () {
        if ($scope.NonrenewReason == "II.A.1-Vehicle Ownership/Reg" || $scope.NonrenewReason == "II.A.1-Disposed of Only Vehicle" || $scope.NonrenewReason == "II.E-Physical Damage Inspection" || $scope.NonrenewReason == "II.G.3-Ineligible Vehicle" || $scope.NonrenewReason == "II.G.5-Gray Market Vehicle")
            return true;
        return false;
    }

    $scope.ShouldShowDriver = function () {
        if ($scope.NonrenewReason == "II.A.1-Vehicle Ownership/Reg" || $scope.NonrenewReason == "II.A.2-Residency" || $scope.NonrenewReason == "II.B-Driver\'s License/Permit" || $scope.NonrenewReason == "II.C-Driving Record-Suspended" || $scope.NonrenewReason == "II.F.1-Civil/Admin Penalty" || $scope.NonrenewReason == "II.F.2-Previous SIU Invest" || $scope.NonrenewReason == "II.G.1.a-Previous Coop DNR" || $scope.NonrenewReason == "II.G.2-Previous 2% DNR" || $scope.NonrenewReason == "II.G.1.b-Criminal Offense" || $scope.NonrenewReason == "II.H.3-Additional DNR-Evidence Exists")
            return true;
        return false;
    }

    $scope.ShouldShowDateCtrl = function () {
        if ($scope.NonrenewReason == "II.D.2-Cooperation-Duties after Acc" || $scope.NonrenewReason == "II.D.3-Cooperation-Claim Reimb" || $scope.NonrenewReason == "II.H.3-Additional DNR-Evidence Exists")
            return true;
        return false;
    }

    $scope.ShouldShowClueRefNum = function () {
        if ($scope.NonrenewReason == "II.C-Underwriting Threshold" || $scope.NonrenewReason == "II.H.1-Additional Nonrenewals" || $scope.NonrenewReason == "II.H.3-Additional DNR-Evidence Exists" || $scope.NonrenewReason == "II.H.3-Additional DNR-Driving Record")
            return true;
        return false;
    }

    $scope.ShouldShowPolYr = function () {
        if ($scope.NonrenewReason == "II.D.6-Cooperation-Return RQ")
            return true;
        return false;
    }

    $scope.ClearDriverNm = function () {
        if ($scope.SelectedDriver!=undefined)
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
    }

    $scope.$on('PcpaNoticeNonrenewDropdownwControls', function (event) {

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
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", ($scope.SelectedVehicle) ? $scope.SelectedVehicle.Vehicle.ModelNm : "", id);
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
        }
    });
});
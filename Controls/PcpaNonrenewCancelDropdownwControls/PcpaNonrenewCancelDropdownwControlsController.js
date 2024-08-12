app.controller('PcpaNonrenewCancelDropdownwControlsController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Categories = ["Registration/Garage Location", "Residency", "Licensing Requirements", "Driving Record-At-Fault Accidents", "Driving Record-Motor Vehicle Violations (II.C.2.a)", "Driving Record-Motor Vehicle Violations (II.C.2.b)", "Intentionally Caused Comprehensive Loss", "Physical Damage Inspection", "Renewal Notice,Cooperation", "Other-Criminal Offense fine >$100 for auto insur fraud", "Other-Fraud", "Other-Prior Balance", "Other-Abusive Behavior", "Other-Roadside Abuse", "Other-Elig Vehicle", "Other-Mental/Phys Impairment", "Death of Insured", "NI DL Susp or Revoked", "Fraud"];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.SelectedVehicles = [];

        $scope.selectVehicle = function (vehicle) {
            var VehicleId = "VehCheckboxLstId" + vehicle._id;
            $scope.SelectedVehicles = $scope.SelectedVehicles || [];
            if (document.getElementById(VehicleId).checked) {
                $scope.SelectedVehicles.push(vehicle);
            } else {
                $scope.SelectedVehicles.pop(vehicle)
            }
        }

        $scope.clearAllData = function () {
            $scope.NonrenewChoice = undefined;
            clearVehData();
        }

        $scope.clearVehData = function () {
            $scope.SelectedVehicles = [];
            $scope.Vehicle.map(function (item) {
                item.VehChecked = false;
            })
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaNonrenewCancelDropdownwControls', function (event) {
        try {
            if ($scope.NonrenewChoice) {
                HomeService.createPrimaryXML("CNC_RSN", $scope.NonrenewChoice);
                var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
                for (var i = 0; i < $scope.SelectedVehicles.length; i++) {
                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicles[i].ModelYearNr.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicles[i].VehicleTradeNm.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicles[i].ManufacturerVehicleIdentificationNr.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    id += 1;
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
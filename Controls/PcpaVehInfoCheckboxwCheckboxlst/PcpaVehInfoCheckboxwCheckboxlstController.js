app.controller('PcpaVehInfoCheckboxwCheckboxlstController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.SelectedVehicleData = [];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedVehicleData = [];
            $scope.Vehicle.map(function (item) {
                item.VehChecked = false;
            });
        }

        $scope.selectVehicle = function (vehicle) {
            var vehicleId = "VehicleCheckboxLstId" + vehicle.VehicleId;
            $scope.SelectedVehicleData = $scope.SelectedVehicleData || [];
            if (document.getElementById(vehicleId).checked) {
                $scope.SelectedVehicleData.push(vehicle);
            } else {
                $scope.SelectedVehicleData.pop(vehicle)
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaVehInfoCheckboxwCheckboxlst', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            var VehSelected;
            if ($scope.SelectedVehicleData && $scope.SelectedVehicleData.length > 0) {
                VehSelected = "Y";
            } else {
                VehSelected = "N";
            }

            HomeService.createPrimaryXML("VEH_INFO_IND", VehSelected);
            for (var i = 0; i < $scope.SelectedVehicleData.length; i++) {
                HomeService.createSecondaryTableXML("VEH_DESC");
                HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicleData[i].ModelYearNr.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicleData[i].VehicleTradeNm.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVehicleData[i].ModelNm.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicleData[i].ManufacturerVehicleIdentificationNr.trim(), id);
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
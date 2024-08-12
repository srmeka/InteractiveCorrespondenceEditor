/// <reference path="PcpaTitleVehCheckboxwCheckboxlstController.js" />
app.controller('PcpaTitleVehCheckboxwCheckboxlstController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.SelectedVehicleData = [];
        $scope.Vehicletitle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedTitle = function () {
            $scope.SelectedVehicleData = [];
            $scope.Vehicletitle.map(function (item) {
                item.VehicleTitlechecked = false;
            });
        }

        $scope.selectVehicle = function (vehicle) {
            debugger;
            var vehicleId = "VehicleTitleCheckboxLstId" + vehicle.VehicleId;
            $scope.SelectedVehicleData = $scope.SelectedVehicleData || [];
            if (document.getElementById(vehicleId).checked) {
                $scope.SelectedVehicleData.push(vehicle);
            } else {
                $scope.SelectedVehicleData.pop(vehicle);
            }
        }

        $(document).ready($scope.clearAllSelectedTitle());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaTitleVehCheckboxwCheckboxlst', function (event) {
        try {
            debugger;
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            var TitleSelected;
            if ($scope.SelectedVehicleData && $scope.SelectedVehicleData.length > 0) {
                TitleSelected = "Y";
            } else {
                TitleSelected = "N";
            }

            for (var i = 0; i < $scope.SelectedVehicleData.length; i++) {
                HomeService.createSecondaryTableXML("VEH_DESC");
                HomeService.createSecondaryXMLValue("VEH_DESC", "TITLE_IND", TitleSelected, id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicleData[i].ModelYearNr.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicleData[i].VehicleTradeNm.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVehicleData[i].ModelNm.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicleData[i].ManufacturerVehicleIdentificationNr, id);
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
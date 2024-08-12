app.controller('PcpaFinanceVehCheckboxwCheckboxlstController', function ($scope, $http, shareData, HomeService) {
    try {
   
        $scope.SelectedFinanceVehicleData = [];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedFinanceVehicleData = [];
            $scope.Vehicle.map(function (item) {
                item.financeChecked = false;
            })
        }
        
        $scope.selectVehicle = function (vehicle) {
            var VehicleId = "FinanceVehicleCheckboxLstId" + vehicle.VehicleId;
            $scope.SelectedFinanceVehicleData = $scope.SelectedFinanceVehicleData || [];
            if (document.getElementById(VehicleId).checked) {
                $scope.SelectedFinanceVehicleData.push(vehicle);
            } else {
                $scope.SelectedFinanceVehicleData.pop(vehicle)
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaFinanceVehCheckboxwCheckboxlst', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            var financeVehSelected;
            if ($scope.SelectedFinanceVehicleData && $scope.SelectedFinanceVehicleData.length > 0) {
                financeVehSelected = "Y";
            } else {
                financeVehSelected = "N";
            }

            for (var i = 0; i < $scope.SelectedFinanceVehicleData.length; i++) {
                HomeService.createSecondaryTableXML("VEH_DESC");
                HomeService.createSecondaryXMLValue("VEH_DESC", "FIN_AGREE_IND", financeVehSelected, id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedFinanceVehicleData[i].ModelYearNr.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedFinanceVehicleData[i].VehicleTradeNm.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedFinanceVehicleData[i].ModelNm.trim(), id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedFinanceVehicleData[i].ManufacturerVehicleIdentificationNr, id);
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
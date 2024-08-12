app.controller('PcpaVehicleDropdownController', function ($scope, shareData, $http, HomeService) {
    try {
       // Get vehicle name

        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaVehicleDropdown', function (event) {
        
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            if ($scope.SelectedVehicle && $scope.SelectedVehicle.Vehicle) {
                HomeService.createSecondaryTableXML("VEH_DESC");
                HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicle.Vehicle.ModelYearNr, id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicle.Vehicle.VehicleTradeNm, id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVehicle.Vehicle.ModelNm, id);
                HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicle.Vehicle.ManufacturerVehicleIdentificationNr, id);
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});
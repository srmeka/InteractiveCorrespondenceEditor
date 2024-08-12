app.controller('PcpaVehicleAnnualMileageController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.SelectionCount = 0;

        $scope.CtrlEnabledCheckbox = new Array;
        $scope.optShow = [];
        $scope.SelectedText = [];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.Vehicle.map(function (Vehicle) {
                Vehicle.checked = false;
            })
            $scope.SelectionCount = 0;
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaVehicleAnnualMileage', function (event) {
        try {

            //if ($scope.AnnualMileage) {

                var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
                for (var i = 0; i < $scope.Vehicle.length; i++) {
                    if ($scope.CtrlEnabledCheckbox[i] == true) {

                        HomeService.createSecondaryTableXML("VEH_DESC");
                        HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VERIFY_COV_IND", "Y", id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "ST_AMT", $scope.Vehicle[i].Vehicle.StatedValue, id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_BODY_TYPE", $scope.Vehicle[i].Vehicle.ModelNm, id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.Vehicle[i].Vehicle.VehicleTradeNm, id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.Vehicle[i].Vehicle.ModelYearNr, id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.Vehicle[i].Vehicle.ManufacturerVehicleIdentificationNr, id);

                        id = id + 1;
                    }
                }
            //}
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
app.controller('PcpaPurchOrdVehCheckboxwCheckboxlstController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.SelectedPurchOrdVeh = [];
        $scope.VehiclePO = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedPurchOrdVeh = [];
            $scope.VehiclePO.map(function (item) {
                item.VehiclePOChecked = false;
            })
        }
        $scope.selectPurchOrdVeh = function (Vehicle) {
            var vehicleId = "PurchOrdVehLstId" + Vehicle.VehicleId;
            $scope.SelectedPurchOrdVeh = $scope.SelectedPurchOrdVeh || [];
            if (document.getElementById(vehicleId).checked) {
                $scope.SelectedPurchOrdVeh.push(Vehicle);
            }
            else {
                $scope.SelectedPurchOrdVeh.pop(Vehicle);
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaPurchOrdVehCheckboxwCheckboxlst', function (event) {
        try {
            
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            if ($scope.SelectedPurchOrdVeh) {
                for (var i = 0; i < $scope.SelectedPurchOrdVeh.length; i++) {

                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "PURC_ORDR_IND", "Y", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedPurchOrdVeh[i].ModelYearNr.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedPurchOrdVeh[i].VehicleTradeNm.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedPurchOrdVeh[i].ModelNm.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedPurchOrdVeh[i].ManufacturerVehicleIdentificationNr.trim(), id);
                    id = id + 1;
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



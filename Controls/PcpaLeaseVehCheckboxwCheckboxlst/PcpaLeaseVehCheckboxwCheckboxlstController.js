app.controller('PcpaLeaseVehCheckboxwCheckboxlstController', function ($scope, shareData, $http, HomeService) {
    try{
        $scope.SelectedLeaseVeh = [];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.clearAllSelectedData = function () {
            $scope.SelectedLeaseVeh = [];
            $scope.Vehicle.map(function (Vehicle) {
                Vehicle.leasechecked = false;
            })
        }

        $scope.selectLeaseVeh = function (Vehicle) {
            var vehicleid = "LeaseVehLstId" + Vehicle.VehicleId;
            $scope.SelectedLeaseVeh = $scope.SelectedLeaseVeh || [];
            if (document.getElementById(vehicleid).checked) {
                $scope.SelectedLeaseVeh.push(Vehicle);
            }
            else {
                $scope.SelectedLeaseVeh.splice($scope.SelectedLeaseVeh.indexOf(Vehicle), 1);
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaLeaseVehCheckboxwCheckboxlst', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            if ($scope.SelectedLeaseVeh) {
                for (var i = 0; i < $scope.SelectedLeaseVeh.length; i++) {

                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_AGREE_IND", "Y", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedLeaseVeh[i].ModelYearNr.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedLeaseVeh[i].VehicleTradeNm.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedLeaseVeh[i].ModelNm.trim(), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedLeaseVeh[i].ManufacturerVehicleIdentificationNr, id);
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
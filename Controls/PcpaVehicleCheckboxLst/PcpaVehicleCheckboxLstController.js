app.controller('PcpaVehicleCheckboxLstController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.SelectedVehicle = [];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedVehicle = [];
            $scope.Vehicle.map(function (Vehicle) {
                Vehicle.checked = false;
            })
        }

        $scope.selectVehicle = function (Vehicle) {
            
            var vehicleId = "VehicleLstId" + Vehicle._id;
            $scope.SelectedVehicle = $scope.SelectedVehicle || [];
            if (document.getElementById(vehicleId).checked) {
                $scope.SelectedVehicle.push(Vehicle);
            }
            else {
                $scope.SelectedVehicle.splice($scope.SelectedVehicle.indexOf(Vehicle), 1);
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaVehicleCheckboxLst', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            if ($scope.SelectedVehicle) {
                for (var i = 0; i < $scope.SelectedVehicle.length; i++) {

                    //get the VehicleCoverageDetails array for this specific Vehicle (parent)
                    var VIN = $scope.SelectedVehicle[i].ManufacturerVehicleIdentificationNr;
                    $scope.VehicleCoverage = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle.ManufacturerVehicleIdentificationNr == "' + VIN + '"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

                    //get the AssociatedParty/Parties for this VehicleCoverageDetails array
                    var AssociatedParties = $scope.VehicleCoverage[0].AssociatedParties;
                    var LeaseCoName = "";

                    if (AssociatedParties) {
                        //if there is an array of AssociatedParties, then loop through it to see if there's any match
                        if (AssociatedParties.length) {
                            for (var j = 0; j < AssociatedParties.length; j++) {

                                if (AssociatedParties[j].PartyTypeCd == 'Organization' && AssociatedParties[j].PartyRoles.indexOf("Lessor") >= 0) {
                                    LeaseCoName = AssociatedParties[j].Organization.OrganizationNm;
                                }
                            }
                        }
                        //otherwise, look at the single AssociatedParty for a match
                        else {
                            if (AssociatedParties.PartyTypeCd == 'Organization' && AssociatedParties.PartyRoles.indexOf("Lessor") >= 0) {
                                LeaseCoName = AssociatedParties.Organization.OrganizationNm;
                            }
                        }
                    }

                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicle[i].ModelYearNr, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicle[i].VehicleTradeNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVehicle[i].ModelNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicle[i].ManufacturerVehicleIdentificationNr, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_NAME", LeaseCoName, id);

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
app.controller('PcpaDeletionOfCoverageDropdownwControlsController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.stateName = JSPath.apply('.Policy.PolicyPeriod{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.DriverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        //$scope.SelectedStateData = [];
        $scope.SelectedStateData = $scope.stateName;
        if ($scope.SelectedStateData[0].BaseStateCd === 'CT') {
            $scope.ReasonData = [
                { optionValue: "Business Use", output: "Business Use", slectedType: 'vehicle' },
                { optionValue: "Driver(s) and Vehicle(s)", output: "Drivers and Vehicles", slectedType: 'both' },
                { optionValue: "Vehicle Ownership and Garage Location", output: "Vehicle Ownership and Garage Location", slectedType: 'vehicle' },
                { optionValue: "Vehicle Ownership", output: "Vehicle Ownership", slectedType: 'vehicle' },
                { optionValue: "Unsafe Vehicle", output: "Unsafe Vehicle", slectedType: 'vehicle' },
                { optionValue: "Commercial Vehicle", output: "Commercial Vehicle", slectedType: 'vehicle' },
                { optionValue: "Driver Not a Resident", output: "Driver Not a Resident", slectedType: 'driver' },
            ];
        }
        else {
            $scope.ReasonData = [
               { optionValue: "Business Use", output: "Business Use", slectedType: 'vehicle' },
               { optionValue: "Driver(s) and Vehicle(s)", output: "Drivers and Vehicles", slectedType: 'both' },
               { optionValue: "Vehicle Ownership and Garage Location", output: "Vehicle Ownership and Garage Location", slectedType: 'vehicle' },
               { optionValue: "Vehicle Ownership", output: "Vehicle Ownership", slectedType: 'vehicle' },
               { optionValue: "Unsafe Vehicle", output: "Unsafe Vehicle", slectedType: 'vehicle' },
               { optionValue: "Commercial Vehicle", output: "Commercial Vehicle", slectedType: 'vehicle' },
               { optionValue: "Driver Not a Resident", output: "Driver Not a Resident", slectedType: 'driver' },
               { optionValue: "Driver With Own Insurance", output: "Driver With Own Insurance", slectedType: 'driver' }
            ];
        }
        //$scope.DriverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        //$scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        //$scope.stateName = JSPath.apply('.Policy.PolicyPeriod{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.SelectedVehicleData = [];
        $scope.SelectedDriverData = [];

        $scope.clearAllSelectedData = function () {
            $scope.SelectedVehicleData = [];
            $scope.freeTextName = undefined;
            $scope.SelectedDriverData = [];
            $scope.selectedReason = undefined;
            $scope.SelectedStateData = [];


            $scope.Vehicle.map(function (item) {
                item.checked = false;
            })

            $scope.DriverInfo.map(function (item) {
                item.checked = false;
            })
        }

        $scope.$watch('selectedReason', function (newValue, oldValue) {
            if (newValue === oldValue) return;
            $scope.SelectedVehicleData = [];
            $scope.freeTextName = undefined;
            $scope.SelectedDriverData = [];
            $scope.Vehicle.map(function (item) {
                item.checked = false;
            })

            $scope.DriverInfo.map(function (item) {
                item.checked = false;
            })

        });

        $scope.selectDriver = function (driver) {
            var DriverId = "deletionDrivereCheckboxLstId" + driver._id;
            $scope.SelectedDriverData = $scope.SelectedDriverData || [];
            if  (document.getElementById(DriverId).checked) {
                $scope.SelectedDriverData.push(driver);
                $scope.freeTextName = undefined;

            } else {
                $scope.SelectedDriverData.splice($scope.SelectedDriverData.indexOf(driver), 1)
            }
        }

        $scope.selectVehicle = function (vehicle) {
            var VehicleId = "deletionVehicleCheckboxLstId" + vehicle.VehicleId;
            $scope.SelectedVehicleData = $scope.SelectedVehicleData || [];
            if (document.getElementById(VehicleId).checked) {
                $scope.SelectedVehicleData.push(vehicle);
            } else {
                $scope.SelectedVehicleData.splice($scope.SelectedVehicleData.indexOf(vehicle), 1)
            }
        }
        $scope.SelectedStateData = undefined;
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaDeletionOfCoverageDropdownwControls', function (event) {
        try {
            if ($scope.SelectedDeletion) {
                var covValue = '';
                var formValue;
                if ($scope.selectedReason) {
                    covValue = $scope.selectedReason.output;
                    if ($scope.selectedReason.slectedType !== 'driver' && $scope.selectedReason.slectedType !== 'both') {
                        formValue = "Y";
                    }
                }

                HomeService.createPrimaryXML("DEL_COV_REAS_IND", covValue);
                formValue && HomeService.createPrimaryXML("FREE_FORM_IND", formValue);

                if ($scope.SelectedDriverData && $scope.SelectedDriverData.length > 0) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    for (var i = 0; i < $scope.SelectedDriverData.length; i++) {
                        var partnerName;
                        if ($scope.SelectedDriverData[i].Person.PersonName.FirstGivenNm) {
                            partnerName = $scope.SelectedDriverData[i].Person.PersonName.FirstGivenNm + ' ';
                        }
                        if ($scope.SelectedDriverData[i].Person.SecondGivenNameInitial) {
                            partnerName += $scope.SelectedDriverData[i].Person.SecondGivenNameInitial + ' ';
                        }
                        if ($scope.SelectedDriverData[i].Person.PersonName.FamilyNm) {
                            partnerName += $scope.SelectedDriverData[i].Person.PersonName.FamilyNm;
                        }
                        if ($scope.SelectedDriverData[i].Person.PersonName.FamilyNameGenerationCd) {
                            partnerName += " " + $scope.SelectedDriverData[i].Person.PersonName.FamilyNameGenerationCd;
                        }

                        partnerName = partnerName.replace(/undefined/g, '');

                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", partnerName.trim(), table_id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", table_id)

                        table_id++;
                    }
                }

                if ($scope.freeTextName) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", $scope.freeTextName.trim(), table_id);
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", table_id)
                }
                if ($scope.SelectedVehicleData && $scope.SelectedVehicleData.length !== 0) {

                    var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;

                    for (var i = 0; i < $scope.SelectedVehicleData.length; i++) {
                        HomeService.createSecondaryTableXML("VEH_DESC");


                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicleData[i].ModelYearNr.trim(), id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicleData[i].VehicleTradeNm.trim(), id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVehicleData[i].ModelNm.trim(), id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicleData[i].ManufacturerVehicleIdentificationNr.trim(), id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                        id += 1;
                    }
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
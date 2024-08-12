app.controller('PcpaSepDivorceDropwdownwControlsController', function ($scope, $http, shareData, HomeService, $filter) {
    try {
   
        $scope.Separation = [{ optionValue: "Cancel Policy", output: "Cancel Policy" }, { optionValue: "Spouse With Car-Off At Renewal", output: "Spouse With Car" }];
        $scope.PartnerInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Spouse' || .PartyRoles === 'Primary Named Insured'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);


        $scope.SelectedVehicleData = [];

        $scope.clearAllSelectedData = function () {
            $scope.SelectedVehicleData = [];
            $scope.selectedSeparation = undefined;
            $scope.selectedPartner = undefined;
         
            $scope.Vehicle.map(function (item) {
                item.checked = false;
            })
        }

        $scope.$watch('selectedSeparation', function (newValue, oldValue) {
            if (newValue === oldValue) return;
            $scope.selectedPartner = undefined;
            $scope.SelectedVehicleData = [];
            $scope.Vehicle.map(function (item) {
                item.checked = false;
            })
          
        });

        $scope.selectVehicle = function (vehicle) {
            var vehicleId = "sepVehicleCheckboxLstId" + vehicle.VehicleId;
            $scope.SelectedVehicleData = $scope.SelectedVehicleData || [];
            if (document.getElementById(vehicleId).checked) {
                $scope.SelectedVehicleData.push(vehicle);
            } else {
                $scope.SelectedVehicleData.splice($scope.SelectedVehicleData.indexOf(vehicle), 1)
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaSepDivorceDropwdownwControls', function (event) {
        try {
            if ($scope.SelectedSepDivorce) {
             
                if ($scope.selectedSeparation && $scope.selectedPartner) {
                    var partnerName;
                    if ($scope.selectedPartner.Person.PersonName.NameSalutationCd) {
                        partnerName = $scope.selectedPartner.Person.PersonName.NameSalutationCd + ' ';
                    }
                    if ($scope.selectedPartner.Person.PersonName.FirstGivenNm) {
                        partnerName += $scope.selectedPartner.Person.PersonName.FirstGivenNm + ' ';
                    }
                    if ($scope.selectedPartner.Person.PersonName.SecondGivenNameInitial) {
                        partnerName += $scope.selectedPartner.Person.PersonName.SecondGivenNameInitial + ' ';
                    }
                    if ($scope.selectedPartner.Person.PersonName.FamilyNm) {
                        partnerName += $scope.selectedPartner.Person.PersonName.FamilyNm;
                    }
                    if ($scope.selectedPartner.Person.PersonName.FamilyNameGenerationCd) {
                        partnerName += $scope.selectedPartner.Person.PersonName.FamilyNameGenerationCd;
                    }

                    partnerName = partnerName.replace(/undefined/g, '');

                    HomeService.createPrimaryXML("SEPARATE_DIVORCE_IND", $scope.selectedSeparation.output);

                    if (shareData.shareOutputXML.getElementsByTagName("SPOUSE_PARTNER_NAME")[0]) {
                        shareData.shareOutputXML.getElementsByTagName("SPOUSE_PARTNER_NAME")[0].nodeTypedValue = partnerName.trim();
                    }
                    else {
                        HomeService.createPrimaryXML("SPOUSE_PARTNER_NAME", partnerName.trim());
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
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
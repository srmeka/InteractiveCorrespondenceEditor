app.controller('ClVehicleDropdownController', function ($scope, $http, HomeService, shareData) {

    try{
        $scope.Vehicle = JSPath.apply('.Policy.PolicyLines.CommercialAutoLine.VehicleCoverageDetails{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('ClVehicleDropdown', function (event) {

        try {
            if ($scope.SelectedVehicle) {
                HomeService.createSecondaryTableXML("VehicleSchedule");
                HomeService.createSecondaryXMLValue("VehicleSchedule", "Vehicle", "", 0);
                HomeService.createSecondaryXMLValue("Vehicle", "RecordKey", "1", 0);
                HomeService.createSecondaryXMLValue("Vehicle", "Year", $scope.SelectedVehicle.Vehicle.ModelYearNr, 0);
                HomeService.createSecondaryXMLValue("Vehicle", "Make", $scope.SelectedVehicle.Vehicle.VehicleTradeNm, 0);
                HomeService.createSecondaryXMLValue("Vehicle", "Model", $scope.SelectedVehicle.Vehicle.ModelNm, 0);
                HomeService.createSecondaryXMLValue("Vehicle", "SerialNumber", $scope.SelectedVehicle.Vehicle.ManufacturerVehicleIdentificationNr, 0);
                HomeService.createSecondaryXMLValue("Vehicle", "LossPayeeSeqNo", "1", 0);
                HomeService.createSecondaryXMLValue("Vehicle", "RegisteredTo", $scope.SelectedVehicle.VehicleRegisteredToNm, 0);
                for (i = 0; i < $scope.SelectedVehicle.Coverages.length; i++) {
                    if ($scope.SelectedVehicle.Coverages[i].CoverageTypeCd == "Liability") {
                        HomeService.createSecondaryXMLValue("Vehicle", "AutoLiabLimit", $scope.SelectedVehicle.Coverages[i].CoverageParameterUnformattedValueTx, 0);
                    }
                    else if ($scope.SelectedVehicle.Coverages[i].CoverageTypeCd == "Comprehensive") {
                        HomeService.createSecondaryXMLValue("Vehicle", "OTCDeductible", $scope.SelectedVehicle.Coverages[i].CoverageParameterUnformattedValueTx, 0);
                    }
                    else if ($scope.SelectedVehicle.Coverages[i].CoverageTypeCd == "Collision") {
                        HomeService.createSecondaryXMLValue("Vehicle", "COLLDeductible", $scope.SelectedVehicle.Coverages[i].CoverageParameterUnformattedValueTx, 0);
                    }
                }

                if ($scope.SelectedVehicle.AssociatedParties) {
                    if ($scope.SelectedVehicle.AssociatedParties.length) {
                        for (i = 0; i < $scope.SelectedVehicle.AssociatedParties.length; i++) {
                            if ($scope.SelectedVehicle.AssociatedParties[i].PartyRoles.length) {
                                for (j = 0; j < $scope.SelectedVehicle.AssociatedParties[i].PartyRoles.length; j++) {
                                    if ($scope.SelectedVehicle.AssociatedParties[i].PartyRoles[j].PartyRole == "Lessor") {
                                        
                                        
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredNameLessor", $scope.SelectedVehicle.AssociatedParties[i].DisplayName, 0);
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine1", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line1Tx, 0);
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine2", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line2Tx, 0);
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine3", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line3Tx, 0);
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorCity", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorState", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                        HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorZIPCode", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.PostalCd, 0);
                                    }
                                    else if ($scope.SelectedVehicle.AssociatedParties[i].PartyRoles[j].PartyRole == "Lien Holder") {
                                        HomeService.createSecondaryTableXML("LossPayeeSchedule");
                                        HomeService.createSecondaryXMLValue("LossPayeeSchedule", "LossPayee", "", 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "RecordKey", "1", 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeSeqNo", "1", 0);

                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeName", $scope.SelectedVehicle.AssociatedParties[i].DisplayName, 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine1", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line1Tx, 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine2", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line2Tx, 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine3", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line3Tx, 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeCity", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeState", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                        HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeZIPCode", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.PostalCd, 0);
                                    }
                                }
                            }
                            else {
                                if ($scope.SelectedVehicle.AssociatedParties[i].PartyRoles.PartyRole == "Lessor") {
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredNameLessor", $scope.SelectedVehicle.AssociatedParties[i].DisplayName, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine1", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line1Tx, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine2", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line2Tx, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine3", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line3Tx, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorCity", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorState", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorZIPCode", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.PostalCd, 0);
                                }
                                else if ($scope.SelectedVehicle.AssociatedParties[i].PartyRoles.PartyRole == "Lien Holder") {
                                    HomeService.createSecondaryTableXML("LossPayeeSchedule");
                                    HomeService.createSecondaryXMLValue("LossPayeeSchedule", "LossPayee", "", 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "RecordKey", "1", 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeSeqNo", "1", 0);

                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeName", $scope.SelectedVehicle.AssociatedParties[i].DisplayName, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine1", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line1Tx, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine2", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line2Tx, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine3", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Line3Tx, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeCity", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeState", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeZIPCode", $scope.SelectedVehicle.AssociatedParties[i].Addresses.Address.PostalCd, 0);
                                }
                            }
                        }

                    }
                    else {
                        if ($scope.SelectedVehicle.AssociatedParties.PartyRoles.length) {
                            for (j = 0; j < $scope.SelectedVehicle.AssociatedParties.PartyRoles.length; j++) {
                                if ($scope.SelectedVehicle.AssociatedParties.PartyRoles[j].PartyRole == "Lessor") {
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredNameLessor", $scope.SelectedVehicle.AssociatedParties.DisplayName, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine1", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line1Tx, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine2", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line2Tx, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine3", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line3Tx, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorCity", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorState", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                    HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorZIPCode", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.PostalCd, 0);
                                }
                                else if ($scope.SelectedVehicle.AssociatedParties.PartyRoles[j].PartyRole == "Lien Holder") {
                                    HomeService.createSecondaryTableXML("LossPayeeSchedule");
                                    HomeService.createSecondaryXMLValue("LossPayeeSchedule", "LossPayee", "", 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "RecordKey", "1", 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeSeqNo", "1", 0);

                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeName", $scope.SelectedVehicle.AssociatedParties.DisplayName, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine1", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line1Tx, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine2", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line2Tx, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine3", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line3Tx, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeCity", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeState", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                    HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeZIPCode", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.PostalCd, 0);
                                }
                            }
                        }
                        else {
                            if ($scope.SelectedVehicle.AssociatedParties.PartyRoles.PartyRole == "Lessor") {
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredNameLessor", $scope.SelectedVehicle.AssociatedParties.DisplayName, 0);
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine1", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line1Tx, 0);
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine2", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line2Tx, 0);
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamednsuredLessorAddressLine3", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line3Tx, 0);
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorCity", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorState", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                HomeService.createSecondaryXMLValue("Vehicle", "AddlNamedInsuredLessorZIPCode", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.PostalCd, 0);
                            }
                            else if ($scope.SelectedVehicle.AssociatedParties.PartyRoles.PartyRole == "Lien Holder") {

                                HomeService.createSecondaryTableXML("LossPayeeSchedule");
                                HomeService.createSecondaryXMLValue("LossPayeeSchedule", "LossPayee", "", 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeSeqNo", "1", 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "RecordKey", "1", 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeSeqNo", "1", 0);

                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeName", $scope.SelectedVehicle.AssociatedParties.DisplayName, 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine1", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line1Tx, 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine2", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line2Tx, 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeAddressLine3", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Line3Tx, 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeCity", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.Municipality[0].MunicipalityNm, 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeState", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.CountrySubdivision.CountrySubdivisionNm, 0);
                                HomeService.createSecondaryXMLValue("LossPayee", "LossPayeeZIPCode", $scope.SelectedVehicle.AssociatedParties.Addresses.Address.PostalCd, 0);
                            }
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
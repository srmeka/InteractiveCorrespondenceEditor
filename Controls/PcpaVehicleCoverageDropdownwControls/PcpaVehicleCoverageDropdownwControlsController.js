app.controller('PcpaVehicleCoverageDropdownwControlsController', function ($scope, $http, shareData, HomeService, $filter) {
    try {

        $scope.CoverageData = [
            { optionValue: "Driver(s) On/Off Policy (No Lapse)-Effective Date", output: "Driver No Lapse Date", selectControl: 1 },
            { optionValue: "Vehicle On/Off Policy (No Lapse)-Effective Date", output: "Vehicle No Lapse Date", selectControl: 2 },
            { optionValue: "Driver(s) On/Off Policy (No Lapse)-Years Insured", output: "Driver No Lapse Years", selectControl: 3 },
            { optionValue: "Vehicle On/Off Policy (No Lapse)-Years Insured", output: "Vehicle No Lapse Years", selectControl: 4 },
            { optionValue: "Driver(s) On/Off Policy (Lapse)", output: "Driver Lapse", selectControl: 5 },
            { optionValue: "Vehicle On/Off Policy (Lapse)", output: "Vehicle Lapse", selectControl: 6 }
        ];

        $scope.DriverInfo = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.AssociatedParties{.PartyTypeCd === 'Person'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.Vehicle = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.$watch('selectedVehicleCoverage', function (newValue, oldValue) {
            if (newValue == oldValue) return;

            $scope.selectData = [];
            $scope.freeText1 = undefined;
            $scope.freeText2 = undefined;
            $scope.freeText3 = undefined;
            $scope.SelectedVehicleData = undefined;
            $scope.InsuredYears = undefined;
            $scope.VehicleCoverageCancelDate = undefined;

            $scope.DriverInfo.map(function (item) {
                item.checked = false;
            });
        }, true);

        $scope.selectData = [];
        $scope.selectDriver = function (item) {
            if (item.checked) {
                $scope.selectData.push(item);
            } else {
                var index = $scope.selectData.indexOf(item);
                $scope.selectData.splice(index, 1);
            }

            if ($scope.selectData.length >= 1) {
                $scope.freeText3 = undefined;
            }
            if ($scope.selectData.length >= 2) {
                $scope.freeText2 = undefined;
                $scope.freeText3 = undefined;
            }
            if ($scope.selectData.length >= 3) {
                $scope.freeText1 = undefined;
                $scope.freeText2 = undefined;
                $scope.freeText3 = undefined;
            }
        }

        $scope.clearAllSelectedData = function () {
            $scope.selectedVehicleCoverage = undefined;
            $scope.SelectedVehicleData = undefined;
            $scope.selectData = [];
            $scope.freeText1 = undefined;
            $scope.freeText2 = undefined;
            $scope.freeText3 = undefined;
            $scope.InsuredYears = undefined;
            $scope.VehicleCoverageCancelDate = undefined;

            $scope.DriverInfo.map(function (item) {
                item.checked = false;
            });
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaVehicleCoverageDropdownwControls', function (event) {
        try {
            if ($scope.SelectedVehicleCoverage) {
                if ($scope.selectedVehicleCoverage) {
                    HomeService.createPrimaryXML("VERIFY_COV_IND", $scope.selectedVehicleCoverage.output);
                }

                if ($scope.InsuredYears) {
                    HomeService.createPrimaryXML("NUM_YRS_INS", $scope.InsuredYears);

                }

                if ($scope.VehicleCoverageCancelDate) {
                    HomeService.createPrimaryXML("CNC_EFF_DT", $scope.VehicleCoverageCancelDate);

                }

                if ($scope.selectData.length !== 0) {
                    for (var i = 0; i < $scope.selectData.length; i++) {
                        var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                        var partnerName;

                        if ($scope.selectData[i].Person.PersonName.FirstGivenNm) {
                            partnerName = $scope.selectData[i].Person.PersonName.FirstGivenNm;
                        }
                        if ($scope.selectData[i].Person.PersonName.SecondGivenNameInitial) {
                            partnerName += ' ' + $scope.selectData[i].Person.PersonName.SecondGivenNameInitial;
                        }
                        if ($scope.selectData[i].Person.PersonName.FamilyNm) {
                            partnerName += ' ' + $scope.selectData[i].Person.PersonName.FamilyNm;
                        }
                        if ($scope.selectData[i].Person.PersonName.FamilyNameGenerationCd) {
                            partnerName += ' ' + $scope.selectData[i].Person.PersonName.FamilyNameGenerationCd;
                        }

                        partnerName = partnerName.replace(/undefined/g, '');
                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", partnerName, id);

                        id++;
                    }
                }

                if ($scope.freeText1) {
                    var freeText1TableID = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", freeText1TableID);
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", $scope.freeText1, freeText1TableID);
                }
                if ($scope.freeText2) {
                    var freeText2TableID = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", freeText2TableID);
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", $scope.freeText2, freeText2TableID);
                }
                if ($scope.freeText3) {
                    var freeText3TableID = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", freeText3TableID);
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", $scope.freeText3, freeText3TableID);
                }

                if ($scope.SelectedVehicleData && $scope.SelectedVehicleData.Vehicle) {
                    var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVehicleData.Vehicle.ModelYearNr, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVehicleData.Vehicle.VehicleTradeNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVehicleData.Vehicle.ModelNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVehicleData.Vehicle.ManufacturerVehicleIdentificationNr, id);

                    $scope.SelectedVehicleData.Coverages.some(function (item) {
                        if (item.CoverageTypeCd === 'Collision') {
                            HomeService.createSecondaryXMLValue("VEH_DESC", "COLL_DED", item.CoverageParameterUnformattedValueTx, id);
                        }
                        if (item.CoverageTypeCd === 'Comprehensive') {
                            HomeService.createSecondaryXMLValue("VEH_DESC", "OTH_THAN_COLL_DED", item.CoverageParameterUnformattedValueTx, id);
                        }
                    });

                    function createXML(item) {

                        var fName = '';
                        var fAddr1 = '';
                        var fAddr2 = '';
                        var fAddr3 = '';
                        var fCity = '';
                        var fState = '';
                        var fZip = '';
                        var lName = '';
                        var lAddr1 = '';
                        var lAddr2 = '';
                        var lAddr3 = '';
                        var lCity = '';
                        var lState = '';
                        var lZip = '';

                        if ((item.PartyTypeCd === 'Organization') && (item.PartyRoles.indexOf('Lien Holder') > -1)) {

                            fName = item.Organization.OrganizationNm;

                            if (item.Organization.Addresses instanceof Array) {

                                for (var i = 0; i < item.Organization.Addresses.length; i++) {

                                    if (item.Organization.Addresses[i].PrimaryAddressIn === 'true') {

                                        fAddr1 = item.Organization.Addresses[i].Address.Line1Tx;
                                        fAddr2 = item.Organization.Addresses[i].Address.Line2Tx;
                                        fAddr3 = item.Organization.Addresses[i].Address.Line3Tx;

                                        //  Array of Municipalities
                                        if (Array.isArray(item.Organization.Addresses[i].Address.Municipality)) {

                                            for (var j = 0; j < item.Organization.Addresses[i].Address.Municipality.length; j++) {

                                                if (item.Organization.Addresses[i].Address.Municipality.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                                    fCity = item.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm;
                                                }
                                            }

                                        } else {
                                            if (item.Organization.Addresses[i].Address.Municipality.MunicipalityTypeCd === 'CITY') {
                                                fCity = item.Organization.Addresses[i].Address.Municipality.MunicipalityNm;
                                            }

                                        }

                                        if (item.Organization.Addresses[i].Address.CountrySubdivision.CountrySubdivisionTypeCd === 'State') {
                                            fState = item.Organization.Addresses[i].Address.CountrySubdivision.CountrySubdivisionNm;
                                        }

                                        fZip = item.Organization.Addresses[i].Address.PostalCd;
                                    }
                                } // Array of Addresses

                            } else {
                                fAddr1 = item.Organization.Addresses.Address.Line1Tx;
                                fAddr2 = item.Organization.Addresses.Address.Line2Tx;
                                fAddr3 = item.Organization.Addresses.Address.Line3Tx;

                                //  Array of Municipalities
                                if (Array.isArray(item.Organization.Addresses.Address.Municipality)) {

                                    for (var j = 0; j < item.Organization.Addresses.Address.Municipality.length; j++) {

                                        if (item.Organization.Addresses.Address.Municipality.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                            fCity = item.Organization.Addresses.Address.Municipality[j].MunicipalityNm;
                                        }
                                    }

                                } else {

                                    if (item.Organization.Addresses.Address.Municipality.MunicipalityTypeCd === 'CITY') {
                                        fCity = item.Organization.Addresses.Address.Municipality.MunicipalityNm;
                                    }
                                }
                                if (item.Organization.Addresses.Address.CountrySubdivision.CountrySubdivisionTypeCd === 'State') {
                                    fState = item.Organization.Addresses.Address.CountrySubdivision.CountrySubdivisionNm;
                                }

                                fZip = item.Organization.Addresses.Address.PostalCd;

                            }

                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_NAME", (fName ? fName : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_1", (fAddr1 ? fAddr1 : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_2", (fAddr2 ? fAddr2 : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_3", (fAddr3 ? fAddr3 : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_CTY", (fCity ? fCity : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ST", (fState ? fState : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ZIP", (fZip ? fZip : ''), id);
                        }

                        if (item.PartyTypeCd === 'Organization' && (item.PartyRoles.indexOf('Lessor') > -1)) {
                            lName = item.Organization.OrganizationNm;

                            if (item.Organization.Addresses instanceof Array) {

                                for (var i = 0; i < item.Organization.Addresses.length; i++) {

                                    if (item.Organization.Addresses[i].PrimaryAddressIn === 'true') {

                                        lAddr1 = item.Organization.Addresses[i].Address.Line1Tx;
                                        lAddr2 = item.Organization.Addresses[i].Address.Line2Tx;
                                        lAddr3 = item.Organization.Addresses[i].Address.Line3Tx;

                                        //  Array of Municipalities
                                        if (Array.isArray(item.Organization.Addresses[i].Address.Municipality)) {

                                            for (var j = 0; j < item.Organization.Addresses[i].Address.Municipality.length; j++) {

                                                if (item.Organization.Addresses[i].Address.Municipality.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                                    lCity = item.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm;
                                                }
                                            }

                                        } else {
                                            if (item.Organization.Addresses[i].Address.Municipality.MunicipalityTypeCd === 'CITY') {
                                                lCity = item.Organization.Addresses[i].Address.Municipality.MunicipalityNm;
                                            }

                                        }

                                        if (item.Organization.Addresses[i].Address.CountrySubdivision.CountrySubdivisionTypeCd === 'State') {
                                            lState = item.Organization.Addresses[i].Address.CountrySubdivision.CountrySubdivisionNm;
                                        }

                                        lZip = item.Organization.Addresses[i].Address.PostalCd;
                                    }
                                } // Array of Addresses

                            } else {
                                lAddr1 = item.Organization.Addresses.Address.Line1Tx;
                                lAddr2 = item.Organization.Addresses.Address.Line2Tx;
                                lAddr3 = item.Organization.Addresses.Address.Line3Tx;

                                //  Array of Municipalities
                                if (Array.isArray(item.Organization.Addresses.Address.Municipality)) {

                                    for (var j = 0; j < item.Organization.Addresses.Address.Municipality.length; j++) {

                                        if (item.Organization.Addresses.Address.Municipality.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                            lCity = item.Organization.Addresses.Address.Municipality[j].MunicipalityNm;
                                        }
                                    }

                                } else {

                                    if (item.Organization.Addresses.Address.Municipality.MunicipalityTypeCd === 'CITY') {
                                        lCity = item.Organization.Addresses.Address.Municipality.MunicipalityNm;
                                    }
                                }
                                if (item.Organization.Addresses.Address.CountrySubdivision.CountrySubdivisionTypeCd === 'State') {
                                    lState = item.Organization.Addresses.Address.CountrySubdivision.CountrySubdivisionNm;
                                }

                                lZip = item.Organization.Addresses.Address.PostalCd;
                            }
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_NAME", (lName ? lName : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ADDR_1", (lAddr1 ? lAddr1 : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ADDR_2", (lAddr2 ? lAddr2 : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ADDR_3", (lAddr3 ? lAddr3 : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_CTY", (lCity ? lCity : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ST", (lState ? lState : ''), id);
                            HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ZIP", (lZip ? lZip : ''), id);
                        }
                    }

                    if ($scope.SelectedVehicleData.AssociatedParties instanceof Array) {
                        $scope.SelectedVehicleData.AssociatedParties.some(function (item) {
                            createXML(item);
                        });
                    } else if ($scope.SelectedVehicleData.AssociatedParties) {
                        createXML($scope.SelectedVehicleData.AssociatedParties);
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
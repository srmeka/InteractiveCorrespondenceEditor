app.controller('PcumbPennTermReasonsDropdownController', function ($scope, shareData, $http, HomeService) {

    $scope.Reasons = ["Driving Record", "No Underlying Policy", "Inspection-Property", "Inspection-Vacant Land", "Geographic", "Claims"];
    $scope.UnderlyingPolicy = ["Personal Automobile policy", "Commercial Automobile policy", "Property policy", "Personal Automobile and Property policies", "Commercial Automobile and Property policies"];

    $scope.LicFamilyMember = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense.LicenseStatusCd =='Active DL' || .Person.VehicalDriverLicense.LicenseStatusCd =='Suspended' || .Person.VehicalDriverLicense.LicenseStatusCd =='International' || .Person.VehicalDriverLicense.LicenseStatusCd =='Permit'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.RiskLocationData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd == 'Vacant Land' || .LocationTypeCd == 'Property'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.VacantLotData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd == 'Vacant Land'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    function getCity(addressData) {
        var addressArray = [];
        addressData.forEach(function (item) {
            var city_value;
           
            if (Array.isArray(item.Address.Municipality)) {
                item.Address.Municipality.forEach(function (addr) {
                    if (addr.MunicipalityTypeCd === 'CITY') {
                        city_value = addr.MunicipalityNm;
                    }
                })
            } else {
                if (item.Address.Municipality.MunicipalityTypeCd === 'CITY') {
                    city_value = item.Address.Municipality.MunicipalityNm;
                }
            }
            item.Address.city_value = city_value;
            addressArray.push(item);
        });
        return addressArray;
    }

    $scope.RiskLocation = getCity($scope.RiskLocationData);
    $scope.VacantLot = getCity($scope.VacantLotData);

    $scope.ShowUnderlyingPolicy = function () {
        if ($scope.PennTermReason == "No Underlying Policy" || $scope.PennTermReason == "Claims")
            return true;
        return false;
    }

    $scope.ShowLicFamilyMember = function () {
        if ($scope.PennTermReason == "Driving Record")
            return true;
        return false;
    }

    $scope.ShowRiskLocation = function () {
        if ($scope.PennTermReason == "Inspection-Property")
            return true;
        return false;
    }

    $scope.ShowVacantLot = function () {
        if ($scope.PennTermReason == "Inspection-Vacant Land")
            return true;
        return false;
    }

    $scope.IsUndefined = function (item) {
        if (item == undefined)
            return true;
        return false;
    }

    $scope.ClearAllData = function () {
        $scope.SelectedUnderlyingPolicy = undefined;

        $scope.SelectedLicFamilyMember = undefined;
        $scope.ManualLicFamilyMember = '';

        $scope.SelectedVacantLot = undefined;
        $scope.ManualVacantLot = '';

        $scope.SelectedRiskLocation = undefined;
        $scope.ManualRiskLocation = '';
    }

    $scope.$on('PcumbPennTermReasonsDropdown', function (event) {

        if ($scope.PennTermReason) {
            var id;
            HomeService.createPrimaryXML("MDTRM_CNC_IND", $scope.PennTermReason);
            if ($scope.PennTermReason == "Driving Record") {
                id = shareData.shareOutputXML.getElementsByTagName("FAMILY_REC").length;
                HomeService.createSecondaryTableXML("FAMILY_REC");
                if ($scope.SelectedLicFamilyMember) {
                    var name = "";
                    if ($scope.SelectedLicFamilyMember.Person.PersonName.FirstGivenNm) {
                        name = $scope.SelectedLicFamilyMember.Person.PersonName.FirstGivenNm + ' ';
                    }
                    if ($scope.SelectedLicFamilyMember.Person.PersonName.SecondGivenNm) {
                        name = name + $scope.SelectedLicFamilyMember.Person.PersonName.SecondGivenNm + ' ';
                    }
                    if ($scope.SelectedLicFamilyMember.Person.PersonName.FamilyNm) {
                        name = name + $scope.SelectedLicFamilyMember.Person.PersonName.FamilyNm;
                    }
                    HomeService.createSecondaryXMLValue("FAMILY_REC", "LICENSE_FAM_MEM", name.trim(), id);
                }
                else if ($scope.ManualLicFamilyMember) {
                    HomeService.createSecondaryXMLValue("FAMILY_REC", "LICENSE_FAM_MEM", $scope.ManualLicFamilyMember, id);
                }
                HomeService.createSecondaryXMLValue("FAMILY_REC", "POL_FK", 1, id);
            }
            else if (($scope.PennTermReason == "No Underlying Policy" || $scope.PennTermReason == "Claims") && $scope.SelectedUnderlyingPolicy) {
                HomeService.createPrimaryXML("UNLY_POL", $scope.SelectedUnderlyingPolicy);
            }
            else if ($scope.PennTermReason == "Inspection-Property") {
                id = shareData.shareOutputXML.getElementsByTagName("PROP_DET_INFO").length;
                HomeService.createSecondaryTableXML("PROP_DET_INFO");
                if ($scope.SelectedRiskLocation) {
                    if ($scope.SelectedRiskLocation.Address.Line1Tx) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.SelectedRiskLocation.Address.Line1Tx, id);
                    }
                    if ($scope.SelectedRiskLocation.Address.Line2Tx) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_2", $scope.SelectedRiskLocation.Address.Line2Tx, id);
                    }
                    if ($scope.SelectedRiskLocation.Address.Line3Tx) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_3", $scope.SelectedRiskLocation.Address.Line3Tx, id);
                    }
                    if ($scope.SelectedRiskLocation.Address.city_value) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_CTY", $scope.SelectedRiskLocation.Address.city_value, id);
                    }
                    if ($scope.SelectedRiskLocation.Address.CountrySubdivision) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ST", $scope.SelectedRiskLocation.Address.CountrySubdivision.CountrySubdivisionNm, id);
                    }
                    if ($scope.SelectedRiskLocation.Address.PostalCd) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ZIP", $scope.SelectedRiskLocation.Address.PostalCd, id);
                    }
                }
                else if ($scope.ManualRiskLocation) {
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.ManualRiskLocation, id);
                }
                HomeService.createSecondaryXMLValue("PROP_DET_INFO", "POL_FK", 1, id);
            }
            else if ($scope.PennTermReason == "Inspection-Vacant Land") {
                id = shareData.shareOutputXML.getElementsByTagName("LOT_REC").length;
                HomeService.createSecondaryTableXML("LOT_REC");
                if ($scope.SelectedVacantLot) {
                    var selectedData = $scope.SelectedVacantLot;
                    var outputValue = '';

                    if (selectedData.Address.Line1Tx) {
                        outputValue += selectedData.Address.Line1Tx + ' ';
                    }
                    if (selectedData.Address.Line2Tx) {
                        outputValue += selectedData.Address.Line2Tx + ' ';
                    }
                    if (selectedData.Address.Line3Tx) {
                        outputValue += selectedData.Address.Line3Tx + ' ';
                    }
                    if (selectedData.Address.city_value) {
                        outputValue += selectedData.Address.city_value + ' ';
                    }
                    if (selectedData.Address.CountrySubdivision.CountrySubdivisionNm) {
                        outputValue += selectedData.Address.CountrySubdivision.CountrySubdivisionNmd + ' ';
                    }
                    if (selectedData.Address.PostalCd) {
                        outputValue += selectedData.Address.PostalCd + ' ';
                    }

                    outputValue = outputValue.replace(/undefined/, '').trim();
                    HomeService.createSecondaryXMLValue("LOT_REC", "LOT_AND_BLOCK", outputValue, id);
                }
                else if ($scope.ManualVacantLot) {
                    HomeService.createSecondaryXMLValue("LOT_REC", "LOT_AND_BLOCK", $scope.ManualVacantLot, id);
                }
                HomeService.createSecondaryXMLValue("PROP_DET_INFO", "POL_FK", 1, id);
            }
        }
    });
});
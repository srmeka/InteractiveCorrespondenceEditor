app.controller('PcumbNonrenewalReasonDropdownController', function ($scope, shareData, $http, HomeService) {

    $scope.Reasons = ["Driving Record", "No Underlying Policy", "Inspection", "Geographic", "Claims"];
    $scope.UnderlyingPolicy = ["Personal Automobile policy", "Commercial Automobile policy", "Property policy", "Personal Automobile and Property policies", "Commercial Automobile and Property policies"];

    $scope.LicFamilyMember = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense.LicenseStatusCd =='Active DL' || .Person.VehicalDriverLicense.LicenseStatusCd =='Suspended' || .Person.VehicalDriverLicense.LicenseStatusCd =='International' || .Person.VehicalDriverLicense.LicenseStatusCd =='Permit'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

    $scope.RiskLocationData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd == 'Vacant Land' || .LocationTypeCd == 'Property'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

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

    $scope.ShowUnderlyingPolicy = function () {
        if ($scope.NonrenewReason == "No Underlying Policy" || $scope.NonrenewReason == "Claims")
            return true;
        return false;
    }

    $scope.ShowLicFamilyMember = function () {
        if ($scope.NonrenewReason == "Driving Record")
            return true;
        return false;
    }

    $scope.ShowRiskLocation = function () {
        if ($scope.NonrenewReason == "Inspection")
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

        $scope.SelectedRiskLocation = undefined;
        $scope.ManualRiskLocation = '';
    }

    $scope.$on('PcumbNonrenewalReasonDropdown', function (event) {

        if ($scope.NonrenewReason) {
            var id;
            HomeService.createPrimaryXML("NONRNWL_IND", $scope.NonrenewReason);
            if ($scope.NonrenewReason == "Driving Record") {
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
            else if (($scope.NonrenewReason == "No Underlying Policy" || $scope.NonrenewReason == "Claims") && $scope.SelectedUnderlyingPolicy) {
                HomeService.createPrimaryXML("UNLY_POL", $scope.SelectedUnderlyingPolicy);
            }
            else if ($scope.NonrenewReason == "Inspection") {
                id = shareData.shareOutputXML.getElementsByTagName("PROP_DET_INFO").length;
                HomeService.createSecondaryTableXML("PROP_DET_INFO");
                if ($scope.SelectedRiskLocation) {
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.SelectedRiskLocation.Address.Line1Tx, id);
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_2", $scope.SelectedRiskLocation.Address.Line2Tx, id);
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_3", $scope.SelectedRiskLocation.Address.Line3Tx, id);
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_CTY", $scope.SelectedRiskLocation.Address.city_value, id);
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ST", $scope.SelectedRiskLocation.Address.CountrySubdivision.CountrySubdivisionNm, id);
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ZIP", $scope.SelectedRiskLocation.Address.PostalCd, id);
                }
                else if ($scope.ManualRiskLocation) {
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.ManualRiskLocation, id);
                }
                HomeService.createSecondaryXMLValue("PROP_DET_INFO", "POL_FK", 1, id);
            }
        }
    });
});
app.controller('PcumbMidtermCancelReasonDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
      
        $scope.ReasonData = [
            { optionValue: "Driving Record", output: "Driving Record", slectedType:'1' },
            { optionValue: "No Underlying Policy", output: "No Underlying Policy", slectedType: '2' },
            { optionValue: "Inspection-Property", output: "Inspection-Property", slectedType: '3' },
            { optionValue: "Inspection-Vacant Land", output: "Inspection-Vacant Land", slectedType: '4' },
            { optionValue: "Geographic", output: "Geographic", slectedType: '5' },
            { optionValue: "Claims", output: "Claims", slectedType: '6' },
       
        ];

        $scope.PolicyData = [
           { optionValue: "Personal Automobile policy", output: "Personal Automobile policy" },
           { optionValue: "Commercial Automobile policy", output: "Commercial Automobile policy"},
           { optionValue: "Property policy", output: "Property policy"},
           { optionValue: "Personal Automobile and Property policies", output: "Personal Automobile and Property policies"},
           { optionValue: "Commercial Automobile and Property policies", output: "Commercial Automobile and Property policies"},
        ];


        $scope.FamilyData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense{.LicenseStatusCd ==='Active DL' || .LicenseStatusCd === 'Suspended' || .LicenseStatusCd === 'International' || .LicenseStatusCd === 'Permit'}}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.LocationJsonData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd ==='Vacant Land' || .LocationTypeCd ==='Property'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.BlockData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd ==='Vacant Land'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

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

        $scope.LocationData = getCity($scope.LocationJsonData);

        $scope.ManualLicFamilyMember = [];
        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;
        $scope.SelectedLicFamilyMember = [];

        $scope.clearLocationData = function () {
            $scope.slectedLocation = undefined;
            $scope.locationFreeText = undefined;
        }


        $scope.$watch('selectedReason', function (newValue, oldValue) {
            if (newValue === oldValue) return;
            $scope.slectedLocation = undefined;
            $scope.locationFreeText = undefined;
            $scope.slectedPolicy = undefined;
            $scope.SelectedLicFamilyMember = [];
            $scope.ManualLicFamilyMember = [];
            $scope.slectedBlock = undefined;
            $scope.blockFreeText = undefined;
            $scope.TotalCount = [1];
            $scope.locationChecked = undefined;
        });

        $scope.clearRepeaterData = function (clearId) {
            $scope.SelectedLicFamilyMember[clearId] = undefined;
            $scope.ManualLicFamilyMember[clearId] = undefined;
        }

        $scope.MaxCtls = 7;
        $scope.TotalCount = [1];

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.clearRepeaterData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbMidtermCancelReasonDropdown', function (event) {
        try {
            if ($scope.selectedReason) {

                HomeService.createPrimaryXML("MDTRM_CNC_IND", $scope.selectedReason.output);

                if ($scope.selectedReason.slectedType === '1' && $scope.TotalCount && $scope.TotalCount.length > 0) {
                    var id = shareData.shareOutputXML.getElementsByTagName("FAMILY_REC").length;
                    for (var i = 0; i < $scope.TotalCount.length; i++) {
                        HomeService.createSecondaryTableXML("FAMILY_REC");
                        var partnerName="";
                        if ($scope.SelectedLicFamilyMember[i]) {

                            if ($scope.SelectedLicFamilyMember[i].Person.PersonName.FirstGivenNm) {
                                partnerName = $scope.SelectedLicFamilyMember[i].Person.PersonName.FirstGivenNm + ' ';
                            }
                            if ($scope.SelectedLicFamilyMember[i].Person.SecondGivenNameInitial) {
                                partnerName += $scope.SelectedLicFamilyMember[i].Person.SecondGivenNameInitial + ' ';
                            }
                            if ($scope.SelectedLicFamilyMember[i].Person.PersonName.FamilyNm) {
                                partnerName += $scope.SelectedLicFamilyMember[i].Person.PersonName.FamilyNm;
                            }

                        }
                        else if ($scope.ManualLicFamilyMember[i]) {
                            partnerName = $scope.ManualLicFamilyMember[i];
                        }
                        //partnerName = partnerName.replace(/undefined/g, '');
                        HomeService.createSecondaryXMLValue("FAMILY_REC", "LICENSE_FAM_MEM", partnerName.trim(), id);

                        HomeService.createSecondaryXMLValue("FAMILY_REC", "POL_FK", "1", id)
                        id++;
                    }
                }


                if ($scope.slectedPolicy) {
                    HomeService.createPrimaryXML("UNLY_POL", $scope.slectedPolicy.output.trim());
                }
                if ($scope.locationChecked) {
                    var id = shareData.shareOutputXML.getElementsByTagName("PROP_DET_INFO").length;
                    HomeService.createSecondaryTableXML("PROP_DET_INFO");

                    if ($scope.slectedLocation) {
                        var selectedData = $scope.slectedLocation;

                        if (selectedData.Address.Line1Tx) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", selectedData.Address.Line1Tx, id);
                        }
                        if (selectedData.Address.Line2Tx) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_2", selectedData.Address.Line2Tx, id);
                        }
                        if (selectedData.Address.Line3Tx) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_3", selectedData.Address.Line3Tx, id);
                        }
                        if (selectedData.Address.city_value) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_CTY", selectedData.Address.city_value, id);
                        }
                        if (selectedData.Address.CountrySubdivision.CountrySubdivisionNm) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ST", selectedData.Address.CountrySubdivision.CountrySubdivisionNm, id);
                        }
                        if (selectedData.Address.PostalCd) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ZIP", selectedData.Address.PostalCd, id);
                        }
                    }

                    if ($scope.locationFreeText) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.locationFreeText, id);
                    }

                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "POL_FK", "1", id)

                }


                if ($scope.slectedBlock || $scope.blockFreeText) {
                    var id = shareData.shareOutputXML.getElementsByTagName("LOT_REC").length;
                    HomeService.createSecondaryTableXML("LOT_REC");
                    if ($scope.slectedBlock) {
                        var selectedData = $scope.slectedBlock;
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
                        if (selectedData.Address.Municipality.MunicipalityNm) {
                            outputValue += selectedData.Address.Municipality.MunicipalityNm + ' ';
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
                    if ($scope.blockFreeText) {
                        HomeService.createSecondaryXMLValue("LOT_REC", "LOT_AND_BLOCK", $scope.blockFreeText.trim(), id);
                    }
                    HomeService.createSecondaryXMLValue("LOT_REC", "POL_FK", "1", id);
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
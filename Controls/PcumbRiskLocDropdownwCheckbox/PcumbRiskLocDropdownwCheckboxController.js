app.controller('PcumbRiskLocDropdownwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.addressJsonData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd === 'Vacant Land' || .LocationTypeCd ==='Property'}", shareData.shareJSONClaim.CorrespondenceDataResponse);


        $scope.addressData = [];
        function getCity(addressData) {

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
                $scope.addressData.push(item);
            });
        }

        getCity($scope.addressJsonData);

        $scope.populateData = [{ selectorId: 0, selectedValue: undefined }]

        $scope.freeTextGroup = [];

        $scope.isRiskAddressSelected = [];

        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

        $scope.$watch('populateData', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if (newValue[index].selectedValue) {
                    $scope.freeTextGroup[index] = undefined;
                }
            }

        }, true);

        $scope.clearAllData = function (clearId) {
            $scope.populateData[clearId] = { selectorId: clearId, selectedValue: undefined };
            $scope.freeTextGroup[clearId] = '';
        };
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbRiskLocDropdownwCheckbox', function (event) {
        try {
            for (var index in $scope.populateData) {

                if ($scope.isRiskAddressSelected[index]) {
                    var id = shareData.shareOutputXML.getElementsByTagName("PROP_DET_INFO").length;
                    HomeService.createSecondaryTableXML("PROP_DET_INFO");

                    var selectedData = $scope.populateData[index].selectedValue;
                    if (selectedData || $scope.freeTextGroup[index]) {

                        if (selectedData) {

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

                        } else {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.freeTextGroup[index].trim(), id);
                        }
                    }

                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "POL_FK", "1", id);

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
app.controller('PcumbClaimsHomeRepeaterwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.claimDataJson = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd === 'Vacant Land' || .LocationTypeCd === 'Property'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        function getCity(addressData) {
            var arrayData = []
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
                arrayData.push(item);
            });
            return arrayData;
        }

        $scope.claimData = getCity($scope.claimDataJson);

        $scope.selectedValue = [];

        $scope.freeTextGroup = [];

        $scope.selectClaims = [];

        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

        $scope.$watch('selectedValue', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if (newValue[index]) {
                         $scope.freeTextGroup[index] = undefined;
                    }
                }   
            
        }, true);

        $scope.clearData = function (clearId) {
            $scope.selectedValue[clearId] = undefined;

            $scope.freeTextGroup[clearId] = undefined;
            $scope.selectClaims[clearId] = undefined;
        }


        $scope.MaxCtls = 3;
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
                $scope.clearData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbClaimsHomeRepeaterwCheckbox', function (event) {
        try {
            for (var index in $scope.TotalCount) {
                if ($scope.selectClaims[index]) {
                    var id = shareData.shareOutputXML.getElementsByTagName("PROP_DET_INFO").length;
                    HomeService.createSecondaryTableXML("PROP_DET_INFO");

                    var selectedData = $scope.selectedValue[index];
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
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "CLMS_HOME", "Y", id);

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
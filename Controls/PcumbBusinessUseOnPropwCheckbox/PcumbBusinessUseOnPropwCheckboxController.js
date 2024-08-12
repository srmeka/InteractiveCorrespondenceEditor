app.controller('PcumbBusinessUseOnPropwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.addressJsonData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd === 'Vacant Land' || .LocationTypeCd ==='Property'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
 
        $scope.addressData =[];
        function getCity(addressData) {

            addressData.forEach(function (item) {
                var city_value;
                if (Array.isArray(item.Address.Municipality)) {
                    item.Address.Municipality.forEach(function(addr) {
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

        $scope.isWatercraftSelected = [];
      
        $scope.$watch('selectedValue', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            if (newValue) {
                $scope.freeText = undefined;
            }
            
        }, true);

        $scope.clearAllData = function () {
            $scope.selectedValue = undefined;
            $scope.freeText = undefined;

            $scope.type = undefined;
            $scope.telecommuting = undefined;
            $scope.customers = undefined;
            $scope.employees = undefined;
            $scope.advertising = undefined;
          
        };
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbBusinessUseOnPropwCheckbox', function (event) {
        try {
           
            var AI_value = 'N';
         
            if ($scope.CtrlEnabledCheckbox) {
                   AI_value = 'Y';
         
                var id = shareData.shareOutputXML.getElementsByTagName("PROP_DET_INFO").length;
                HomeService.createSecondaryTableXML("PROP_DET_INFO");

                if ($scope.selectedValue || $scope.freeText) {
                     
                    if ($scope.selectedValue) {

                        if ($scope.selectedValue.Address.Line1Tx) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.selectedValue.Address.Line1Tx, id);
                            }
                        if ($scope.selectedValue.Address.Line2Tx) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_2", $scope.selectedValue.Address.Line2Tx, id);
                            }
                        if ($scope.selectedValue.Address.Line3Tx) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_3", $scope.selectedValue.Address.Line3Tx, id);
                            }
                        if ($scope.selectedValue.Address.city_value) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_CTY", $scope.selectedValue.Address.city_value, id);
                            }
                        if ($scope.selectedValue.Address.CountrySubdivision.CountrySubdivisionNm) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ST", $scope.selectedValue.Address.CountrySubdivision.CountrySubdivisionNm, id);
                            }
                        if ($scope.selectedValue.Address.PostalCd) {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ZIP", $scope.selectedValue.Address.PostalCd, id);
                            }

                        } else {
                            HomeService.createSecondaryXMLValue("PROP_DET_INFO", "RSK_LOC_ADDR_1", $scope.freeText.trim(), id);
                        }
                    }

                    if ($scope.type) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "TYPE_BUS", "Y", id);
                    }

                    if ($scope.telecommuting) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "TLC", "Y", id);
                    }

                    if ($scope.customers) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "NUM_CLIENTS", "Y", id);
                    }

                    if ($scope.employees) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "NUM_EMP", "Y", id);
                    }

                    if ($scope.advertising) {
                        HomeService.createSecondaryXMLValue("PROP_DET_INFO", "ADVERTISE", "Y", id);
                    }

                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("PROP_DET_INFO", "PROP_INFO_TYPE", " Business-Prop", id);

            }
            HomeService.createPrimaryXML('AI_BUS_USE', AI_value);
            
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
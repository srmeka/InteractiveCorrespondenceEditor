app.controller('PcumbVacLndCompInfoRepeaterwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.addressJsonData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.LocationExposures{.LocationTypeCd === 'Vacant Land'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

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

        $scope.selectedValue = []

        $scope.freeTextGroup = [];

        $scope.SelectedVacant = [];

        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

        $scope.$watch('selectedValue', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if ($scope.selectedValue[index]) {
                         $scope.freeTextGroup[index] = undefined;
                    }
                }   
            
        }, true);

        $scope.clearAllData = function (clearId) {
            $scope.selectedValue[clearId] = undefined;
            $scope.freeTextGroup[clearId] = '';
        };

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
                //$scope.SelectedVacant.pop($scope.TotalCount.length);
                $scope.SelectedVacant[newItemNo] = undefined;
                $scope.clearAllData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbVacLndCompInfoRepeaterwCheckbox', function (event) {
        try {
            var AI_value = 'N';
           
            for (var index in $scope.TotalCount) {
                if ($scope.SelectedVacant[index]) {
                    AI_value = 'Y';
                   
                    var id = shareData.shareOutputXML.getElementsByTagName("LOT_REC").length;
                    HomeService.createSecondaryTableXML("LOT_REC");

                      var selectedData = $scope.selectedValue[index];
                      if (selectedData || $scope.freeTextGroup[index]) {


                          if (selectedData) {
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
                                  outputValue += selectedData.Address.CountrySubdivision.CountrySubdivisionNm + ' ';

                              }
                              if (selectedData.Address.PostalCd) {
                                  outputValue += selectedData.Address.PostalCd + ' ';

                              }
                              outputValue = outputValue.replace(/undefined/, '').trim();
                              HomeService.createSecondaryXMLValue("LOT_REC", "LOT_AND_BLOCK", outputValue, id);
                          } else {
                              HomeService.createSecondaryXMLValue("LOT_REC", "LOT_AND_BLOCK", $scope.freeTextGroup[index].trim(), id);
                          }


                      }

                      HomeService.createSecondaryXMLValue("LOT_REC", "POL_FK", "1", id);
                      HomeService.createSecondaryXMLValue("LOT_REC", "PROP_INFO_TYPE", "Complete Info", id);
                }
             
            }
            HomeService.createPrimaryXML('AI_VACNT_LAND', AI_value);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
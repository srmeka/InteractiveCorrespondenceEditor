app.controller('PcumbWatercraftRepeaterwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.watercraftData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.WatercraftExposures{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.selectedValue = []

        $scope.freeTextGroup = [];

        $scope.CtrlEnabledCheckbox = [];
      
        $scope.ownership = [];
        $scope.type = [];
        $scope.year = [];
        $scope.make = [];
        $scope.length = [];
        $scope.horsepower = [];
        $scope.policy = [];

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

        $scope.clearAllData = function (clearId) {
            $scope.selectedValue[clearId] =  undefined;
            $scope.freeTextGroup[clearId] = '';


            $scope.ownership[clearId] = undefined;
            $scope.type[clearId] = undefined;
            $scope.year[clearId] = undefined;
            $scope.make[clearId] = undefined;
            $scope.length[clearId] = undefined;
            $scope.horsepower[clearId] = undefined;
            $scope.policy[clearId] = undefined;
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
                //$scope.CtrlEnabledCheckbox.pop($scope.TotalCount.length);
                $scope.CtrlEnabledCheckbox[newItemNo] = undefined;
                $scope.clearAllData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbWatercraftRepeaterwCheckbox', function (event) {
        try {
            for (var index in $scope.TotalCount) {
                var AI_value = 'N';
               
                if ($scope.CtrlEnabledCheckbox[index]) {
                    AI_value = 'Y';
                 
                    var id = shareData.shareOutputXML.getElementsByTagName("WTRCRFT_DET").length;
                    HomeService.createSecondaryTableXML("WTRCRFT_DET");

                    var selectedData = $scope.selectedValue[index];
                    if (selectedData || $scope.freeTextGroup[index]) {
                        if (selectedData) {
                            var outputValue = '';
                            if (selectedData.Watercraft.ModelYearNr) {
                                outputValue += selectedData.Watercraft.ModelYearNr + ' ';
                            }

                            if (selectedData.Watercraft.WatercraftTradeNm) {
                                outputValue += selectedData.Watercraft.WatercraftTradeNm + ' ';
                            }

                            outputValue = outputValue.replace(/undefined/, '');

                            HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT", outputValue.trim(), id);

                        } else {
                            HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT", $scope.freeTextGroup[index].trim(), id);
                        }

                    }
                    if ($scope.ownership[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT_OWN", "Y", id);
                    }

                    if ($scope.type[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT_TYPE", "Y", id);
                    }

                    if ($scope.year[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT_YEAR", "Y", id);
                    }

                    if ($scope.make[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT_MAKE", "Y", id);
                    }

                    if ($scope.length[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT_LGTH", "Y", id);
                    }

                    if ($scope.horsepower[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "MAX_HP", "Y", id);
                    }

                    if ($scope.policy[index]) {
                        HomeService.createSecondaryXMLValue("WTRCRFT_DET", "WTRCFT_UNDRLY_POL", "Y", id);
                    }
                    HomeService.createSecondaryXMLValue("WTRCRFT_DET", "POL_FK", "1", id);

                }
               
            }
            HomeService.createPrimaryXML('AI_WTRCRFT', AI_value);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
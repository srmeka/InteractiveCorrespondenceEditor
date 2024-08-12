app.controller('PcpaDriverDropdownRepeaterController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.selectedValue = []

        $scope.freeTextGroup = [];

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

         $scope.MaxCtls = 5;
         $scope.TotalCount = [1];

         $scope.clearAllData = function (clearId) {
             $scope.selectedValue[clearId] = undefined;
             $scope.freeTextGroup[clearId] = undefined;
         }
       
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
                $scope.clearAllData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaDriverDropdownRepeater', function (event) {
        try {
            for (var index in $scope.TotalCount) {
                var selectedData = $scope.selectedValue[index];
                if (selectedData || $scope.freeTextGroup[index]) {
                    var outputValue;
                    if (selectedData) {

                        if (selectedData.Person.PersonName.FirstGivenNm) {
                            outputValue = selectedData.Person.PersonName.FirstGivenNm + ' ';
                        }
                        if (selectedData.Person.PersonName.SecendGivenNmInitial) {
                            outputValue += selectedData.Person.PersonName.SecendGivenNmInitial + ' ';
                        }
                        if (selectedData.Person.PersonName.FamilyNm) {
                            outputValue += selectedData.Person.PersonName.FamilyNm + ' ';
                        }
                        if (selectedData.Person.PersonName.FamilyNameGenerationCd) {
                            outputValue += selectedData.Person.PersonName.FamilyNameGenerationCd;
                        }

                    } else {
                        outputValue = $scope.freeTextGroup[index];
                    }

                    outputValue = outputValue.replace(/undefined/,'');
                    var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", outputValue.trim(), id);
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);
                    id++;

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
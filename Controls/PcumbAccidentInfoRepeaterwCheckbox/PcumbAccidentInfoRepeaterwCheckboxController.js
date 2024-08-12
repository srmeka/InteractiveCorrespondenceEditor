app.controller('PcumbAccidentInfoRepeaterwCheckboxController', function ($scope, $http, shareData, HomeService, $filter) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense{.LicenseStatusCd === 'Active DL' || .LicenseStatusCd === 'Suspended' || .LicenseStatusCd === 'International' || .LicenseStatusCd === 'Permit'}}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.selectedValue = [];

        $scope.freeTextGroup = [];
           
        $scope.CtrlEnabledCheckbox = [];
        $scope.accidentDate = [];
        $scope.description = [];
        $scope.status = [];
        $scope.amount = [];
        $scope.freeForm = [];
       
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
            $scope.selectedValue[clearId] = undefined;
            $scope.freeTextGroup[clearId] = '';


            $scope.description[clearId] = undefined;
            $scope.status[clearId] = undefined;
            $scope.amount[clearId] = undefined;
            $scope.freeForm[clearId] = undefined;
            $scope.accidentDate[clearId] = undefined;
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
                //$scope.CtrlEnabledCheckbox.pop($scope.TotalCount);
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

    $scope.$on('PcumbAccidentInfoRepeaterwCheckbox', function (event) {
        try {
            var AI_value = 'N';
           
            for (var index in $scope.TotalCount) {

                if ($scope.CtrlEnabledCheckbox[index]) {
                    AI_value = 'Y';
                   
                    var id = shareData.shareOutputXML.getElementsByTagName("DRIVER_DET").length;
                    HomeService.createSecondaryTableXML("DRIVER_DET");

                    var selectedDate = $scope.accidentDate[index];

                    if (selectedDate) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "ACC_DT", selectedDate, id);
                    }

                    var selectedData = $scope.selectedValue[index];
                    if (selectedData || $scope.freeTextGroup[index]) {
                        if (selectedData) {
                            var outputValue = '';
                            if (selectedData.Person.PersonName.FirstGivenNm) {
                                outputValue += selectedData.Person.PersonName.FirstGivenNm + ' ';
                            }

                            if (selectedData.Person.PersonName.SecondGivenNm) {
                                outputValue += selectedData.Person.PersonName.SecondGivenNm + ' ';
                            }

                            if (selectedData.Person.PersonName.FamilyNm) {
                                outputValue += selectedData.Person.PersonName.FamilyNm;
                            }


                            outputValue = outputValue.replace(/undefined/, '');

                            HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_NAME", outputValue.trim(), id);

                        } else {
                            HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_NAME", $scope.freeTextGroup[index].trim(), id);
                        }

                    }

                    if ($scope.description[index]) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "ACC_DESC", "Y", id);
                    }

                    if ($scope.status[index]) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "CLM_STATUS", "Y", id);
                    }

                    if ($scope.amount[index]) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "PYOUT_AMT", "Y", id);
                    }

                    if ($scope.freeForm[index]) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "ACC_FREE_FORM", $scope.freeForm[index].trim(), id);
                    }

                    HomeService.createSecondaryXMLValue("DRIVER_DET", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_INFO_TYPE", "Accident", id);

                }
               
            }
            HomeService.createPrimaryXML('AI_ACC_INFO', AI_value);
            
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
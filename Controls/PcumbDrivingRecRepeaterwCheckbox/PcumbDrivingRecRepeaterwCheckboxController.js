﻿app.controller('PcumbDrivingRecRepeaterwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {
        ///Policy/PolicyPeriod/PolicyLines/UmbrellaLine/HouseholdMembers[Person/VehicalDriverLicense/LicenseStatusCd[text()='Active DL' or text()='Suspended' or text()='International' or text()='Permit']]
        $scope.addressData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense.LicenseStatusCd === 'Active DL' || .LicenseStatusCd === 'Suspended' || .LicenseStatusCd === 'International' || .LicenseStatusCd === 'Permit' }", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.populateData = [{ selectorId: 0, selectedValue: undefined }]

        $scope.freeTextGroup = [];

        $scope.isDriverCheckboxSelected = [];

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

        var calculateId = 0;
        $scope.addSelector = function () {
            calculateId++;
            if (calculateId <= 2) {
                $scope.populateData.push({ selectorId: calculateId, selectedValue: undefined });
                $scope.freeTextGroup.push('');
                if (calculateId === 2) {
                    $scope.showAddBtn = false;
                    $scope.showRemoveBtn = true;
                } else {
                    $scope.showAddBtn = true;
                    $scope.showRemoveBtn = true;
                }
            }
        };

        $scope.removeSelector = function () {
            $scope.isDriverCheckboxSelected[calculateId] = false;
            calculateId--;
            if (calculateId >= 0) {
                $scope.populateData.pop(1);
                $scope.freeTextGroup.pop('');
                if (calculateId === 0) {
                    $scope.showAddBtn = true;
                    $scope.showRemoveBtn = false;
                } else {
                    $scope.showAddBtn = true;
                    $scope.showRemoveBtn = true;
                }
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbDrivingRecRepeaterwCheckbox', function (event) {
        try {
            for (var index in $scope.populateData) {

                if ($scope.isDriverCheckboxSelected[index]) {
                    var id = shareData.shareOutputXML.getElementsByTagName("DRIVER_DET").length;
                    HomeService.createSecondaryTableXML("DRIVER_DET");

                    var selectedData = $scope.populateData[index].selectedValue;
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

                        } else {
                            outputValue = $scope.freeTextGroup[index];
                        }

                        HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_NAME", outputValue, id);

                    }
                  
                    HomeService.createSecondaryXMLValue("DRIVER_DET", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_RECS", "Y", id);
                    if (!$scope.freeTextGroup[index]) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_INFO_TYPE", "Driver", id);
                    }
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
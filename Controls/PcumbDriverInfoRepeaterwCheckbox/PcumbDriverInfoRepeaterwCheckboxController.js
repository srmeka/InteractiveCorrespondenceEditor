app.controller('PcumbDriverInfoRepeaterwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {
        //  Xpath = /Policy/PolicyPeriod/PolicyLines/UmbrellaLine/HouseholdMembers[Person/VehicalDriverLicense/LicenseStatusCd[text()='Active DL' or text()='Suspended' or text()='International' or text()='Permit']]
        $scope.residentInfo = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense.LicenseStatusCd === 'Active DL' || .LicenseStatusCd === 'Suspended' || .LicenseStatusCd === 'International' || .LicenseStatusCd === 'Permit' }", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.populateData = [{ selectorId: 0, selectedValue: undefined }]

        $scope.CtrlEnabledCheckbox = [];

        $scope.freeTextGroup = [];
        $scope.RelationToApplicant = [];
        $scope.LStatus = [];
        $scope.dateOfBirth = [];
        $scope.OIns = [];
        $scope.DLNumAndState = [];
        $scope.YearFirstLicensed = [];
        $scope.ValidDL = [] ;
        $scope.PriorDL = [];
        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

        $scope.clearAllData = function (clearId) {
            $scope.populateData[clearId] = { selectorId: clearId, selectedValue: undefined };
            $scope.RelationToApplicant[clearId] = false;
            $scope.LStatus[clearId] = false;
            $scope.dateOfBirth[clearId] = false;
            $scope.OIns[clearId] = false;
            $scope.DLNumAndState[clearId] = false;
            $scope.YearFirstLicensed[clearId] = false
            $scope.ValidDL[clearId] = false;
            $scope.PriorDL[clearId] = false;
            $scope.freeTextGroup[clearId] = "";

          //  $scope.ResidentReferenceNum[clearId] = undefined;

            if ($scope.populateData.length === 1) {

                $scope.showAddBtn = true;
                $scope.showRemoveBtn = false;
            }

        };

        $scope.$watch('populateData', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if (newValue[index].selectedValue) {
                    $scope.freeTextGroup[index] = undefined;
                }
            }

        }, true);

        //Adding new resident info
        var calculateId = 0;
        $scope.addSelector = function () {
            calculateId++;
            if (calculateId <= 6) {
                $scope.populateData.push({ selectorId: calculateId, selectedValue: undefined });
                $scope.freeTextGroup.push('');
                if (calculateId === 6) {
                    $scope.showAddBtn = false;
                    $scope.showRemoveBtn = true;
                } else {
                    $scope.showAddBtn = true;
                    $scope.showRemoveBtn = true;
                }
            }
        };
        //Removing resident info
        $scope.removeSelector = function () {
            $scope.clearAllData(calculateId);
            $scope.CtrlEnabledCheckbox[calculateId] = false;
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
        };
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbDriverInfoRepeaterwCheckbox', function (event) {
        try {
            var AI_value = 'N';
           
            for (var index in $scope.populateData) {

                if ($scope.CtrlEnabledCheckbox[index]) {
                    AI_value = 'Y';
                   
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
                            if (selectedData.Person.PersonName.FamilyNameGenerationCd) {
                                outputValue += selectedData.Person.PersonName.FamilyNameGenerationCd;
                            }

                        } else {
                            outputValue = $scope.freeTextGroup[index];
                        }

                        HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_NAME", outputValue, id);

                    }
                    if ($scope.RelationToApplicant[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "REL_APPLCNT", "Y", id);
                    }
                    if ($scope.LStatus[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "LIC_STATUS", "Y", id);
                    }
                    if ($scope.OIns[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "OWN_INS", "Y", id);
                    }
                    if ($scope.dateOfBirth[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "DOB", "Y", id);
                    }
                    if ($scope.DLNumAndState[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "DL_NUM_ST", "Y", id);
                    }
                    if ($scope.YearFirstLicensed[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "YR_FRST_LIC", "Y", id);
                    }
                    if ($scope.PriorDL[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "PR_DL", "Y", id);
                    }
                    if ($scope.ValidDL[index] == true) {
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "VAL_DL", "Y", id);
                    }
                    HomeService.createSecondaryXMLValue("DRIVER_DET", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_INFO_TYPE", "Driver", id);
                    id++;
                }
            }
            HomeService.createPrimaryXML('AI_DRVR_INFO', AI_value);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
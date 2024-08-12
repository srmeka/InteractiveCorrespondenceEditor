app.controller('PcpaOtherResidentsInHousewCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.residentInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.populateData = [{ selectorId: 0, selectedValue: undefined }]

        $scope.isResidentSelected = [];

        $scope.freeTextGroup = [];
        $scope.driverName = [];
        $scope.dateOfBirth = [];
        $scope.maritalStatus = [];
        $scope.ResidentReferenceNum = [];
        $scope.insuranceInfo = [];
        $scope.licenseInfo = [];
        $scope.priorLicenseInfo = [];
        $scope.relationToApplicant = [];
        $scope.validLicenseInfo = [];
        $scope.proofOfResidency = [];
        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

        $scope.clearAllData = function (clearId) {
            $scope.populateData[clearId] = { selectorId: clearId, selectedValue: undefined };

            $scope.freeTextGroup[clearId] = undefined;

            $scope.ResidentReferenceNum[clearId] = undefined;
            $scope.driverName[clearId] = false;
            $scope.dateOfBirth[clearId] = false;
            $scope.maritalStatus[clearId] = false;
            $scope.insuranceInfo[clearId] = false;
            $scope.licenseInfo[clearId] = false;
            $scope.priorLicenseInfo[clearId] = false;
            $scope.relationToApplicant[clearId] = false;
            $scope.validLicenseInfo[clearId] = false;
            $scope.proofOfResidency[clearId] = false;

            if ($scope.populateData.length === 1) {

                $scope.showAddBtn = true;
                $scope.showRemoveBtn = false;
            }

        }

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
            if (calculateId <= 14) {
                $scope.populateData.push({ selectorId: calculateId, selectedValue: undefined });
                $scope.freeTextGroup.push('');
                if (calculateId === 14) {
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
            $scope.isResidentSelected[calculateId] = false;
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

    $scope.$on('PcpaOtherResidentsInHousewCheckbox', function (event) {
        try {
            for (var index in $scope.populateData) {

                if ($scope.isResidentSelected[index]) {
                    var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");

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
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", outputValue.trim(), id);
                    }
                    if ($scope.driverName[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_DRVR_NAME_IND", "Y", id);
                    }
                    if ($scope.dateOfBirth[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_DOB_IND", "Y", id);
                    }
                    if ($scope.maritalStatus[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_MARITAL_IND", "Y", id);
                    }
                    if ($scope.relationToApplicant[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_REL_IND", "Y", id);
                    }
                    if ($scope.insuranceInfo[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_INS_IND", "Y", id);
                    }
                    if ($scope.licenseInfo[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_LIC_IND", "Y", id);
                    }
                    if ($scope.validLicenseInfo[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_VLD_LIC_IND", "Y", id);
                    }
                    if ($scope.priorLicenseInfo[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_PRIOR_LIC_IND", "Y", id);
                    }
                  
                    if ($scope.proofOfResidency[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_NOT_LEGAL_IND", "Y", id);
                    }
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "OTH_RES_IND", "Y", id);
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
app.controller('PcpaAdditionalDriverInfoController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.residentInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.populateData = [{ selectorId: 0, selectedValue: undefined }]

        $scope.isResidentSelected = [];

        $scope.freeTextGroup = [];
        $scope.driverName = [];
        $scope.driverGender = [];
        $scope.dateOfBirth = [];
        $scope.licenseNumber = [];
        $scope.licenseState = [];
        $scope.dateFirstLicensed = [];
        $scope.CurrInsCompNm = [];
        $scope.CurrInsCompPolNum = [];
        $scope.CurrInsExpirDate = [];
        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

        $scope.clearAllData = function (clearId) {
            $scope.populateData[clearId] = { selectorId: clearId, selectedValue: undefined };
            $scope.freeTextGroup[clearId] = undefined;
            $scope.driverName[clearId] = false;
            $scope.driverGender[clearId] = false;
            $scope.dateOfBirth[clearId] = false;
            $scope.licenseNumber[clearId] = false;
            $scope.licenseState[clearId] = false;
            $scope.dateFirstLicensed[clearId] = false;
            $scope.CurrInsCompNm[clearId] = false;
            $scope.CurrInsCompPolNum[clearId] = false;
            $scope.CurrInsExpirDate[clearId] = false;

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

    $scope.$on('PcpaAdditionalDriverInfo', function (event) {
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
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME_IND", "Y", id);
                    }
                    if ($scope.driverGender[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_GNDR_IND", "Y", id);
                    }
                    if ($scope.dateOfBirth[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_DOB_IND", "Y", id);
                    }
                    if ($scope.licenseNumber[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_LIC_IND", "Y", id);
                    }
                    if ($scope.licenseState[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_LIC_ST_IND", "Y", id);
                    }
                    if ($scope.dateFirstLicensed[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_DT_LIC_IND", "Y", id);
                    }
                    if ($scope.CurrInsCompNm[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "CURR_INS_CO_IND", "Y", id);
                    }
                    if ($scope.CurrInsCompPolNum[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "CURR_INS_POL_NUM_IND", "Y", id);
                    }
                    if ($scope.CurrInsExpirDate[index] == true) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "CURR_INS_EXP_DT_IND", "Y", id);
                    }
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
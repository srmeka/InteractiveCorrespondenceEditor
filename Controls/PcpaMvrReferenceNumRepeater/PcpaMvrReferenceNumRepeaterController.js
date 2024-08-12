app.controller('PcpaMvrReferenceNumRepeaterController', function ($scope, $http, shareData, HomeService, $rootScope) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.SelectedMVR = [];

        $scope.freeTextGroup = [];
        $scope.selectedValue = [];

        $scope.mvrReferenceNum = [];
        if ($scope.SelectedDocument.documentFriendlyName == "CT Notice of Nonrenewal") {
            $scope.showControl = false;
        }
        else {
            $scope.showControl = true;
        }

        $scope.clearAllData = function (clearId) {
            $scope.freeTextGroup[clearId] = undefined;
            $scope.selectedValue[clearId] = undefined;
            $scope.mvrReferenceNum[clearId] = undefined;
        }

        $scope.$watch('selectedValue', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if ($scope.selectedValue[index]) {
                    $scope.freeTextGroup[index] = undefined;
                }
            }

        }, true);

        $rootScope.$on('ShowHideMVR', function (event, data) {
            if (data.hiddenStatus) {
                $scope.showControl = false;
            } else {
                $scope.showControl = true;
            }
        })

        $scope.MaxCtls = 16;
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
                $scope.SelectedMVR[newItemNo] = false;
                $scope.clearAllData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaMvrReferenceNumRepeater', function (event) {
        try {
            for (var index in $scope.TotalCount) {
                if ($scope.showControl == false) {
                    continue;
                }
                else {
                    if ($scope.SelectedMVR[index]) {
                        var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");

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

                            outputValue = outputValue.replace(/undefined/, '');

                            HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", outputValue.trim(), id);


                        }

                        if ($scope.mvrReferenceNum[index]) {
                            HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "MVR_REF_NUM1", $scope.mvrReferenceNum[index], id);
                        }
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);
                        id++;
                    }
                }
            }

            var checkedValue = "N"

            if ($scope.SelectedMVR[index]) {
                if (Array.isArray($scope.SelectedMVR)) {
                    for (var i = 0; i < $scope.SelectedMVR[i]; i++) {
                        if ($scope.SelectedMVR[i]) {
                            checkedValue = "Y";
                        }
                    }
                }
            }

            var RefInd = shareData.shareOutputXML.getElementsByTagName("MVR_CLUE_REF_INDICATOR")[0];

            if (checkedValue == "Y") {

                if (RefInd) {
                    if (RefInd.text != "Y") {

                        var root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("MVR_CLUE_REF_INDICATOR");
                        root.removeChild(elementToRemove);
                    }
                } else {
                    HomeService.createPrimaryXML("MVR_CLUE_REF_INDICATOR", "Y");
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
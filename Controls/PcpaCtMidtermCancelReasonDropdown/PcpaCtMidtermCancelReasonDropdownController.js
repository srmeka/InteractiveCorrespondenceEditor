app.controller('PcpaCtMidtermCancelReasonDropdownController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.selectedDriverName;

        $scope.SelectedDriver = false;

        $scope.driverNameText;

        $scope.$watch('selectedDriverName', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            
                if (newValue) {
                    $scope.driverNameText = undefined;
                }
        }, true);

        $scope.clearAllData = function () {
            $scope.selectedDriverName = undefined;
            $scope.driverNameText = undefined;
            $scope.SelectedDate = undefined;
        }

        $scope.DateOutputFormat = "yyyy-mm-dd";
        $scope.LabelName = "License/MVR Suspended Date";
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaCtMidtermCancelReasonDropdown', function (event) {
        try {
           
                if ($scope.SelectedDriver) {
                    var selectedData = $scope.selectedDriverName;
                    if (selectedData || $scope.driverNameText) {
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
                            outputValue = $scope.driverNameText;
                        }

                        outputValue = outputValue.replace(/undefined/, '');
                        var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", outputValue.trim(), id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "LICENSE_REGISTRATION_SUSPENSION_INDICATOR", "Y", id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "LIC_MVR_SUSPEND_DT", $scope.SelectedDate, id);
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
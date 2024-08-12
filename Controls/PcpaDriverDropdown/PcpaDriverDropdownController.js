app.controller('PcpaDriverDropdownController', function ($scope, $http, shareData, HomeService) {
    try {

  
        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.$watch('selectedDriver', function (value) {
            if (value) {
                $scope.freeText = undefined;
            }
        });
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaDriverDropdown', function (event) {
        try {
            if ($scope.selectedDriver || $scope.freeText) {
                var outputValue;
                if ($scope.selectedDriver) {
                   
                    if ($scope.selectedDriver.Person.PersonName.FirstGivenNm) {
                        outputValue = $scope.selectedDriver.Person.PersonName.FirstGivenNm + ' ';
                    }
                    if ($scope.selectedDriver.Person.PersonName.SecendGivenNmInitial) {
                        outputValue += $scope.selectedDriver.Person.PersonName.SecendGivenNmInitial + ' ';
                    }
                    if ($scope.selectedDriver.Person.PersonName.FamilyNm) {
                        outputValue += $scope.selectedDriver.Person.PersonName.FamilyNm + ' ';
                    }
                    if ($scope.selectedDriver.Person.PersonName.FamilyNameGenerationCd) {
                        outputValue += $scope.selectedDriver.Person.PersonName.FamilyNameGenerationCd;
                    }
                   
                } else {
                    outputValue = $scope.freeText;
                }

              
                var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", outputValue.trim(), id);
                HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);

            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
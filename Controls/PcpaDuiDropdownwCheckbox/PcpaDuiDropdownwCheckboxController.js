app.controller('PcpaDuiDropdownwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.Influence = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.selectedInfluenceData = undefined;
            $scope.freeText = undefined;
        }

        $scope.$watch('selectedInfluenceData', function (value) {
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
    $scope.$on('PcpaDuiDropdownwCheckbox', function (event) {
        try {
            if ($scope.selectedInfluenceData || $scope.freeText) {

                if ($scope.selectedInfluenceData) {

                    if ($scope.selectedInfluenceData.Person.PersonName.FirstGivenNm) {
                        outputValue = $scope.selectedInfluenceData.Person.PersonName.FirstGivenNm + ' ';
                    }
                    if ($scope.selectedInfluenceData.Person.PersonName.SecendGivenNmInitial) {
                        outputValue += $scope.selectedInfluenceData.Person.PersonName.SecendGivenNmInitial + ' ';
                    }
                    if ($scope.selectedInfluenceData.Person.PersonName.FamilyNm) {
                        outputValue += $scope.selectedInfluenceData.Person.PersonName.FamilyNm + ' ';
                    }
                    if ($scope.selectedInfluenceData.Person.PersonName.FamilyNameGenerationCd) {
                        outputValue += $scope.selectedInfluenceData.Person.PersonName.FamilyNameGenerationCd;
                    }

                } else {
                    outputValue = $scope.freeText;
                }

                if ($scope.SelectedInfluence) {
                    HomeService.createPrimaryXML("DUI_IND", "Y");
                };

                outputValue = outputValue.replace(/undefined/, '');

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
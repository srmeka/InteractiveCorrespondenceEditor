app.controller('PcpaReconsiderationDropdownwControlsController', function ($scope, $http, $filter, shareData, HomeService) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.reconsiderationData = [
            { optionValue: 'Driving Record', output: 'Driving Record' },
            { optionValue: 'Requested Info', output: 'Requested Info' },
            { optionValue: 'Prior Balance', output: 'Prior Balance' },
        ];

        $scope.claimDate = [];
        $scope.claimNumber = [];
        $scope.claimDescription = [];


        $scope.clearAllData = function () {
            $scope.selectedValue = undefined;
            $scope.selectedDriver = undefined;
            $scope.freeTextName = undefined;
            $scope.policyNumber = undefined;
            $scope.piiorBalance = undefined;
        }

        $scope.$watch('selectedValue', function (newValue, oldValue) {
            if (newValue == oldValue) return;

            $scope.selectedDriver = undefined;
            $scope.freeTextName = undefined;
            $scope.policyNumber = undefined;
            $scope.piiorBalance = undefined;
        }, true);

        $scope.$watch('selectedDriver', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            $scope.freeTextName = undefined;
        });


    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaReconsiderationDropdownwControls', function (event) {
        try {
            if($scope.selectedValue){
                HomeService.createPrimaryXML("RECONSIDER_IND", $scope.selectedValue.output);

                if ($scope.policyNumber) {
                    HomeService.createPrimaryXML("PRIOR_POL_NO", $scope.policyNumber);
                }

                if ($scope.piiorBalance) {
                    HomeService.createPrimaryXML("PRIOR_BAL", $scope.piiorBalance);
                }
              

                if ($scope.selectedValue.output !== 'Requested Info') {

                    if($scope.selectedDriver) {
                        var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");

                        var partnerName;
                        if ($scope.selectedDriver.Person.PersonName.FirstGivenNm) {
                            partnerName = $scope.selectedDriver.Person.PersonName.FirstGivenNm + ' ';
                        }
                        if ($scope.selectedDriver.Person.SecondGivenNameInitial) {
                            partnerName += $scope.selectedDriver.Person.SecondGivenNameInitial + ' ';
                        }
                        if ($scope.selectedDriver.Person.PersonName.FamilyNm) {
                            partnerName += $scope.selectedDriver.Person.PersonName.FamilyNm;
                        }
                        if ($scope.selectedDriver.Person.PersonName.FamilyNameGenerationCd) {
                            partnerName += $scope.selectedDriver.Person.PersonName.FamilyNameGenerationCd;
                        }

                        partnerName = partnerName.replace(/undefined/g, '');

                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", partnerName.trim(), id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id)
                    }
                   
                    if ($scope.freeTextName) {
                        var table_id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", $scope.freeTextName.trim(), table_id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", table_id)
                    }


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

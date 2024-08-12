app.controller('WccProviderNameDropdownController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.Required = false;
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Medical Personnel'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        if ($scope.SelectedDocument.documentFriendlyName === 'Perm Eval to Ins Short Form') {
            $scope.Required = true;
        }

        if ($scope.SelectedDocument.documentFriendlyName === 'Psych Authorization Tx') {
            $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Medical Personnel' || .Role == 'Assistant Surgeon' || .Role == 'Co-Surgeon' || .Role == 'Occupational Therapist' || .Role == 'Physical Therapist' || .Role == 'Surgeon' || .Role == 'Doctor' || .Role == 'Other' || .Role == 'Hospital' || .Role == 'Medical Practice' || .Role == 'Occupational Therapy Facility' || .Role == 'Physical Therapy Facility'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }

        $scope.ClaimantNameData = [];

        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }
                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.ClaimantNameData = getData($scope.ClaimantNameJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccProviderNameDropdown', function (event) {
        try {
            var outputName = '';

            if ($scope.selectedName) {
                outputName = $scope.selectedName.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ').trim();
                }
            }
            HomeService.createPrimaryXML("PROVIDER_NAME", outputName);
            HomeService.createPrimaryXML("PROVIDER", outputName);

            if ($scope.SelectedDocument.documentFriendlyName === 'Psych Authorization Tx') {

                var provider_phn = '';

                if ($scope.selectedName && $scope.selectedName.PhoneNumbers && $scope.selectedName.PhoneNumbers.PhoneNumber) {

                    var phoneData = $scope.selectedName.PhoneNumbers.PhoneNumber;

                    if (Array.isArray(phoneData)) {
                        for (var i = 0; i < phoneData.length; i++) {
                            if (phoneData[i].Type == 'Number'
                                  && phoneData[i].IsPrimary) {
                                provider_phn = '(' + phoneData[i].AreaCode + ') ' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                            }
                        }
                    } else {
                        if (phoneData.Type == 'Number'
                                  && phoneData.IsPrimary) {
                            provider_phn = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                        }
                    }

                }

                HomeService.createPrimaryXML("PROVIDER_PHN_NUM", provider_phn);
                HomeService.createPrimaryXML("PROVIDER_FAX_NO", "");
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


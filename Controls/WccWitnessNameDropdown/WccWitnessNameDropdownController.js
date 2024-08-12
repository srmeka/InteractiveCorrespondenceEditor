app.controller('WccWitnessNameDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
       
        $scope.claimJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Witness'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {
                 item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                 item.displayName = item.displayName.replace(/undefined/g, '')
               
                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.ClaimantNameData = getData($scope.claimJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccWitnessNameDropdown', function (event) {
        try {
            var outputName = '', witness_phn = '';

            if ($scope.selectedWitnessName) {
                outputName = $scope.selectedWitnessName.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '');
                }

                if ($scope.selectedWitnessName.PhoneNumbers.PhoneNumber) {
                    var phoneData = $scope.selectedWitnessName.PhoneNumbers.PhoneNumber;
                    if (Array.isArray(phoneData)) {
                        for (var i = 0; i < phoneData.length; i++) {
                            if (phoneData[i].IsPrimary === 'true') {
                                witness_phn = '(' + phoneData[i].AreaCode + ')' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                            }

                        }
                    } else {
                        if (phoneData.IsPrimary === 'true') {
                            witness_phn = '(' + phoneData.AreaCode + ')' + phoneData.Exchange + '-' + phoneData.Number;
                        }
                    }
                    
                }

            }

            HomeService.createPrimaryXML("WITNESS_NAME", outputName.trim());
            HomeService.createPrimaryXML("WITNESS_PHN", witness_phn.trim());

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


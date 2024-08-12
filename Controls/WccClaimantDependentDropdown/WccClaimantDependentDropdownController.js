app.controller('WccClaimantDependentDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
       
        $scope.claimJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant Dependent'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    //item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = (item.FirstName ? item.FirstName : '') + ' ' + (item.MiddleInitial ? item.MiddleInitial : '') + ' '
                                     + (item.LastName ? item.LastName : '') + ' ' + (item.Suffix ? item.Suffix : '');
                    item.displayName = item.displayName.replace(/'undefined '/g, '').replace('  ', ' ');
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }
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
    $scope.$on('WccClaimantDependentDropdown', function (event) {
        try {
            var outputName = '';

            if ($scope.selectedClaimantDependent) {
                outputName = $scope.selectedClaimantDependent.displayName.replace('  ', ' ');
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '');
                }

            }

            HomeService.createPrimaryXML("CLMT_DEPENDENT_SYS", outputName.trim());

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


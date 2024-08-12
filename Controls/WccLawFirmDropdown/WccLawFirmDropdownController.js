app.controller('WccLawFirmDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Petitioners Law Firm'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.LastName;
                    item.displayName = item.displayName.replace(/undefined/g, '').trim();
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
    $scope.$on('WccLawFirmDropdown', function (event) {
        try {
            
            var outputName = '';

            if ($scope.selectedName) {
                outputName = $scope.selectedName.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '').trim();
                }

            }

            if (shareData.shareOutputXML.getElementsByTagName("LAW_FIRM")[0]) {
                root = shareData.shareOutputXML.getElementsByTagName("WCC_CLAIM_REC")[0];
                var elementToRemove = shareData.shareOutputXML.getElementsByTagName("LAW_FIRM")[0];
                root.removeChild(elementToRemove);
                HomeService.createPrimaryXML("LAW_FIRM", outputName);
            }
            else {
                HomeService.createPrimaryXML("LAW_FIRM", outputName);
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


app.controller('GcSubroPartyDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.SubroPartyJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role!='User' && .Role!='OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.SubroPartyData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '')
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }
                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.SubroPartyData = getData($scope.SubroPartyJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcSubroPartyDropdown', function (event) {
        try {
            var outputName = '';

            if ($scope.selectedName) {
                outputName = $scope.selectedName.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '');
                }

            }
            HomeService.createPrimaryXML("ADVERSE_SUBRO_PTY", outputName.trim());
           
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


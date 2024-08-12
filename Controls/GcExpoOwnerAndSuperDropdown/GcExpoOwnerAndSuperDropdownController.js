app.controller('GcExpoOwnerAndSuperDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ExposureOwnJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.ExposureSupJsonData = angular.copy($scope.ExposureOwnJsonData);
      
        $scope.ExposureOwnData = [];
        $scope.ExposureSupData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.LastName;
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
            $scope.ExposureOwnData = getData($scope.ExposureOwnJsonData);
            $scope.ExposureSupData = getData($scope.ExposureSupJsonData);
        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcExpoOwnerAndSuperDropdown', function (event) {
        try {

            var outputName = '';
            if ($scope.selectedNameOwn) {
                outputName = $scope.selectedNameOwn.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '');
                }
            }
            HomeService.createPrimaryXML("EXPOSURE_OWNER", outputName.trim());

            outputName = '';
            if ($scope.selectedNameSup) {
                outputName = $scope.selectedNameSup.displayName;
                if(outputName){
                    outputName =  outputName.replace(/undefined/g,'');
                }
            }
            HomeService.createPrimaryXML("EXPOSURE_OWNER_SUPV", outputName.trim());
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


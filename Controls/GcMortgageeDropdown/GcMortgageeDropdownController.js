app.controller('GcMortgageeDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.mortgageeJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role != 'OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.mortgageeData = [];

    
        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleName + ' ' + item.LastName + ' ' + item.Suffix;
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
            $scope.mortgageeData = getData($scope.mortgageeJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcMortgageeDropdown', function (event) {
        try {
            var outputName = '';
          
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
             
                if(outputName){
                    outputName =  outputName.replace(/undefined/g,'');
                }

            }

            HomeService.createPrimaryXML("MORTGAGEE", outputName.trim());
           
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


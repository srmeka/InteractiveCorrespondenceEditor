app.controller('GcSupervisorNmDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                    item.displayName = item.FirstName + ' ' + item.LastName ;
                    item.displayName = item.displayName.replace(/undefined/g, '')
               
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
    $scope.$on('GcSupervisorNmDropdown', function (event) {
        try {
            var outputName = '';
           
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName =  outputName.replace(/undefined/g,'');
                }

            }
            HomeService.createPrimaryXML("SUPERVISOR_NM", outputName.trim());
         
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


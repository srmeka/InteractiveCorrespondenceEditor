app.controller('GcClaimantOneTwoAndThreeController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ',' ');
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
    $scope.$on('GcClaimantOneTwoAndThree', function (event) {
        try {
            var outputName1 = '', outputName2 = '', outputName3 = '';
           
            if( $scope.selectedName1){
                outputName1 = $scope.selectedName1.displayName;
                if(outputName1){
                    outputName1 = outputName1.replace(/undefined/g, '').replace('  ', ' ');
                }
            }

            if ($scope.selectedName2) {
               outputName2 = $scope.selectedName2.displayName;
                if (outputName2) {
                    outputName2 = outputName2.replace(/undefined/g, '').replace('  ', ' ');
                }
            }

            if ($scope.selectedName3) {
                outputName3 = $scope.selectedName3.displayName;
                if (outputName3) {
                    outputName3 = outputName3.replace(/undefined/g, '').replace('  ', ' ');
                }
            }
            HomeService.createPrimaryXML("CLMT_NAME_1", outputName1.trim());
            HomeService.createPrimaryXML("CLMT_NAME_2", outputName2.trim());
            HomeService.createPrimaryXML("CLMT_NAME_3", outputName3.trim());
         
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


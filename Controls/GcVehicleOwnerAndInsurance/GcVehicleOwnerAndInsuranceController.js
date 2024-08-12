app.controller('GcVehicleOwnerAndInsuranceController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant' && .Role != 'User' && .Role!='OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.InsuranceNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role !='OrganizationContact' }", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.ClaimantNameData = [];
        $scope.InsuranceNameData = [];


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
            $scope.InsuranceNameData = getData($scope.InsuranceNameJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcVehicleOwnerAndInsurance', function (event) {
        try {
            var outputName = '', outputInsuranceName = '';
           
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }

            }
            if ($scope.selectedInsurer) {
                outputInsuranceName = $scope.selectedInsurer.displayName;
                if (outputInsuranceName) {
                    outputInsuranceName = outputInsuranceName.replace(/undefined/g, '').replace('  ', ' ');
                }

            }
            HomeService.createPrimaryXML("VEH_OWN_NM", outputName.trim());
            HomeService.createPrimaryXML("VEH_OWN_INS", outputInsuranceName.trim());
         
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


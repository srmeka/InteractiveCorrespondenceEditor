app.controller('GcClaimantNmContactsOneDropdownController', function ($scope, $http, shareData, HomeService) {
    try {

        //two letters use a slightly different jpath for the source data
        var jpath = ".Claim.InvolvedParties.Party{.Role != 'User' && .Role != 'OrganizationContact'}";
        if (["Ltr of Guarantee","Payoff LOG Request Ltr"].indexOf($scope.SelectedDocument.documentFriendlyName) > -1){
            jpath = ".Claim.InvolvedParties.Party{.Role != 'User'}";
        }
        $scope.ClaimantNameOneJsonData = JSPath.apply(jpath, shareData.shareJSONClaim.CorrespondenceDataResponse);

        //two letters have this control as required, the rest are not
        $scope.required = false;
        if (["HO Pub Adj Rep Ltr", "HO Tort Settlement Agreement Ltr"].indexOf($scope.SelectedDocument.documentFriendlyName) > -1) {
            $scope.required = true;
        }

        $scope.ClaimantNameOneData = []
        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleName + ' ' + item.LastName + ' ' + item.Suffix;
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
            $scope.ClaimantNameOneData = getData($scope.ClaimantNameOneJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcClaimantNmContactsOneDropdown', function (event) {
        try {
            var outputName = '';
           
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName = outputName.replace(/undefined/, '').replace('  ', ' ');
                }

               
            }

            HomeService.createPrimaryXML("CLMT_NAME_CONTACT", outputName.trim());
           
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


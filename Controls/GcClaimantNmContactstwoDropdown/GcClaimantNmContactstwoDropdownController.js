app.controller('GcClaimantNmContactstwoDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimantNameOneJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role != 'OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
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
        if ($scope.SelectedDocument.documentFriendlyName == 'Limited Power of Attorney') {
            $scope.contactLabel = "Company Name (Contact If Needed):"
            $scope.contactTopLabel = "Company Name (Contact If Needed)"
        }
        else if ($scope.SelectedDocument.documentFriendlyName == 'Appeal Denial Ltr' || $scope.SelectedDocument.documentFriendlyName == 'NY Provider Coverage Ltr' || $scope.SelectedDocument.documentFriendlyName == 'ODS Explain Ltr') {
            $scope.contactLabel = "Claimant Name (System):"
            $scope.contactTopLabel = "Claimant Name (System)" //MSA Batch 58
        }
        else {
            $scope.contactLabel = "Claimant Name (Contacts Two):"
            $scope.contactTopLabel = "Claimant Name (Contacts Two)"
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
    $scope.$on('GcClaimantNmContactsTwoDropdown', function (event) {
        try {
            var outputName = '';
           
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName = outputName.replace(/undefined/, '').replace('  ', ' ');
                }

               
            }
            if ($scope.SelectedDocument.documentFriendlyName == "Limited Power of Attorney")
                HomeService.createPrimaryXML("COMPANY_NAME_CONTACT_IF_NEEDED", outputName.trim());
            else if ($scope.SelectedDocument.documentFriendlyName == 'Appeal Denial Ltr' || $scope.SelectedDocument.documentFriendlyName == 'NY Provider Coverage Ltr' || $scope.SelectedDocument.documentFriendlyName == 'ODS Explain Ltr')
                HomeService.createPrimaryXML("CLMT_NAME", outputName.trim());
            else
                HomeService.createPrimaryXML("CLMT_NAME_CONTACT_2", outputName.trim());
           
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


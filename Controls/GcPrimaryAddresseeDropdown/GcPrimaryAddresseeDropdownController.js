app.controller('GcPrimaryAddresseeDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.PrimaryJsonAddress = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role != 'OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
       

        $scope.PrimaryAddress = [];
       
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
            $scope.PrimaryAddress = getData($scope.PrimaryJsonAddress);
           
        };
      
        inintPage();

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcPrimaryAddresseeDropdown', function (event) {
        try {
            var pri_addressee_name = '';

            if ($scope.selectedAddressee) {
                pri_addressee_name = $scope.selectedAddressee.displayName;
                pri_addressee_name = pri_addressee_name.replace(/undefined/g, '').replace('  ', ' ');
            }
          
            HomeService.createPrimaryXML("PRI_ADDRESSEE_NAME", pri_addressee_name.trim());

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


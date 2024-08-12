app.controller('GcParentsAndMinorNamesController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role !='OrganizationContact' }", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.ClaimantNameData = [];
       


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
          
        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcParentsAndMinorNames', function (event) {
        try {
            var outputName1 = '', outputName2 = '', minor = '',
                minor_addr = '', minor_addr_2 = '', minor_city = '',
                minor_st = '', minor_zip = '';
           
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
            if ($scope.selectedMinor) {
                minor = $scope.selectedMinor.displayName;
                if (minor) {
                    minor = minor.replace(/undefined/g, '').replace('  ', ' ');
                }
                if ($scope.selectedMinor.Addresses) {
                    var addressObj = $scope.selectedMinor.Addresses.Address;
                    if (addressObj.StreetAddress1) {
                        minor_addr = addressObj.StreetAddress1;
                    }
                    if (addressObj.StreetAddress2) {
                        minor_addr_2 = addressObj.StreetAddress2;
                    }
                    if (addressObj.City) {
                        minor_city = addressObj.City;
                    }
                    if (addressObj.State) {
                        minor_st = addressObj.State;
                    }
                    if (addressObj.ZipCode) {
                        minor_zip = addressObj.ZipCode;
                    }
                }
            }

            HomeService.createPrimaryXML("PARENT_NM", outputName1.trim());
            HomeService.createPrimaryXML("PARENT_NM_2", outputName2.trim());
            HomeService.createPrimaryXML("MINOR_NM", minor.trim());
            HomeService.createPrimaryXML("MINOR_ADDR", minor_addr);
            HomeService.createPrimaryXML("MINOR_ADDR_2", minor_addr_2);
            HomeService.createPrimaryXML("MINOR_ADDR_CTY", minor_city);
            HomeService.createPrimaryXML("MINOR_ADDR_ST", minor_st);
            HomeService.createPrimaryXML("MINOR_ADDR_ZIP", minor_zip);
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


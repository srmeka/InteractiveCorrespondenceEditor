app.controller('GcNjmHiredNmDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.hiredNameOneJsonData = JSPath.apply(".Claim.InvolvedParties.Party", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
        $scope.hiredNameOneData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' '  + item.LastName;
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
            $scope.hiredNameOneData = getData($scope.hiredNameOneJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcNjmHiredNmDropdown', function (event) {
        try {
            var outputName = '', email_value = '', code_value = '';
           
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName =  outputName.replace(/undefined/g,'');
                }

                if ($scope.selectedName.EmailAddresses && $scope.selectedName.EmailAddresses.EmailAddress && $scope.selectedName.EmailAddresses.EmailAddress.EmailAddressValue) {
                    email_value = $scope.selectedName.EmailAddresses.EmailAddress.EmailAddressValue;
                }

                if ($scope.selectedName.PhoneNumbers) {
                    if ($scope.selectedName.PhoneNumbers.PhoneNumber) {
                        var phoneData;
                        if (Array.isArray($scope.selectedName.PhoneNumbers.PhoneNumber)) {
                            $scope.selectedName.PhoneNumbers.PhoneNumber.forEach(function (item) {
                                if (item.Category == 'Business' && item.Type == 'Number') {
                                    phoneData = item;
                                }
                            });
                        } else {
                            phoneData = $scope.selectedName.PhoneNumbers.PhoneNumber;
                        }

                        if (phoneData) {
                            code_value = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                        }
                    }
                }
               
            }
            HomeService.createPrimaryXML("NJM_HIRED_IA_NAME", outputName.trim());
            HomeService.createPrimaryXML("NJM_HIRED_IA_EMAIL", email_value);
            HomeService.createPrimaryXML("NJM_HIRED_IA_PHONE", code_value);
           
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


app.controller('WccClmtAttnyNameAndAddressController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Petitioners Attorney' || .Role == 'Petitioners Law Firm'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.ClaimantData = [];
        $scope.ShowAddress = true;

        if ($scope.SelectedDocument.documentFriendlyName == 'Perm Eval to Ins Long Form') {
            $scope.ShowAddress = false;
        }

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
            $scope.ClaimantData = getData($scope.ClaimantJsonData);
          
        };

        inintPage();

        $scope.addressData = [];
 
        $scope.selectedName = function () {
            $scope.addressData = [];
            if (Array.isArray($scope.nameSelector.Addresses.Address)) {
                $scope.addressData = $scope.nameSelector.Addresses.Address
            } else {
                $scope.addressData.push($scope.nameSelector.Addresses.Address);
            }
            $scope.addressSelector = $scope.addressData[0]
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WccClmtAttnyNameAndAddress', function (event) {
        try {
            var addr_name = '', addr_addr1 = '',
                city = '', st = '', zip = '';

            var phone = '';

            if($scope.nameSelector){
                var nameObj = $scope.nameSelector.displayName;
                addr_name = nameObj.replace(/undefined/g, '').replace('  ', ' ');
                       
            }
               
            if ($scope.nameSelector && $scope.nameSelector.PhoneNumbers && $scope.nameSelector.PhoneNumbers.PhoneNumber.IsPrimary) {
                phone = "(" + $scope.nameSelector.PhoneNumbers.PhoneNumber.AreaCode + ") " + $scope.nameSelector.PhoneNumbers.PhoneNumber.Exchange + "-" + $scope.nameSelector.PhoneNumbers.PhoneNumber.Number;
            }
               

            if($scope.addressSelector){
                var addressObj = $scope.addressSelector;
                if (addressObj.StreetAddress1) {                           
                    addr_addr1 = addressObj.StreetAddress1;
                }
                if (addressObj.City) {
                    city = addressObj.City;
                }
                if (addressObj.State) {
                    st = addressObj.State;
                }
                if (addressObj.ZipCode) {
                    zip = addressObj.ZipCode;
                }                     
            }
               
            HomeService.createPrimaryXML("CLMT_ATTORNEY_NAME", addr_name.trim());

            if ($scope.SelectedDocument.documentFriendlyName != 'Perm Eval to Ins Long Form') {
                HomeService.createPrimaryXML("CLMT_ATTORNEY_ST_ADDR", addr_addr1);
                HomeService.createPrimaryXML("CLMT_ATTORNEY_CTY", city);
                HomeService.createPrimaryXML("CLMT_ATTORNEY_ST", st);
                HomeService.createPrimaryXML("CLMT_ATTORNEY_ZIP", zip);
                if (phone) {
                    HomeService.createPrimaryXML("CLMT_ATTORNEY_PHN", phone);
                }
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
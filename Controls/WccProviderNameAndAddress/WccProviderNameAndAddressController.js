app.controller('WccProviderNameAndAddressController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Medical Personnel' || .Role == 'Assistant Surgeon' || .Role == 'Co-Surgeon' || .Role == 'Occupational Therapist' || .Role == 'Physical Therapist' || .Role == 'Surgeon' || .Role == 'Doctor' || .Role == 'Other' || .Role == 'Hospital' || .Role == 'Medical Practice' || .Role == 'Occupational Therapy Facility' || .Role == 'Physical Therapy Facility'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
        $scope.ClaimantData = [];
      
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

    $scope.$on('WccProviderNameAndAddress', function (event) {
        try {
               var addr_name = '', addr_addr1 = '', addr_addr2 = '', addr_addr3 = '',
                   city = '',st = '',zip = '', phone = '';                 

               if($scope.nameSelector){
                    var nameObj = $scope.nameSelector.displayName;
                    addr_name = nameObj.replace(/undefined/g, '').replace('  ', ' ');
                       
                }

                if($scope.addressSelector){
                    var addressObj = $scope.addressSelector;
                    if (addressObj.StreetAddress1) {                           
                        addr_addr1 = addressObj.StreetAddress1;
                    }
                    if (addressObj.StreetAddress2) {
                        addr_addr2 = addressObj.StreetAddress2;
                    }
                    if (addressObj.StreetAddress3) {
                        addr_addr3 = addressObj.StreetAddress3;
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

                    if ($scope.nameSelector.PhoneNumbers && $scope.nameSelector.PhoneNumbers.PhoneNumber) {
                        var phoneData = $scope.nameSelector.PhoneNumbers.PhoneNumber;

                        if (Array.isArray(phoneData)) {
                            phoneData.some(function (item) {
                                if (item.IsPrimary == 'true') {
                                    phone = '(' + item.AreaCode + ')' + item.Exchange + '-' + item.Number;
                                }
                            });
                        } else {
                            if (phoneData.IsPrimary == 'true') {
                                phone = '(' + phoneData.AreaCode + ')' + phoneData.Exchange + '-' + phoneData.Number;
                            }
                        }
                    }
                }
               
                HomeService.createPrimaryXML("PROVIDER", addr_name.trim());
                HomeService.createPrimaryXML("PROV_ST_ADDR1", addr_addr1);
                HomeService.createPrimaryXML("PROV_ST_ADDR2", addr_addr2);
                HomeService.createPrimaryXML("PROV_ST_ADDR3", addr_addr3);
                HomeService.createPrimaryXML("PROV_CTY", city);
                HomeService.createPrimaryXML("PROV_ST", st);
                HomeService.createPrimaryXML("PROV_ZIP", zip);
                HomeService.createPrimaryXML("PROVIDER_PHN_NUM", phone);
                         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
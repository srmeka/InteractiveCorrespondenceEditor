app.controller('WccHospitalNmAndAddressController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Hospital'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
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

    $scope.$on('WccHospitalNmAndAddress', function (event) {
        try {
               var addr_name = '', addr_addr1 = '', addr_addr2 = '', addr_addr3 = '',
                   city = '',st = '',zip = '', contry = '';                 

               if($scope.nameSelector){
                    var nameObj = $scope.nameSelector.Name;
                    addr_name = nameObj.replace(/undefined/g, '');
                       
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
                    if (addressObj.Country) {
                        contry = addressObj.Country;
                    }
                }
               
                HomeService.createPrimaryXML("HOSP_NAME", addr_name.trim());
                HomeService.createPrimaryXML("HOSP_ADDR1", addr_addr1);
                HomeService.createPrimaryXML("HOSP_ADDR2", addr_addr2);
                HomeService.createPrimaryXML("HOSP_ADDR3", addr_addr3);
                HomeService.createPrimaryXML("HOSP_CTY", city);
                HomeService.createPrimaryXML("HOSP_ST", st);
                HomeService.createPrimaryXML("HOSP_ZIP", zip);
                HomeService.createPrimaryXML("HOSP_COUNTRY", contry);
                         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
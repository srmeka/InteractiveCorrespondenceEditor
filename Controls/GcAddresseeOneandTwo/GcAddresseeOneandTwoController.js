app.controller('GcAddresseeOneandTwoController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.PrimaryJsonAddress = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role != 'OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.SecondJsonAddress = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);


        $scope.PrimaryAddress = [];
        $scope.SecondAddress = [];

        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
                    displayData.push(item);
                }
                else if (item.Type == 'Company') {
                    item.displayName = item.Name;
                    displayData.push(item);
                }
            });
            return displayData;
        }

        function inintPage() {
            $scope.PrimaryAddress = getData($scope.PrimaryJsonAddress);
            $scope.SecondAddress = getData($scope.SecondJsonAddress);
        };
      
        inintPage();

        $scope.selectedAddressee = undefined;
       
        $scope.addressData = [];


        $scope.selectAddr = function () {
            $scope.addressData = [];
            if ($scope.selectedAddressee) {
                if ($scope.selectedAddressee.Addresses) {
                    if (Array.isArray($scope.selectedAddressee.Addresses.Address)) {
                        $scope.addressData = $scope.selectedAddressee.Addresses.Address
                    } else {
                        $scope.addressData.push($scope.selectedAddressee.Addresses.Address);
                    }
                    $scope.selectedAddress = $scope.addressData[0];
                }
              
            }
        }
        
       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcAddresseeOneandTwo', function (event) {
        try {
            var pri_addressee_name = '', pri_addressee_add1 = '', pri_addressee_add2 = '', pri_addressee_add3 = '',
                pri_addressee_cty = '',pri_addressee_st = '', pri_addressee_zip = '',pri_addressee_postnet = '',
                sec_addressee_name = '';

            if ($scope.selectedAddressee) {
                pri_addressee_name = $scope.selectedAddressee.displayName;
                pri_addressee_name = pri_addressee_name.replace(/undefined/g, '').replace('  ', ' ');
            }
              
            if ($scope.selectedAddress) {
                var outputName = '';
                var addressObj = $scope.selectedAddress;
              
                if (addressObj.StreetAddress1) {
                    outputName += addressObj.StreetAddress1 + ' ';
                    pri_addressee_add1 = addressObj.StreetAddress1;
                }
                if (addressObj.StreetAddress2) {
                    outputName += addressObj.StreetAddress2 + ' ';
                    pri_addressee_add2 = addressObj.StreetAddress2;
                }
                if (addressObj.StreetAddress3) {
                    outputName += addressObj.StreetAddress3 + ' ';
                    pri_addressee_add3 = addressObj.StreetAddress3;
                }
                if (addressObj.City) {
                    outputName += addressObj.City + ' ';
                    pri_addressee_cty = addressObj.City;
                }
                if (addressObj.State) {
                    outputName += addressObj.State + ' ';
                    pri_addressee_st = addressObj.State;
                }
                if (addressObj.ZipCode) {
                    outputName += addressObj.ZipCode + ' ';
                    pri_addressee_zip = addressObj.ZipCode;
                }
                if (addressObj.Category) {
                    outputName += addressObj.Category + ' ';
                }
                if (addressObj.BarCodeInfo) {
                    pri_addressee_postnet = addressObj.BarCodeInfo;
                }
               
                if (outputName) {
                    outputName = outputName.replace(/undefined/, '');
                }

            }
            if ($scope.selectedSecondAddress) {
                sec_addressee_name = $scope.selectedSecondAddress.displayName;
                sec_addressee_name = sec_addressee_name.replace(/undefined/g, '').replace('  ', ' ');
            }

            HomeService.createPrimaryXML("PRI_ADDRESSEE_NAME", pri_addressee_name.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ADDR_1", pri_addressee_add1.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ADDR_2", pri_addressee_add2.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ADDR_3", pri_addressee_add3.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_CTY", pri_addressee_cty.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ST", pri_addressee_st.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ZIP", pri_addressee_zip.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_POSTNET_INFO", pri_addressee_postnet.trim());
            HomeService.createPrimaryXML("SEC_ADDRESSEE_NAME", sec_addressee_name.trim());        

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


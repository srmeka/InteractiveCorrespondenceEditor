app.controller('WccExamRoleNmAddrAndAttnController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.AddressJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'Other'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.addresseeData = [];
        $scope.RoleData = [];
        

        function getData(sourceData,roleType) {
            var displayData = [];
            sourceData.forEach(function (item) {
                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ').trim();
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }

                if (Array.isArray(item.Role)) {
                    if (item.Role.indexOf(roleType) > -1) {
                        displayData.push(item);
                    }
                } else {
                    if (roleType === item.Role) {
                        displayData.push(item);
                    }
                }
              
            });
            return displayData;
        }

        function getRole(sourceData) {
            var roleArray = [];
            sourceData.forEach(function (item) {
                if (Array.isArray(item.Role)) {
                    item.Role.forEach(function (role) {
                        if (roleArray.indexOf(role) < 0) {
                            roleArray.push(role);
                        }
                    });
                } else {
                    if (roleArray.indexOf(item.Role) < 0) {
                        roleArray.push(item.Role);
                    }
                }
            });
            roleArray.sort();
            return roleArray;
        }

        function inintPage() {
            getAtten();
            $scope.RoleData = getRole($scope.AddressJsonData);
        };
      
    

        inintPage();

        $scope.selectedRoleData = function (role) {
            $scope.addresseeData = getData($scope.AddressJsonData, role);
            if ($scope.addresseeData && $scope.addresseeData.length === 1) {
                $scope.selectedAddressee = $scope.addresseeData[0];
                $scope.selectAddr($scope.selectedAddressee);
            }
        }

        $scope.addressData = [];

        $scope.showAddress = '--Select One--';

        $scope.selectAddr = function (selectedAddressee) {
            $scope.addressData = [];
            if (selectedAddressee) {
                if (selectedAddressee.Addresses) {
                    if (Array.isArray(selectedAddressee.Addresses.Address)) {
                        $scope.addressData = selectedAddressee.Addresses.Address
                    } else {
                        $scope.addressData.push(selectedAddressee.Addresses.Address);
                        $scope.selectedAddress = $scope.addressData[0];
                    }
                    $scope.showAddress = '--Select One--';
                    $scope.selectedAddressData($scope.selectedAddress);
                } else {
                    $scope.selectAttenString = false;
                    $scope.attenString = 'Information not provided from ClaimCenter';
                    $scope.showAddress = 'Information not provided from ClaimCenter';
                }

            } else {
                $scope.showAddress = '--Select One--';
                $scope.attenString = undefined;
            }
        }
        
        $scope.selectedAddressData = function (addressData) {
            if (addressData) {
                if (addressData.Attention) {
                    $scope.attenString = addressData.Attention;
                } else {
                    $scope.selectedAttenString = $scope.attenData[0];
                    $scope.selectAttenString = false;
                    $scope.attenString = 'Information not provided from ClaimCenter';
                }

            } else {
                $scope.attenString = undefined;
                $scope.selectedAttenString = $scope.attenData[0];
            }
        }

        $scope.selectAttn = function () {
            $scope.selectedFreeAttenString = $scope.attenData[0];
            $scope.attenFreeString = undefined;
        }
        $scope.selectFreeAttn = function () {
            if (!$scope.attenString) {
                $scope.selectedAttenString = $scope.attenData[0];
                $scope.attenString = undefined;
            }
            if (!$scope.selectFreeAttenString) {

                $scope.attenFreeString = undefined;
            }

        }
  
        function getAtten() {
            HomeService.LookupValue('Attention').then(function (response) {
                $scope.attenData = response.data;
                $scope.selectedFreeAttenString = $scope.attenData[0];
                $scope.selectedAttenString = $scope.attenData[0];
            }, function (error) {
                $scope.error = error;
            })
        }
       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccExamRoleNmAddrAndAttn', function (event) {
        try {
            var pri_addressee_name = '', pri_addressee_add1 = '', pri_addressee_add2 = '', pri_addressee_add3 = '',
                pri_addressee_cty = '', pri_addressee_st = '', pri_addressee_zip = '', pri_addressee_country = '',
                atten_val = '',atten_typlst = '';

            if ($scope.selectedAddressee) {
                pri_addressee_name = $scope.selectedAddressee.displayName;
                pri_addressee_name = pri_addressee_name.replace(/undefined/g, '').replace('  ', ' ').trim();
            }
              
            if ($scope.selectedAddress) { 
                var addressObj = $scope.selectedAddress;
              
                if (addressObj.StreetAddress1) {
                    pri_addressee_add1 = addressObj.StreetAddress1;
                }
                if (addressObj.StreetAddress2) {
                    pri_addressee_add2 = addressObj.StreetAddress2;
                }
                if (addressObj.StreetAddress3) {
                    pri_addressee_add3 = addressObj.StreetAddress3;
                }
                if (addressObj.City) {
                    pri_addressee_cty = addressObj.City;
                }
                if (addressObj.State) {
                    pri_addressee_st = addressObj.State;
                }
                if (addressObj.ZipCode) {
                    pri_addressee_zip = addressObj.ZipCode;
                }
                if (addressObj.AddressCountry) {
                    pri_addressee_country = addressObj.AddressCountry;
                }
                if (addressObj.BarCodeInfo) {
                    pri_addressee_postnet = addressObj.BarCodeInfo;
                }
           
            }

            if ($scope.selectAttenString) {
                atten_typlst = $scope.selectedAttenString.lookupItemCode;
                if ($scope.attenString) {
                    atten_val = $scope.attenString;

                }
            } else if ($scope.selectFreeAttenString) {
                atten_typlst = $scope.selectedFreeAttenString.lookupItemCode;
                if ($scope.attenFreeString) {
                    atten_val = $scope.attenFreeString;

                }
            }
            

            HomeService.createPrimaryXML("SNE_NAME", pri_addressee_name.trim());
            HomeService.createPrimaryXML("SNE_ST_ADDR_1", pri_addressee_add1.trim());
            HomeService.createPrimaryXML("SNE_ST_ADDR_2", pri_addressee_add2.trim());
            HomeService.createPrimaryXML("SNE_ST_ADDR_3", pri_addressee_add3.trim());
            HomeService.createPrimaryXML("SNE_CTY", pri_addressee_cty.trim());
            HomeService.createPrimaryXML("SNE_ST", pri_addressee_st.trim());
            HomeService.createPrimaryXML("SNE_ZIP", pri_addressee_zip.trim());
            HomeService.createPrimaryXML("SNE_COUNTRY", pri_addressee_country.trim());
            HomeService.createPrimaryXML("SNE_ATTN_TYPLST", atten_typlst.trim());
            HomeService.createPrimaryXML("SNE_ATTN_VAL", atten_val.trim());
     

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


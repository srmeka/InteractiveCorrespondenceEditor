app.controller('WccFiveProviderNmAndAddressController', function ($rootScope, $scope, shareData, $http, HomeService) {
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
        $scope.showAddress = true;
        $scope.selectedName = function (itemIndex) {
           var addressData = [];
            var currentItem = $scope.nameSelected[itemIndex];
            if (currentItem) {
                if (currentItem.Addresses) {
                    if (Array.isArray(currentItem.Addresses.Address)) {
                        addressData = currentItem.Addresses.Address
                    } else {
                        addressData.push(currentItem.Addresses.Address);
                    }
                    $scope.addressSelected[itemIndex] = addressData[0];
                    $scope.showAddress = true;
                } else {
                    $scope.showAddress = false;
                }

                $scope.addressData[itemIndex] = addressData;
            } else {
                $scope.addressSelected[itemIndex] = undefined;
                $scope.addressData[itemIndex] = undefined;
                $scope.showAddress = true;
            }
        }

        $scope.addressData = [];
        $scope.nameSelected = [];
        $scope.addressSelected = [];

        $scope.displayDataObj = new Array(5);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WccFiveProviderNmAndAddress', function (event) {
        try {
            var j = 0;
            for (var i = 0; i < $scope.displayDataObj.length; i++) {
               
                if ($scope.nameSelected[i]) {

                    var nameObj = $scope.nameSelected[i].displayName;
                    var addr_name = nameObj.replace(/undefined/g, '').replace('  ', ' ');
                    if (addr_name) {
                        var tag_name = 'PROVIDER';
                        if (j > 0) { tag_name += "_" + j };
                        HomeService.createPrimaryXML(tag_name, addr_name.trim());
                    }
                    if  ($scope.addressSelected[i]) {
                        var addressObj = $scope.addressSelected[i];
                        if (addressObj.StreetAddress1) {
                            var addr_addr1 = addressObj.StreetAddress1;
                            var tag_name = 'PROV_ST_ADDR1';
                            if (j > 0) { tag_name += "_" + j };
                            HomeService.createPrimaryXML(tag_name, addr_addr1);
                        }
                        if (addressObj.StreetAddress2) {
                            var addr_addr2 = addressObj.StreetAddress2;
                            var tag_name = 'PROV_ST_ADDR2';
                            if (j > 0) { tag_name += "_" + j };
                            HomeService.createPrimaryXML(tag_name, addr_addr2);
                        }
                        if (addressObj.StreetAddress3) {
                            var addr_addr1 = addressObj.StreetAddress3;
                            var tag_name = 'PROV_ST_ADDR3';
                            if (j > 0) { tag_name += "_" + j };
                            HomeService.createPrimaryXML(tag_name, addr_addr3);
                        }
                        if (addressObj.City) {
                            var city = addressObj.City;
                            var tag_name = 'PROV_CTY';
                            if (j > 0) { tag_name += "_" + j };
                            HomeService.createPrimaryXML(tag_name, city);
                        }
                        if (addressObj.State) {
                            var st = addressObj.State;
                            var tag_name = 'PROV_ST';
                            if (j > 0) { tag_name += "_" + j };
                            HomeService.createPrimaryXML(tag_name, st);
                        }
                        if (addressObj.ZipCode) {
                            var zip = addressObj.ZipCode;
                            var tag_name = 'PROV_ZIP';
                            if (j > 0) { tag_name += "_" + j };
                            HomeService.createPrimaryXML(tag_name, zip);
                        }
                    }
                    if ($scope.nameSelected[i].PhoneNumbers && $scope.nameSelected[i].PhoneNumbers.PhoneNumber) {
                        var author_work_phn = '';
                        var phoneData = $scope.nameSelected[i].PhoneNumbers.PhoneNumber;
                        if (Array.isArray(phoneData)) {
                            phoneData.some(function (item) {
                                if (item.IsPrimary == 'true') {
                                    author_work_phn = '(' + item.AreaCode + ')' + item.Exchange + '-' + item.Number;
                                }
                            });
                        } else {
                            if (phoneData.IsPrimary == 'true') {
                                author_work_phn = '(' + phoneData.AreaCode + ')' + phoneData.Exchange + '-' + phoneData.Number;
                            }
                        }
                      
                        
                        var tag_name = 'PROVIDER_PHN_NUM';
                        if (j > 0) { tag_name += "_" + j };
                        HomeService.createPrimaryXML(tag_name, author_work_phn);
                    }
                    j++;
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
app.controller('WccProviderNameAndAddrRepeaterController', function ($rootScope, $scope, shareData, $http, HomeService) {
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
        $scope.addressSelector = [];
        $scope.nameSelector = []

        $scope.clearAllData = function (clearIndex) {
            $scope.addressSelector[clearIndex] = undefined;
            $scope.nameSelector[clearIndex] = undefined;
        }

        $scope.selectedName = function (selectedIndex) {
            $scope.addressData[selectedIndex] = [];
            if (Array.isArray($scope.nameSelector[selectedIndex].Addresses.Address)) {
                $scope.addressData[selectedIndex] = $scope.nameSelector[selectedIndex].Addresses.Address;
            } else {
                $scope.addressData[selectedIndex].push($scope.nameSelector[selectedIndex].Addresses.Address);
            }
            $scope.addressSelector[selectedIndex] = $scope.addressData[selectedIndex][0];
        }

        $scope.MaxCtls = 10;
        $scope.TotalCount = [1];

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.clearAllData(newItemNo);
            }
        }

        $scope.Required = ($scope.SelectedDocument.documentFriendlyName == "Ask Atty to Schedule Exam");
        $scope.ProviderName = "Provider Name";
        $scope.ProviderAddress = "Provider Address";

        if ($scope.Required) {
            $scope.ProviderName = "* " + $scope.ProviderName;
            $scope.ProviderAddress = "* " + $scope.ProviderAddress;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WccProviderNameAndAddrRepeater', function (event) {
        try {
            for (var i = 0; i < $scope.TotalCount.length; i++) {
                var id = shareData.shareOutputXML.getElementsByTagName("MULTIPLE_PROVIDER").length;
                HomeService.createSecondaryTableXML("MULTIPLE_PROVIDER");
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "CLM_FK", "1", id);

                var addr_name = '', addr_addr1 = '', addr_phone = '',
                  addr_addr2 = '', addr_addr3, city = '', st = '', zip = '';

                if ($scope.nameSelector[i]) {
                    var nameObj = $scope.nameSelector[i].displayName;
                    addr_name = nameObj.replace(/undefined/g, '').replace('  ', ' ');

                    if ($scope.nameSelector[i].PhoneNumbers) {
                        var phoneData = $scope.nameSelector[i].PhoneNumbers;
                        if (Array.isArray(phoneData)) {
                            for (var j = 0; j < phoneData.length; j++) {
                                var phone = phoneData.PhoneNumber;
                                if (phone.IsPrimary == 'true') {
                                    addr_phone = '(' + phone.AreaCode + ')' + phone.Exchange + '-' + phone.Number;
                                }
                            }
                        } else if (phoneData.PhoneNumber.IsPrimary == 'true') {
                            var phone = phoneData.PhoneNumber;
                            addr_phone = '(' + phone.AreaCode + ')' + phone.Exchange + '-' + phone.Number;

                        }
                    }
                }

                if ($scope.addressSelector[i]) {
                    var addressObj = $scope.addressSelector[i];
                    if (addressObj.StreetAddress1) {
                        addr_addr1 = addressObj.StreetAddress1;
                    }
                    if (addressObj.StreetAddress2) {
                        addr_addr2 = addressObj.StreetAddress2;
                    }
                    if (addressObj.StreetAddress3) {
                        addr_addr2 = addressObj.StreetAddress3;
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

                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_NM_MULTI", addr_name.trim(), id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_PHN_NUM_MULTI", addr_phone, id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_ST_ADD_1_MULTI", addr_addr1, id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_ST_ADD_2_MULTI", addr_addr2, id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_ST_ADD_3_MULTI", addr_addr3, id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_CTY_MULTI", city, id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_ST_MULTI", st, id);
                HomeService.createSecondaryXMLValue("MULTIPLE_PROVIDER", "PROVIDER_ZIP_MULTI", zip, id);
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
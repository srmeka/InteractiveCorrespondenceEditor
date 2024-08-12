app.controller('ClaimsCcBccDropdownwCheckboxController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.CCJsonInfo = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.PrimaryAddress = [];
        $scope.CCInfo = [];
        $scope.SecondAddress = [];

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
            $scope.CCInfo = getData($scope.CCJsonInfo);
          
        };

        inintPage();
        $scope.showControl = true;

        $rootScope.$on('HIDEN_CCBCC', function (event, data) {
            if (data.hiddenStatus) {
                $scope.showControl = true;
            } else {
                $scope.showControl = false;
            }
        })

        $scope.addressData = [];
        $scope.checkedCC = [];
        $scope.checkedBCC = [];
        $scope.nameSelector = [];
        $scope.addressSelector = [];
        $scope.references = [];       
        $scope.nameSelector = [];

        $scope.selectedBCC = function (clearId) {
            $scope.checkedCC[clearId] = undefined;
            $scope.clearAllData(clearId);
        }

        $scope.selectedCC = function (clearId) {
            $scope.checkedBCC[clearId] = undefined;
            $scope.clearAllData(clearId);
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

        $scope.clearAllData = function (clearId) {
            $scope.nameSelector[clearId] = undefined;
            $scope.addressSelector[clearId] = undefined;
            $scope.references[clearId] = undefined;
           
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
                $scope.checkedCC.pop();
                $scope.addressData.pop();
                $scope.checkedBCC.pop();
            }
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('ClaimsCcBccDropdownwCheckbox', function (event) {
        try {
            var lob = HomeService.getUrlParameter('LOB');
            var tag = "NJM_CC_OPT";
            if (lob == "WCC") {
                tag = "WCC_CC_OPT";
            }

            for (var i = 0; i < $scope.TotalCount.length; i++) {
                var id = shareData.shareOutputXML.getElementsByTagName(tag).length;
                if($scope.checkedCC[i] || $scope.checkedBCC[i]){
                    HomeService.createSecondaryTableXML(tag);
                   
                    var ref_value = '', bcc_value = 'N', addr_name = '', addr_addr1 = '',
                        addr_addr2 = '',city = '',st = '',zip = '',postnet = '';

                    if($scope.references[i]){
                        ref_value = $scope.references[i].trim();
                    }

                    if($scope.checkedBCC[i]){
                        bcc_value = 'Y';
                    }

                    if($scope.nameSelector[i]){
                        var nameObj = $scope.nameSelector[i].displayName;
                        addr_name = nameObj.replace(/undefined/g, '').replace('  ', ' ');
                       
                    }

                    if($scope.addressSelector[i]){
                        var addressObj = $scope.addressSelector[i];
                        if (addressObj.StreetAddress1) {                           
                            addr_addr1 = addressObj.StreetAddress1;
                        }
                        if (addressObj.StreetAddress2) {
                            addr_addr2 = addressObj.StreetAddress2;
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
                        if (addressObj.BarCodeInfo) {
                            postnet = addressObj.BarCodeInfo;
                        }
                    }

                    HomeService.createSecondaryXMLValue(tag, "CLM_FK", "1", id);
                    HomeService.createSecondaryXMLValue(tag, "CC_REF", ref_value, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_BCC_IND", bcc_value, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_NAME", addr_name, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_ADDR_1", addr_addr1, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_ADDR_2", addr_addr2, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_CTY", city, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_ST", st, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_ZIP", zip, id);
                    HomeService.createSecondaryXMLValue(tag, "CC_ADDRESSEE_POSTNET_INFO", postnet, id);
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
﻿app.controller('WccAttnyNameAndAddressController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantJsonData = JSPath.apply(".Claim.InvolvedParties.Party", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
        $scope.ClaimantData = [];
      
        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
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
            $scope.ClaimantData = getData($scope.ClaimantJsonData);
          
        };

        inintPage();

        $scope.addressData = [];
       

        $scope.selectedName = function () {
            $scope.addressData = [];
            if ($scope.nameSelector) {
                if ($scope.nameSelector.Addresses) {
                    if (Array.isArray($scope.nameSelector.Addresses.Address)) {
                        $scope.addressData = $scope.nameSelector.Addresses.Address
                    } else {
                        $scope.addressData.push($scope.nameSelector.Addresses.Address);
                    }

                    $scope.addressSelector = $scope.addressData[0];
                    $scope.showError = false;
                } else {
                    $scope.showError = true;
                }
            } else {
                $scope.showError = false;
            }
          
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WccAttnyNameAndAddress', function (event) {
        try {
               var addr_name = '', addr_addr1 = '', addr_addr2 = '', addr_addr3 = '',
                   city = '',st = '',zip = '';                 

               if($scope.nameSelector){
                    var nameObj = $scope.nameSelector.displayName;
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
                }
               
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_NAME", addr_name.trim());
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_ST_ADDR1", addr_addr1);
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_ST_ADDR2", addr_addr2);
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_ST_ADDR3", addr_addr3);
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_CTY", city);
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_ST", st);
                HomeService.createPrimaryXML("OUTSD_ATTORNEY_ZIP", zip);
                         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
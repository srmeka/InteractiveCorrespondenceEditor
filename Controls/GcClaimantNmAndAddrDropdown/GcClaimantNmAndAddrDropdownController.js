﻿app.controller('GcClaimantNmAndAddrDropdownController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
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

    $scope.$on('GcClaimantNmAndAddrDropdown', function (event) {
        try {
               var addr_name = '', addr_addr1 = '',
                   addr_addr2 = '',city = '',st = '',zip = '', dob = '';                 

               if ($scope.nameSelector) {
                   var nameObj = $scope.nameSelector.displayName;
                   addr_name = nameObj.replace(/undefined/g, '').replace('  ', ' ');

                   if ($scope.nameSelector.DateOfBirth) {
                       dob = $scope.nameSelector.DateOfBirth;
                   };

               };

               if ($scope.addressSelector) {
                   var addressObj = $scope.addressSelector;
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
               };
               
                HomeService.createPrimaryXML("CLMT_NAME", addr_name.trim());
                HomeService.createPrimaryXML("CLMT_ST_ADDR1_AUTO", addr_addr1);
                HomeService.createPrimaryXML("CLMT_ST_ADDR2_AUTO", addr_addr2);
                HomeService.createPrimaryXML("CLMT_CTY_AUTO", city);
                HomeService.createPrimaryXML("CLMT_ST_AUTO", st);
                HomeService.createPrimaryXML("CLMT_ZIP_AUTO", zip);
                HomeService.createPrimaryXML("CLMT_DOB", dob);
               
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
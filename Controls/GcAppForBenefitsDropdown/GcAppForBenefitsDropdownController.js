﻿app.controller('GcAppForBenefitsDropdownController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'User' && .Role != 'OrganizationContact'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
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

    $scope.$on('GcAppForBenefitsDropdown', function (event) {
        try {
               var addr_name = '', addr_addr1 = '',
                   addr_addr2 = '',city = '',st = '',zip = '';                 

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
               
                HomeService.createPrimaryXML("APPLICANT_BENEFITS_NAME", addr_name.trim());
                HomeService.createPrimaryXML("APPLICANT_BENEFITS_ADDR_1", addr_addr1);
                HomeService.createPrimaryXML("APPLICANT_BENEFITS_ADDR_2", addr_addr2);
                HomeService.createPrimaryXML("APPLICANT_BENEFITS_CTY", city);
                HomeService.createPrimaryXML("APPLICANT_BENEFITS_ST", st);
                HomeService.createPrimaryXML("APPLICANT_BENEFITS_ZIP", zip);
                         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
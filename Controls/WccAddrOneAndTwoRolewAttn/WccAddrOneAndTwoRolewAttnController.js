app.controller('WccAddrOneAndTwoRolewAttnController', function ($scope, $http, shareData, HomeService) {
    try {
        //$scope.PrimaryPartyListData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'Other'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.PrimaryPartyListData = JSPath.apply(".Claim.InvolvedParties.Party", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.SecondaryPartyListData = angular.copy($scope.PrimaryPartyListData);

        $scope.PrimaryRoleList = [];
        $scope.SecondaryRoleList = [];
        $scope.PrimaryAddresseeList = [];
        $scope.SecondaryAddresseeList = [];
        $scope.AttentionTypeData = [];
        $scope.PrimaryAddresseeAddressList = [];

        getAttentionTypes();
        $scope.PrimaryRoleList = getAddresseeRoles($scope.PrimaryPartyListData);
        $scope.SecondaryRoleList = getAddresseeRoles($scope.SecondaryPartyListData);

        //get addressee's roles
        function getAddresseeRoles(sourceData) {
            var roleArray = [];

            // these Role Types come from GuideWire. 
            var FilteredRoles = ["Agent", "Alternate Contact", "Arbitrator", "Assistant Surgeon", "Carrier",
                "Case Management Company", "Check Payee", "Claimant", "Claimant Dependent", "Co-defendant",
                "Co-Surgeon", "Collection Agency", "Contact At Firm", "Defendant", "Diagnostic Testing Facility",
                "DME Vendor", "Doctor", "Employer", "External Subrogation Firm", "Former Agent", "Former Check Payee",
                "Former Insured", "Former Policy Holder", "Former Underwriter", "Garnishment Beneficiary",
                "Garnishment Recipient", "Guardian", "Hospital", "Industrial Medicine Facility", "Injured Party",
                "Insured", "Judge", "Law Enforcement Agency", "Lienholder", "Main Contact", "Medical Personnel",
                "Medical Practice", "Nurse Case Manager", "Occupational Therapist", "Occupational Therapy Facility",
                "Other", "Outside Counsel/Attorney", "Outside Investigator", "Outside Law Firm", "Owner", "Passenger",
                "Petitioners Attorney", "Petitioners Law Firm", "Pharmacy", "Physical Therapist", "Physical Therapy Facility",
                "Plaintiff", "Policy Contact", "Policy holder", "Recovery Payer", "Rehabilitation Facility",
                "Reporter", "State Agency", "Supervisor", "Surgeon", "Transportation Provider", "Underwriter",
                "Vendor", "Venue", "Witness"];

            sourceData.forEach(function (item) {
                if (Array.isArray(item.Role)) {
                    item.Role.forEach(function (role) {
                        if (roleArray.indexOf(role) < 0 && FilteredRoles.indexOf(role) > -1) {
                            roleArray.push(role);
                        }
                    });
                } else {
                    if (roleArray.indexOf(item.Role) < 0 && FilteredRoles.indexOf(item.Role) > -1) {
                        roleArray.push(item.Role);
                    }
                }
            });
            return roleArray.sort();
        }

        //format Addressee (person or Company name) data
        function getAddresseeData(sourceData, roleType) {
            var displayData = [];
            sourceData.forEach(function (item) {
                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
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
            return displayData.sort();
        }

        //get Attention Type lookup values
        function getAttentionTypes() {
            HomeService.LookupValue('Attention').then(function (response) {
                $scope.AttentionTypeData = response.data;
                $scope.selectedAttentionType2 = $scope.AttentionTypeData[0];
                $scope.selectedAttentionType1 = $scope.AttentionTypeData[0];
            }, function (error) {
                $scope.error = error;
            })
        }

        //selected Primary Role changed; get Primary Addressee Names
        $scope.changedPrimaryRole = function (role) {
            $scope.PrimaryAddresseeList = getAddresseeData($scope.PrimaryPartyListData, role);
            if ($scope.PrimaryAddresseeList && $scope.PrimaryAddresseeList.length === 1) {
                //default to first name in list
                $scope.selectedPrimaryAddresseeName = $scope.PrimaryAddresseeList[0];

                //get all the addressess for the selected Addressee name
                $scope.changedPrimaryAddressee($scope.selectedPrimaryAddresseeName);
            }
        }

        //selected Secondary Role changed; get Secondary Addressee Names
        $scope.changedSecondaryRole = function (role) {
            $scope.SecondaryAddresseeList = getAddresseeData($scope.SecondaryPartyListData, role);
            if ($scope.SecondaryAddresseeList && $scope.SecondaryAddresseeList.length === 1) {
                //default to first name in list
                $scope.selectedSecondaryAddresseeName = $scope.SecondaryAddresseeList[0];
            }
        }

        //selected Primary Addressee changed; get Primary Addressee Addressses
        $scope.changedPrimaryAddressee = function (addressee) {
            $scope.PrimaryAddresseeAddressList = [];
            //$scope.AddresseeAddressDefault = '--Select One--';
            $scope.selectedPrimaryAddresseeAddress = undefined;

            if (addressee && addressee.Addresses) {
                if (Array.isArray(addressee.Addresses.Address)) {

                   $scope.PrimaryAddresseeAddressList = addressee.Addresses.Address;

                } else {
                    $scope.PrimaryAddresseeAddressList.push(addressee.Addresses.Address);
                }
                if ($scope.PrimaryAddresseeAddressList.length === 1) {
                    //default to first Address in list
                    $scope.selectedPrimaryAddresseeAddress = $scope.PrimaryAddresseeAddressList[0];

                    //get the Attention name
                    $scope.changedPrimaryAddress($scope.selectedPrimaryAddresseeAddress);
                }
            }
            else {
                $scope.selectedAttentionLabel1 = 'Information not provided from ClaimCenter';
                //$scope.AddresseeAddressDefault = 'Information not provided from ClaimCenter';
            }
        }

        //selected Primary Addressee Address changed; get the Attention Name
        $scope.changedPrimaryAddress = function (address) {
            if (address && address.Attention) {
                $scope.selectedAttentionLabel1 = address.Attention;
            }
            else {
                $scope.selectedAttentionType1 = $scope.AttentionTypeData[0];
                $scope.selectedAttentionLabel1 = 'Information not provided from ClaimCenter';
            }
        }

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccAddrOneAndTwoRolewAttn', function (event) {
        try {
            var pri_addressee_name = '', pri_addressee_add1 = '', pri_addressee_add2 = '', pri_addressee_add3 = '',
                pri_addressee_cty = '', pri_addressee_st = '', pri_addressee_zip = '', pri_addressee_country = '', pri_addressee_postnet = '',
                sec_addressee_name = '', atten_type = '', atten = '';


            if ($scope.selectedPrimaryAddresseeName) {
                pri_addressee_name = $scope.selectedPrimaryAddresseeName.displayName;
                pri_addressee_name = pri_addressee_name.replace(/undefined/g, '').replace('  ', ' ');
            }

            if ($scope.selectedPrimaryAddresseeAddress) {
                var addressObj = $scope.selectedPrimaryAddresseeAddress;

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
            if ($scope.selectedSecondaryAddresseeName) {
                sec_addressee_name = $scope.selectedSecondaryAddresseeName.displayName;
                sec_addressee_name = sec_addressee_name.replace(/undefined/g, '').replace('  ', ' ');
            }

            if ($scope.changedAttention2) {
                if ($scope.selectedAttentionType1.lookupItemCode) {
                    atten_type = $scope.selectedAttentionType1.lookupItemCode;
                }
                if ($scope.selectedAttentionLabel1) {
                    atten = $scope.selectedAttentionLabel1;
                }

            }

            if ($scope.selectedAttention2) {
                if ($scope.selectedAttentionType2.lookupItemCode) {
                    atten_type = $scope.selectedAttentionType2.lookupItemCode;
                }
                if ($scope.selectedAttentionLabel2) {
                    atten = $scope.selectedAttentionLabel2.trim();
                }
            }

            HomeService.createPrimaryXML("PRI_ADDRESSEE_NAME", pri_addressee_name.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ADDR_1", pri_addressee_add1.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ADDR_2", pri_addressee_add2.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ADDR_3", pri_addressee_add3.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_CTY", pri_addressee_cty.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ST", pri_addressee_st.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_ZIP", pri_addressee_zip.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_COUNTRY", pri_addressee_country.trim());
            HomeService.createPrimaryXML("PRI_ADDRESSEE_POSTNET_INFO", pri_addressee_postnet.trim());
            if ($scope.selectedAttention1) {
                HomeService.createPrimaryXML("ATTN_TYPLST", $scope.selectedAttentionType1.lookupItemCode);
                HomeService.createPrimaryXML("ATTN_VAL", $scope.selectedAttentionLabel1);
            }
            if ($scope.selectedAttention2) {
                HomeService.createPrimaryXML("ATTN_TYPLST", $scope.selectedAttentionType2.lookupItemCode);
                HomeService.createPrimaryXML("ATTN_VAL", $scope.selectedAttentionLabel2);
            }
            HomeService.createPrimaryXML("SEC_ADDRESSEE_NAME", sec_addressee_name.trim());

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});


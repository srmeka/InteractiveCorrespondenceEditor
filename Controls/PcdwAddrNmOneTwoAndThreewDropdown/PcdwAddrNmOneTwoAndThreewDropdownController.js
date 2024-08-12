app.controller('PcdwAddrNmOneTwoAndThreewDropdownController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Addressee = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{(.PartyRoles == "Primary Named Insured" || .PartyRoles == "Other Named Insured" || .PartyRoles == "Secondary Named Insured" || .PartyRoles == "Spouse" || .PartyRoles == "Broker" || .PartyRoles == "Executor Executrix" || .PartyRoles == "Guardian" || .PartyRoles == "ThirdParty" || .PartyRoles == "Trust" || .PartyRoles == "Trustee" || .PartyRoles == "Additional Interest" || .PartyRoles == "Certificate Of Insurance Holder" || .PartyRoles == "Power Of Attorney")  || .PartyTypeCd == "Organization"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.AddresseeThree = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Other Named Insured"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.PrimaryAddress = getData($scope.Addressee);

        $scope.updateAddreesseeAddress = function () {
            $scope.addressData = [];
            $scope.addressItem = [];
            var Municipality = undefined;

            if ($scope.selectedAddressee != undefined) {
                if ($scope.selectedAddressee.PartyTypeCd === 'Person') {

                    if ($scope.selectedAddressee.Person.Addresses) {
                        if (Array.isArray($scope.selectedAddressee.Person.Addresses)) {
                            for (var i = 0; i < $scope.selectedAddressee.Person.Addresses.length; i++) {

                                $scope.AddresseeAddress = $scope.selectedAddressee.Person.Addresses[i].Address;

                                if (Array.isArray($scope.selectedAddressee.Person.Addresses[i].Address.Municipality)) {
                                    for (var j = 0; j < $scope.selectedAddressee.Person.Addresses[i].Address.Municipality.length; j++) {

                                        if ($scope.selectedAddressee.Person.Addresses[i].Address.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                            Municipality = ($scope.selectedAddressee.Person.Addresses[i].Address.Municipality[j].MunicipalityNm ? $scope.selectedAddressee.Person.Addresses[i].Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }
                                    fillAddress($scope.selectedAddressee.Person.Addresses[i], Municipality);

                                } else {

                                    if ($scope.selectedAddressee.Person.Addresses[i].Address.Municipality.MunicipalityTypeCd == 'CITY') {
                                        Municipality = ($scope.selectedAddressee.Person.Addresses[i].Address.Municipality.MunicipalityNm ? $scope.selectedAddressee.Person.Addresses[i].Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress($scope.selectedAddressee.Person.Addresses[i], Municipality);
                                }
                            }

                        } else {

                            if ($scope.selectedAddressee.Person.Addresses.Address.Municipality) {
                                if (Array.isArray($scope.selectedAddressee.Person.Addresses.Address.Municipality)) {
                                    for (var j = 0; j < $scope.selectedAddressee.Person.Addresses.Address.Municipality.length; j++) {
                                        if ($scope.selectedAddressee.Person.Addresses.Address.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                            Municipality = ($scope.selectedAddressee.Person.Addresses.Address.Municipality[j].MunicipalityNm ? $scope.selectedAddressee.Person.Addresses.Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }

                                    fillAddress($scope.selectedAddressee.Person.Addresses, Municipality);

                                } else {
                                    if ($scope.selectedAddressee.Person.Addresses.Address.Municipality.MunicipalityTypeCd == 'CITY') {
                                        Municipality = ($scope.selectedAddressee.Person.Addresses.Address.Municipality.MunicipalityNm ? $scope.selectedAddressee.Person.Addresses.Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress($scope.selectedAddressee.Person.Addresses, Municipality);
                                }
                            }
                        }
                    }
                } //Person

                if ($scope.selectedAddressee.PartyTypeCd === 'Organization') {

                    if ($scope.selectedAddressee.Organization.Addresses) {
                        if (Array.isArray($scope.selectedAddressee.Organization.Addresses)) {
                            for (var i = 0; i < $scope.selectedAddressee.Organization.Addresses.length; i++) {

                                $scope.AddresseeAddress = $scope.selectedAddressee.Organization.Addresses[i].Address;

                                if (Array.isArray($scope.selectedAddressee.Organization.Addresses[i].Address.Municipality)) {
                                    for (var j = 0; j < $scope.selectedAddressee.Organization.Addresses[i].Address.Municipality.length; j++) {

                                        if ($scope.selectedAddressee.Organization.Addresses[i].Address.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                            Municipality = ($scope.selectedAddressee.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm ? $scope.selectedAddressee.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }
                                    fillAddress($scope.selectedAddressee.Organization.Addresses[i], Municipality);

                                } else {

                                    if ($scope.selectedAddressee.Organization.Addresses[i].Address.Municipality.MunicipalityTypeCd == 'CITY') {
                                        Municipality = ($scope.selectedAddressee.Organization.Addresses[i].Address.Municipality.MunicipalityNm ? $scope.selectedAddressee.Organization.Addresses[i].Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress($scope.selectedAddressee.Organization.Addresses[i], Municipality);
                                }
                            }
                        }
                        else {
                            if (Array.isArray($scope.selectedAddressee.Organization.Addresses.Address.Municipality)) {
                                for (var j = 0; j < $scope.selectedAddressee.Organization.Addresses.Address.Municipality.length; j++) {
                                    if ($scope.selectedAddressee.Organization.Addresses.Address.Municipality[j].MunicipalityTypeCd == 'CITY') {
                                        Municipality = ($scope.selectedAddressee.Organization.Addresses.Address.Municipality[j].MunicipalityNm ? $scope.selectedAddressee.Organization.Addresses.Address.Municipality[j].MunicipalityNm : '');
                                    }
                                }
                                fillAddress($scope.selectedAddressee.Organization.Addresses, Municipality);
                            } else {
                                if ($scope.selectedAddressee.Organization.Addresses.Address.Municipality.MunicipalityTypeCd == 'CITY') {
                                    Municipality = ($scope.selectedAddressee.Organization.Addresses.Address.Municipality.MunicipalityNm ? $scope.selectedAddressee.Organization.Addresses.Address.Municipality.MunicipalityNm : '');
                                }

                                fillAddress($scope.selectedAddressee.Organization.Addresses, Municipality);
                            }
                        }
                    }
                }  //Organization
            }  //$scope.selectedAddressee != undefined
        } //updateAddreesseeAddress

        function fillAddress(addr, city) {
            if (addr.Address.CountrySubdivision) {
                $scope.addressItem =
                {
                    Line1Tx: (addr.Address.Line1Tx ? addr.Address.Line1Tx : ''),
                    Line2Tx: (addr.Address.Line2Tx ? addr.Address.Line2Tx : ''),
                    Line3Tx: (addr.Address.Line3Tx ? addr.Address.Line3Tx : ''),
                    MunicipalityNm: (city ? city : ''),
                    CountrySubdivisionNm: (addr.Address.CountrySubdivision.CountrySubdivisionNm ? addr.Address.CountrySubdivision.CountrySubdivisionNm : ''),
                    PostalCd: (addr.Address.PostalCd ? addr.Address.PostalCd : ''),
                    AddressUseCd: (addr.AddressUseCd ? addr.AddressUseCd : '')
                };
            } else {
                $scope.addressItem =
                {
                    Line1Tx: (addr.Address.Line1Tx ? addr.Address.Line1Tx : ''),
                    Line2Tx: (addr.Address.Line2Tx ? addr.Address.Line2Tx : ''),
                    Line3Tx: (addr.Address.Line3Tx ? addr.Address.Line3Tx : ''),
                    MunicipalityNm: (city ? city : ''),
                    PostalCd: (addr.Address.PostalCd ? addr.Address.PostalCd : ''),
                    AddressUseCd: (addr.AddressUseCd ? addr.AddressUseCd : '')
                };
            }
            $scope.addressData.push($scope.addressItem);
        };

        //Include Organization
        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.PartyTypeCd === 'Person') {
                    item.displayName = (item.Person.PersonName.NameSalutationCd ? item.Person.PersonName.NameSalutationCd + ' ' : '') +
                                       item.Person.PersonName.FirstGivenNm + ' ' +
                                       item.Person.SecondGivenNameInitial + ' ' +
                                       item.Person.PersonName.FamilyNm + ' ' +
                                       item.Person.PersonName.FamilyNameGenerationCd;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
                    displayData.push(item);
                }
                if (item.PartyTypeCd == 'Organization') {
                    item.displayName = item.Organization.OrganizationNm;
                    displayData.push(item);
                }

            });
            return displayData;
        }

        $scope.ClearData = function () {
            $scope.SelectedAddressee3 = undefined;
        }

        //Get Addressee Name 2 value 
        var varAddresseeName2 = "";
        var varAddresseeName3 = "";

        var varAddresseeName2DisplayName = ('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Secondary Named Insured"}.Person.PersonName.NameSalutationCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2DisplayName.length > 0) {
            varAddresseeName2 = varAddresseeName2DisplayName;
        }

        var varAddresseeName2FirstName = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Secondary Named Insured"}.Person.PersonName.FirstGivenNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2FirstName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2FirstName;
        }

        //Xpath = /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/SecondGivenNameInitial
        var varAddresseeName2MiddleName = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Secondary Named Insured"}.Person.PersonName.SecondGivenNameIntial', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2MiddleName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2MiddleName;
        }

        var varAddresseeName2LastName = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Secondary Named Insured"}.Person.PersonName.FamilyNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2LastName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2LastName;
        }

        var varAddresseeName2DisplayNameSuffix = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Secondary Named Insured"}.Person.PersonName.FamilyNameGenerationCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2DisplayNameSuffix.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2DisplayNameSuffix;
        }

        var varAddresseeName3DisplayName = ('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Other Named Insured"}.Person.PersonName.NameSalutationCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName3DisplayName.length > 0) {
            varAddresseeName3 = varAddresseeName3DisplayName;
        }

        var varAddresseeName3FirstName = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Other Named Insured"}.Person.PersonName.FirstGivenNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName3FirstName.length > 0) {
            varAddresseeName3 = varAddresseeName3 + " " + varAddresseeName3FirstName;
        }

        var varAddresseeName3MiddleName = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Other Named Insured"}.Person.PersonName.SecondGivenNameIntial', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName3MiddleName.length > 0) {
            varAddresseeName3 = varAddresseeName3 + " " + varAddresseeName3MiddleName;
        }

        var varAddresseeName3LastName = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Other Named Insured"}.Person.PersonName.FamilyNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName3LastName.length > 0) {
            varAddresseeName3 = varAddresseeName3 + " " + varAddresseeName3LastName;
        }

        var varAddresseeName3DisplayNameSuffix = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles=="Other Named Insured"}.Person.PersonName.FamilyNameGenerationCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName3DisplayNameSuffix.length > 0) {
            varAddresseeName3 = varAddresseeName3 + " " + varAddresseeName3DisplayNameSuffix;
        }

        $scope.AddresseeName2 = varAddresseeName2.trim();
        $scope.AddresseeName3 = varAddresseeName3.trim();
        $scope.AddresseeName2ChkDisabled = false;
        $scope.AddresseeName3ChkDisabled = false;

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcdwAddrNmOneTwoAndThreewDropdown', function (event) {
        try {
            var AddresseeName = "";
            var AddresseeName3 = "";

            if ($scope.selectedAddressee) {

                HomeService.createPrimaryXML("ADDRESSEE_NAME", $scope.selectedAddressee.displayName);

                if ($scope.SelectedAddress) {

                    if ($scope.SelectedAddress.Line1Tx) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_1", $scope.SelectedAddress.Line1Tx.trim());
                    }
                    if ($scope.SelectedAddress.Line2Tx) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_2", $scope.SelectedAddress.Line2Tx.trim());
                    }
                    if ($scope.SelectedAddress.Line3Tx) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_3", $scope.SelectedAddress.Line3Tx.trim());
                    }
                    if ($scope.SelectedAddress.MunicipalityNm) {
                        HomeService.createPrimaryXML("ADDRESSEE_CTY", $scope.SelectedAddress.MunicipalityNm);
                    }
                    if ($scope.SelectedAddress.CountrySubdivisionNm) {
                        HomeService.createPrimaryXML("ADDRESSEE_ST", $scope.SelectedAddress.CountrySubdivisionNm.trim());
                    }
                    if ($scope.SelectedAddress.PostalCd) {
                        HomeService.createPrimaryXML("ADDRESSEE_ZIP", $scope.SelectedAddress.PostalCd.trim());
                    }
                }
            }
            if ($scope.AddresseeName2Chk) {
                HomeService.createPrimaryXML("ADDRESSEE_NAME_2", varAddresseeName2.trim());
            }

            if ($scope.SelectedAddressee3) {
                if ($scope.SelectedAddressee3.Person.PersonName.NameSalutationCd) {
                    AddresseeName3 = $scope.SelectedAddressee3.Person.PersonName.NameSalutationCd + " ";
                }
                if ($scope.SelectedAddressee3.Person.PersonName.FirstGivenNm) {
                    AddresseeName3 = AddresseeName3 + $scope.SelectedAddressee3.Person.PersonName.FirstGivenNm + " ";
                }
                if ($scope.SelectedAddressee3.Person.SecondGivenNameInitial) {
                    AddresseeName3 = AddresseeName3 + $scope.SelectedAddressee3.Person.SecondGivenNameInitial + " ";
                }
                if ($scope.SelectedAddressee3.Person.PersonName.FamilyNm) {
                    AddresseeName3 = AddresseeName3 + $scope.SelectedAddressee3.Person.PersonName.FamilyNm + " ";
                }
                if ($scope.SelectedAddressee3.Person.PersonName.FamilyNameGenerationCd) {
                    AddresseeName3 = AddresseeName3 + $scope.SelectedAddressee3.Person.PersonName.FamilyNameGenerationCd + " ";
                }
                HomeService.createPrimaryXML("ADDRESSEE_NAME_3", AddresseeName3.trim());
            }
        }

        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});
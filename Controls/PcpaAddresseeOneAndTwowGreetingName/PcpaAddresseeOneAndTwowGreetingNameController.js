﻿app.controller('PcpaAddresseeOneAndTwowGreetingNameController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Territory = JSPath.apply(".Policy.PolicyPeriod.PolicyLocation.TerritoryCd", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.Addressee = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{(.PartyRoles == "Primary Named Insured" || .PartyRoles == "Secondary Named Insured" || .PartyRoles == "Spouse" || .PartyRoles == "Broker" || .PartyRoles == "Executor Executrix" || .PartyRoles == "Guardian" || .PartyRoles == "ThirdParty" || .PartyRoles == "Trust" || .PartyRoles == "Trustee" || .PartyRoles == "Additional Interest" || .PartyRoles == "Certificate Of Insurance Holder" || .PartyRoles == "Power Of Attorney") || .PartyTypeCd == "Organization"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

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

        $scope.updateGreetingName = function () {

            $scope.GreetingName = 'Dear' + ' ';

            if ($scope.selectedAddressee.displayName) {
                $scope.GreetingName += $scope.selectedAddressee.displayName;
            }
            if ($scope.addresseeName2Chk) {
                $scope.GreetingName += ' ' + 'and ' + varAddresseeName2.trim();
            }
        }

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

        $scope.SelectedAddressCity = "";
        //Get Addressee Name 2 value 
        var varAddresseeName2 = "";
        var varAddresseeName2WithSalution = "";
        var varAddresseeName2DisplayName = ('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles == "Secondary Named Insured"}.Person.PersonName.NameSalutationCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2DisplayName.length > 0) {
            varAddresseeName2WithSalution = varAddresseeName2DisplayName;
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

        $scope.addresseeName2 = varAddresseeName2.trim();
        $scope.addresseeName2ChkDisabled = false;

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaAddresseeOneAndTwowGreetingName', function (event) {
        try {
            var AddresseeName = "";
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

            if ($scope.addresseeName2Chk) {
                if (varAddresseeName2WithSalution.length > 0) {
                    varAddresseeName2 = varAddresseeName2WithSalution + ' ' + varAddresseeName2;
                    HomeService.createPrimaryXML("ADDRESSEE_NAME_2", varAddresseeName2.trim());
                }
                else {
                    HomeService.createPrimaryXML("ADDRESSEE_NAME_2", varAddresseeName2.trim());
                }
            }

            if ($scope.GreetingName) {
                HomeService.createPrimaryXML("GREETING_NAME", $scope.GreetingName);
            }

            if ($scope.SelectedDocument.documentFriendlyName == 'Notice of Nonrenewal-Auto') {
                if ($scope.Territory) {
                    HomeService.createPrimaryXML("TERR_CODE", $scope.Territory);
                }
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});
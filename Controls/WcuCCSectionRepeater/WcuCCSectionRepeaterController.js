app.controller('WcuCCSectionRepeaterController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.CcCheckbox = new Array;
        $scope.addressData = [];
        $scope.CCNameData = [];
        $scope.selectedCCName = [];
        $scope.addressSelector = [];
        $scope.MaxCtls = [10];

        $scope.CCNameData = JSPath.apply(".Policy.PolicyPeriod.InvolvedParties{.PartyTypeCd == 'Organization' || .PartyTypeCd == 'Person'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.CCNames = getData($scope.CCNameData);

        $scope.updateCCAddress = function (selectedName, selectedIndex) {

            $scope.selectedCCName[selectedIndex];

            $scope.addressItem = [];

            var Municipality = undefined;

            $scope.addressData[selectedIndex] = [];

            if (selectedName != undefined) {
                if (selectedName.PartyTypeCd === 'Person') {

                    if (selectedName.Person.Addresses) {
                        if (Array.isArray(selectedName.Person.Addresses)) {
                            for (var i = 0; i < selectedName.Person.Addresses.length; i++) {

                                $scope.AddresseeAddress = selectedName.Person.Addresses[i].Address;

                                if (Array.isArray(selectedName.Person.Addresses[i].Address.Municipality)) {
                                    for (var j = 0; j < selectedName.Person.Addresses[i].Address.Municipality.length; j++) {

                                        if (selectedName.Person.Addresses[i].Address.Municipality[j].MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                            Municipality = (selectedName.Person.Addresses[i].Address.Municipality[j].MunicipalityNm ? selectedName.Person.Addresses[i].Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }
                                    fillAddress(selectedName.Person.Addresses[i], Municipality, selectedIndex);

                                } else {

                                    if (selectedName.Person.Addresses[i].Address.Municipality.MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                        Municipality = (selectedName.Person.Addresses[i].Address.Municipality.MunicipalityNm ? selectedName.Person.Addresses[i].Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress(selectedName.Person.Addresses[i], Municipality, selectedIndex);
                                }
                            }

                        } else {

                            if (selectedName.Person.Addresses.Address.Municipality) {
                                if (Array.isArray(selectedName.Person.Addresses.Address.Municipality)) {
                                    for (var j = 0; j < selectedName.Person.Addresses.Address.Municipality.length; j++) {
                                        if (selectedName.Person.Addresses.Address.Municipality[j].MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                            Municipality = (selectedName.Person.Addresses.Address.Municipality[j].MunicipalityNm ? selectedName.Person.Addresses.Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }

                                    fillAddress(selectedName.Person.Addresses, Municipality, selectedIndex);

                                } else {
                                    if (selectedName.Person.Addresses.Address.Municipality.MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                        Municipality = (selectedName.Person.Addresses.Address.Municipality.MunicipalityNm ? selectedName.Person.Addresses.Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress(selectedName.Person.Addresses, Municipality, selectedIndex);
                                }
                            }
                        }
                    }
                } //Person

                if (selectedName.PartyTypeCd === 'Organization') {

                    if (selectedName.Organization.Addresses) {
                        if (Array.isArray(selectedName.Organization.Addresses)) {
                            for (var i = 0; i < selectedName.Organization.Addresses.length; i++) {

                                $scope.AddresseeAddress = selectedName.Organization.Addresses[i].Address;

                                if (Array.isArray(selectedName.Organization.Addresses[i].Address.Municipality)) {
                                    for (var j = 0; j < selectedName.Organization.Addresses[i].Address.Municipality.length; j++) {

                                        if (selectedName.Organization.Addresses[i].Address.Municipality[j].MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                            Municipality = (selectedName.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm ? selectedName.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }
                                    fillAddress(selectedName.Organization.Addresses[i], Municipality, selectedIndex);

                                } else {

                                    if (selectedName.Organization.Addresses[i].Address.Municipality.MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                        Municipality = (selectedName.Organization.Addresses[i].Address.Municipality.MunicipalityNm ? selectedName.Organization.Addresses[i].Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress(selectedName.Organization.Addresses[i], Municipality, selectedIndex);
                                }
                            }
                        }
                        else {
                            if (Array.isArray(selectedName.Organization.Addresses.Address.Municipality)) {
                                for (var j = 0; j < selectedName.Organization.Addresses.Address.Municipality.length; j++) {
                                    if (selectedName.Organization.Addresses.Address.Municipality[j].MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                        Municipality = (selectedName.Organization.Addresses.Address.Municipality[j].MunicipalityNm ? selectedName.Organization.Addresses.Address.Municipality[j].MunicipalityNm : '');
                                    }
                                }

                                fillAddress(selectedName.Organization.Addresses, Municipality, selectedIndex);

                            } else {
                                if (selectedName.Organization.Addresses.Address.Municipality.MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                    Municipality = (selectedName.Organization.Addresses.Address.Municipality.MunicipalityNm ? selectedName.Organization.Addresses.Address.Municipality.MunicipalityNm : '');
                                }

                                fillAddress(selectedName.Organization.Addresses, Municipality, selectedIndex);
                            }
                        }
                    }
                }  //Organization

                $scope.addressSelector[selectedIndex] = $scope.addressData[selectedIndex][0];

            }  //selectedName != undefined
        }

        function fillAddress(addr, city, iindex) {
            if (addr.Address.CountrySubdivision) {
                $scope.addressItem =
                {
                    Line1Tx: (addr.Address.Line1Tx ? addr.Address.Line1Tx : ''),
                    Line2Tx: (addr.Address.Line2Tx ? addr.Address.Line2Tx : ''),
                    Line3Tx: (addr.Address.Line3Tx ? addr.Address.Line3Tx : ''),
                    MunicipalityNm: (city ? city : ''),
                    CountrySubdivisionNm: (addr.Address.CountrySubdivision.CountrySubdivisionNm ? addr.Address.CountrySubdivision.CountrySubdivisionNm : ''),
                    PostalCd: (addr.Address.PostalCd ? addr.Address.PostalCd : '')
                };
            } else {
                $scope.addressItem =
                {
                    Line1Tx: (addr.Address.Line1Tx ? addr.Address.Line1Tx : ''),
                    Line2Tx: (addr.Address.Line2Tx ? addr.Address.Line2Tx : ''),
                    Line3Tx: (addr.Address.Line3Tx ? addr.Address.Line3Tx : ''),
                    MunicipalityNm: (city ? city : ''),
                    PostalCd: (addr.Address.PostalCd ? addr.Address.PostalCd : '')
                };
            }
            $scope.addressData[iindex].push($scope.addressItem);
        };

        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.PartyTypeCd === 'Person') {
                    item.displayName = (item.Person.PersonName.NameSalutationCd ? item.Person.PersonName.NameSalutationCd + ' ' : '') +
                                        item.Person.PersonName.FirstGivenNm + ' ' +
                                        item.Person.SecondGivenNameInitial + ' ' +
                                        item.Person.PersonName.FamilyNm + ' ' +
                                        item.Person.PersonName.FamilyNameGenerationCd;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ').trim();
                    displayData.push(item);
                }
                if (item.PartyTypeCd == 'Organization') {
                    item.displayName = item.Organization.OrganizationNm;
                    displayData.push(item);
                }
            });
            return displayData;
        }

        $scope.TotalCount = [1];

        $scope.AddNewCCSection = function () {
            if ($scope.TotalCount.length <= 10) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }

        $scope.selectedCC = function (clearId) {
            $scope.clearAllData(clearId);
        }

        $scope.RemoveCCSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.CcCheckbox[newItemNo] = false;
                $scope.TotalCount.pop();
                $scope.clearAllData(newItemNo);
             }
        }

        $scope.clearAllData = function (clearId) {
            $scope.selectedCCName[clearId] = undefined;
            $scope.addressData[clearId] = undefined;
            $scope.addressData(newItemNo);
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuCCSectionRepeater', function (event) {
        try {

            var id = 0;
            var AddresseeName = "";
            var Address1 = "";
            var Address2 = "";
            var Address3 = "";
            var City = "";
            var State = "";
            var Zip = "";

            for (i = 0; i <= $scope.CcCheckbox.length; i++) {

                if ($scope.CcCheckbox[i] == true) {

                    if ($scope.selectedCCName[i]) {
                        AddresseeName = $scope.selectedCCName[i].displayName;

                        Address1 = "";
                        Address2 = "";
                        Address3 = "";
                        City = "";
                        State = "";
                        Zip = "";

                        if ($scope.addressSelector[i]) { 

                            if ($scope.addressSelector[i].Line1Tx) {
                                Address1 = $scope.addressSelector[i].Line1Tx.trim();
                            }

                            if ($scope.addressSelector[i].Line2Tx) {
                                Address2 = $scope.addressSelector[i].Line2Tx.trim();
                            }

                            if ($scope.addressSelector[i].Line3Tx) {
                                Address3 = $scope.addressSelector[i].Line2Tx.trim();
                            }
                            if ($scope.addressSelector[i].MunicipalityNm) {
                                City = $scope.addressSelector[i].MunicipalityNm.trim();
                            }
                            if ($scope.addressSelector[i].CountrySubdivisionNm) {
                                State = $scope.addressSelector[i].CountrySubdivisionNm.trim();
                            }
                            if ($scope.addressSelector[i].PostalCd) {
                                Zip = $scope.addressSelector[i].PostalCd.trim();
                            }
                        }
                    }

                    if ($scope.selectedCCName[i]) {
                        HomeService.createSecondaryTableXML("POLICY_CC_OPT");
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "BILL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_BCC_IND", "Y", id);

                        if ($scope.selectedCCName[i].PartyTypeCd && $scope.selectedCCName[i].PartyTypeCd == 'Person') {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_NAME", AddresseeName.trim(), id);
                        } else {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_CO_NM", AddresseeName.trim(), id);
                        }

                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ADDR_1", Address1.trim(), id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ADDR_2", Address2.trim(), id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ADDR_3", Address3.trim(), id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_CTY", City.trim(), id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ST", State.trim(), id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ZIP", Zip.trim(), id);
                    }
                  

                    id = id + 1;
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
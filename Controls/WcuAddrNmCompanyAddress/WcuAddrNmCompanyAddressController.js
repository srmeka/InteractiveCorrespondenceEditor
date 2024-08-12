app.controller('WcuAddrNmCompanyAddressController', function ($scope, shareData, $http, HomeService) {
    try {
        //Get Addressee Name 1

        $scope.AddresseeCompany = JSPath.apply('.Policy.PolicyPeriod.InvolvedParties{.PartyTypeCd == "Organization"}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        //$scope.PrimaryAddress = getData($scope.Addressee);

        $scope.updateAddreesseeAddress = function () {
            $scope.addressData = [];
            $scope.addressItem = [];
            var Municipality = undefined;

            if ($scope.selectedAddresseeComp != undefined) {
                     if ($scope.selectedAddresseeComp.Organization.Addresses) {
                        if (Array.isArray($scope.selectedAddresseeComp.Organization.Addresses)) {
                            for (var i = 0; i < $scope.selectedAddresseeComp.Organization.Addresses.length; i++) {

                                $scope.AddresseeAddress = $scope.selectedAddresseeComp.Organization.Addresses[i].Address;

                                if (Array.isArray($scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality)) {
                                    for (var j = 0; j < $scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality.length; j++) {

                                        if ($scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality[j].MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                            Municipality = ($scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm ? $scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality[j].MunicipalityNm : '');
                                        }
                                    }
                                    fillAddress($scope.selectedAddresseeComp.Organization.Addresses[i], Municipality);

                                } else {

                                    if ($scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality.MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                        Municipality = ($scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality.MunicipalityNm ? $scope.selectedAddresseeComp.Organization.Addresses[i].Address.Municipality.MunicipalityNm : '');
                                    }

                                    fillAddress($scope.selectedAddresseeComp.Organization.Addresses[i], Municipality);
                                }
                            }
                        }
                        else {
                            if (Array.isArray($scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality)) {
                                for (var j = 0; j < $scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality.length; j++) {
                                    if ($scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality[j].MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                        Municipality = ($scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality[j].MunicipalityNm ? $scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality[j].MunicipalityNm : '');
                                    }
                                }
                                fillAddress($scope.selectedAddresseeComp.Organization.Addresses, Municipality);
                            } else {
                                if ($scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality.MunicipalityTypeCd.toUpperCase() == 'CITY') {
                                    Municipality = ($scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality.MunicipalityNm ? $scope.selectedAddresseeComp.Organization.Addresses.Address.Municipality.MunicipalityNm : '');
                                }

                                fillAddress($scope.selectedAddresseeComp.Organization.Addresses, Municipality);
                            }
                        }
                    }
            }  //$scope.selectedAddresseeComp != undefined
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
                if (item.PartyTypeCd == 'Organization') {
                    item.displayName = item.Organization.OrganizationNm;
                    displayData.push(item);
                }

            });
            return displayData;
        }
        
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuAddrNmCompanyAddress', function (event) {
        try {

            if ($scope.AddresseeNameTxt) {
                HomeService.createPrimaryXML("ADDRESSEE_NAME", $scope.AddresseeNameTxt);
            }

            if ($scope.selectedAddresseeComp) {

                HomeService.createPrimaryXML("ADDRESSEE_CO_NM", $scope.selectedAddresseeComp.displayName);

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

        }

        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});
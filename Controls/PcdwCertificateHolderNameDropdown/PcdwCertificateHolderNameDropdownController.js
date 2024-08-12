app.controller('PcdwCertificateHolderNameDropdownController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.Holder = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.HomeownersLine.ListedDwellings.AssociatedParties{.PartyRoles=='AdditionalInterest'}.CertificateOfInsurance", shareData.shareJSONClaim.CorrespondenceDataResponse);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcdwCertificateHolderNameDropdown', function (event) {

        try {
            var Holder = "";
            var id = shareData.shareOutputXML.getElementsByTagName("CERT_INS").length;
            if ($scope.SelectedHolder) {
                HomeService.createSecondaryTableXML("CERT_INS");
                HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HLD_NAME", $scope.SelectedHolder.CertificateHolderNm, id);
                if ($scope.SelectedHolder.Person) {
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ADDR1", $scope.SelectedHolder.Person.Addresses.Address.Line1Tx, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ADDR2", $scope.SelectedHolder.Person.Addresses.Address.Line2Tx, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ADDR3", $scope.SelectedHolder.Person.Addresses.Address.Line3Tx, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_CTY", $scope.SelectedHolder.Person.Addresses.Address.Municipality.MunicipalityNm, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ST", $scope.SelectedHolder.Person.Addresses.Address.CountrySubdivision.CountrySubdivisionNm, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ZIP", $scope.SelectedHolder.Person.Addresses.Address.PostalCd, id);
                }
                else if ($scope.SelectedHolder.Organization) {
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ADDR1", $scope.SelectedHolder.Organization.Addresses.Address.Line1Tx, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ADDR2", $scope.SelectedHolder.Organization.Addresses.Address.Line2Tx, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ADDR3", $scope.SelectedHolder.Organization.Addresses.Address.Line3Tx, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_CTY", $scope.SelectedHolder.Organization.Addresses.Address.Municipality.MunicipalityNm, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ST", $scope.SelectedHolder.Organization.Addresses.Address.CountrySubdivision.CountrySubdivisionNm, id);
                    HomeService.createSecondaryXMLValue("CERT_INS", "CERT_HOLD_ZIP", $scope.SelectedHolder.Organization.Addresses.Address.PostalCd, id);
                }
                HomeService.createSecondaryXMLValue("CERT_INS", "CERT_LOC", $scope.SelectedHolder.CertificateLocationTx, id);
                HomeService.createSecondaryXMLValue("CERT_INS", "POL_FK", "1", id);

            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});
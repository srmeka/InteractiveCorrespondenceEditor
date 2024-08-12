app.controller('ClAddresseeOneController', function ($scope, $http, HomeService, shareData) {

    //Get Addressee Name 1
    // $scope.Addressee = JSPath.apply('.Policy.Party{.PartyRoles{.PartyRole == "Vehicle Driver" || .PartyRole =="Account Holder" || .PartyRole == "Spouse"}}', shareData.shareJSONClaim.CorrespondenceDataResponse)
    try{
        $scope.Addressee = JSPath.apply('.Policy.Party{.PartyRoles{.*}}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.updateAddreesseeAddress = function (SelectedAddressee) {
            // $scope.GreetingName = "Dear " + SelectedAddressee.DisplayName;
            $scope.AddresseeAddress = JSPath.apply(".Policy.Party{._id ==" + SelectedAddressee._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
            // $scope.AddresseeAddress = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedAddressee._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

        $scope.$on('ClAddresseeOne', function (event) {
        //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");
            try{
                var AddresseeName = "";
                if ($scope.SelectedAddressee) {
                    //if ($scope.SelectedAddressee.PartyTypeCd == "Organization") {
                    //    AddresseeName = $scope.SelectedAddressee.Organization.OrganizationNm;
                    //}
                    //else {
                    //    if ($scope.SelectedAddressee.NameSalutationCd) {
                    //        AddresseeName = $scope.SelectedAddressee.NameSalutationCd + " ";
                    //    }
                    //    if ($scope.SelectedAddressee.FirstGivenNm) {
                    //        AddresseeName = AddresseeName + $scope.SelectedAddressee.FirstGivenNm + " ";
                    //    }
                    //    if ($scope.SelectedAddressee.SecondGivenNameInitial) {
                    //        AddresseeName = AddresseeName + $scope.SelectedAddressee.SecondGivenNameInitial + " ";
                    //    }

                    //    if ($scope.SelectedAddressee.FamilyNm) {
                    //        AddresseeName = AddresseeName + $scope.SelectedAddressee.FamilyNm;
                    //    }

                    //    if ($scope.SelectedAddressee.FamilyNameGenerationCd) {
                    //        AddresseeName = AddresseeName + $scope.SelectedAddressee.FamilyNameGenerationCd;
                    //    }
                    //}
                    // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName
                    HomeService.createPrimaryXML("AddresseeName", $scope.SelectedAddressee.DisplayName.trim());

                    if ($scope.SelectedAddress) {
                        if ($scope.SelectedAddress.Address.Line1Tx) {
                            HomeService.createPrimaryXML("AddresseeAddressLine1", $scope.SelectedAddress.Address.Line1Tx.trim());
                        }

                        if ($scope.SelectedAddress.Address.Line2Tx) {
                            HomeService.createPrimaryXML("AddresseeAddressLine2", $scope.SelectedAddress.Address.Line2Tx.trim());
                        }
                        if ($scope.SelectedAddress.Address.Line3Tx) {
                            HomeService.createPrimaryXML("AddresseeAddressLine3", $scope.SelectedAddress.Address.Line3Tx.trim());
                        }
                        if ($scope.SelectedAddress.Address.Municipality[0].MunicipalityNm) {
                            HomeService.createPrimaryXML("AddresseeCity", $scope.SelectedAddress.Address.Municipality[0].MunicipalityNm.trim());
                        }
                        if ($scope.SelectedAddress.Address.CountrySubdivision && $scope.SelectedAddress.Address.CountrySubdivision.CountrySubdivisionNm) {
                            HomeService.createPrimaryXML("AddresseeState", $scope.SelectedAddress.Address.CountrySubdivision.CountrySubdivisionNm.trim());
                        }
                        if ($scope.SelectedAddress.Address.PostalCd) {
                            HomeService.createPrimaryXML("AddresseeZip", $scope.SelectedAddress.Address.PostalCd.trim());
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
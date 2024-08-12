app.controller('PcpaSpousePartnerNameDropdownController', function ($scope, shareData, $http, HomeService) {
    try{
        $scope.SpousePartner = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{.PartyRoles =="Primary Named Insured" || .PartyRoles == "Spouse"}', shareData.shareJSONClaim.CorrespondenceDataResponse);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }


    $scope.$on('PcpaSpousePartnerNameDropdown', function (event) {
        try {
            var SpousePartnerName = "";
            if ($scope.SelectedSpousePartner) {
                if ($scope.SelectedSpousePartner.Person.PersonName.NameSalutationCd) {
                    SpousePartnerName = $scope.SelectedSpousePartner.Person.PersonName.NameSalutationCd + " ";
                }
                if ($scope.SelectedSpousePartner.Person.PersonName.FirstGivenNm) {
                    SpousePartnerName = SpousePartnerName + $scope.SelectedSpousePartner.Person.PersonName.FirstGivenNm + " ";
                }
                if ($scope.SelectedSpousePartner.Person.SecondGivenNameInitial) {
                    SpousePartnerName = SpousePartnerName + $scope.SelectedSpousePartner.Person.SecondGivenNameInitial + " ";
                }
                if ($scope.SelectedSpousePartner.Person.PersonName.FamilyNm) {
                    SpousePartnerName = SpousePartnerName + $scope.SelectedSpousePartner.Person.PersonName.FamilyNm + " ";
                }
                if ($scope.SelectedSpousePartner.Person.PersonName.FamilyNameGenerationCd) {
                    SpousePartnerName = SpousePartnerName + $scope.SelectedSpousePartner.Person.PersonName.FamilyNameGenerationCd + " ";
                }
                //}
                // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName

                if (shareData.shareOutputXML.getElementsByTagName("SPOUSE_PARTNER_NAME")[0]) {
                    shareData.shareOutputXML.getElementsByTagName("SPOUSE_PARTNER_NAME")[0].nodeTypedValue = SpousePartnerName.trim();
                }
                else {
                    HomeService.createPrimaryXML("SPOUSE_PARTNER_NAME", SpousePartnerName.trim());
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
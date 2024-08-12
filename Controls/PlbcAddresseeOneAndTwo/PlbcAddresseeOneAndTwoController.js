app.controller('PlbcAddresseeOneAndTwoController', function ($scope, shareData, $http, HomeService) {
    try{
        //Get Addressee Name 1
        // $scope.Addressee = JSPath.apply('.Policy.Party{.PartyRoles{.PartyRole == "Vehicle Driver" || .PartyRole =="Account Holder" || .PartyRole == "Spouse"}}', shareData.shareJSONClaim.CorrespondenceDataResponse)
   
        $scope.Addressee= JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.updateAddreesseeAddress = function (SelectedAddressee) {
            //  $scope.AddresseeAddress = JSPath.apply(".Policy.Party{._id ==" + SelectedAddressee._id + "}.Addresses{.*}.Address.Line1Tx", shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.AddresseeAddress = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedAddressee._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
        }

        //Get Addressee Name 2 value
        var varAddresseeName2 = "";
       // if (JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Prefix', shareData.shareJSONClaim.CorrespondenceDataResponse)) {
            var varAddresseeName2DisplayName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Prefix.DisplayName', shareData.shareJSONClaim.CorrespondenceDataResponse);
            if (varAddresseeName2DisplayName.length > 0) {
                varAddresseeName2 = varAddresseeName2DisplayName;
            }
       // }

        var varAddresseeName2FirstName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.FirstName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2FirstName.length > 0)
        {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2FirstName;
        }

        var varAddresseeName2MiddleName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.MiddleName', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (varAddresseeName2MiddleName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " "+ varAddresseeName2MiddleName;
        }

        var varAddresseeName2LastName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.LastName', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (varAddresseeName2LastName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " "+ varAddresseeName2LastName;
        }

        var varAddresseeName2DisplayNameSuffix = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Suffix.DisplayName', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (varAddresseeName2DisplayNameSuffix.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2DisplayNameSuffix;
        }

        //$scope.AddresseeName2 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role == "primaryinsured"}}.Contact.entityPerson.FirstName', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.addresseeName2 = varAddresseeName2.trim();
        $scope.addresseeName2ChkDisabled = false;
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PlbcAddresseeOneAndTwo', function (event) {
        //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");
        try{
            var AddresseeName = "";
            if ($scope.SelectedAddressee) {
                if ($scope.SelectedAddressee.Contact.Subtype.Code == "Company") {
                    AddresseeName = $scope.SelectedAddressee.DisplayName;
                }
                else {
                    if ($scope.SelectedAddressee.Contact.entityPerson.Prefix) {
                        if ($scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName != "ESTATE OF") {
                            AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " ";
                        }
                    }
                    if ($scope.SelectedAddressee.Contact.entityPerson.FirstName) {
                        AddresseeName = AddresseeName + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " ";
                    }
                    if ($scope.SelectedAddressee.Contact.entityPerson.MiddleName) {
                        AddresseeName = AddresseeName + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " ";
                    }

                    if ($scope.SelectedAddressee.Contact.entityPerson.LastName) {
                        AddresseeName = AddresseeName + $scope.SelectedAddressee.Contact.entityPerson.LastName;
                    }
                }
                // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName
                HomeService.createPrimaryXML("ADDRESSEE_NAME_1", AddresseeName.trim());


                if ($scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine1) {
                    HomeService.createPrimaryXML("ADDRESSEE_ADDR_1", $scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine1.trim());
                }

                if ($scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine2) {
                    HomeService.createPrimaryXML("ADDRESSEE_ADDR_2", $scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine2.trim());
                }
                if ($scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine3) {
                    HomeService.createPrimaryXML("ADDRESSEE_ADDR_3", $scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine3.trim());
                }
                if ($scope.SelectedAddressee.Contact.PrimaryAddress.City) {
                    HomeService.createPrimaryXML("ADDRESSEE_CTY", $scope.SelectedAddressee.Contact.PrimaryAddress.City.trim());
                }
                if ($scope.SelectedAddressee.Contact.PrimaryAddress.State.Code) {
                    HomeService.createPrimaryXML("ADDRESSEE_ST", $scope.SelectedAddressee.Contact.PrimaryAddress.State.Code.trim());
                }
                if ($scope.SelectedAddressee.Contact.PrimaryAddress.PostalCode) {
                    HomeService.createPrimaryXML("ADDRESSEE_ZIP", $scope.SelectedAddressee.Contact.PrimaryAddress.PostalCode.trim());
                }

                if ($scope.addresseeName2Chk) {
                    HomeService.createPrimaryXML("ADDRESSEE_NAME_2", varAddresseeName2.trim());
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
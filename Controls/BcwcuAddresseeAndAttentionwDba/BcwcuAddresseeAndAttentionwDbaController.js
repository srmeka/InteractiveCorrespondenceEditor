app.controller('BcwcuAddresseeAndAttentionwDbaController', function ($scope, shareData, $http, HomeService) {
    try{
        //Get Addressee Name 1
       //Testing TFS
        //DBA Information
        var DBAAddress;
        var DBAName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.DBA', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var AddressLine1 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.AddressLine1', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var AddressLine2 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.AddressLine2', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var AddressLine3 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.AddressLine3', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var City = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.City', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var State = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.State.Code', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var Zip = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.PostalCode', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (AddressLine1)
        {
            DBAAddress = AddressLine1;
        }
        if (AddressLine2)
        {
            DBAAddress = DBAAddress +" "+AddressLine2;
        }
        if (AddressLine3) {
            DBAAddress = DBAAddress + " " + AddressLine3;
        }
        if (City) {
            DBAAddress = DBAAddress + ", " + City;
        }
        if (State) {
            DBAAddress = DBAAddress + " " + State;
        }
        if (Zip) {
            DBAAddress = DBAAddress + " " + Zip;
        }
        $scope.DBAName = DBAName[0];
        $scope.DBANameLength = DBAName.length;
        $scope.DBAAddress = DBAAddress;
        $scope.AttentionNm = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.Addressee= JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.updateAddreesseeAddress = function (SelectedAddressee) {
            //  $scope.AddresseeAddress = JSPath.apply(".Policy.Party{._id ==" + SelectedAddressee._id + "}.Addresses{.*}.Address.Line1Tx", shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.AddresseeAddress = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedAddressee._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
  

    $scope.$on('BcwcuAddresseeAndAttentionwDba', function (event) {
        try{
            //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");

            // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName
            if ($scope.DBACheckBox == true) {
                if ($scope.DBAName) {
                    HomeService.createPrimaryXML("ADDRESSEE_NAME_1", $scope.DBAName);
                }
                if ($scope.DBAAddress) {
                    if (AddressLine1.length > 0) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_1", AddressLine1);
                    }
                    if (AddressLine2.length > 0) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_2", AddressLine2);
                    }
                    if (AddressLine3.length > 0) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_3", AddressLine3);
                    }
                    if (City.length > 0) {
                        HomeService.createPrimaryXML("ADDRESSEE_CTY", City);
                    }
                    if (State.length > 0) {
                        HomeService.createPrimaryXML("ADDRESSEE_ST", State);
                    }
                    if (Zip.length > 0) {
                        HomeService.createPrimaryXML("ADDRESSEE_ZIP", Zip);
                    }
                }
            }
            else {
                if ($scope.SelectedAttentionNm) {
                    if ($scope.SelectedAttentionNm.DisplayName) {
                        HomeService.createPrimaryXML("ATTN_NAME", $scope.SelectedAttentionNm.DisplayName.trim());
                    }
                }
                if ($scope.SelectedAddressee) {
                    if ($scope.SelectedAddressee.DisplayName) {
                        HomeService.createPrimaryXML("ADDRESSEE_NAME_1", $scope.SelectedAddressee.DisplayName.trim());
                    }

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
                }
            }
           
        } catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });

    });
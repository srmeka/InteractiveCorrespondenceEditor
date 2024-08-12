app.controller('PlbcActStmtAddresseeOneTwoNtRequiredController', function ($scope, shareData, $http, HomeService) {
    //CONTROL SPECIFIC FOR POLICY HOLDER ACCOUNTING STATEMENT

    try {
        //Get Addressee Name 1
        //$scope.Addressee = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.Addressee = JSPath.apply('.UniqueContacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.updateAddreesseeAddress = function (SelectedAddressee) {
            $scope.AddresseeAddress = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedAddressee._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
            //$scope.AddresseeAddress = JSPath.apply(".UniqueContacts.Entry{._id ==" + SelectedAddressee._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);

            $scope.addressData = [];
            $scope.addressItem = [];
            if ($scope.AddresseeAddress != undefined) {

                if (Array.isArray($scope.AddresseeAddress)) {
                    for (var i = 0; i < $scope.AddresseeAddress.length; i++) {

                        if ($scope.AddresseeAddress[i].AllValidAddresses.Entry != undefined) {
                            if (Array.isArray($scope.AddresseeAddress[i].AllValidAddresses.Entry)) {
                                for (var j = 0; j < $scope.AddresseeAddress[i].AllValidAddresses.Entry.length; j++) {
                                    fillAddress($scope.AddresseeAddress[i].AllValidAddresses.Entry[j]);
                                }
                            }
                            else {
                                fillAddress($scope.AddresseeAddress[i].AllValidAddresses.Entry);
                            }
                        }
                    }
                }
                else {
                    fillAddress($scope.AddresseeAddress.AllValidAddresses.Entry);
                }
            }
        }

        function fillAddress(addr) {
            
                $scope.addressItem =
                {
                    AddressLine1: (addr.AddressLine1 ? addr.AddressLine1 : ''),
                    AddressLine2: (addr.AddressLine2 ? addr.AddressLine2 : ''),
                    AddressLine3: (addr.AddressLine3 ? addr.AddressLine3 : ''),
                    City: (addr.City ? addr.City : ''),
                    State: (addr.State.Code ? addr.State.Code : ''),
                    PostalCode: (addr.PostalCode ? addr.PostalCode : '')
                };
   
            $scope.addressData.push($scope.addressItem);
        };

        //Get Addressee Name 2 value
        var varAddresseeName2 = "";

        //var varAddresseeName2DisplayName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Prefix.DisplayName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var varAddresseeName2DisplayName = JSPath.apply('.UniqueContacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Prefix.DisplayName', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (varAddresseeName2DisplayName && varAddresseeName2DisplayName.length > 0) {
            varAddresseeName2 = varAddresseeName2DisplayName[0];
        }

        //var varAddresseeName2FirstName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.FirstName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var varAddresseeName2FirstName = JSPath.apply('.UniqueContacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.FirstName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2FirstName && varAddresseeName2FirstName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2FirstName[0];
        }

        //var varAddresseeName2MiddleName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.MiddleName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var varAddresseeName2MiddleName = JSPath.apply('.UniqueContacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.MiddleName', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (varAddresseeName2MiddleName && varAddresseeName2MiddleName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2MiddleName[0];
        }

        //var varAddresseeName2LastName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.LastName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var varAddresseeName2LastName = JSPath.apply('.UniqueContacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.LastName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2LastName && varAddresseeName2LastName.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2LastName[0];
        }

        //var varAddresseeName2DisplayNameSuffix = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Suffix.DisplayName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var varAddresseeName2DisplayNameSuffix = JSPath.apply('.UniqueContacts.Entry{.Roles.Entry{.Role.Code == "SecondaryContact_Ext"}}.Contact.entityPerson.Suffix.DisplayName', shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (varAddresseeName2DisplayNameSuffix && varAddresseeName2DisplayNameSuffix.length > 0) {
            varAddresseeName2 = varAddresseeName2 + " " + varAddresseeName2DisplayNameSuffix[0];
        }

        $scope.addresseeName2 = varAddresseeName2;
        $scope.addresseeName2ChkDisabled = false;
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PlbcActStmtAddresseeOneTwoNtRequired', function (event) {
        //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");
        try {
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
                if($scope.SelectedAddress){ // 8-7-20 Added condition to account for error when user pick addressee and not an address cbudson
                    if ($scope.SelectedAddress.AddressLine1) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_1", $scope.SelectedAddress.AddressLine1.trim());
                    }

                    if ($scope.SelectedAddress.AddressLine2) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_2", $scope.SelectedAddress.AddressLine2.trim());
                    }
                    if ($scope.SelectedAddress.AddressLine3) {
                        HomeService.createPrimaryXML("ADDRESSEE_ADDR_3", $scope.SelectedAddress.AddressLine3.trim());
                    }
                    if ($scope.SelectedAddress.City) {
                        HomeService.createPrimaryXML("ADDRESSEE_CTY", $scope.SelectedAddress.City.trim());
                    }
                    if ($scope.SelectedAddress.State) {
                        HomeService.createPrimaryXML("ADDRESSEE_ST", $scope.SelectedAddress.State.trim());
                    }
                    if ($scope.SelectedAddress.PostalCode) {
                        HomeService.createPrimaryXML("ADDRESSEE_ZIP", $scope.SelectedAddress.PostalCode.trim());
                    }
                }
                if ($scope.addresseeName2Chk) {
                    HomeService.createPrimaryXML("ADDRESSEE_NAME_2", varAddresseeName2.trim());
                }


                //if ($scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine1) {
                //    HomeService.createPrimaryXML("ADDRESSEE_ADDR_1", $scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine1.trim());
                //}
                //if ($scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine2) {
                //    HomeService.createPrimaryXML("ADDRESSEE_ADDR_2", $scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine2.trim());
                //}
                //if ($scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine3) {
                //    HomeService.createPrimaryXML("ADDRESSEE_ADDR_3", $scope.SelectedAddressee.Contact.PrimaryAddress.AddressLine3.trim());
                //}
                //if ($scope.SelectedAddressee.Contact.PrimaryAddress.City) {
                //    HomeService.createPrimaryXML("ADDRESSEE_CTY", $scope.SelectedAddressee.Contact.PrimaryAddress.City.trim());
                //}
                //if ($scope.SelectedAddressee.Contact.PrimaryAddress.State.Code) {
                //    HomeService.createPrimaryXML("ADDRESSEE_ST", $scope.SelectedAddressee.Contact.PrimaryAddress.State.Code.trim());
                //}
                //if ($scope.SelectedAddressee.Contact.PrimaryAddress.PostalCode) {
                //    HomeService.createPrimaryXML("ADDRESSEE_ZIP", $scope.SelectedAddressee.Contact.PrimaryAddress.PostalCode.trim());
                //}

                //if ($scope.addresseeName2Chk) {
                //    HomeService.createPrimaryXML("ADDRESSEE_NAME_2", varAddresseeName2.trim());
                //}
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});
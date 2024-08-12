app.controller('BcwcuAddresseewDbaController', function ($scope, shareData, $http, HomeService) {
    try {
        //Get Addressee Name 1
        //DBA Information

        var DBAAddress;
        var DBAName = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.DBA', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var AddressLine1 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.AddressLine1', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var AddressLine2 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.AddressLine2', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var AddressLine3 = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.AddressLine3', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var City = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.City', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var State = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.State.Code', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var Zip = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.PrimaryInsured{.Roles.Entry.Role.Code == "primaryinsured"}.Contact.PrimaryAddress.PostalCode', shareData.shareJSONClaim.CorrespondenceDataResponse);

        if (AddressLine1) {
            DBAAddress = AddressLine1;
        }
        if (AddressLine2) {
            DBAAddress = DBAAddress + " " + AddressLine2;
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
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('BcwcuAddresseewDba', function (event) {
        try {
            if ($scope.DBACheckBox == true) {
                if ($scope.DBAName) {

                    var UpdDBAName = shareData.shareOutputXML.getElementsByTagName("INS_POL_HLD_NAME_1")[0].nodeTypedValue;
                    if (UpdDBAName) {
                        shareData.shareOutputXML.getElementsByTagName('INS_POL_HLD_NAME_1')[0].nodeTypedValue = $scope.DBAName;
                    }

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

                if ($scope.SelectedAddressee) {
                    if ($scope.SelectedAddressee.DisplayName) {
                        HomeService.createPrimaryXML("ADDRESSEE_NAME_1", $scope.SelectedAddressee.DisplayName.trim());
                    }

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
                }
            }

        } catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });

});
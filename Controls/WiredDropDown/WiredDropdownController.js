app.controller('WiredDropdownController', function ($scope, shareData, $http) {

   // $scope.Addressee = JSPath.apply('.Policy.Party{.PartyRoles{.PartyRole == "Vehicle Driver" || .PartyRole =="Account Holder" || .PartyRole == "Spouse"}}', shareData.shareJSONClaim.CorrespondenceDataResponse)
    $scope.Addressee = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse)

    $scope.updateAddreesseeAddress = function (SelectedAddressee) {
      //  $scope.AddresseeAddress = JSPath.apply(".Policy.Party{._id ==" + SelectedAddressee._id + "}.Addresses{.*}.Address.Line1Tx", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.AddresseeAddress = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedAddressee._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
    }

    $scope.$on('WiredDropdown', function (event) {
        var root = shareData.shareOutputXML.getElementsByTagName("BILLING_REC")[0];
        //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");
        var AddresseeElement = "ADDRESSEE_NAME_1";
        var AddresseeName = "";
        if ($scope.SelectedAddressee.Contact.entityPerson.Prefix)
        {
            AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName+" ";
        }
        if ($scope.SelectedAddressee.Contact.entityPerson.FirstName)
        {
            AddresseeName = AddresseeName + $scope.SelectedAddressee.Contact.entityPerson.FirstName+" ";
        }
        if ($scope.SelectedAddressee.Contact.entityPerson.MiddleName)
        {
            AddresseeName = AddresseeName + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " ";
        }

        if ($scope.SelectedAddressee.Contact.entityPerson.LastName)
        {
            AddresseeName = AddresseeName + $scope.SelectedAddressee.Contact.entityPerson.LastName;
        }
       // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName
        var AddresseeNameElement = shareData.shareOutputXML.createElement(AddresseeElement);
        AddresseeNameElement.appendChild(shareData.shareOutputXML.createTextNode(AddresseeName));
        root.appendChild(AddresseeNameElement);

        var AddresseeAddressElement = shareData.shareOutputXML.createElement(document.getElementById('AddresseeAddressID').getAttribute("xml"));
        AddresseeAddressElement.appendChild(shareData.shareOutputXML.createTextNode($scope.SelectedAddress.AddressLine1));
        root.appendChild(AddresseeAddressElement);
    });
});
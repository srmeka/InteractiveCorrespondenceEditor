app.controller('PlbcAddresseewAttentionNmController', function ($scope, shareData, $http, HomeService) {
    try{
        //Get Addressee Name 1
        // $scope.Addressee = JSPath.apply('.Policy.Party{.PartyRoles{.PartyRole == "Vehicle Driver" || .PartyRole =="Account Holder" || .PartyRole == "Spouse"}}', shareData.shareJSONClaim.CorrespondenceDataResponse)
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
  

    $scope.$on('PlbcAddresseewAttentionNm', function (event) {
        try{
            //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");

            // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName
            if ($scope.SelectedAttentionNm) {
                if ($scope.SelectedAttentionNm.DisplayName) {
                    HomeService.createPrimaryXML("ATTN_NAME", $scope.SelectedAttentionNm.DisplayName.trim());
                }
            }
            if ($scope.SelectedAddressee){
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
           
        } catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });

    });
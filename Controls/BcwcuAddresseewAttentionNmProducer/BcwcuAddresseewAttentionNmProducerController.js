app.controller('BcwcuAddresseewAttentionNmProducerController', function ($scope, shareData, $http, HomeService) {
    try{
        //Get Addressee Name 1
        // $scope.Addressee = JSPath.apply('.Policy.Party{.PartyRoles{.PartyRole == "Vehicle Driver" || .PartyRole =="Account Holder" || .PartyRole == "Spouse"}}', shareData.shareJSONClaim.CorrespondenceDataResponse)
        $scope.AttentionNm = JSPath.apply('.ProducerStatments{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.Addressee = JSPath.apply('.ProducerStatments{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.updateAddreesseeAddress = function (SelectedAddressee) {
            //  $scope.AddresseeAddress = JSPath.apply(".Policy.Party{._id ==" + SelectedAddressee._id + "}.Addresses{.*}.Address.Line1Tx", shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.AddresseeAddress = JSPath.apply(".ProducerStatments{._id ==" + SelectedAddressee._id + "}.Producer.Address_Ext", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
  

    $scope.$on('BcwcuAddresseewAttentionNmProducer', function (event) {
        try{
            //var XMLNode = document.getElementById('AddresseeNameID').getAttribute("xml");

            // var AddresseeName = $scope.SelectedAddressee.Contact.entityPerson.Prefix.DisplayName + " " + $scope.SelectedAddressee.Contact.entityPerson.FirstName + " " + $scope.SelectedAddressee.Contact.entityPerson.MiddleName + " " + $scope.SelectedAddressee.Contact.entityPerson.LastName
            if ($scope.SelectedAttentionNm) {
                if ($scope.SelectedAttentionNm.Producer.Name) {
                    HomeService.createPrimaryXML("ATTN_NAME", $scope.SelectedAttentionNm.Producer.Name.trim());
                }
            }
            if ($scope.SelectedAddressee){
                if ($scope.SelectedAddressee.Producer.Name) {
                    HomeService.createPrimaryXML("ADDRESSEE_NAME_1", $scope.SelectedAddressee.Producer.Name.toString().trim());
                }

                if ($scope.SelectedAddress.AddressLine1) {
                    HomeService.createPrimaryXML("ADDRESSEE_ADDR_1", $scope.SelectedAddress.AddressLine1.toString().trim());
                }

                if ($scope.SelectedAddress.AddressLine2) {
                    HomeService.createPrimaryXML("ADDRESSEE_ADDR_2", $scope.SelectedAddress.AddressLine2.toString().trim());
                }
                if ($scope.SelectedAddress.AddressLine3) {
                    HomeService.createPrimaryXML("ADDRESSEE_ADDR_3", $scope.SelectedAddress.AddressLine3.toString().trim());
                }
                if ($scope.SelectedAddress.City) {
                    HomeService.createPrimaryXML("ADDRESSEE_CTY", $scope.SelectedAddress.City.toString().trim());
                }
                if ($scope.SelectedAddress.State.Code) {
                    HomeService.createPrimaryXML("ADDRESSEE_ST", $scope.SelectedAddress.State.Code.toString().trim());
                }
                if ($scope.SelectedAddress.PostalCode) {
                    HomeService.createPrimaryXML("ADDRESSEE_ZIP", $scope.SelectedAddress.PostalCode.toString().trim());
                }
            }
           
        } catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });

    });
app.controller('ClCcSectionController', function ($scope, shareData, $http, HomeService) {
    try{
        $scope.CcCheckbox = new Array;
        $scope.CcName = new Array;
        $scope.CcAddress = new Array;
        $scope.AddresseeName = new Array;

        $scope.CCNameData = JSPath.apply('.Policy.Party{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.updateCCAddress0 = function (SelectedCCName) {
            $scope.CCAddressData0 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress1 = function (SelectedCCName) {
            $scope.CCAddressData1 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress2 = function (SelectedCCName) {
            $scope.CCAddressData2 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress3 = function (SelectedCCName) {
            $scope.CCAddressData3 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress4 = function (SelectedCCName) {
            $scope.CCAddressData4 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress5 = function (SelectedCCName) {
            $scope.CCAddressData5 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress6 = function (SelectedCCName) {
            $scope.CCAddressData6 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress7 = function (SelectedCCName) {
            $scope.CCAddressData7 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress8 = function (SelectedCCName) {
            $scope.CCAddressData8 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress9 = function (SelectedCCName) {
            $scope.CCAddressData9 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress10 = function (SelectedCCName) {
            $scope.CCAddressData10 = JSPath.apply(".Policy.Party{._id ==" + SelectedCCName._id + "}.Addresses", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }

        $scope.TotalCount = [1];

        $scope.AddNewCCSection = function ()
        {
            if ($scope.TotalCount.length <= 10)
            {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }
        $scope.RemoveCCSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.CcCheckbox[newItemNo] = false;
                $scope.TotalCount.pop();
            }
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
  
    $scope.$on('ClCcSection', function (event) {
        try{
            var id = 0;
            HomeService.createSecondaryTableXML("CopiesTo");
            for (i = 0; i <= $scope.CcCheckbox.length; i++)
            {
                if ($scope.CcCheckbox[i] == true)
                {
                    HomeService.createSecondaryXMLValue("CopiesTo", "CopyTo", "", 0);
                    if ($scope.AddresseeName[i])
                    {
                        HomeService.createSecondaryXMLValue("CopyTo", "CopyToName", $scope.AddresseeName[i].trim(), id);
                    }
                
                    if ($scope.CcName[i]) {
                        HomeService.createSecondaryXMLValue("CopyTo", "CopyToCompanyName", $scope.CcName[i].DisplayName.trim(), id);
                    }

                    if ($scope.CcAddress[i]) {
                        if ($scope.CcAddress[i].Address.Line1Tx) {
                            HomeService.createSecondaryXMLValue("CopyTo", "CopyToAddressLine1", $scope.CcAddress[i].Address.Line1Tx.trim(), id);
                        }

                        if ($scope.CcAddress[i].Address.Line2Tx) {
                            HomeService.createSecondaryXMLValue("CopyTo", "CopyToAddressLine2", $scope.CcAddress[i].Address.Line2Tx.trim(), id);
                        }
                        if ($scope.CcAddress[i].Address.Line3Tx) {
                            HomeService.createSecondaryXMLValue("CopyTo", "CopyToAddressLine3", $scope.CcAddress[i].Address.Line3Tx.trim(), id);
                        }
                        if ($scope.CcAddress[i].Address.Municipality[0].MunicipalityNm) {
                            HomeService.createSecondaryXMLValue("CopyTo", "CopyToCity", $scope.CcAddress[i].Address.Municipality[0].MunicipalityNm.trim(), id);
                        }
                        if ($scope.CcAddress[i].Address.CountrySubdivision.CountrySubdivisionNm) {
                            HomeService.createSecondaryXMLValue("CopyTo", "CopyToState", $scope.CcAddress[i].Address.CountrySubdivision.CountrySubdivisionNm.trim(), id);
                        }
                        if ($scope.CcAddress[i].Address.PostalCd) {
                            HomeService.createSecondaryXMLValue("CopyTo", "CopyToZIP", $scope.CcAddress[i].Address.PostalCd.trim(), id);
                        }
                    }
                        id = id + 1;
                    
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

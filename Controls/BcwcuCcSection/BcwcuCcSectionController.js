﻿app.controller('BcwcuCcSectionController', function ($scope, shareData, $http, HomeService) {
    try{
        $scope.CcCheckbox = new Array;
        $scope.CcName = new Array;
        $scope.CcAddress = new Array;
        $scope.AttentionName = new Array;

        $scope.AttentionNameData = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.CCNameData = JSPath.apply('.AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.updateCCAddress0 = function (SelectedCCName) {
            $scope.CCAddressData0 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress1 = function (SelectedCCName) {
            $scope.CCAddressData1 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress2 = function (SelectedCCName) {
            $scope.CCAddressData2 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress3 = function (SelectedCCName) {
            $scope.CCAddressData3 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress4 = function (SelectedCCName) {
            $scope.CCAddressData4 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress5 = function (SelectedCCName) {
            $scope.CCAddressData5 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress6 = function (SelectedCCName) {
            $scope.CCAddressData6 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress7 = function (SelectedCCName) {
            $scope.CCAddressData7 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress8 = function (SelectedCCName) {
            $scope.CCAddressData8 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress9 = function (SelectedCCName) {
            $scope.CCAddressData9 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
        }
        $scope.updateCCAddress10 = function (SelectedCCName) {
            $scope.CCAddressData10 = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.Contacts.Entry{._id ==" + SelectedCCName._id + "}.Contact", shareData.shareJSONClaim.CorrespondenceDataResponse);
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
  
    $scope.$on('BcwcuCcSection', function (event) {
        try{
            var id = shareData.shareOutputXML.getElementsByTagName("BILLING_CC_OPT").length;
         
            for (i = 0; i <= $scope.CcCheckbox.length; i++)
            {
                if ($scope.CcCheckbox[i] == true)
                {
                    HomeService.createSecondaryTableXML("BILLING_CC_OPT");
                    HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "BILL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_BCC_IND", "Y", id);
                    // HomeService.createSecondaryXMLValue("CopiesTo", "CopyTo", "", 0);
                    if ($scope.AttentionName[i])
                    {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ATTN_NAME", $scope.AttentionName[i].DisplayName.trim(), id);
                    }
                
                    if ($scope.CcName[i]) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_NAME_1", $scope.CcName[i].DisplayName.trim(), id);
                    }
                    if ($scope.CcAddress[i]){
                    if ($scope.CcAddress[i].PrimaryAddress.AddressLine1) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_ADDR_1", $scope.CcAddress[i].PrimaryAddress.AddressLine1.trim(), id);
                    }

                    if ($scope.CcAddress[i].PrimaryAddress.AddressLine2) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_ADDR_2", $scope.CcAddress[i].PrimaryAddress.AddressLine2.trim(), id);
                    }
                    if ($scope.CcAddress[i].PrimaryAddress.AddressLine3) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_ADDR_3", $scope.CcAddress[i].PrimaryAddress.AddressLine3.trim(), id);
                    }
                    if ($scope.CcAddress[i].PrimaryAddress.City) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_CTY", $scope.CcAddress[i].PrimaryAddress.City.trim(), id);
                    }
                    if ($scope.CcAddress[i].PrimaryAddress.State) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_ST", $scope.CcAddress[i].PrimaryAddress.State.Code.trim(), id);
                    }
                    if ($scope.CcAddress[i].PrimaryAddress.PostalCode) {
                        HomeService.createSecondaryXMLValue("BILLING_CC_OPT", "CC_ADDRESSEE_ZIP", $scope.CcAddress[i].PrimaryAddress.PostalCode.trim(), id);
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

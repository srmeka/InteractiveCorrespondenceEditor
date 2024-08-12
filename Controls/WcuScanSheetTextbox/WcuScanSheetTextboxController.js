app.controller('WcuScanSheetTextboxController', function ($scope, shareData, $http, HomeService, $filter) {

    try {

        var Policy = JSPath.apply(".Policy.PolicyNumber", shareData.shareJSONClaim.CorrespondenceDataResponse);
        var Account = JSPath.apply(".Policy.Account.AccountNo", shareData.shareJSONClaim.CorrespondenceDataResponse);
        var Quote = JSPath.apply(".Policy.PolicyPeriod.QuoteNr", shareData.shareJSONClaim.CorrespondenceDataResponse);
   
        Account = Account[0].substring(0, Account[0].length - 1);
        Policy = Policy[0].substring(0, Policy[0].length - 1);

        switch ($scope.SelectedDocument.documentFriendlyName) {

            case 'WCU Correspondence':

                if ($scope.Category.categoryFriendlyName == "ZScansheet Engineering") {

                    $scope.LabelName1 = "Policy Number:";
                    $scope.ScanSheetTextBoxValue1 = Policy;
                    $scope.ReadOnly1 = true;

                    $scope.LabelName2 = "Account Number:";
                    $scope.ScanSheetTextBoxValue2 = Account;
                    $scope.ReadOnly2 = true;

                    $scope.LabelName3 = "Document Types:";
                    $scope.ScanSheetTextBoxValue3 = "WCU Correspondence";
                    $scope.ReadOnly3 = true;

                    $scope.LabelName4 = "Correspondence Type:";
                    $scope.ScanSheetTextBoxValue4 = "Engineering";
                    $scope.ReadOnly4 = true;

                    break;
                }

                if ($scope.Category.categoryFriendlyName == "ZScansheet Premium Audit") {
                    $scope.LabelName1 = "Policy Number:";
                    $scope.ScanSheetTextBoxValue1 = Policy;
                    $scope.ReadOnly1 = true;

                    $scope.LabelName2 = "Account Number:";
                    $scope.ScanSheetTextBoxValue2 = Account;
                    $scope.ReadOnly2 = true;
                    break;
                }

                if ($scope.Category.categoryFriendlyName == "ZScansheet WCU") {
                    $scope.LabelName1 = "Policy Number:";
                    $scope.ScanSheetTextBoxValue1 = Policy;
                    $scope.ReadOnly1 = true;

                    $scope.LabelName2 = "Quote Number:";
                    $scope.ScanSheetTextBoxValue2 = Quote;
                    $scope.ReadOnly2 = true;

                    $scope.LabelName3 = "Account Number:";
                    $scope.ScanSheetTextBoxValue3 = Account;
                    $scope.ReadOnly3 = true;
                    break;
                }

            case 'WCU Audit':
            case "WCU Binder":
            case "WCU Experience Rating":
            case 'WCU Renewal Questionnaire':
            case 'WCU Retro':
            case 'WCU Returned Mail':
            case 'WCU Underwriting':

                $scope.LabelName1 = "Policy Number:";
                $scope.ScanSheetTextBoxValue1 = Policy;
                $scope.ReadOnly1 = true;

                $scope.LabelName2 = "Account Number:";
                $scope.ScanSheetTextBoxValue2 = Account;
                $scope.ReadOnly2 = true;
                break;

            case 'WCU Application':
            case 'WCU Coverage Selection Form':
            case 'WCU Quotation':

                $scope.LabelName1 = "Policy Number:";
                $scope.ScanSheetTextBoxValue1 = Policy;
                $scope.ReadOnly1 = true;

                $scope.LabelName2 = "Quote Number:";
                $scope.ScanSheetTextBoxValue2 = Quote;
                $scope.ReadOnly2 = true;

                $scope.LabelName3 = "Account Number:";
                $scope.ScanSheetTextBoxValue3 = Account;
                $scope.ReadOnly3 = true;
                break;

            case 'WCU Certificates of Insurance':

                $scope.LabelName1 = "Policy Number:";
                $scope.ScanSheetTextBoxValue1 = Policy;
                $scope.ReadOnly1 = true;

                $scope.LabelName2 = "Account Number:";
                $scope.ScanSheetTextBoxValue2 = Account;
                $scope.ReadOnly2 = true;

                $scope.LabelName3 = "WC Certificate Type:";
                $scope.ScanSheetTextBoxValue3 = "Individual";
                $scope.ReadOnly3 = true;

                $scope.LabelName4 = "* WC Certificate Holder:";
                $scope.Required4 = true;
                $scope.MaxLen4 = 250;
                $scope.ReadOnly4 = false;

                break;
        };

        $scope.validateNumber1 = function (inputValue, textType) {
            if (inputValue && textType == "onlyNumbers") {
                inputValue = inputValue.replace(/[^0-9]/g, '');
            }
            return inputValue;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuScanSheetTextbox', function (event) {
        try {

            switch ($scope.SelectedDocument.documentFriendlyName) {
                case 'WCU Correspondence':

                    if ($scope.Category.categoryFriendlyName == "ZScansheet Engineering") {
                        HomeService.createPrimaryXML("TAG4", "Policy Number:");
                        HomeService.createPrimaryXML("TAG4_NUM", "004:");
                        HomeService.createPrimaryXML("VALUE4", Policy);
                        
                        HomeService.createPrimaryXML("TAG5", "Account Number:");
                        HomeService.createPrimaryXML("TAG5_NUM", "080:");
                        HomeService.createPrimaryXML("VALUE5", Account);

                        HomeService.createPrimaryXML("TAG9", "Correspondence Type:");
                        HomeService.createPrimaryXML("TAG9_NUM", "078:");
                        HomeService.createPrimaryXML("VALUE9", "Engineering");

                        break;
                    }
                    if ($scope.Category.categoryFriendlyName == "ZScansheet Premium Audit") {
                        HomeService.createPrimaryXML("TAG4", "Policy Number:");
                        HomeService.createPrimaryXML("TAG4_NUM", "004:");
                        HomeService.createPrimaryXML("VALUE4", Policy);

                        HomeService.createPrimaryXML("TAG5", "Account Number:");
                        HomeService.createPrimaryXML("TAG5_NUM", "080:");
                        HomeService.createPrimaryXML("VALUE5", Account);
                        break;
                    }
                    if ($scope.Category.categoryFriendlyName == "ZScansheet WCU") {
                        HomeService.createPrimaryXML("TAG4", "Policy Number:");
                        HomeService.createPrimaryXML("TAG4_NUM", "004:");
                        HomeService.createPrimaryXML("VALUE4", Policy);

                        HomeService.createPrimaryXML("TAG5", "Account Number:");
                        HomeService.createPrimaryXML("TAG5_NUM", "080:");
                        HomeService.createPrimaryXML("VALUE5", Account);

                        HomeService.createPrimaryXML("TAG6", "Quote Number:");
                        HomeService.createPrimaryXML("TAG6_NUM", "035:");
                        HomeService.createPrimaryXML("VALUE6", Quote);
                        break;
                    }

                case 'WCU Audit':
                case 'WCU Binder':
                case 'WCU Certificates of Insurance':
                case 'WCU Experience Rating':
                case 'WCU Renewal Questionnaire':
                case 'WCU Retro':
                case 'WCU Returned Mail':
                case 'WCU Underwriting':

                    HomeService.createPrimaryXML("TAG4", "Policy Number:");
                    HomeService.createPrimaryXML("TAG4_NUM", "004:");
                    HomeService.createPrimaryXML("VALUE4", Policy);

                    HomeService.createPrimaryXML("TAG5", "Account Number:");
                    HomeService.createPrimaryXML("TAG5_NUM", "080:");
                    HomeService.createPrimaryXML("VALUE5", Account);

                    if ($scope.SelectedDocument.documentFriendlyName == "WCU Certificates of Insurance") {
                        HomeService.createPrimaryXML("TAG7", "Certificate Type:");
                        HomeService.createPrimaryXML("TAG7_NUM", "008:");
                        HomeService.createPrimaryXML("VALUE7", "Individual");

                        HomeService.createPrimaryXML("TAG8", "Certificate Holder:");
                        HomeService.createPrimaryXML("TAG8_NUM", "009:");
                        HomeService.createPrimaryXML("VALUE8", $scope.ScanSheetTextBoxValue4);
                    }
                    break;

                case 'WCU Application':
                case 'WCU Coverage Selection Form':
                case 'WCU Quotation':

                    HomeService.createPrimaryXML("TAG4", "Policy Number:");
                    HomeService.createPrimaryXML("TAG4_NUM", "004:");
                    HomeService.createPrimaryXML("VALUE4", Policy);

                    HomeService.createPrimaryXML("TAG5", "Account Number:");
                    HomeService.createPrimaryXML("TAG5_NUM", "080:");
                    HomeService.createPrimaryXML("VALUE5", Account);

                    HomeService.createPrimaryXML("TAG6", "Quote Number:");
                    HomeService.createPrimaryXML("TAG6_NUM", "035:");
                    HomeService.createPrimaryXML("VALUE6", Quote);
                    break;
            };

        } //try
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
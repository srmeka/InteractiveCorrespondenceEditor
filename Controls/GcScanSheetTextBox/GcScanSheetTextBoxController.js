app.controller('GcScanSheetTextBoxController', function ($scope, shareData, $http, HomeService, $filter) {

    try {

        $scope.Hint1 = "";
        $scope.Hint2 = "";
        $scope.Hint3 = "";
        $scope.Hint4 = "";
        
        switch ($scope.SelectedDocument.documentFriendlyName) {
            case 'Arbitration Decision':
            case 'Arbitration Demand':
            case 'Arbitration Filing':
            case 'Arbitration Submission':
            case 'Settlement Offer':
            case 'Notice':
            case 'Summons and Complaint':
                $scope.LabelName1 = "* Sender:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "Payee:";
                $scope.Required2 = false;
                $scope.MaxLen2 = 40;

                $scope.LabelName3 = "Forum File Number:";
                $scope.Required3 = false;
                $scope.MaxLen3 = 25;
                break;

            case 'Correspondence Out':
            case 'Form':
            case 'Memo':

                $scope.LabelName1 = "Template Name:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 35
                break;

            case 'Email':
            case 'Wage and Salary':
            case 'Conversion Documents':
                $scope.LabelName1 = "Sender:";
                $scope.Required1 = false;
                $scope.MaxLen1 = 40;
                break;

            case 'Medical EOB':
            case 'Void Stop':
                $scope.LabelName1 = "* Payee:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "* Payee Tax ID:";
                $scope.Required2 = true;
                $scope.MaxLen2 = 9;
                $scope.Hint2 = "NNNNNNNNN";
                $scope.TextType2 = "onlyNumbers";
                
                $scope.LabelName3 = "Provider Name:";
                $scope.Required3 = false;
                $scope.MaxLen3 = 40;

                $scope.LabelName4 = "Payment Number:";
                $scope.Required4 = false;
                $scope.MaxLen4 = 4;
                $scope.Hint4 = "NNNN";
                $scope.TextType4 = "onlyNumbers";
               break;

            case 'Extended Benefits':
            case 'Lien Document':
            case 'Miscellaneous':
            case 'Denial Letter':
            case 'Discovery':
            case 'Investigative Document':
            case 'Subrogation Proofs':
            case 'Letter of Representation':
            case 'Motion and Brief':
            case 'Sworn Statement':
            case 'Authorization':
                $scope.LabelName1 = "* Sender:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;
                break;

            case 'W9':
            case 'Bulk Billing Sheet':
            case 'Peer Review Report':
            case 'Peer Review Bill':
            case 'Uniform Bill':
            case 'Attorney Bill':
            case 'Bulk Bill':
            case 'Miscellaneous Bill':
            case 'Records Fee Bill':
            case 'Salvage Invoice':
            case 'Vendor Bill':
                $scope.LabelName1 = "* Payee:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "* Payee Tax ID:";
                $scope.Required2 = true;
                $scope.MaxLen2 = 9;
                $scope.Hint2 = "NNNNNNNNN";
                $scope.TextType2 = "onlyNumbers";
                break;

            case 'Closing Document':
                $scope.LabelName1 = "Sender:";
                $scope.Required1 = false;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "Payee:";
                $scope.Required2 = false;
                $scope.MaxLen2 = 40;

                $scope.LabelName3 = "Forum File Number:";
                $scope.Required3 = false;
                $scope.MaxLen3 = 25;
                break;

            case 'Salvage Bulk Report':
            case 'Commencement of Treatment':
                $scope.LabelName1 = "* Payee:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;
                break;

            case 'SIU Documentation':
            case 'Subpoena':
            case 'Independent Medical Exam':
            case 'Medical Records':
                $scope.LabelName1 = "Payee:";
                $scope.Required1 = false;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "Provider Name:";
                $scope.Required2 = false;
                $scope.MaxLen2 = 40;

            case 'Answer to Filed Complaint':
            case 'Release':
                $scope.LabelName1 = "Payee:";
                $scope.Required1 = false;
                $scope.MaxLen1 = 40;
                break;

            case 'Attorney Correspondence':
                $scope.LabelName1 = "* Sender:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "Payee:";
                $scope.Required2 = false;
                $scope.MaxLen2 = 40;

                $scope.LabelName3 = "Payee Tax ID:";
                $scope.Required3 = false;
                $scope.MaxLen3 = 9;
                $scope.Hint3 = "NNNNNNNNN";
                $scope.TextType3 = "onlyNumbers";
               
                $scope.LabelName4 = "Forum File Number:";
                $scope.Required4 = false;
                $scope.MaxLen4 = 25;
                break;

            case 'Court Order':
                $scope.LabelName1 = "* Sender:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "Payee:";
                $scope.Required2 = false;
                $scope.MaxLen2 = 40;
                break;

            case 'Title':
                $scope.LabelName1 = "* VIN";
                $scope.Required1 = true;
                $scope.MaxLen1 = 17;
                break;

            case 'Diagnostic Report':
            case 'Operative Report':
                $scope.LabelName1 = "* Payee:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "Provider Name:";
                $scope.Required2 = false;
                $scope.MaxLen2 = 40;
                break;

            case 'Medical Attachment':
            case 'Precert':
            case 'Audit Invoice':
            case 'IME Bill':
            case 'Medical Bills':
            case 'Payment Appeal':
            case 'Surgical Bill':
                $scope.LabelName1 = "* Payee:";
                $scope.Required1 = true;
                $scope.MaxLen1 = 40;

                $scope.LabelName2 = "* Payee Tax ID:";
                $scope.Required2 = true;
                $scope.MaxLen2 = 9;
                $scope.Hint2 = "NNNNNNNNN";
                $scope.TextType2 = "onlyNumbers";
               
                $scope.LabelName3 = "Provider Name:";
                $scope.Required3 = false;
                $scope.MaxLen3 = 40;
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
    $scope.$on('GcScanSheetTextBox', function (event) {
        try {

            switch ($scope.SelectedDocument.documentFriendlyName) {
                case 'Arbitration Decision':
                case 'Arbitration Demand':
                case 'Arbitration Filing':
                case 'Arbitration Submission':
                case 'Settlement Offer':
                case 'Notice':
                case 'Summons and Complaint':
                    HomeService.createPrimaryXML("TAG7", "Sender:");
                    HomeService.createPrimaryXML("TAG7_NUM", "027:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);

                    if ($scope.GcScanSheetTextBoxValue2) {
                        HomeService.createPrimaryXML("TAG8", "Payee:");
                        HomeService.createPrimaryXML("TAG8_NUM", "021:");
                        HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);
                    } else {
                        HomeService.createPrimaryXML("TAG8", "");
                        HomeService.createPrimaryXML("TAG8_NUM", "");
                        HomeService.createPrimaryXML("VALUE8", "");
                    };

                    if ($scope.GcScanSheetTextBoxValue3) {
                        HomeService.createPrimaryXML("TAG9", "Forum File Number:");
                        HomeService.createPrimaryXML("TAG9_NUM", "052:");
                        HomeService.createPrimaryXML("VALUE9", $scope.GcScanSheetTextBoxValue3);
                    } else {
                        HomeService.createPrimaryXML("TAG9", "");
                        HomeService.createPrimaryXML("TAG9_NUM", "");
                        HomeService.createPrimaryXML("VALUE9", "");
                    };
                    break;

                case 'Correspondence Out':
                    HomeService.createPrimaryXML("TAG7", "Template Name:");
                    HomeService.createPrimaryXML("TAG7_NUM", "063:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    break;

                case 'Email':
                case 'Wage and Salary':
                case 'Conversion Documents':
                    if ($scope.GcScanSheetTextBoxValue1) {
                        HomeService.createPrimaryXML("TAG7", "Sender:");
                        HomeService.createPrimaryXML("TAG7_NUM", "027:");
                        HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    } else {
                        HomeService.createPrimaryXML("TAG7", "");
                        HomeService.createPrimaryXML("TAG7_NUM", "");
                        HomeService.createPrimaryXML("VALUE7", "");
                    };
                    break;

                case 'Form':
                case 'Memo':
                    HomeService.createPrimaryXML("TAG9", "Template Name:");
                    HomeService.createPrimaryXML("TAG9_NUM", "063:");
                    HomeService.createPrimaryXML("VALUE9", $scope.GcScanSheetTextBoxValue1);
                    break;

                case 'Medical EOB':
                case 'Void Stop':
                    HomeService.createPrimaryXML("TAG7", "Payee:");
                    HomeService.createPrimaryXML("TAG7_NUM", "021:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);

                    HomeService.createPrimaryXML("TAG8", "Payee Tax ID:");
                    HomeService.createPrimaryXML("TAG8_NUM", "044:");
                    HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);

                    if ($scope.GcScanSheetTextBoxValue3) {
                        HomeService.createPrimaryXML("TAG9", "Provider Name:");
                        HomeService.createPrimaryXML("TAG9_NUM", "053:");
                        HomeService.createPrimaryXML("VALUE9", $scope.GcScanSheetTextBoxValue3);

                    } else {
                        HomeService.createPrimaryXML("TAG9", "");
                        HomeService.createPrimaryXML("TAG9_NUM", "");
                        HomeService.createPrimaryXML("VALUE9", "");
                    };

                    if ($scope.GcScanSheetTextBoxValue4) {
                        HomeService.createPrimaryXML("TAG12", "Payment Number:");
                        HomeService.createPrimaryXML("TAG12_NUM", "062:");
                        HomeService.createPrimaryXML("VALUE12", $scope.GcScanSheetTextBoxValue4)
                    } else {
                        HomeService.createPrimaryXML("TAG12", "");
                        HomeService.createPrimaryXML("TAG12_NUM", "");
                        HomeService.createPrimaryXML("VALUE12", "")
                    };
                    break;

                case 'Extended Benefits':
                case 'Lien Document':
                case 'Miscellaneous':
                case 'Denial Letter':
                case 'Discovery':
                case 'Investigative Document':
                case 'Subrogation Proofs':
                case 'Letter of Representation':
                case 'Motion and Brief':
                case 'Sworn Statement':
                case 'Authorization':
                    HomeService.createPrimaryXML("TAG7", "Sender:");
                    HomeService.createPrimaryXML("TAG7_NUM", "027:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    break;

                case 'W9':
                case 'Peer Review Report':
                case 'Peer Review Bill':
                case 'Uniform Bill':
                case 'Attorney Bill':
                case 'Miscellaneous Bill':
                case 'Records Fee Bill':
                case 'Salvage Invoice':
                case 'Vendor Bill':
                    HomeService.createPrimaryXML("TAG7", "Payee:");
                    HomeService.createPrimaryXML("TAG7_NUM", "021:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);

                    HomeService.createPrimaryXML("TAG8", "Payee Tax ID:");
                    HomeService.createPrimaryXML("TAG8_NUM", "044:");
                    HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);
                    break;

                case 'Closing Document':
                    if ($scope.GcScanSheetTextBoxValue1) {
                        HomeService.createPrimaryXML("TAG7", "Sender:");
                        HomeService.createPrimaryXML("TAG7_NUM", "027:");
                        HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    } else {
                        HomeService.createPrimaryXML("TAG7", "");
                        HomeService.createPrimaryXML("TAG7_NUM", "");
                        HomeService.createPrimaryXML("VALUE7", "");
                    };

                    if ($scope.GcScanSheetTextBoxValue2) {
                        HomeService.createPrimaryXML("TAG8", "Payee:");
                        HomeService.createPrimaryXML("TAG8_NUM", "021:");
                        HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);
                    } else {
                        HomeService.createPrimaryXML("TAG8", "");
                        HomeService.createPrimaryXML("TAG8_NUM", "");
                        HomeService.createPrimaryXML("VALUE8", "");
                    };

                    if ($scope.GcScanSheetTextBoxValue3) {
                        HomeService.createPrimaryXML("TAG9", "Forum File Number:");
                        HomeService.createPrimaryXML("TAG9_NUM", "052:");
                        HomeService.createPrimaryXML("VALUE9", $scope.GcScanSheetTextBoxValue3);
                    } else {
                        HomeService.createPrimaryXML("TAG9", "");
                        HomeService.createPrimaryXML("TAG9_NUM", "");
                        HomeService.createPrimaryXML("VALUE9", "");
                    };
                    break;

                case 'Salvage Bulk Report':
                    HomeService.createPrimaryXML("TAG5", "Payee:");
                    HomeService.createPrimaryXML("TAG5_NUM", "021:");
                    HomeService.createPrimaryXML("VALUE5", $scope.GcScanSheetTextBoxValue1);
                    break;

                case 'SIU Documentation':
                case 'Subpoena':
                case 'Medical Records':
                    if ($scope.GcScanSheetTextBoxValue1) {
                        HomeService.createPrimaryXML("TAG7", "Payee:");
                        HomeService.createPrimaryXML("TAG7_NUM", "021:");
                        HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    } else {
                        HomeService.createPrimaryXML("TAG7", "");
                        HomeService.createPrimaryXML("TAG7_NUM", "");
                        HomeService.createPrimaryXML("VALUE7", "");
                    };


                    if ($scope.GcScanSheetTextBoxValue2) {
                        HomeService.createPrimaryXML("TAG8", "Provider Name:");
                        HomeService.createPrimaryXML("TAG8_NUM", "053:");
                        HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);

                    } else {
                        HomeService.createPrimaryXML("TAG8", "");
                        HomeService.createPrimaryXML("TAG8_NUM", "");
                        HomeService.createPrimaryXML("VALUE8", "");
                    };
                    break;

                case 'Answer to Filed Complaint':
                case 'Release':
                case 'Commencement of Treatment':
                    if ($scope.GcScanSheetTextBoxValue1) {
                        HomeService.createPrimaryXML("TAG7", "Payee:");
                        HomeService.createPrimaryXML("TAG7_NUM", "021:");
                        HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    } else {
                        HomeService.createPrimaryXML("TAG7", "");
                        HomeService.createPrimaryXML("TAG7_NUM", "");
                        HomeService.createPrimaryXML("VALUE7", "");
                    };
                    break;

                case 'Attorney Correspondence':
                    HomeService.createPrimaryXML("TAG7", "Sender:");
                    HomeService.createPrimaryXML("TAG7_NUM", "027:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);

                    if ($scope.GcScanSheetTextBoxValue2) {
                        HomeService.createPrimaryXML("TAG8", "Payee:");
                        HomeService.createPrimaryXML("TAG8_NUM", "021:");
                        HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);
                    } else {
                        HomeService.createPrimaryXML("TAG8", "");
                        HomeService.createPrimaryXML("TAG8_NUM", "");
                        HomeService.createPrimaryXML("VALUE8", "");
                    };

                    if ($scope.GcScanSheetTextBoxValue3) {
                        HomeService.createPrimaryXML("TAG9", "Payee Tax ID:");
                        HomeService.createPrimaryXML("TAG9_NUM", "044:");
                        HomeService.createPrimaryXML("VALUE9", $scope.GcScanSheetTextBoxValue3);
                    } else {
                        HomeService.createPrimaryXML("TAG9", "");
                        HomeService.createPrimaryXML("TAG9_NUM", "");
                        HomeService.createPrimaryXML("VALUE9", "");
                    };

                    if ($scope.GcScanSheetTextBoxValue4) {
                        HomeService.createPrimaryXML("TAG13", "Forum File Number:");
                        HomeService.createPrimaryXML("TAG13_NUM", "052:");
                        HomeService.createPrimaryXML("VALUE13", $scope.GcScanSheetTextBoxValue4);
                    } else {
                        HomeService.createPrimaryXML("TAG13", "");
                        HomeService.createPrimaryXML("TAG13_NUM", "");
                        HomeService.createPrimaryXML("VALUE13", "");
                    };
                    break;

                case 'Court Order':
                    HomeService.createPrimaryXML("TAG7", "Sender:");
                    HomeService.createPrimaryXML("TAG7_NUM", "027:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);

                    if ($scope.GcScanSheetTextBoxValue2) {
                        HomeService.createPrimaryXML("TAG8", "Payee:");
                        HomeService.createPrimaryXML("TAG8_NUM", "021:");
                        HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);
                    } else {
                        HomeService.createPrimaryXML("TAG8", "");
                        HomeService.createPrimaryXML("TAG8_NUM", "");
                        HomeService.createPrimaryXML("VALUE8", "");
                    };
                    break;

                case 'Title':
                    HomeService.createPrimaryXML("TAG7", "VIN:");
                    HomeService.createPrimaryXML("TAG7_NUM", "045:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);
                    break;

                case 'Diagnostic Report':
                case 'Independent Medical Exam':
                case 'Operative Report':
                    HomeService.createPrimaryXML("TAG7", "Payee:");
                    HomeService.createPrimaryXML("TAG7_NUM", "021:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);


                    if ($scope.GcScanSheetTextBoxValue2) {
                        HomeService.createPrimaryXML("TAG8", "Provider Name:");
                        HomeService.createPrimaryXML("TAG8_NUM", "053:");
                        HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);

                    } else {
                        HomeService.createPrimaryXML("TAG8", "");
                        HomeService.createPrimaryXML("TAG8_NUM", "");
                        HomeService.createPrimaryXML("VALUE8", "");
                    };
                    break;

                case 'Medical Attachment':
                case 'Precert':
                case 'Audit Invoice':
                case 'IME Bill':
                case 'Medical Bills':
                case 'Payment Appeal':
                case 'Surgical Bill':
                    HomeService.createPrimaryXML("TAG7", "Payee:");
                    HomeService.createPrimaryXML("TAG7_NUM", "021:");
                    HomeService.createPrimaryXML("VALUE7", $scope.GcScanSheetTextBoxValue1);

                    HomeService.createPrimaryXML("TAG8", "Payee Tax ID:");
                    HomeService.createPrimaryXML("TAG8_NUM", "044:");
                    HomeService.createPrimaryXML("VALUE8", $scope.GcScanSheetTextBoxValue2);

                    if ($scope.GcScanSheetTextBoxValue3) {
                        HomeService.createPrimaryXML("TAG9", "Provider Name:");
                        HomeService.createPrimaryXML("TAG9_NUM", "053:");
                        HomeService.createPrimaryXML("VALUE9", $scope.GcScanSheetTextBoxValue3);

                    } else {
                        HomeService.createPrimaryXML("TAG9", "");
                        HomeService.createPrimaryXML("TAG9_NUM", "");
                        HomeService.createPrimaryXML("VALUE9", "");
                    };
                    break;

                case 'Bulk Bill':
                case 'Bulk Billing Sheet':
                    HomeService.createPrimaryXML("TAG5", "Payee:");
                    HomeService.createPrimaryXML("TAG5_NUM", "021:");
                    HomeService.createPrimaryXML("VALUE5", $scope.GcScanSheetTextBoxValue1);

                    HomeService.createPrimaryXML("TAG6", "Payee Tax ID:");
                    HomeService.createPrimaryXML("TAG6_NUM", "044:");
                    HomeService.createPrimaryXML("VALUE6", $scope.GcScanSheetTextBoxValue2);
                    break;

            }; //switch

        } //try
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
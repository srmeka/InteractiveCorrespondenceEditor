app.controller('PlScanSheetPrinterController', function ($scope, shareData, $http, HomeService) {
    try {

        HomeService.LookupValue("PCPAPrinters").then(function (response) {
            $scope.PlScanSheetPrinter = response.data;
        },
              function (error) {
                  $scope.error = error;
              });

        var currentDate = new Date(JSPath.apply('.Policy.PolicyPeriod.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        var years = [];
        var currentYear = currentDate.getFullYear();

        var policyNo = JSPath.apply('.Policy.PolicyNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var quoteNo = JSPath.apply('.Policy.PolicyPeriod.QuoteNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PlScanSheetPrinter', function (event) {
        try {
            if ($scope.SelectedPlScanSheetPrinter) {
                //Format creator id
                var creatorId = shareData.shareUsername;
                var creatorId = creatorId.replace(/\D/g, '');
                var lob = HomeService.getUrlParameter('LOB');

                HomeService.createPrimaryXML("PRINT_IND", "DEPT");

                switch (lob) {

                    case 'PC-UMB':
                        HomeService.createPrimaryXML("HEADING", "Personal Lines_SS");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPlScanSheetPrinter.lookupItemValue);

                        HomeService.createPrimaryXML("TAG1", "Kofax Batch Class:");
                        HomeService.createPrimaryXML("TAG1_NUM", "SID:");
                        HomeService.createPrimaryXML("VALUE1", "Personal Lines_SS");

                        HomeService.createPrimaryXML("TAG2", "Document Type:");
                        HomeService.createPrimaryXML("TAG2_NUM", "DTY:");
                        HomeService.createPrimaryXML("VALUE2", shareData.shareOnbaseDoctypeId);

                        HomeService.createPrimaryXML("TAG3", "Scan Sheet Creator ID:");
                        HomeService.createPrimaryXML("TAG3_NUM", "059:");
                        HomeService.createPrimaryXML("VALUE3", creatorId);

                        HomeService.createPrimaryXML("TAG4", "Policy Number:");
                        HomeService.createPrimaryXML("TAG4_NUM", "004:");

                        if (policyNo) {
                            HomeService.createPrimaryXML("VALUE4", policyNo);
                            HomeService.createPrimaryXML("VALUE5", "");
                        } else {
                            HomeService.createPrimaryXML("VALUE4", "")
                            HomeService.createPrimaryXML("VALUE5", quoteNo);
                        }

                        HomeService.createPrimaryXML("TAG5", "Reference Number:");
                        HomeService.createPrimaryXML("TAG5_NUM", "005:");


                        HomeService.createPrimaryXML("TAG8", "LOB:");
                        HomeService.createPrimaryXML("TAG8_NUM", "002:");
                        HomeService.createPrimaryXML("VALUE8", "UMBRELLA");

                        switch ($scope.SelectedDocument.documentFriendlyName) {
                            
                            case 'POLDOC  Discount Documents':

                                HomeService.createPrimaryXML("TAG9", "Discount Type:");
                                HomeService.createPrimaryXML("TAG9_NUM", "011:");
                                HomeService.createPrimaryXML("VALUE9", "HOME");
                                break;
                        }
                        break; //'PC-UMB'

                    case 'PC-PA':
                        HomeService.createPrimaryXML("HEADING", "Personal Lines_SS");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPlScanSheetPrinter.lookupItemValue);

                        HomeService.createPrimaryXML("TAG1", "Kofax Batch Class:");
                        HomeService.createPrimaryXML("TAG1_NUM", "SID:");
                        HomeService.createPrimaryXML("VALUE1", "Personal Lines_SS");

                        HomeService.createPrimaryXML("TAG2", "Document Type:");
                        HomeService.createPrimaryXML("TAG2_NUM", "DTY:");
                        HomeService.createPrimaryXML("VALUE2", shareData.shareOnbaseDoctypeId);

                        HomeService.createPrimaryXML("TAG3", "Scan Sheet Creator ID:");
                        HomeService.createPrimaryXML("TAG3_NUM", "059:");
                        HomeService.createPrimaryXML("VALUE3", creatorId);

                        if (policyNo) {
                            HomeService.createPrimaryXML("TAG4", "Policy Number:");
                            HomeService.createPrimaryXML("TAG4_NUM", "004:");
                            HomeService.createPrimaryXML("VALUE4", policyNo);

                        } else {
                            HomeService.createPrimaryXML("TAG5", "Reference Number:");
                            HomeService.createPrimaryXML("TAG5_NUM", "005:");
                            HomeService.createPrimaryXML("VALUE5", quoteNo);
                        }

                        switch ($scope.SelectedDocument.documentFriendlyName) {

                            case 'POLDOC  Application':
                            case 'POLDOC  Dec Page and Policy Documents':
                            case 'POLDOC  Photos':
                            case 'POLDOC  Quotation':
                                HomeService.createPrimaryXML("TAG8", "LOB:");
                                HomeService.createPrimaryXML("TAG8_NUM", "002:");
                                HomeService.createPrimaryXML("VALUE8", "AUTO");
                                break;

                            case 'POLDOC  Certificates of Insurance':
                            case 'POLDOC  Correspondence':
                                HomeService.createPrimaryXML("TAG10", "LOB:");
                                HomeService.createPrimaryXML("TAG10_NUM", "002:");
                                HomeService.createPrimaryXML("VALUE10", "AUTO");
                                break;

                            case 'POLDOC  CSF':
                            case 'POLDOC  Discount Documents':
                            case 'POLDOC  Underwriting':
                                HomeService.createPrimaryXML("TAG9", "LOB:");
                                HomeService.createPrimaryXML("TAG9_NUM", "002:");
                                HomeService.createPrimaryXML("VALUE9", "AUTO");
                                break;

                            case 'POLDOC  Renewal Questionnaire':
                                HomeService.createPrimaryXML("TAG9", "Questionnaire Type:");
                                HomeService.createPrimaryXML("TAG9_NUM", "014:");
                                HomeService.createPrimaryXML("VALUE9", "INCOMING");

                                HomeService.createPrimaryXML("TAG10", "LOB:");
                                HomeService.createPrimaryXML("TAG10_NUM", "002:");
                                HomeService.createPrimaryXML("VALUE10", "AUTO");
                                break;
                       }
                        break; //'PC-PA'

                    case 'PC-HO':
                        HomeService.createPrimaryXML("HEADING", "Personal Lines_SS");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPlScanSheetPrinter.lookupItemValue);

                        HomeService.createPrimaryXML("TAG1", "Kofax Batch Class:");
                        HomeService.createPrimaryXML("TAG1_NUM", "SID:");
                        HomeService.createPrimaryXML("VALUE1", "Personal Lines_SS");

                        HomeService.createPrimaryXML("TAG2", "Document Type:");
                        HomeService.createPrimaryXML("TAG2_NUM", "DTY:");
                        HomeService.createPrimaryXML("VALUE2", shareData.shareOnbaseDoctypeId);

                        HomeService.createPrimaryXML("TAG3", "Scan Sheet Creator ID:");
                        HomeService.createPrimaryXML("TAG3_NUM", "059:");
                        HomeService.createPrimaryXML("VALUE3", creatorId);

                        HomeService.createPrimaryXML("TAG4", "Policy Number:");
                        HomeService.createPrimaryXML("TAG4_NUM", "004:");

                        if (policyNo) {
                            HomeService.createPrimaryXML("VALUE4", policyNo);
                            HomeService.createPrimaryXML("VALUE5", "");
                        } else {
                            HomeService.createPrimaryXML("VALUE4", "")
                            HomeService.createPrimaryXML("VALUE5", quoteNo);
                        }

                        HomeService.createPrimaryXML("TAG5", "Reference Number:");
                        HomeService.createPrimaryXML("TAG5_NUM", "005:");

                        switch ($scope.SelectedDocument.documentFriendlyName) {  //Pass-Through

                           case 'POLDOC  Discount Documents': 
                                HomeService.createPrimaryXML("TAG9", "Discount Type:");
                                HomeService.createPrimaryXML("TAG9_NUM", "011:");
                                HomeService.createPrimaryXML("VALUE9", "Home");
                                break;

                            case 'POLDOC  Renewal Questionnaire':

                                HomeService.createPrimaryXML("TAG10", "Questionaire Type:");
                                HomeService.createPrimaryXML("TAG10_NUM", "014:");
                                HomeService.createPrimaryXML("VALUE10", "INCOMING");
                                break;
                        };
                        break; //'PC-HO'

                    case 'PC-DW':
                        HomeService.createPrimaryXML("HEADING", "Personal Lines_SS");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPlScanSheetPrinter.lookupItemValue);

                        HomeService.createPrimaryXML("TAG1", "Kofax Batch Class:");
                        HomeService.createPrimaryXML("TAG1_NUM", "SID:");
                        HomeService.createPrimaryXML("VALUE1", "Personal Lines_SS");

                        HomeService.createPrimaryXML("TAG2", "Document Type:");
                        HomeService.createPrimaryXML("TAG2_NUM", "DTY:");
                        HomeService.createPrimaryXML("VALUE2", shareData.shareOnbaseDoctypeId);

                        HomeService.createPrimaryXML("TAG3", "Scan Sheet Creator ID:");
                        HomeService.createPrimaryXML("TAG3_NUM", "059:");
                        HomeService.createPrimaryXML("VALUE3", creatorId);

                        HomeService.createPrimaryXML("TAG4", "Policy Number:");
                        HomeService.createPrimaryXML("TAG4_NUM", "004:");

                        if (policyNo) {
                            HomeService.createPrimaryXML("VALUE4", policyNo);
                            HomeService.createPrimaryXML("VALUE5", "");
                        } else {
                            HomeService.createPrimaryXML("VALUE4", "")
                            HomeService.createPrimaryXML("VALUE5", quoteNo);
                        }

                        HomeService.createPrimaryXML("TAG5", "Reference Number:");
                        HomeService.createPrimaryXML("TAG5_NUM", "005:");

                        HomeService.createPrimaryXML("TAG8", "LOB:");
                        HomeService.createPrimaryXML("TAG8_NUM", "002:");
                        HomeService.createPrimaryXML("VALUE8", "DWELLING");

                        switch ($scope.SelectedDocument.documentFriendlyName) {

                            case 'POLDOC  Discount Documents': //Pass-through
                                HomeService.createPrimaryXML("TAG9", "Discount Type:");
                                HomeService.createPrimaryXML("TAG9_NUM", "011:");
                                HomeService.createPrimaryXML("VALUE9", "Dwelling");
                                break;

                            case 'POLDOC  Renewal Questionnaire':  //Pass-through

                                HomeService.createPrimaryXML("TAG10", "Questionaire Type:");
                                HomeService.createPrimaryXML("TAG10_NUM", "014:");
                                HomeService.createPrimaryXML("VALUE10", "Incoming");
                                break;
                        };
                        break; //'PC-DW'

                };  //End Switch
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});